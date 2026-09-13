@echo off
node "%~dp0scripts\launch.mjs"
if errorlevel 1 (
  echo Automatisch starten lukte niet. Gebruik npm start in deze map.
  pause
)
