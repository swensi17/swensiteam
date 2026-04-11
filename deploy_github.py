#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для автоматической загрузки изменений в GitHub
"""

import subprocess
import sys
from datetime import datetime

def run_command(command, description):
    """Выполняет команду и выводит результат"""
    print(f"\n{'='*60}")
    print(f"🔄 {description}")
    print(f"{'='*60}")
    
    try:
        result = subprocess.run(
            command,
            shell=True,
            check=True,
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

def main():
    print("\n" + "="*60)
    print("🚀 ЗАГРУЗКА В GITHUB")
    print("="*60)
    
    # Добавляем все файлы
    if not run_command("git add .", "Добавление файлов"):
        sys.exit(1)
    
    # Создаем коммит с текущей датой и временем
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_message = f"Update: {timestamp}"
    
    if not run_command(f'git commit -m "{commit_message}"', "Создание коммита"):
        print("\n⚠️  Возможно, нет изменений для коммита")
    
    # Отправляем в GitHub
    if not run_command("git push origin master", "Отправка в GitHub"):
        sys.exit(1)
    
    print("\n" + "="*60)
    print("✨ ВСЕ ГОТОВО! Изменения загружены в GitHub")
    print("="*60)
    print(f"\n📦 Репозиторий: https://github.com/swensi17/swensidev.git")
    print(f"⏰ Время: {timestamp}\n")

if __name__ == "__main__":
    main()
