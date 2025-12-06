import { useState, useMemo, useEffect } from "react";
import channelsData from "./data/channels.json";
import en from "./data/i18n/en.json";
import ru from "./data/i18n/ru.json";
import { useTelegram } from "./hooks/useTelegram";
import LanguageSelector from "./components/LanguageSelector";
import CountryFilter from "./components/CountryFilter";
import GenreFilter from "./components/GenreFilter";
import SearchBar from "./components/SearchBar";
import FavoriteButton from "./components/FavoriteButton";
import ChannelList from "./components/ChannelList";
import Player from "./components/Player";

const languages = ["en", "ru"];
const translations = { en, ru };

export default function App() {
  const { tg, user, isMiniApp } = useTelegram();
  const [lang, setLang] = useState("en");
  const [country, setCountry] = useState("all");
  const [genre, setGenre] = useState("all");
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [autoOffTimer, setAutoOffTimer] = useState(null);

  const t = (key) => translations[lang][key] || key;

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.classList.toggle("telegram-dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (tg) {
      setIsDarkMode(tg.isDarkMode);
    }
  }, [tg]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (autoOffTimer) {
      const timer = setTimeout(() => {
        setCurrent(null);
        setAutoOffTimer(null);
      }, autoOffTimer * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [autoOffTimer, current]);

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
        (genre === "all" || c.genres.includes(genre)) &&
        (search === "" || c.name.en.toLowerCase().includes(search.toLowerCase()) || 
         c.name.ru.toLowerCase().includes(search.toLowerCase()))
    ),
    [country, genre, search]
  );

  const handleChannelSelect = (ch) => {
    setCurrent(ch);
    if (tg && isMiniApp) {
      tg.HapticFeedback?.impactOccurred?.("light");
    }
  };

  const toggleFavorite = (channelId) => {
    setFavorites(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  return (
    <div style={{
      padding: isMiniApp ? "16px" : "24px",
      maxWidth: isMiniApp ? "100%" : "1200px",
      margin: "auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: isDarkMode ? "#0f0f1e" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
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
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          gap: "12px",
          flexWrap: "wrap"
        }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <LanguageSelector current={lang} onChange={setLang} languages={languages} />
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: isDarkMode ? "rgba(102, 126, 234, 0.8)" : "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.background = isDarkMode ? "rgba(102, 126, 234, 1)" : "rgba(255, 255, 255, 0.3)"}
            onMouseLeave={(e) => e.target.style.background = isDarkMode ? "rgba(102, 126, 234, 0.8)" : "rgba(255, 255, 255, 0.2)"}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="filters-container">
          <CountryFilter countries={countries} current={country} onChange={setCountry} t={t} />
          <GenreFilter genres={genres} current={genre} onChange={setGenre} t={t} />
          <select
            value={autoOffTimer || ""}
            onChange={(e) => setAutoOffTimer(e.target.value ? parseInt(e.target.value) : null)}
            style={{
              padding: "10px 12px",
              borderRadius: "12px",
              border: "2px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              outline: "none",
              backdropFilter: "blur(10px)"
            }}
          >
            <option value="">⏱️ Timer</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="60">60 min</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <SearchBar value={search} onChange={setSearch} t={t} />
        
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
                {filtered.length} {t("totalChannels")} {favorites.length > 0 && `⭐ ${favorites.length} избранных`}
              </div>
            )}
            <ChannelList 
              channels={filtered} 
              onSelect={handleChannelSelect} 
              t={t} 
              lang={lang}
              renderExtra={(channel) => (
                <FavoriteButton 
                  channel={channel} 
                  isFavorite={favorites.includes(channel.id)} 
                  onToggle={toggleFavorite}
                />
              )}
            />
          </div>
          <div style={{
            flex: isMiniApp ? "none" : 2,
            minHeight: isMiniApp ? "300px" : "auto"
          }}>
            {current ? (
              <div>
                <Player url={current.url} t={t} />
                <div style={{
                  marginTop: '16px',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: '12px'
                }}>
                  {autoOffTimer && `⏱️ Автоотключение через ${autoOffTimer} мин`}
                </div>
              </div>
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
