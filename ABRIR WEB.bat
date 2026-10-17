@echo off
title Niveles de investigacion - abrir
cd /d "%~dp0"
if exist "index.html" (
  start "" "index.html"
) else (
  echo No se encontro index.html en esta carpeta.
  pause
)
