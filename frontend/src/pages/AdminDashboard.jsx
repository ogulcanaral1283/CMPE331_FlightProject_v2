import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  const username = localStorage.getItem("username") || "Admin";

  return (
    <div style={styles.container}>
      <AdminSidebar />

      <div style={styles.content}>
        <h1>Merhaba, {username} 👋</h1>

        <div style={styles.cards}>
          <div style={styles.card}>✈️ Toplam Uçuş: 54</div>
          <div style={styles.card}>🧑‍✈️ Toplam Yolcu: 210</div>
          <div style={styles.card}>🏢 Havayolu Şirketleri: 6</div>
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
