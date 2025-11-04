import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./SeatSelection.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function SeatSelection() {
  const { flightNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { passengers = [] } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [fuselageType, setFuselageType] = useState("Narrow-Body");

  const rows = 30;

  // ✅ Uçak tipi bilgisini al
  useEffect(() => {
    fetch(`${API_URL}/flights/detail/${flightNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setFuselageType(data.fuselage_type);
      })
      .catch((err) =>
        console.log("Flight detay alınamadı:", err)
      );
  }, [flightNumber]);

  // ✅ Dolu koltukları çek
  useEffect(() => {
    fetch(`${API_URL}/passengers/by-flight/${flightNumber}`)
      .then((res) => res.json())
      .then((data) => {
        const seats = data.map((p) => p.seat_number);
        setBookedSeats(seats);
      })
      .catch((err) =>
        console.log("Koltuk bilgisi alınamadı:", err)
      );
  }, [flightNumber]);

  // ✅ Uçak tipine göre koltuk harfleri belirle
  const generateSeatLayout = () => {
    if (fuselageType === "Wide-Body") {
      return ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; // 3-3-3
    }
    return ["A", "B", "C", "D", "E", "F"]; // 3-3
  };

  const cols = generateSeatLayout();

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) => {
      const updated = [...prev];
      updated[currentIndex] = seat;
      return updated;
    });

    if (currentIndex < passengers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = async () => {
    const payload = passengers.map((p, i) => ({
      full_name: p.full_name,
      age: parseInt(p.age),
      gender: p.gender,
      nationality: p.nationality,
      seat_type: "Economy",
      seat_number: selectedSeats[i],
      flight_number: flightNumber,
    }));

    try {
      for (const p of payload) {
        await fetch(`${API_URL}/passengers/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p),
        });
      }

      navigate("/booking-success", {
        state: { flightNumber, seats: selectedSeats },
      });
    } catch (error) {
      alert("⚠ Koltuk kaydı yapılırken hata oluştu!");
    }
  };

  const allSelected = selectedSeats.length === passengers.length;

  return (
    <div className="seat-selection">
      <h2>🪑 Koltuk Seçimi</h2>

      {/* ✅ Uçak tipini göster */}
      <p>
        🛩 Uçak Tipi:{" "}
        <strong>
          {fuselageType === "Wide-Body" ? "Geniş Gövde" : "Dar Gövde"}
        </strong>
      </p>

      <p>
        Kimin koltuğu seçiliyor? 👉{" "}
        <strong>{passengers[currentIndex]?.full_name}</strong>
      </p>

      <div className="seatmap-container">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {cols.map((col) => {
              const seatId = `${rowIndex + 1}${col}`;
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              return (
                <React.Fragment key={seatId}>
                  <button
                    className={`seat ${
                      isBooked ? "booked" : ""
                    } ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={isBooked}
                  >
                    {seatId}
                  </button>

                  {/* ✅ Koridor boşlukları */}
                  {(fuselageType === "Narrow-Body" &&
                    col === "C") && <div className="aisle-space" />}
                  {(fuselageType === "Wide-Body" &&
                    (col === "C" || col === "F")) && (
                    <div className="aisle-space" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      <button
        className="confirm-btn"
        onClick={handleFinish}
        disabled={!allSelected}
      >
        ✅ Tamamla ve Kaydet
      </button>
    </div>
  );
}
