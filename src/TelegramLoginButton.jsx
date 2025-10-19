import React from "react";

const TelegramLoginButton = () => {
  const handleTelegramAuth = () => {
    if (!window.Telegram?.Login) {
      console.error("Telegram Login не загружен");
      return;
    }

    window.Telegram.Login.auth(
      { bot_id: 7552545308, request_access: true },
      (user) => {
        if (!user) {
          alert("Авторизация не удалась");
          return;
        }
        console.log("Данные пользователя:", user);
        localStorage.setItem("telegramUser", JSON.stringify(user));
        alert("Успешная авторизация: " + user.first_name);
      }
    );
  };

  return (
    <button
      onClick={handleTelegramAuth}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        width: "361px",
        height: "36px",
        background: "#3F6BE8",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Авторизоваться через Telegram
    </button>
  );
};

export default TelegramLoginButton;
