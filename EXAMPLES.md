/**
 * Примеры использования Telegram Web App API в IPTV приложении
 */

// ==================== ИМПОРТЫ ====================

import { useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import { TelegramUtils } from '../utils/telegramUtils';

// ==================== ПРИМЕР 1: Отправка выбранного канала ====================

export function ExampleSendChannel() {
  const { tg } = useTelegram();

  const handleSelectChannel = (channel) => {
    // Отправляем данные о выборе канала обратно в бот
    TelegramUtils.sendData({
      action: "channel_selected",
      channelId: channel.id,
      channelName: channel.name.en,
      timestamp: new Date().toISOString()
    });
    
    TelegramUtils.vibrate("light");
    TelegramUtils.showAlert(`Выбран канал: ${channel.name.en}`);
  };

  return (
    <button onClick={() => handleSelectChannel({ id: '1', name: { en: 'Test Channel' } })}>
      Выбрать канал
    </button>
  );
}

// ==================== ПРИМЕР 2: Главная кнопка Telegram ====================

export function ExampleMainButton() {
  const { tg } = useTelegram();

  useEffect(() => {
    // Показываем главную кнопку "Начать просмотр"
    TelegramUtils.showMainButton("▶️ Начать просмотр", () => {
      console.log("Пользователь нажал главную кнопку");
      // Отправляем данные на сервер
      TelegramUtils.sendData({ action: "start_watching" });
    });

    return () => {
      TelegramUtils.hideMainButton();
    };
  }, [tg]);

  return <div>Главная кнопка активна</div>;
}

// ==================== ПРИМЕР 3: Подтверждение действия ====================

export function ExampleConfirm() {
  const handleDeleteFavorite = (channelId) => {
    TelegramUtils.showConfirm(
      "Удалить канал из избранного?",
      (confirmed) => {
        if (confirmed) {
          console.log("Канал удален");
          TelegramUtils.vibrate("medium");
        } else {
          console.log("Отменено");
        }
      }
    );
  };

  return (
    <button onClick={() => handleDeleteFavorite("123")}>
      Удалить из избранного
    </button>
  );
}

// ==================== ПРИМЕР 4: Обнаружение темы Telegram ====================

export function ExampleThemeDetection() {
  const { tg } = useTelegram();
  const theme = TelegramUtils.getTheme();

  useEffect(() => {
    const style = document.documentElement.style;
    
    if (theme.isDarkMode) {
      style.setProperty('--bg-color', '#0f0f0f');
      style.setProperty('--text-color', '#ffffff');
    } else {
      style.setProperty('--bg-color', '#ffffff');
      style.setProperty('--text-color', '#000000');
    }
  }, [theme]);

  return (
    <div>
      {theme.isDarkMode ? "🌙 Темная тема" : "☀️ Светлая тема"}
    </div>
  );
}

// ==================== ПРИМЕР 5: Работа с данными пользователя ====================

export function ExampleUserData() {
  const { user } = useTelegram();

  if (!user) {
    return <div>Данные пользователя недоступны</div>;
  }

  return (
    <div>
      <p>Пользователь: {user.first_name} {user.last_name || ""}</p>
      <p>ID: {user.id}</p>
      <p>Username: @{user.username || "N/A"}</p>
      <p>Язык: {user.language_code}</p>
      <p>Is Bot: {user.is_bot ? "Да" : "Нет"}</p>
    </div>
  );
}

// ==================== ПРИМЕР 6: Сохранение истории просмотров ====================

export function ExampleSaveWatchHistory() {
  const { user } = useTelegram();

  const saveWatchHistory = async (channelId, duration) => {
    const history = {
      userId: user?.id,
      channelId,
      duration,
      timestamp: new Date().toISOString(),
      userName: user?.username
    };

    try {
      // Отправляем на ваш сервер
      const response = await fetch(import.meta.env.VITE_API_URL + '/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(history)
      });
      
      if (response.ok) {
        console.log("История сохранена");
      }
    } catch (error) {
      console.error("Ошибка при сохранении истории:", error);
    }
  };

  return (
    <button onClick={() => saveWatchHistory("123", 3600)}>
      Сохранить просмотр
    </button>
  );
}

// ==================== ПРИМЕР 7: Полная интеграция в компонент ====================

export function AdvancedPlayerExample() {
  const { tg, user, isMiniApp } = useTelegram();
  const [watchTime, setWatchTime] = React.useState(0);

  useEffect(() => {
    if (isMiniApp) {
      // Показываем главную кнопку при загрузке
      TelegramUtils.showMainButton(
        `⏱️ Просмотрено: ${Math.round(watchTime / 60)}м`,
        () => {
          // Сохраняем статистику
          TelegramUtils.sendData({
            action: "session_end",
            watchTime,
            userId: user?.id
          });
        }
      );
    }
  }, [watchTime, isMiniApp, user?.id]);

  const handlePlay = () => {
    TelegramUtils.vibrate("light");
    if (isMiniApp) {
      TelegramUtils.showAlert("Начинаем просмотр!");
    }
  };

  const handleError = () => {
    TelegramUtils.vibrate("heavy");
    TelegramUtils.showAlert("❌ Ошибка воспроизведения");
  };

  return (
    <div>
      <video
        onPlay={handlePlay}
        onError={handleError}
        onTimeUpdate={(e) => setWatchTime(e.target.currentTime)}
        controls
      />
    </div>
  );
}

// ==================== ПРИМЕР 8: Кастомные цвета интерфейса ====================

export function ExampleCustomColors() {
  const { tg } = useTelegram();

  useEffect(() => {
    if (tg) {
      // Устанавливаем пользовательские цвета
      TelegramUtils.setColors({
        headerColor: tg.isDarkMode ? "#1f1f1f" : "#ffffff",
        backgroundColor: tg.isDarkMode ? "#0f0f0f" : "#f5f5f5"
      });
    }
  }, [tg]);

  return <div>Цвета установлены</div>;
}

// ==================== ПРИМЕР 9: Отслеживание ориентации экрана ====================

export function ExampleOrientationDetection() {
  const [orientation, setOrientation] = React.useState(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {orientation === 'landscape' ? '📱 Альбомная' : '📱 Портретная'}
    </div>
  );
}

// ==================== ПРИМЕР 10: Автозакрытие приложения ====================

export function ExampleAutoClose() {
  const handleBackButton = () => {
    TelegramUtils.showConfirm("Закрыть приложение?", (confirmed) => {
      if (confirmed) {
        TelegramUtils.close();
      }
    });
  };

  useEffect(() => {
    // Обработка кнопки "Назад" в Telegram
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.onEvent('backButtonClicked', handleBackButton);
      window.Telegram.WebApp.BackButton?.show();

      return () => {
        window.Telegram.WebApp.offEvent('backButtonClicked', handleBackButton);
        window.Telegram.WebApp.BackButton?.hide();
      };
    }
  }, []);

  return <div>Нажмите кнопку "Назад" в Telegram</div>;
}

export default {
  ExampleSendChannel,
  ExampleMainButton,
  ExampleConfirm,
  ExampleThemeDetection,
  ExampleUserData,
  ExampleSaveWatchHistory,
  AdvancedPlayerExample,
  ExampleCustomColors,
  ExampleOrientationDetection,
  ExampleAutoClose
};
