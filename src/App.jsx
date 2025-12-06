import { useState, useMemo, useEffect } from "react";
import channelsData from "./data/channels.json";
import en from "./data/i18n/en.json";
import ru from "./data/i18n/ru.json";
import { useTelegram } from "./hooks/useTelegram";
import LanguageSelector from "./components/LanguageSelector";
import CountryFilter from "./components/CountryFilter";
import GenreFilter from "./components/GenreFilter";
import ChannelList from "./components/ChannelList";
import Player from "./components/Player";

const languages = ["en", "ru"];
const translations = { en, ru };

export default function App() {
  const { tg, user, isMiniApp } = useTelegram();
  const [lang, setLang] = useState("en");
  const [country, setCountry] = useState("all");
  const [genre, setGenre] = useState("all");
  const [current, setCurrent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const t = (key) => translations[lang][key] || key;

  useEffect(() => {
    if (tg) {
      setIsDarkMode(tg.isDarkMode);
      document.body.classList.toggle("telegram-dark", tg.isDarkMode);
    }
  }, [tg]);

  const countries = useMemo(
    () => [...new Set(channelsData.map(c => c.country))], []
  );
  const genres = useMemo(
    () => [...new Set(channelsData.flatMap(c => c.genres))], []
  );

  const filtered = useMemo(
    () => channelsData.filter(
      c =>
        (country === "all" || c.country === country) &&
        (genre === "all" || c.genres.includes(genre))
    ),
    [country, genre]
  );

  const handleChannelSelect = (ch) => {
    setCurrent(ch);
    if (tg && isMiniApp) {
      tg.HapticFeedback?.impactOccurred?.("light");
    }
  };

  return (
    <div style={{
      padding: isMiniApp ? "16px" : "24px",
      maxWidth: isMiniApp ? "100%" : "1200px",
      margin: "auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px"
      }}>
        <img 
          src="https://raw.githubusercontent.com/akniyet155/logo/main/logo1.jpg"
          alt="IPTV Logo"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)"
          }}
        />
        <h1 style={{ margin: 0 }}>{t("appTitle")}</h1>
      </div>
      {user && isMiniApp && (
        <div style={{
          fontSize: "13px",
          marginBottom: "16px",
          opacity: 0.9,
          color: "#ffffff",
          fontWeight: "500",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "8px 16px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)"
        }}>
          👋 {user.first_name}
        </div>
      )}
      
      <div className="app-container">
        <div className="filters-container">
          <LanguageSelector current={lang} onChange={setLang} languages={languages} />
          <CountryFilter countries={countries} current={country} onChange={setCountry} t={t} />
          <GenreFilter genres={genres} current={genre} onChange={setGenre} t={t} />
        </div>
        
        <div style={{
          display: isMiniApp ? 'flex' : 'flex',
          flexDirection: isMiniApp ? 'column' : 'row',
          gap: "24px",
          flex: 1
        }}>
          <div className="channel-list-container" style={{
            flex: isMiniApp ? "none" : 1,
            minHeight: isMiniApp ? "200px" : "auto"
          }}>
            {filtered.length > 0 && (
              <div style={{
                textAlign: 'center',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                {filtered.length} {t("totalChannels")}
              </div>
            )}
            <ChannelList channels={filtered} onSelect={handleChannelSelect} t={t} lang={lang} />
          </div>
          <div style={{
            flex: isMiniApp ? "none" : 2,
            minHeight: isMiniApp ? "300px" : "auto"
          }}>
            {current ? (
              <Player url={current.url} t={t} />
            ) : (
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                padding: '48px 24px',
                textAlign: 'center',
                border: '2px dashed var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                📺 {t("selectChannelHint") || "Выберите канал для просмотра"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
