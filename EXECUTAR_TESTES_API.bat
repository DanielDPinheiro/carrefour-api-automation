@echo off
title Banco Carrefour - API Tests

echo ============================================
echo      BANCO CARREFOUR - API AUTOMATION
echo ============================================
echo.

echo Executando CT01 ao CT12...
call npm run api:test:local

echo.
echo ============================================
echo Testes finalizados.
echo ============================================
echo.

echo Para executar os testes de Rate Limit utilize:
echo.
echo   npm run test:ratelimit
echo   npm run test:ratelimit:strict
echo   npm run postman:ratelimit
echo.

pause