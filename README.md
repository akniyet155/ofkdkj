# 🎬 IPTV Player - Telegram Mini App

Полнофункциональное IPTV приложение с поддержкой **Telegram Mini App**, фильтрацией каналов, мультиязычностью и адаптивным дизайном.

## ✨ Основные возможности

- 📱 **Telegram Mini App** - интегрировано с Telegram Web App SDK
- 🌍 **Фильтрация по странам** - выбор каналов по странам трансляции
- 🎭 **Фильтрация по жанрам** - News, Entertainment, General и т.д.
- 🌐 **Мультиязычность** - English и Русский языки
- 🎨 **Темная тема** - автоматическая подстройка под тему Telegram
- 📺 **HLS.js плеер** - поддержка m3u8 потоков
- 📲 **Мобильная оптимизация** - perfect для Telegram и мобильных устройств
- 🔔 **Vibration API** - тактильная обратная связь

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск в режиме разработки
```bash
npm run dev
```

Откройте http://localhost:5173

### 3. Сборка для продакшена
```bash
npm run build
```

Готовые файлы будут в папке `dist`

## 📂 Структура проекта

```
src/
├── components/          # React компоненты
│   ├── Player.jsx      # HLS видео плеер
│   ├── LanguageSelector.jsx
│   ├── CountryFilter.jsx
│   ├── GenreFilter.jsx
│   └── ChannelList.jsx
├── hooks/
│   └── useTelegram.js   # Hook для работы с Telegram API
├── utils/
│   └── telegramUtils.js # Утилиты Telegram
├── data/
│   ├── channels.json    # База каналов
│   └── i18n/            # Локализация (en.json, ru.json)
├── App.jsx              # Главный компонент
├── index.jsx            # Точка входа
└── index.css            # Стили
```

## 🔧 Технологический стек

- **React 19** - UI фреймворк
- **Vite 7** - Build tool
- **HLS.js 1.6** - Video player
- **Telegram Web App SDK** - Интеграция с Telegram
- **CSS3** - Адаптивные стили с поддержкой safe-area

## 📱 Развертывание как Telegram Mini App

Подробная инструкция в файле **[TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md)**

### Быстрая инструкция:

1. **Создайте бота в BotFather**
   - Откройте [@BotFather](https://t.me/botfather)
   - Выполните `/newapp`
   - Получите bot token и app name

2. **Разверните приложение на хост**
   ```bash
   npm run build
   # Загрузите содержимое dist на https сервер
   ```

3. **Тестируйте Mini App**
   - Откройте бота
   - Нажмите на кнопку IPTV Player

4. **Используйте утилиты Telegram**
   ```javascript
   import { TelegramUtils } from './utils/telegramUtils';
   
   // Закрыть приложение
   TelegramUtils.close();
   
   // Показать уведомление
   TelegramUtils.showAlert("Канал выбран!");
   
   // Вибрация
   TelegramUtils.vibrate("medium");
   ```

## 🎨 Использование хука useTelegram

```javascript
import { useTelegram } from './hooks/useTelegram';

function MyComponent() {
  const { tg, user, isMiniApp } = useTelegram();
  
  if (isMiniApp && user) {
    console.log(`Привет, ${user.first_name}!`);
  }
  
  return <div>Мое приложение</div>;
}
```

## 📊 Данные каналов

Каналы хранятся в `src/data/channels.json`:

```json
{
  "id": "1",
  "name": { "en": "First Channel", "ru": "Первый канал" },
  "country": "RU",
  "genres": ["News", "General"],
  "url": "http://example.com/stream1.m3u8",
  "logo": "/logos/ru1.png"
}
```

Можно добавлять новые каналы в JSON, и они автоматически появятся в фильтрах!

## 🌐 Локализация

Добавьте новый язык:

1. Создайте файл в `src/data/i18n/[lang].json`
2. Добавьте язык в `App.jsx`:
   ```javascript
   import newLang from "./data/i18n/[lang].json";
   const translations = { en, ru, [lang]: newLang };
   const languages = ["en", "ru", "[lang]"];
   ```

## 🎯 Пример бота на Python

Простой пример бота находится в `bot_example.py`:

```bash
pip install python-telegram-bot
python bot_example.py
```

## 🛠️ Доступные скрипты

```bash
npm run dev      # Разработка с hot reload
npm run build    # Сборка для продакшена
npm run preview  # Предпросмотр собранного приложения
npm run deploy   # Деплой на GitHub Pages (если настроено)
```

## 📝 Переменные окружения

Создайте `.env` для конфигурации:

```env
VITE_TELEGRAM_BOT_TOKEN=YOUR_TOKEN
VITE_API_URL=https://api.example.com
VITE_APP_NAME=iptv_player
```

Используйте в коде:
```javascript
const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
```

## 🔌 Расширение функционала

### Добавить новый жанр/страну

1. Добавьте каналы в `channels.json`
2. Фильтры автоматически обновятся!

### Добавить свой компонент

```javascript
// src/components/MyComponent.jsx
export default function MyComponent({ t, lang }) {
  return <div>{t("key")}</div>;
}
```

### Интегрировать с API

```javascript
useEffect(() => {
  fetch(import.meta.env.VITE_API_URL + '/channels')
    .then(r => r.json())
    .then(data => setChannels(data));
}, []);
```

## 🐛 Отладка

### Проверка Telegram SDK локально

```javascript
// В браузере F12 > Console
window.Telegram?.WebApp // undefined, если не в Telegram
```

### Логирование пользователя

```javascript
const { user } = useTelegram();
console.log("User:", user);
```

## 📦 Размер сборки

- **HTML**: ~1.5 KB
- **CSS**: ~3 KB
- **JS**: ~200 KB (с React и зависимостями)
- **Total gzipped**: ~80 KB

## 🔒 Безопасность

- ✅ Используйте HTTPS для Mini App
- ✅ Валидируйте данные с сервера
- ✅ Не храните sensitive данные локально
- ✅ Используйте CORS правильно

## 📄 Лицензия

MIT

## 🤝 Поддержка

Если возникли вопросы:
1. Проверьте документацию Telegram: https://core.telegram.org/bots/webapps
2. Посмотрите примеры в этом репозитории
3. Запустите в режиме разработки и проверьте консоль браузера

---

**Приложение готово к использованию! 🚀**

Добавляйте каналы, настраивайте стили и запускайте свой IPTV Mini App в Telegram!
