@echo off

REM Build and start the server
npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo Server build failed.
    exit /b %ERRORLEVEL%
)
npm run start

REM Build and serve the client
npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo Client build failed.
    exit /b %ERRORLEVEL%
)
npm run serve