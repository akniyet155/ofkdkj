📚 ШПАРГАЛКА - IPTV Telegram Mini App
════════════════════════════════════════

🔧 ТЕРМИНАЛЬНЫЕ КОМАНДЫ:

npm run dev              # Запустить сервер разработки
npm run build            # Собрать для продакшена
npm run preview          # Предпросмотр сборки
npm install              # Установить зависимости
npm update               # Обновить зависимости

════════════════════════════════════════

📝 ИЗМЕНЕНИЕ ДАННЫХ:

1️⃣ Добавить новый канал:
   Отредактируйте src/data/channels.json

2️⃣ Добавить новый язык:
   • Создайте src/data/i18n/[lang].json
   • Добавьте в App.jsx:
     import newLang from "./data/i18n/[lang].json";
     const translations = { en, ru, [lang]: newLang };
     const languages = ["en", "ru", "[lang]"];

3️⃣ Изменить стили:
   Отредактируйте src/index.css

════════════════════════════════════════

🎬 ИСПОЛЬЗОВАНИЕ ПЛЕЕРА:

<Player 
  url="https://example.com/stream.m3u8"
  t={t}  /* функция переводов */
/>

Поддерживаемые форматы:
  • HLS (.m3u8)
  • MP4 (через fallback)
  • MPEG-DASH (требует настройки)

════════════════════════════════════════

🌐 ИСПОЛЬЗОВАНИЕ TELEGRAM API:

import { useTelegram } from './hooks/useTelegram';
import { TelegramUtils } from './utils/telegramUtils';

const { tg, user, isMiniApp } = useTelegram();

// Показать уведомление
TelegramUtils.showAlert("Сообщение");

// Закрыть приложение
TelegramUtils.close();

// Вибрация
TelegramUtils.vibrate("light");     // light, medium, heavy

// Получить данные пользователя
const userData = TelegramUtils.getUserData();

// Отправить данные боту
TelegramUtils.sendData({ action: "play", channelId: "123" });

// Показать главную кнопку
TelegramUtils.showMainButton("Начать", () => {
  console.log("Нажата главная кнопка");
});

// Скрыть главную кнопку
TelegramUtils.hideMainButton();

// Показать подтверждение
TelegramUtils.showConfirm("Вы уверены?", (confirmed) => {
  if (confirmed) {
    // Пользователь согласился
  }
});

// Получить информацию о теме
const theme = TelegramUtils.getTheme();
// { isDarkMode: boolean, colorScheme: 'light'|'dark' }

// Установить цвета
TelegramUtils.setColors({
  headerColor: "#ffffff",
  backgroundColor: "#f5f5f5"
});

// Проверить, запущено ли в Telegram
if (TelegramUtils.isTelegram()) {
  // Код для Telegram Mini App
}

════════════════════════════════════════

💾 ЛОКАЛЬНОЕ ХРАНИЛИЩЕ:

// Сохранить данные
localStorage.setItem('favoriteChannels', JSON.stringify([1, 2, 3]));

// Получить данные
const favorites = JSON.parse(localStorage.getItem('favoriteChannels') || '[]');

// Удалить
localStorage.removeItem('favoriteChannels');

════════════════════════════════════════

📡 ПОЛУЧЕНИЕ ДАННЫХ С СЕРВЕРА:

const [channels, setChannels] = React.useState([]);

useEffect(() => {
  fetch('https://api.example.com/channels')
    .then(r => r.json())
    .then(data => setChannels(data))
    .catch(e => console.error(e));
}, []);

════════════════════════════════════════

🎯 ФИЛЬТРАЦИЯ ДАННЫХ:

// По стране
const filteredByCountry = channels.filter(ch => ch.country === "RU");

// По жанру
const filteredByGenre = channels.filter(ch => ch.genres.includes("News"));

// По названию
const filteredByName = channels.filter(ch => 
  ch.name.en.toLowerCase().includes("BBC")
);

// Комбинированная фильтрация
const filtered = channels.filter(c =>
  (country === "all" || c.country === country) &&
  (genre === "all" || c.genres.includes(genre)) &&
  (search === "" || c.name.en.includes(search))
);

════════════════════════════════════════

