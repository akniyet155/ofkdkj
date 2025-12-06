import { useEffect, useState } from "react";

export const useTelegram = () => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [isMiniApp, setIsMiniApp] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      setTg(webApp);
      setUser(webApp.initDataUnsafe?.user || null);
      setIsMiniApp(true);

      // Устанавливаем цвета темы
      webApp.setHeaderColor(webApp.isDarkMode ? "#1e1e1e" : "#ffffff");
      webApp.setBackgroundColor(webApp.isDarkMode ? "#0f0f0f" : "#f5f5f5");
    }
  }, []);

  return { tg, user, isMiniApp };
};
