📁 IPTV Telegram Mini App - Структура проекта
═══════════════════════════════════════════════

iptv/
│
├── 📄 index.html                 # Главная HTML страница
├── 📄 package.json               # Зависимости и скрипты
├── 📄 vite.config.js             # Конфиг Vite
├── 📄 README.md                  # Основная документация
├── 📄 TELEGRAM_SETUP.md          # Инструкция по развертыванию Mini App
├── 📄 EXAMPLES.md                # Примеры использования Telegram API
├── 📄 bot_example.py             # Пример Telegram бота (Python)
├── 📄 .env.example               # Пример переменных окружения
│
├── 📁 src/
│   ├── index.jsx                 # Точка входа приложения
│   ├── App.jsx                   # Главный компонент
│   ├── index.css                 # Глобальные стили
│   │
│   ├── 📁 components/            # React компоненты
│   │   ├── Player.jsx            # HLS видео плеер
│   │   ├── LanguageSelector.jsx  # Переключатель языка
│   │   ├── CountryFilter.jsx     # Фильтр по странам
│   │   ├── GenreFilter.jsx       # Фильтр по жанрам
│   │   └── ChannelList.jsx       # Список каналов
│   │
│   ├── 📁 hooks/
│   │   └── useTelegram.js        # Hook для работы с Telegram WebApp
│   │
│   ├── 📁 utils/
│   │   └── telegramUtils.js      # Вспомогательные функции Telegram
│   │
│   └── 📁 data/
│       ├── channels.json         # База данных каналов
│       └── 📁 i18n/              # Локализация
│           ├── en.json           # Английский язык
│           └── ru.json           # Русский язык
│
├── 📁 public/
│   └── 📁 logos/                 # Логотипы каналов (необязательно)
│
└── 📁 node_modules/              # Зависимости (автоматически)


═══════════════════════════════════════════════════════════════════

🎯 КЛЮЧЕВЫЕ ФАЙЛЫ:

1. App.jsx
   • Главная логика приложения
   • Управление состоянием (язык, страна, жанр)
   • Интеграция с Telegram Mini App

2. src/hooks/useTelegram.js
   • Инициализация Telegram WebApp SDK
   • Получение данных пользователя
   • Управление темой приложения

3. src/utils/telegramUtils.js
   • Вспомогательные функции для работы с Telegram
   • Модальные окна, вибрация, отправка данных

4. src/data/channels.json
   • Источник данных о каналах
   • Структура: id, name (мультиязычный), country, genres, url, logo

5. src/data/i18n/
   • Переводы интерфейса
   • Легко добавлять новые языки

═══════════════════════════════════════════════════════════════════

🚀 БЫСТРЫЙ СТАРТ:

# Установка
npm install

# Разработка (hot reload)
npm run dev

# Сборка для продакшена
npm run build

# Превью собранного приложения
npm run preview

═══════════════════════════════════════════════════════════════════

📦 ЗАВИСИМОСТИ:

Основные:
  • react@^19.2.1           - UI фреймворк
  • react-dom@^19.2.1       - ReactDOM
  • vite@^7.2.6             - Build tool и dev сервер
  • @vitejs/plugin-react    - Поддержка JSX в Vite
  • hls.js@^1.6.15          - HLS видео плеер

Telegram WebApp SDK:
  • Подключается через CDN в index.html
  • Не требует npm установки

═══════════════════════════════════════════════════════════════════

🔗 API ENDPOINTS (примеры):

POST /api/channels              - Получить список каналов
POST /api/history               - Сохранить просмотр
POST /api/favorites             - Управлять избранным
POST /api/user/preferences      - Сохранить предпочтения

═══════════════════════════════════════════════════════════════════

🎨 ОСОБЕННОСТИ ДИЗАЙНА:

✅ Mobile-first подход
✅ Адаптивный макет (Flexbox)
✅ Поддержка safe-area (для notch)
✅ Dark mode по умолчанию в Telegram
✅ Smooth transitions и animations
✅ Оптимизация для производительности

═══════════════════════════════════════════════════════════════════

📱 TELEGRAM MINI APP:

Требования:
  • HTTPS хост (обязательно)
  • Telegram Bot Token
  • Registered Mini App в BotFather

Поддерживаемые функции:
  ✅ User data (имя, ID, username)
  ✅ Dark mode detection
  ✅ Vibration feedback
  ✅ Main button
  ✅ Back button
  ✅ Send data to bot
  ✅ Custom colors

═══════════════════════════════════════════════════════════════════

🔐 БЕЗОПАСНОСТЬ:

• HTTPS для Mini App
• Validate data from server
• No sensitive data in localStorage
• CORS headers правильно настроены
• XSS protection через React

═══════════════════════════════════════════════════════════════════

📊 РАЗМЕР СБОРКИ:

HTML:     ~1.5 KB
CSS:      ~3 KB
JS:       ~200 KB
Total (gzip): ~80 KB

═══════════════════════════════════════════════════════════════════

✅ ГОТОВО К ИСПОЛЬЗОВАНИЮ!

Начните разработку:
  npm run dev

Развертесь на Telegram:
  1. Прочитайте TELEGRAM_SETUP.md
  2. Запустите npm run build
  3. Загрузите dist на сервер
  4. Создайте bot в BotFather
  5. Готово! 🎉

═══════════════════════════════════════════════════════════════════
