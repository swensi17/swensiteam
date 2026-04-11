#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 Полная настройка и деплой на GitHub Pages
"""

import subprocess
import sys
import os
from pathlib import Path

# Загрузка из .env.local
def load_env():
    env_path = Path(".env.local")
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ[key.strip()] = value.strip()

load_env()

# Конфигурация из переменных окружения
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GITHUB_USERNAME = os.environ.get("GITHUB_USERNAME", "swensi17")
REPO_NAME = os.environ.get("REPO_NAME", "swensidev")

if not GITHUB_TOKEN:
    print("❌ Ошибка: GITHUB_TOKEN не найден в .env.local")
    sys.exit(1)

REPO_URL = f"https://{GITHUB_TOKEN}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git"

def run_cmd(cmd, description):
    """Выполняет команду"""
    print(f"\n{'='*60}")
    print(f"🔄 {description}")
    print(f"{'='*60}")
    
    try:
        result = subprocess.run(
            cmd,
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
    print("🚀 НАСТРОЙКА И ДЕПЛОЙ НА GITHUB PAGES")
    print("="*60)
    
    # 1. Удаляем старый remote если есть
    print("\n📝 Настраиваю git remote...")
    subprocess.run("git remote remove origin", shell=True, capture_output=True)
    
    # 2. Добавляем remote с токеном
    if not run_cmd(f'git remote add origin {REPO_URL}', "Добавление remote"):
        # Если уже есть, обновляем
        run_cmd(f'git remote set-url origin {REPO_URL}', "Обновление remote")
    
    # 3. Проверяем что на main
    result = subprocess.run("git branch --show-current", shell=True, capture_output=True, text=True)
    current_branch = result.stdout.strip()
    
    if current_branch != "main":
        print(f"\n📝 Переключаюсь на main (сейчас: {current_branch})...")
        run_cmd("git checkout -b main", "Создание ветки main")
    
    # 4. Добавляем все файлы
    if not run_cmd("git add .", "Добавление файлов"):
        sys.exit(1)
    
    # 5. Коммитим
    from datetime import datetime
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_msg = f"🚀 Deploy: {timestamp}"
    
    result = subprocess.run(
        f'git commit -m "{commit_msg}"',
        shell=True,
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        print(f"\n✅ Коммит создан: {commit_msg}")
    else:
        print("\n⚠️  Нет изменений для коммита")
    
    # 6. Пушим в GitHub
    print("\n📤 Отправка в GitHub...")
    if not run_cmd("git push -u origin main --force", "Push в GitHub"):
        sys.exit(1)
    
    # 7. Собираем проект
    print("\n🔨 Собираю проект...")
    if not Path("node_modules").exists():
        if not run_cmd("npm install", "Установка зависимостей"):
            sys.exit(1)
    
    if not run_cmd("npm run build", "Сборка проекта"):
        sys.exit(1)
    
    print("\n" + "="*60)
    print("✨ ГОТОВО!")
    print("="*60)
    print(f"""
🌐 Сайт будет доступен через 1-2 минуты:
   https://{GITHUB_USERNAME}.github.io/{REPO_NAME}

📋 Следующие шаги:
   1. Открой: https://github.com/{GITHUB_USERNAME}/{REPO_NAME}
   2. Перейди в Settings → Pages
   3. В Source выбери: GitHub Actions
   4. Дождись завершения деплоя в разделе Actions

⏰ Время: {timestamp}
""")

if __name__ == "__main__":
    main()
