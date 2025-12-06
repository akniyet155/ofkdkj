"""
Пример простого Telegram бота для запуска Mini App
Установите: pip install python-telegram-bot
"""

from telegram import Bot, InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, ContextTypes
import logging

# Включаем логирование
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# ЗАМЕНИТЕ НА ВАШИ ЗНАЧЕНИЯ
BOT_TOKEN = "YOUR_BOT_TOKEN_FROM_BOTFATHER"
APP_URL = "https://your-domain.com"  # ЗАМЕНИТЕ НА ВАШИХ ДОМ МЕНА
APP_SHORT_NAME = "iptv_player"  # Получите от BotFather

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Отправляет сообщение с кнопкой для открытия Mini App"""
    user = update.message.from_user
    
    # Создаем кнопку для открытия Mini App
    web_app = InlineKeyboardButton(
        text="🎬 Открыть IPTV Плеер",
        web_app={"url": APP_URL}
    )
    keyboard = InlineKeyboardMarkup([[web_app]])
    
    await update.message.reply_html(
        rf"Привет, {user.mention_html()}! 👋" + "\n\n"
        "Нажмите кнопку ниже для открытия IPTV плеера:",
        reply_markup=keyboard
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Отправляет справку"""
    help_text = """
    <b>IPTV Player Mini App</b>

    Команды:
    /start - Открыть плеер
    /help - Эта справка

    Возможности:
    ✅ Фильтрация каналов по странам
    ✅ Фильтрация по жанрам
    ✅ Мультиязычный интерфейс
    ✅ Темная тема Telegram
    """
    await update.message.reply_html(help_text)

def main() -> None:
    """Запускает бота"""
    # Создаем Application
    application = Application.builder().token(BOT_TOKEN).build()

    # Регистрируем handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))

    # Запускаем бота
    print("✅ Бот запущен. Нажмите Ctrl+C для остановки.")
    application.run_polling()

if __name__ == '__main__':
    main()
