import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Admin Panel</h2>

      <Link to="/admin" style={styles.link}>Dashboard</Link>
      <Link to="/admin/users" style={styles.link}>Kullanıcılar</Link>
      <Link to="/admin/flights" style={styles.link}>Uçuşlar</Link>

      <button onClick={handleLogout} style={styles.logout}>
        🚪 Çıkış Yap
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "230px",
    height: "100vh",
    background: "#2C3E50",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    color: "#fff"
  },
  title: {
    fontSize: "20px",
    marginBottom: "20px",
    borderBottom: "1px solid #fff",
    paddingBottom: "10px"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px"
  },
  logout: {
    marginTop: "auto",
    background: "#E74C3C",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
