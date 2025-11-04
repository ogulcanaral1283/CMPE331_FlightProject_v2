import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./PassengerInfo.css";
import countries from "../data/countries";


export default function PassengerInfo() {
  const { flightNumber } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { adults = 1, students = 0, children = 0 } = state || {};

  const total = adults + students + children;

  const [passengers, setPassengers] = useState([]);


  useEffect(() => {
    const list = [];

    for (let i = 0; i < adults; i++)
      list.push({ type: "Adult", full_name: "", age: "", gender: "", nationality: "" });

    for (let i = 0; i < students; i++)
      list.push({ type: "Student", full_name: "", age: "", gender: "", nationality: "" });

    for (let i = 0; i < children; i++)
      list.push({ type: "Child", full_name: "", age: "", gender: "", nationality: "" });

    setPassengers(list);
  }, [adults, students, children]);

  const update = (index, field, value) => {
    setPassengers(prev => {
      const modified = [...prev];
      modified[index] = { ...modified[index], [field]: value };
      return modified;
    });
  };

  const handleNext = () => {
    if (passengers.some(p => !p.full_name || !p.age || !p.gender || !p.nationality)) {
      alert("Lütfen tüm bilgileri doldurun ✅");
      return;
    }

    navigate(`/flights/${flightNumber}/select-seats`, {
      state: { 
        passengers
         }
    });
  };

  return (
    <div className="passenger-info-container">
      <div className="passenger-info-card">

        <h2>🧳 Yolcu Bilgileri</h2>
        <p>Uçuş: <strong>{flightNumber}</strong> | Toplam: {total} Yolcu</p>

        {passengers.map((p, i) => (
          <div key={i} className="passenger-box">
            <h3>{i + 1}. Yolcu — {p.type}</h3>

            <input
              type="text"
              placeholder="Ad Soyad"
              value={p.full_name}
              onChange={(e) => update(i, "full_name", e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Yaş"
              min="1"
              value={p.age}
              onChange={(e) => update(i, "age", e.target.value)}
              required
            />

            <select
              value={p.gender}
              onChange={(e) => update(i, "gender", e.target.value)}
              required
            >
              <option value="">Cinsiyet</option>
              <option value="Male">Erkek</option>
              <option value="Female">Kadın</option>
            </select>

            <select
              value={p.nationality}
              onChange={(e) => update(i, "nationality", e.target.value)}
              required
            >
              <option value="">Nationality</option>
              {countries.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>

          </div>
        ))}

        <button className="submit-btn" onClick={handleNext}>
          ✅ Koltuk Seçimine Geç
        </button>
      </div>
    </div>
  );
}
