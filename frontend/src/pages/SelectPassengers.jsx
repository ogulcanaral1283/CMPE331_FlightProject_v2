import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SelectPassengers() {
  const navigate = useNavigate();
  const { flightNumber } = useParams();

  const [adults, setAdults] = useState(1);
  const [students, setStudents] = useState(0);
  const [children, setChildren] = useState(0);

  const totalPassengers = adults + students + children;

  const handleContinue = () => {
    if (totalPassengers < 1) {
      alert("En az 1 yolcu seçmelisiniz!");
      return;
    }

    navigate(`/flights/${flightNumber}/passenger-info`, {
      state: {
        adults,
        students,
        children
      }
    });
  };

  const passengerRow = (label, value, setter, icon) => (
    <div style={styles.row}>
      <span style={styles.label}>
        {icon} {label}
      </span>

      <div style={styles.counter}>
        <button style={styles.button} onClick={() => setter(Math.max(0, value - 1))}>-</button>
        <span style={styles.count}>{value}</span>
        <button style={styles.button} onClick={() => setter(value + 1)}>+</button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎟 Yolcu Sayısı Seç</h2>
        <p style={styles.subtitle}>Uçuş: <strong>{flightNumber}</strong></p>

        {passengerRow("Yetişkin", adults, setAdults, "👤")}
        {passengerRow("Öğrenci", students, setStudents, "🎓")}
        {passengerRow("Çocuk (12-)", children, setChildren, "🧒")}

        <div style={styles.total}>
          Toplam Yolcu: <strong>{totalPassengers}</strong>
        </div>

        <button
          style={styles.continue}
          onClick={handleContinue}
          disabled={totalPassengers < 1}
        >
          Devam Et ➜
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0d47a1, #1976d2, #42a5f5)",
  },
  card: {
    width: "400px",
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "5px",
    fontSize: "24px",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: "25px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f2f6ff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "17px",
  },
  counter: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  button: {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    background: "#0d47a1",
    color: "white",
    border: "none",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
  },
  count: {
    fontSize: "17px",
    fontWeight: "bold",
  },
  total: {
    marginTop: "15px",
    textAlign: "center",
    background: "#e3f2fd",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "18px",
  },
  continue: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    background: "#1e88e5",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
  }
};
