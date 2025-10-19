import React, { useEffect, useState } from "react";
import TelegramLoginButton from "./TelegramLoginButton";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.error("Telegram WebApp SDK не найден");
      return;
    }

    tg.ready(); // сообщаем Telegram, что приложение готово

    // Данные пользователя доступны в initDataUnsafe
    const userData = tg.initDataUnsafe?.user;

    if (userData) {
      console.log("Авторизованный пользователь:", userData);
      localStorage.setItem("telegramUser", JSON.stringify(userData));
      setUser(userData);
    } else {
      console.warn(
        "Нет данных о пользователе (запусти приложение внутри Telegram)"
      );
    }
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "100px",
      }}
    >
      <div>
        <h2>Вариант 1: Авторизация через Telegram Web App.</h2>
        {user ? (
          <div>
            <p>
              Привет, {user.first_name} {user.last_name || ""} 👋
            </p>
            <p>@{user.username}</p>
            <p>ID: {user.id}</p>
          </div>
        ) : (
          <p>Открой приложение внутри Telegram, чтобы увидеть свои данные.</p>
        )}
      </div>
      <div>
        <h2>Вариант 2: Авторизация через кастомную кнопку.</h2>
        <TelegramLoginButton />
      </div>
    </div>
  );
}

export default App;
