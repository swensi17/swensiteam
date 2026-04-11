# 🚀 SWENSI DEVELOPER - Портфолио сайт

Современный одностраничный сайт-портфолио для веб-студии, созданный с использованием React, TypeScript и Vite.

## ✨ Особенности

- 🎨 Современный дизайн с анимациями
- ⚡ Быстрая загрузка благодаря Vite
- 📱 Полностью адаптивный дизайн
- 🎭 Плавные анимации с Framer Motion
- 🔒 Секция безопасности с Bento Grid
- 💼 Витрина технологий с бесконечной прокруткой
- 🌙 Темная тема

## 🛠️ Технологии

- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик и dev-сервер
- **Framer Motion** - Анимации
- **Lucide React** - Иконки
- **Tailwind CSS** - Стилизация (через CDN)

## 📦 Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/swensi17/swensiteam.git

# Перейдите в папку проекта
cd swensiteam

# Установите зависимости
npm install
```

## 🚀 Запуск

### Режим разработки
```bash
npm run dev
```
Откройте http://localhost:3000 в браузере

### Сборка для продакшена
```bash
npm run build
```

### Предпросмотр сборки
```bash
npm run preview
```

## 📤 Деплой на GitHub Pages

Подробная инструкция находится в файле [DEPLOY.md](./DEPLOY.md)

Быстрый деплой:
```bash
npm run deploy
```

## 📁 Структура проекта

```
swensiteam/
├── components/              # React компоненты
│   ├── Header.tsx          # Шапка сайта
│   ├── Hero.tsx            # Главный экран
│   ├── Intro.tsx           # Вступление
│   ├── Services.tsx        # Услуги
│   ├── Process.tsx         # Процесс работы
│   ├── CompaniesSection.tsx # Технологии
│   ├── SecuritySection.tsx  # Безопасность
│   ├── FAQ.tsx             # Частые вопросы
│   ├── Footer.tsx          # Подвал
│   └── ui/                 # UI компоненты
│       ├── Button.tsx
│       ├── Sheet.tsx
│       └── Starfield.tsx
├── public/                 # Статические файлы
│   └── svg/               # SVG иконки (150+ файлов)
├── lib/                   # Утилиты
│   └── utils.ts
├── App.tsx                # Главный компонент
├── index.tsx              # Точка входа
├── index.html             # HTML шаблон
├── vite.config.ts         # Конфигурация Vite
├── tsconfig.json          # Конфигурация TypeScript
├── package.json           # Зависимости
├── README.md              # Этот файл
└── DEPLOY.md              # Инструкция по деплою
```

## 🎨 Компоненты

### Header
Навигационная шапка с мобильным меню и плавной прокруткой к секциям.

### Hero
Главный экран с анимированным фоном из звезд и призывом к действию.

### Services
Карточки услуг с hover-эффектами.

### CompaniesSection
Бесконечная прокрутка логотипов технологий в трех рядах.

### SecuritySection
Bento Grid с информацией о безопасности и защите данных.

### FAQ
Аккордеон с часто задаваемыми вопросами.

## 🔧 Конфигурация

### Vite Config
Основные настройки в `vite.config.ts`:
- `base: '/swensiteam/'` - базовый путь для GitHub Pages
- `server.port: 3000` - порт dev-сервера
- Алиасы путей

### TypeScript
Строгая типизация включена в `tsconfig.json`

## 🌐 Деплой

Сайт автоматически деплоится на GitHub Pages:
- **URL:** https://swensi17.github.io/swensiteam/
- **Ветка:** `gh-pages`

## 📝 Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Предпросмотр сборки |
| `npm run deploy` | Деплой на GitHub Pages |

## 🤝 Контрибьюция

1. Форкните проект
2. Создайте ветку для фичи (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект создан для SWENSI DEVELOPER.

## 👨‍💻 Автор

**SWENSI DEVELOPER**
- GitHub: [@swensi17](https://github.com/swensi17)

---

Сделано с ❤️ и React
