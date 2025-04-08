// 문서 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('테니스 볼 애니메이션 시스템이 로드되었습니다.');
    
    // 토스트 메시지 초기화 (Bootstrap)
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl);
    });
    
    // 토스트 메시지 표시
    toastList.forEach(function(toast) {
        toast.show();
    });
    
    // 툴팁 초기화 (Bootstrap)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// 애니메이션 관련 기능
class AnimationPlayer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID ${containerId} not found.`);
            return;
        }
        
        this.options = Object.assign({
            speed: 50,
            autoPlay: false,
            loop: true
        }, options);
        
        this.images = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.animationTimer = null;
        
        this.initialize();
    }
    
    initialize() {
        // 컨트롤러 UI 생성 및 이벤트 핸들러 연결
        this.createControls();
        
        // 자동 재생 옵션이 켜져 있으면 시작
        if (this.options.autoPlay) {
            this.play();
        }
    }
    
    createControls() {
        // 여기서 필요한 UI 생성
        console.log('애니메이션 플레이어 컨트롤이 생성되었습니다.');
    }
    
    loadImages(imageUrls) {
        this.images = [];
        this.currentIndex = 0;
        
        let loadedCount = 0;
        const totalCount = imageUrls.length;
        
        // 진행 상태 업데이트 함수
        const updateProgress = () => {
            loadedCount++;
            if (this.onProgress) {
                this.onProgress(loadedCount, totalCount);
            }
            
            if (loadedCount === totalCount && this.onLoadComplete) {
                this.onLoadComplete();
            }
        };
        
        // 이미지 로드
        imageUrls.forEach(url => {
            const img = new Image();
            img.onload = updateProgress;
            img.onerror = updateProgress;
            img.src = url;
            this.images.push(img);
        });
    }
    
    play() {
        if (this.isPlaying || this.images.length === 0) return;
        
        this.isPlaying = true;
        this.renderFrame();
        
        // 프레임 간 딜레이는 속도의 역수에 비례
        const frameDelay = Math.max(10, 500 / this.options.speed);
        
        this.animationTimer = setInterval(() => {
            this.nextFrame();
            this.renderFrame();
        }, frameDelay);
    }
    
    pause() {
        this.isPlaying = false;
        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
        }
    }
    
    stop() {
        this.pause();
        this.currentIndex = 0;
        this.renderFrame();
    }
    
    nextFrame() {
        this.currentIndex++;
        if (this.currentIndex >= this.images.length) {
            if (this.options.loop) {
                this.currentIndex = 0;
            } else {
                this.pause();
                this.currentIndex = this.images.length - 1;
            }
        }
    }
    
    previousFrame() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            if (this.options.loop) {
                this.currentIndex = this.images.length - 1;
            } else {
                this.currentIndex = 0;
            }
        }
        this.renderFrame();
    }
    
    renderFrame() {
        if (this.images.length === 0 || !this.container) return;
        
        // 현재 인덱스의 이미지 표시
        this.container.innerHTML = '';
        if (this.currentIndex < this.images.length) {
            this.container.appendChild(this.images[this.currentIndex]);
        }
    }
    
    setSpeed(value) {
        if (value < 1) value = 1;
        if (value > 500) value = 500;
        
        this.options.speed = value;
        
        // 재생 중이었다면 새 속도로 다시 시작
        if (this.isPlaying) {
            this.pause();
            this.play();
        }
    }
}

// FPGA 분석 관련 기능
class FPGAAnalyzer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.results = null;
    }
    
    async analyze(ballPositionData) {
        // 실제로는 서버에 요청하여 분석을 수행하지만, 여기서는 간단한 시뮬레이션만 수행
        console.log('테니스 볼 위치 데이터 분석 중...');
        
        // 서버 요청 시뮬레이션 (500ms 딜레이)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 샘플 결과
        this.results = {
            judgment: Math.random() > 0.5 ? 'IN' : 'OUT',
            confidence: Math.random() * 0.4 + 0.6, // 0.6 ~ 1.0 사이 값
            timestamp: new Date().toISOString()
        };
        
        return this.results;
    }
    
    displayResults() {
        if (!this.results || !this.container) return;
        
        const judgmentClass = this.results.judgment === 'IN' ? 'in-judgment' : 'out-judgment';
        const judgmentText = this.results.judgment === 'IN' ? '인' : '아웃';
        
        this.container.innerHTML = `
            <div class="analysis-result">
                <h4>FPGA 분석 결과</h4>
                <p class="mb-2">
                    <span class="${judgmentClass}">${judgmentText}</span>
                    (신뢰도: ${(this.results.confidence * 100).toFixed(1)}%)
                </p>
                <p class="text-muted small">분석 시간: ${new Date(this.results.timestamp).toLocaleString()}</p>
            </div>
        `;
    }
}

// 카메라 컨트롤 관련 기능
class CameraController {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = Object.assign({
            azimuth: 45,
            elevation: 30,
            distance: 10
        }, options);
        
        this.initialize();
    }
    
    initialize() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="camera-controls">
                <div class="mb-3">
                    <label for="azimuth-slider" class="form-label">방위각: <span id="azimuth-value">${this.options.azimuth}°</span></label>
                    <input type="range" class="form-range camera-control-slider" id="azimuth-slider" 
                           min="0" max="360" value="${this.options.azimuth}">
                </div>
                <div class="mb-3">
                    <label for="elevation-slider" class="form-label">고도: <span id="elevation-value">${this.options.elevation}°</span></label>
                    <input type="range" class="form-range camera-control-slider" id="elevation-slider" 
                           min="0" max="90" value="${this.options.elevation}">
                </div>
                <div class="mb-3">
                    <label for="distance-slider" class="form-label">거리: <span id="distance-value">${this.options.distance}m</span></label>
                    <input type="range" class="form-range camera-control-slider" id="distance-slider" 
                           min="1" max="20" value="${this.options.distance}">
                </div>
            </div>
        `;
        
        // 이벤트 리스너 추가
        document.getElementById('azimuth-slider').addEventListener('input', (e) => {
            this.options.azimuth = parseInt(e.target.value);
            document.getElementById('azimuth-value').textContent = `${this.options.azimuth}°`;
            this.updateCamera();
        });
        
        document.getElementById('elevation-slider').addEventListener('input', (e) => {
            this.options.elevation = parseInt(e.target.value);
            document.getElementById('elevation-value').textContent = `${this.options.elevation}°`;
            this.updateCamera();
        });
        
        document.getElementById('distance-slider').addEventListener('input', (e) => {
            this.options.distance = parseInt(e.target.value);
            document.getElementById('distance-value').textContent = `${this.options.distance}m`;
            this.updateCamera();
        });
    }
    
    updateCamera() {
        // 카메라 위치 업데이트 이벤트 발생
        if (this.onCameraUpdate) {
            this.onCameraUpdate(this.options);
        }
    }
} 