#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 Скрипт для автоматического деплоя на GitHub Pages
"""

import subprocess
import sys
import os
from datetime import datetime
from pathlib import Path

def run_command(command, description, check=True):
    """Выполняет команду и выводит результат"""
    print(f"\n{'='*60}")
    print(f"🔄 {description}")
    print(f"{'='*60}")
    
    try:
        result = subprocess.run(
            command,
            shell=True,
            check=check,
            capture_output=True,
            text=True,
            encoding='utf-8'
        )
        
        if result.stdout:
            print(result.stdout)
        
        print(f"✅ {description} - успешно!")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Ошибка: {e}")
        if e.stderr:
            print(f"Детали: {e.stderr}")
        return False

def check_git_status():
    """Проверяет статус git"""
    result = subprocess.run(
        "git status --porcelain",
        shell=True,
        capture_output=True,
        text=True
    )
    return result.stdout.strip()

def main():
    print("\n" + "="*60)
    print("🚀 ДЕПЛОЙ НА GITHUB PAGES")
    print("="*60)
    
    # Проверяем наличие изменений
    if check_git_status():
        print("\n📝 Найдены изменения, коммичу...")
        
        # Добавляем все файлы
        if not run_command("git add .", "Добавление файлов"):
            sys.exit(1)
        
        # Создаем коммит
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        commit_message = f"🚀 Update: {timestamp}"
        
        if not run_command(f'git commit -m "{commit_message}"', "Создание коммита", check=False):
            print("\n⚠️  Нет изменений для коммита")
    else:
        print("\n✓ Нет изменений в репозитории")
    
    # Определяем ветку
    result = subprocess.run(
        "git branch --show-current",
        shell=True,
        capture_output=True,
        text=True
    )
    branch = result.stdout.strip() or "main"
    
    # Пушим в GitHub
    print(f"\n📤 Отправка в GitHub (ветка: {branch})...")
    if not run_command(f"git push origin {branch}", "Отправка в GitHub", check=False):
        print("⚠️  Возможно, нужно настроить remote или нет изменений")
    
    # Устанавливаем зависимости если нужно
    if not Path("node_modules").exists():
        print("\n📦 Устанавливаю зависимости...")
        if not run_command("npm install", "Установка зависимостей"):
            sys.exit(1)
    
    # Собираем проект
    print("\n🔨 Собираю проект...")
    if not run_command("npm run build", "Сборка проекта"):
        sys.exit(1)
    
    # Деплоим на gh-pages
    print("\n🌐 Деплою на GitHub Pages...")
    if not run_command("npx gh-pages -d dist", "Деплой на gh-pages"):
        print("\n⚠️  Ошибка деплоя. Попробуйте:")
        print("   1. Проверьте настройки GitHub Pages в репозитории")
        print("   2. Убедитесь что токен имеет права на запись")
        sys.exit(1)
    
    print("\n" + "="*60)
    print("✨ ВСЕ ГОТОВО! Сайт задеплоен!")
    print("="*60)
    print(f"\n🌐 Сайт: https://swensi17.github.io/swensidev")
    print(f"📦 Репозиторий: https://github.com/swensi17/swensidev")
    print(f"⏰ Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"\n⏱  Подождите 1-2 минуты для обновления сайта\n")

if __name__ == "__main__":
    main()
