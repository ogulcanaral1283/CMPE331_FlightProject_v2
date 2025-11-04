import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "20px 40px",
    fontSize: "20px",
    margin: "20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "linear-gradient(135deg, #1E90FF 0%, #87CEFA 100%)",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
        🛫 Airline Management System
      </h1>
      <p style={{ fontSize: "22px", marginBottom: "40px" }}>
        Hoş geldiniz! Lütfen bir seçenek seçin 👇
      </p>

      <div>
        <button
          style={{ ...buttonStyle, backgroundColor: "#2ECC71" }}
          onClick={() => navigate("/flights")}
        >
          ✈️ Uçuş Ara
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "#E74C3C" }}
          onClick={() => navigate("/login")}
        >
          🧑‍✈️ Admin Girişi
        </button>
      </div>
    </div>
  );
}