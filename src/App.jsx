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
      padding: isMiniApp ? "12px" : "20px",
      maxWidth: isMiniApp ? "100%" : "700px",
      margin: "auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      {user && isMiniApp && (
        <div style={{
          fontSize: "12px",
          marginBottom: "12px",
          opacity: 0.7
        }}>
          {t("appTitle")} • {user.first_name}
        </div>
      )}
      <h1>{t("appTitle")}</h1>
      <div style={{
        display: 'flex',
        gap: isMiniApp ? "6px" : "8px",
        marginBottom: "16px",
        flexWrap: "wrap"
      }}>
        <LanguageSelector current={lang} onChange={setLang} languages={languages} />
        <CountryFilter countries={countries} current={country} onChange={setCountry} t={t} />
        <GenreFilter genres={genres} current={genre} onChange={setGenre} t={t} />
      </div>
      <div style={{
        display: isMiniApp ? 'flex' : 'flex',
        flexDirection: isMiniApp ? 'column' : 'row',
        gap: isMiniApp ? "12px" : "16px",
        flex: 1
      }}>
        <div style={{
          flex: isMiniApp ? "none" : 2,
          minHeight: isMiniApp ? "200px" : "auto",
          overflowY: "auto",
          maxHeight: isMiniApp ? "40vh" : "auto"
        }}>
          <ChannelList channels={filtered} onSelect={handleChannelSelect} t={t} lang={lang} />
        </div>
        <div style={{
          flex: isMiniApp ? "none" : 3,
          minHeight: isMiniApp ? "300px" : "auto"
        }}>
          {current && <Player url={current.url} t={t} />}
        </div>
      </div>
    </div>
  );
}
