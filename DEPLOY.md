# 📦 Инструкция по деплою на GitHub Pages

## 🚀 Быстрый старт

### Предварительные требования
- Node.js (версия 18+)
- Git
- GitHub аккаунт
- Personal Access Token от GitHub

---

## 📋 Пошаговая инструкция

### 1️⃣ Установка зависимостей

```bash
npm install
```

### 2️⃣ Настройка Git репозитория

Если репозиторий еще не инициализирован:

```bash
git init
git add .
git commit -m "Initial commit"
```

### 3️⃣ Подключение к GitHub

Замените `YOUR_TOKEN` на ваш Personal Access Token и `USERNAME/REPO` на ваш репозиторий:

```bash
git remote add origin https://YOUR_TOKEN@github.com/USERNAME/REPO.git
```

Пример:
```bash
git remote add origin https://ghp_xxxxxxxxxxxxx@github.com/swensi17/swensiteam.git
```

### 4️⃣ Настройка base path в vite.config.ts

Откройте `vite.config.ts` и убедитесь, что `base` соответствует названию вашего репозитория:

```typescript
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/REPO_NAME/',  // ← Замените на название вашего репозитория
      // ...
    };
});
```

Пример для репозитория `swensiteam`:
```typescript
base: '/swensiteam/',
```

### 5️⃣ Сборка проекта

```bash
npm run build
```

Эта команда создаст папку `dist` с готовым для продакшена кодом.

### 6️⃣ Загрузка кода на GitHub

```bash
git add .
git commit -m "Update project"
git push -u origin main
```

### 7️⃣ Деплой на GitHub Pages

```bash
npm run deploy
```

Или принудительно (если есть конфликты):

```bash
npx gh-pages -d dist -f
```

### 8️⃣ Активация GitHub Pages

1. Перейдите в настройки репозитория: `https://github.com/USERNAME/REPO/settings/pages`
2. В разделе **Source** выберите ветку `gh-pages`
3. Выберите папку `/ (root)`
4. Нажмите **Save**

Сайт будет доступен через 1-2 минуты по адресу:
```
https://USERNAME.github.io/REPO/
```

---

## 🔄 Обновление сайта

Когда вы внесли изменения в код:

```bash
# 1. Соберите проект
npm run build

# 2. Закоммитьте изменения
git add .
git commit -m "Описание изменений"
git push

# 3. Задеплойте на GitHub Pages
npm run deploy
```

---

## 🛠️ Полезные команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск локального сервера разработки |
| `npm run build` | Сборка проекта для продакшена |
| `npm run preview` | Предпросмотр собранного проекта |
| `npm run deploy` | Деплой на GitHub Pages |
| `npx gh-pages -d dist -f` | Принудительный деплой |

---

## 🔐 Создание GitHub Personal Access Token

1. Перейдите: https://github.com/settings/tokens
2. Нажмите **Generate new token** → **Generate new token (classic)**
3. Дайте название токену (например: "Deploy Token")
4. Выберите срок действия
5. Отметьте права: `repo` (полный доступ к репозиториям)
6. Нажмите **Generate token**
7. **ВАЖНО:** Скопируйте токен сразу! Он больше не будет показан

---

## ⚠️ Важные замечания

### Пути к файлам
Все пути к статическим файлам (изображения, SVG) должны включать base path:

```tsx
// ❌ Неправильно
<img src="/svg/logo.svg" />

// ✅ Правильно
<img src="/swensiteam/svg/logo.svg" />
```

### Структура проекта
```
project/
├── components/        # React компоненты
├── public/           # Статические файлы (копируются в dist)
│   └── svg/         # SVG иконки
├── lib/             # Утилиты
├── dist/            # Собранный проект (генерируется автоматически)
├── index.html       # HTML шаблон
├── index.tsx        # Точка входа React
├── App.tsx          # Главный компонент
├── vite.config.ts   # Конфигурация Vite
└── package.json     # Зависимости и скрипты
```

### .gitignore
Убедитесь, что `dist` и `node_modules` в `.gitignore`:
```
node_modules/
dist/
.env.local
```

---

## 🐛 Решение проблем

### Проблема: SVG не загружаются
**Решение:** Проверьте, что пути включают base path репозитория.

### Проблема: 404 ошибка на GitHub Pages
**Решение:** Убедитесь, что `base` в `vite.config.ts` совпадает с названием репозитория.

### Проблема: Конфликт при деплое
**Решение:** Используйте принудительный деплой:
```bash
npx gh-pages -d dist -f
```

### Проблема: Изменения не отображаются
**Решение:** 
1. Очистите кеш браузера (Ctrl+Shift+R)
2. Подождите 2-3 минуты для обновления GitHub Pages
3. Проверьте, что деплой прошел успешно

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в консоли браузера (F12)
2. Убедитесь, что все команды выполнены без ошибок
3. Проверьте настройки GitHub Pages в репозитории

---

**Последнее обновление:** 11 апреля 2026
