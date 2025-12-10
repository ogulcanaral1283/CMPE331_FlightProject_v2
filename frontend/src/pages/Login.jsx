import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";




import { AUTH_API_URL } from "../apiConfig";

const API_URL = AUTH_API_URL;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        new URLSearchParams({
          username,
          password,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const token = response.data.access_token;

      if (!token) {
        throw new Error("Token alınamadı!");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      // Fetch User Details to get Airline ID
      try {
        const userRes = await axios.get(`http://localhost:8060/users/?username=${username}`);
        if (userRes.data && userRes.data.length > 0) {
          const user = userRes.data[0];
          if (user.airline_id) {
            localStorage.setItem("airline_id", user.airline_id);
          } else {
            localStorage.removeItem("airline_id");
          }
        }
      } catch (err) {
        console.error("User details fetch error:", err);
      }

      navigate("/admin");
    } catch (error) {
      setError("❌ Kullanıcı adı veya şifre hatalı!");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card} autoComplete="off">
        <h2 style={styles.title}>Admin Girişi</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f2f2f2",
  },
  card: {
    width: "350px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    background: "#3498DB",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "#e74c3c",
    marginBottom: "10px",
  },
};