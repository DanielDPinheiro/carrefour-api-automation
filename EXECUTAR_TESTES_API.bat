@echo off
cd /d "%~dp0"
title Desafio Carrefour - API
if not exist node_modules\newman\bin\newman.js call npm install
if errorlevel 1 goto erro
call npm run api:test:local
if errorlevel 1 goto erro
echo Testes concluidos com sucesso.
pause
exit /b 0
:erro
echo Execucao com falhas. Consulte reports\postman.
pause
exit /b 1
