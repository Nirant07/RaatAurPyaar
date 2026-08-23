@echo off
cd /d "%~dp0"
start "" cmd /c "py -m http.server 3000"
timeout /t 1 >nul
start "" "http://localhost:3000"
