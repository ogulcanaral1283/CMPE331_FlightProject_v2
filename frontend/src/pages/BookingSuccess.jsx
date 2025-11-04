import { useLocation, useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const flightNumber = state?.flightNumber;
  const seats = state?.seats || [];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🎉 Rezervasyon Başarılı!</h2>
        <p><strong>{flightNumber}</strong> uçuşuna biletleriniz oluşturuldu ✅</p>

        <h4>🪑 Koltuk Seçimleri:</h4>
        <ul>
          {seats.map((s, i) => (
            <li key={i}>{i + 1}. Yolcu → <strong>{s}</strong></li>
          ))}
        </ul>

        <button style={styles.btn} onClick={() => navigate("/")}>
          🏠️ Ana Sayfa
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #0077ff, #00c6ff)"
  },
  card: {
    textAlign: "center",
    background: "#fff",
    padding: "25px",
    width: "400px",
    borderRadius: "16px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.2)"
  },
  btn: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  }
};
