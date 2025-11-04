import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FlightDetail.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function FlightDetail() {
  const { flightNumber } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFlight() {
      try {
        const res = await fetch(`${API_URL}/flights/${flightNumber}`);
        if (!res.ok) throw new Error("Uçuş bulunamadı");
        const data = await res.json();
        setFlight(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFlight();
  }, [flightNumber]);

  if (loading) return <p className="loading">Yükleniyor...</p>;
  if (error) return <p className="error-text">Hata: {error}</p>;

  const formatDate = (d) =>
    new Date(d).toLocaleString("tr-TR", {
      dateStyle: "short",
      timeStyle: "medium",
    });

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="plane-icon">✈️</div>

        <h2 className="detail-title">Uçuş Detayları</h2>

        <div className="detail-info">
          <p><strong>Kod:</strong> {flight.flight_number}</p>
          <p><strong>Kalkış:</strong> {flight.origin_airport}</p>
          <p><strong>Varış:</strong> {flight.destination_airport}</p>

          <hr />

          <p><strong>Kalkış Saati:</strong> {formatDate(flight.departure_time)}</p>
          <p><strong>Varış Saati:</strong> {formatDate(flight.arrival_time)}</p>
        </div>

        <div className="button-group">
          <button className="back-btn" onClick={() => navigate("/flights")}>
            ← Geri Dön
          </button>

          <button className="continue-btn" 
            onClick={() => navigate(`/flights/${flightNumber}/select-passengers`)}
          >
            Devam →
          </button>
        </div>

      </div>
    </div>
  );
}
