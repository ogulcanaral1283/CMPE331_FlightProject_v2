import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;


export default function AdminDashboard() {
  const username = localStorage.getItem("username") || "Admin";
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get(`${API_URL}/stats`)
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);
  

  return (
    <div style={styles.container}>
      <AdminSidebar />

      <div style={styles.content}>
        <h1>Merhaba, {username} 👋</h1>

        <div style={styles.cards}>
          <div style={styles.card}>✈️ Toplam Uçuş: {stats.total_flights || 0}</div>
          <div style={styles.card}>🧑‍✈️ Toplam Yolcu: {stats.total_passengers || 0}</div>
          <div style={styles.card}>🏢 Havayolu Şirketleri: {stats.total_airlines || 0}</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex" },
  content: { flex: 1, padding: "20px" },
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    background: "#eee",
    padding: "20px",
    borderRadius: "10px",
    fontSize: "20px",
    flex: "1"
  }
};
