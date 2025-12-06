# IPTV Telegram Mini App - Инструкция по развертыванию

## 1. Сборка проекта

```bash
npm run build
```

Это создаст папку `dist` с готовыми файлами.

## 2. Развертывание на хосте

Вам нужен HTTPS хост для Telegram Mini App. Варианты:

### Вариант A: Vercel (рекомендуется для быстрого старта)
```bash
npm install -g vercel
vercel
```

### Вариант B: GitHub Pages (бесплатный HTTPS)
```bash
npm install --save-dev gh-pages
```

Добавьте в `package.json`:
```json
"homepage": "https://YOUR-USERNAME.github.io/iptv-app",
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

Затем:
```bash
npm run build
npm run deploy
```

### Вариант C: Собственный сервер
```bash
# Скопируйте содержимое dist на ваш сервер с HTTPS
scp -r dist/* user@your-server:/var/www/iptv-app/
```

## 3. Регистрация Mini App в Telegram Bot

1. Откройте [@BotFather](https://t.me/botfather) в Telegram
2. Выполните `/newapp`
3. Заполните информацию:
   - **Name**: IPTV Player
   - **Short name**: iptv_player
   - **Description**: IPTV Player with filters
   - **URL**: `https://your-domain.com/` (URL вашего хоста)

4. BotFather выдаст вам **bot token** и **app name**

## 4. Тестирование Mini App

Используя bot token от BotFather, отправьте команду боту:
```
/start
```

Откроется кнопка "IPTV Player" → нажмите для открытия приложения

## 5. Публикация Mini App

1. В [@BotFather](https://t.me/botfather) выполните `/myapps`
2. Выберите приложение и опубликуйте его

## 6. Файл конфигурации бота (example_bot.py)

Если вы хотите создать свой бот:

```python
from aiogram import Bot, Dispatcher, types
from aiogram.utils.executor import start_polling
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton

BOT_TOKEN = "YOUR_BOT_TOKEN"
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    web_app = WebAppInfo(url="https://your-domain.com/")
    button = InlineKeyboardButton(text="🎬 IPTV Player", web_app=web_app)
    keyboard = InlineKeyboardMarkup()
    keyboard.add(button)
    
    await message.answer("Добро пожаловать в IPTV Player!", reply_markup=keyboard)

if __name__ == '__main__':
    start_polling(dp)
```

## 7. Переменные окружения (опционально)

Создайте `.env` файл для конфигурации:
```
VITE_TELEGRAM_BOT_TOKEN=YOUR_TOKEN
VITE_API_URL=https://api.example.com
```

Используйте в коде:
```javascript
const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
```

## 8. Оптимизация для Telegram

- ✅ Поддержка темной темы (уже реализована)
- ✅ Адаптивный дизайн
- ✅ Haptic feedback для взаимодействия
- ✅ Safe area padding

## 9. Дополнительные возможности

Для полной интеграции можно добавить:
- Сохранение истории просмотров
- Синхронизация с базой пользователей
- In-app платежи (для премиум каналов)
- Отправка уведомлений

---

## Проверка работы локально

Для тестирования Mini App локально:
```bash
npm run dev
```

Откройте http://localhost:5173 (без Telegram SDK будет работать в обычном режиме)
