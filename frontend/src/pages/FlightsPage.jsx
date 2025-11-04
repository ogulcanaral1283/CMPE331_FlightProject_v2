import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const API_URL = process.env.REACT_APP_API_URL;

export default function FlightsPage() {
  const [rowData, setRowData] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [crewData, setCrewData] = useState(null);
  const [showAddFlight, setShowAddFlight] = useState(false);
  const [newFlight, setNewFlight] = useState({
    flight_number: "",
    airline_id: "",
    origin_airport: "",
    destination_airport: "",
    departure_time: "",
    arrival_time: "",
    status: "Scheduled",
  });

  const fetchFlights = () => {
    axios
      .get(`${API_URL}/flights`)
      .then((res) => setRowData(res.data))
      .catch(() => console.log("Veriler yüklenemedi"));
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleFlightClick = async (flightNumber) => {
    setSelectedFlight(flightNumber);
    setCrewData(null);
    try {
      const res = await axios.get(`${API_URL}/flights/${flightNumber}/passengers`);
      setPassengers(res.data);
    } catch {
      console.log("Yolcu bilgileri alınamadı");
    }
  };

  const handleActionSelect = async (action, flight) => {
    if (action === "crew") {
      try {
        const res = await axios.get(`${API_URL}/flights/${flight.flight_id}/details`);
        setCrewData(res.data);
        setSelectedFlight(flight.flight_number);
      } catch (error) {
        console.log("Ekip bilgileri alınamadı", error);
      }
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/flights`, newFlight);
      setShowAddFlight(false);
      setNewFlight({
        flight_number: "",
        airline_id: "",
        origin_airport: "",
        destination_airport: "",
        departure_time: "",
        arrival_time: "",
        status: "Scheduled",
      });
      fetchFlights();
    } catch (err) {
      console.error("Uçuş eklenemedi", err);
    }
  };

  // kolonlar
  const flightColumns = [
    { headerName: "ID", field: "flight_id", width: 90 },
    {
      headerName: "Flight No",
      field: "flight_number",
      cellStyle: { color: "#007bff", cursor: "pointer" },
      onCellClicked: (params) => handleFlightClick(params.data.flight_number),
    },
    { headerName: "Airline", field: "airline_id" },
    { headerName: "From", field: "origin_airport" },
    { headerName: "To", field: "destination_airport" },
    { headerName: "Departure", field: "departure_time" },
    { headerName: "Arrival", field: "arrival_time" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Actions",
      field: "actions",
      width: 200,
      cellRenderer: (params) => (
        <select
          onChange={(e) => handleActionSelect(e.target.value, params.data)}
          defaultValue=""
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <option value="">Seçenekler</option>
          <option value="crew">✈️ Uçuş Ekibini Gör</option>
        </select>
      ),
    },
  ];

  const passengerColumns = [
    { headerName: "Full Name", field: "full_name", width: 200 },
    { headerName: "Seat", field: "seat_number", width: 140 },
    { headerName: "Gender", field: "gender", width: 120 },
    { headerName: "Seat Type", field: "seat_type", width: 100 },
    { headerName: "Seat Number", field: "seat_number", width: 100 },
  ];

  const crewColumns = [
    { headerName: "Full Name", field: "full_name", width: 200 },
    { headerName: "Role", field: "role", width: 150 },
    { headerName: "Gender", field: "gender", width: 100 },
    { headerName: "Experience (Years)", field: "experience_years", width: 180 },
  ];

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <h2
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          ✈️ Uçuş Listesi
          <button
            onClick={() => setShowAddFlight(true)}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            + Uçuş Ekle
          </button>
        </h2>

        {/* Uçuş Tablosu */}
        <div className="ag-theme-alpine" style={{ width: "100%", height: "400px" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={flightColumns}
            pagination
            paginationPageSize={10}
            animateRows
          />
        </div>

        {/* Yolcular */}
        {selectedFlight && passengers.length > 0 && (
          <>
            <h3>🧍 Yolcular — Flight: <strong>{selectedFlight}</strong></h3>
            <div className="ag-theme-alpine" style={{ width: "100%", height: "300px", marginBottom: "30px" }}>
              <AgGridReact
                rowData={passengers}
                columnDefs={passengerColumns}
                pagination
                paginationPageSize={10}
                animateRows
              />
            </div>
          </>
        )}

        {/* Crew */}
        {crewData && (
          <>
            <h3>👨‍✈️ Uçuş Ekibi — Flight: <strong>{crewData.flight_number}</strong></h3>
            <div className="ag-theme-alpine" style={{ width: "100%", height: "300px" }}>
              <AgGridReact
                rowData={[
                  ...crewData.pilots.map((p) => ({
                    full_name: p.full_name,
                    role: `Pilot (${p.rank})`,
                    gender: "-",
                    experience_years: p.experience_years,
                  })),
                  ...crewData.crew.map((c) => ({
                    full_name: c.full_name,
                    role: c.role,
                    gender: c.gender,
                    experience_years: c.experience_years,
                  })),
                ]}
                columnDefs={crewColumns}
                pagination
                paginationPageSize={10}
                animateRows
              />
            </div>
          </>
        )}

        {/* 🔹 POPUP: Yeni Uçuş Ekle Modal */}
        {showAddFlight && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "25px",
                borderRadius: "10px",
                width: "550px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              }}
            >
              <h3 style={{ marginBottom: "15px" }}>🆕 Yeni Uçuş Ekle</h3>

              <form onSubmit={handleAddFlight}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="Flight Number"
                    value={newFlight.flight_number}
                    onChange={(e) =>
                      setNewFlight({ ...newFlight, flight_number: e.target.value })
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Airline ID"
                    value={newFlight.airline_id}
                    onChange={(e) =>
                      setNewFlight({ ...newFlight, airline_id: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Origin Airport"
                    value={newFlight.origin_airport}
                    onChange={(e) =>
                      setNewFlight({ ...newFlight, origin_airport: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Destination Airport"
                    value={newFlight.destination_airport}
                    onChange={(e) =>
                      setNewFlight({ ...newFlight, destination_airport: e.target.value })
                    }
                  />
                  <input
                    type="datetime-local"
                    placeholder="Departure Time"
                    value={newFlight.departure_time}
                    onChange={(e) =>
                      setNewFlight({ ...newFlight, departure_time: e.target.value })
                    }
                  />
                  <input
                    type="datetime-local"
                    placeholder="Arrival Time"
                    value={newFlight.arrival_time}
                    onChange={(e) =>
                      setNewFlight({ ...newFlight, arrival_time: e.target.value })
                    }
                  />
                </div>

                <div style={{ marginTop: "20px", textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => setShowAddFlight(false)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    İptal
                  </button>
                  <button
                    
                    onClick={handleAddFlight}
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