🔄 УПРАВЛЕНИЕ СОСТОЯНИЕМ:

// useState
const [lang, setLang] = React.useState("en");
setLang("ru");

// useMemo (для оптимизации)
const countries = React.useMemo(() => {
  return [...new Set(channels.map(c => c.country))];
}, [channels]);

// useEffect (для побочных эффектов)
useEffect(() => {
  // Код, который запустится при изменении зависимостей
  return () => {
    // Cleanup функция
  };
}, [dependencies]);

════════════════════════════════════════

🎨 ОСНОВНЫЕ КЛАССЫ CSS:

.telegram-dark          /* Dark mode класс */

Переменные (используйте в CSS):
  --bg-color           /* Цвет фона */
  --text-color         /* Цвет текста */

@supports (padding: max(0px)) {
  /* Safe area для notch */
}

════════════════════════════════════════

📱 МОБИЛЬНАЯ АДАПТИВНОСТЬ:

@media (max-width: 600px) {
  /* Мобильные стили */
}

// В коде
const isMobileApp = window.innerWidth < 600;

════════════════════════════════════════

🔐 ПРОВЕРКА TELEGRAM:

if (window.Telegram?.WebApp) {
  // Запущено в Telegram Mini App
  window.Telegram.WebApp.ready();
}

════════════════════════════════════════

⚙️ ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ:

// Создайте .env файл
VITE_API_URL=https://api.example.com
VITE_BOT_TOKEN=123:ABC

// Используйте в коде
const apiUrl = import.meta.env.VITE_API_URL;

════════════════════════════════════════

🐛 ОТЛАДКА:

// Консоль браузера (F12)
console.log("Message");
console.error("Error");
console.warn("Warning");
console.table(data);  // Таблица

// React DevTools (установите расширение)

// Telegram SDK
window.Telegram?.WebApp  // проверка доступности

════════════════════════════════════════

📦 ИМПОРТЫ:

// React
import { useState, useEffect, useMemo, useCallback } from 'react';

// Компоненты
import Player from './components/Player';

// Хуки
import { useTelegram } from './hooks/useTelegram';

// Утилиты
import { TelegramUtils } from './utils/telegramUtils';

// Данные
import channels from './data/channels.json';
import en from './data/i18n/en.json';

════════════════════════════════════════

🌍 МУЛЬТИЯЗЫЧНОСТЬ:

// Функция переводов
const t = (key) => translations[lang][key] || key;

// Использование
<h1>{t("appTitle")}</h1>

// Добавление новых ключей в JSON:
{
  "appTitle": "IPTV Player",
  "selectLanguage": "Select Language"
}

════════════════════════════════════════

💡 СОВЕТЫ ПО ОПТИМИЗАЦИИ:

1. Используйте useMemo для расчётов
2. Используйте useCallback для функций
3. Минимизируйте re-renders
4. Ленивая загрузка больших списков
5. Кэширование API ответов
6. Сжатие изображений логотипов

════════════════════════════════════════

🚀 ДЕПЛОЙ CHECKLIST:

□ npm run build (нет ошибок?)
□ Проверить console для ошибок
□ Тестировать на мобильном
□ Проверить HTTPS
□ Создать Bot в BotFather
□ Зарегистрировать Mini App
□ Загрузить на сервер
□ Протестировать в Telegram
□ Опубликовать Mini App

════════════════════════════════════════

📚 ПОЛЕЗНЫЕ ССЫЛКИ:

Telegram Mini App Docs:
https://core.telegram.org/bots/webapps

React Документация:
https://react.dev

Vite Документация:
https://vitejs.dev

HLS.js:
https://github.com/video-dev/hls.js

════════════════════════════════════════

❓ ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ:

Q: Как добавить собственный плеер?
A: Замените Player.jsx на свой компонент

Q: Как сохранить избранное?
A: Используйте localStorage или API сервера

Q: Как работает фильтрация?
A: useMemo фильтрует каналы по выбранным критериям

Q: Можно ли использовать без Telegram?
A: Да! Приложение работает как обычный сайт

Q: Как добавить авторизацию?
A: Используйте Telegram initData для верификации

════════════════════════════════════════

🎉 Вы готовы к разработке!
