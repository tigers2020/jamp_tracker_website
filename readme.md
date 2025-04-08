# Jamps Tracker System

테니스 볼 트래킹 및 애니메이션 시스템

## PythonAnywhere 배포 방법

1. **PythonAnywhere 계정 생성**
   - [PythonAnywhere](https://www.pythonanywhere.com/)에서 계정 생성 (무료 계정으로 시작 가능)

2. **대시보드에서 새 웹 앱 생성**
   - "Web" 탭으로 이동하여 "Add a new web app" 클릭
   - "Manual configuration" 선택
   - Python 버전은 3.10 선택
   - 기본 경로는 그대로 사용 (/username.pythonanywhere.com)

3. **코드 업로드**
   - "Files" 탭에서 코드 업로드 또는 
   - Bash 콘솔에서 git clone으로 코드 가져오기:
     ```
     git clone https://github.com/your-username/your-repo-name.git
     ```

4. **가상 환경 설정**
   - Bash 콘솔에서 가상 환경 생성:
     ```
     mkvirtualenv --python=/usr/bin/python3.10 jamps_env
     ```
   - 패키지 설치:
     ```
     workon jamps_env
     pip install django
     pip install -r requirements.txt  # 프로젝트에 requirements.txt 파일이 있는 경우
     ```

5. **WSGI 파일 설정**
   - Web 탭에서 WSGI 파일 클릭
   - 기본 코드를 다음과 같이 수정:
     ```python
     import os
     import sys

     # 프로젝트 디렉토리 경로를 추가
     path = '/home/your-username/your-project-directory'
     if path not in sys.path:
         sys.path.append(path)

     # Django 설정 모듈 설정
     os.environ['DJANGO_SETTINGS_MODULE'] = 'tennis_ball_system.settings'

     # Django 가져오기
     from django.core.wsgi import get_wsgi_application
     application = get_wsgi_application()
     ```

6. **설정 파일 수정**
   - settings.py 파일 수정:
     - `ALLOWED_HOSTS = ['your-username.pythonanywhere.com']` 추가
     - `DEBUG = False` 설정 (프로덕션 환경에서)
     - 정적 파일 설정:
       ```python
       STATIC_URL = '/static/'
       STATIC_ROOT = os.path.join(BASE_DIR, 'static')
       ```

7. **정적 파일 수집**
   - Bash 콘솔에서 명령 실행:
     ```
     python manage.py collectstatic
     ```

8. **Web 앱 설정 완료**
   - "Web" 탭에서 가상 환경 경로 입력: `/home/your-username/.virtualenvs/jamps_env`
   - 정적 파일 URL 및 경로 설정:
     - URL: `/static/`
     - 디렉토리: `/home/your-username/your-project-directory/static`

9. **웹 앱 재시작**
   - "Web" 탭에서 "Reload" 버튼 클릭

10. **사이트 확인**
    - `your-username.pythonanywhere.com` 주소로 접속하여 사이트 동작 확인

## 개발 환경

- Python 3.10
- Django
- Tailwind CSS

## 주요 기능

- 테니스 볼 애니메이션 재생/제어
- 좌표 데이터 처리 및 변환
- FPGA 기반 인/아웃 판정 분석
