/**
 * Утилиты для работы с Telegram Web App
 */

export const TelegramUtils = {
  /**
   * Отправляет данные обратно в Telegram бот
   */
  sendData: (data) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(data));
    }
  },

  /**
   * Закрывает Mini App
   */
  close: () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  },

  /**
   * Показывает главную кнопку
   */
  showMainButton: (text, callback) => {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.MainButton.text = text;
      webApp.MainButton.show();
      webApp.onEvent("mainButtonClicked", callback);
    }
  },

  /**
   * Скрывает главную кнопку
   */
  hideMainButton: () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.MainButton.hide();
    }
  },

  /**
   * Показывает всплывающее уведомление
   */
  showAlert: (message) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message);
    } else {
      alert(message);
    }
  },

  /**
   * Показывает подтверждение
   */
  showConfirm: (message, callback) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showConfirm(message, callback);
    } else {
      callback(confirm(message));
    }
  },

  /**
   * Вибрация обратной связи (haptic feedback)
   */
  vibrate: (type = "light") => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      if (type === "light") {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
      } else if (type === "medium") {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
      } else if (type === "heavy") {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
      }
    }
  },

  /**
   * Получает данные пользователя
   */
  getUserData: () => {
    if (window.Telegram?.WebApp?.initDataUnsafe) {
      return window.Telegram.WebApp.initDataUnsafe.user;
    }
    return null;
  },

  /**
   * Проверяет, запущено ли в Telegram
   */
  isTelegram: () => {
    return !!window.Telegram?.WebApp;
  },

  /**
   * Получает текущую тему
   */
  getTheme: () => {
    if (window.Telegram?.WebApp) {
      return {
        isDarkMode: window.Telegram.WebApp.isDarkMode,
        colorScheme: window.Telegram.WebApp.colorScheme,
      };
    }
    return { isDarkMode: false, colorScheme: "light" };
  },

  /**
   * Устанавливает цвета интерфейса
   */
  setColors: (colors) => {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      if (colors.headerColor) webApp.setHeaderColor(colors.headerColor);
      if (colors.backgroundColor) webApp.setBackgroundColor(colors.backgroundColor);
    }
  },
};

export default TelegramUtils;
