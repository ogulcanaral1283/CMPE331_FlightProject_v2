import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";


import { FLIGHT_API_URL, PASSENGER_API_URL, AIRCRAFT_API_URL } from "../apiConfig";

export default function AdminDashboard() {
  const username = localStorage.getItem("username") || "Admin";
  const [stats, setStats] = useState({
    total_flights: 0,
    total_passengers: 0,
    total_airlines: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flightsRes, passengersRes, airlinesRes] = await Promise.all([
          axios.get(`${FLIGHT_API_URL}/flights`),
          axios.get(`${PASSENGER_API_URL}/passengers`),
          axios.get(`${AIRCRAFT_API_URL}/airlines`)
        ]);

        setStats({
          total_flights: flightsRes.data.length,
          total_passengers: passengersRes.data.length,
          total_airlines: airlinesRes.data.length
        });
      } catch (err) {
        console.error("Stats yüklenemedi:", err);
      }
    };

    fetchData();
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
