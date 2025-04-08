from django.shortcuts import render

def home(request):
    """메인 홈페이지"""
    return render(request, 'animation/home.html')

def documentation(request):
    """시스템 설명서 페이지"""
    return render(request, 'animation/documentation.html')

def underconstruction(request):
    return render(request, 'animation/underconstruction.html')
