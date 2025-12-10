import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/layout/AdminLayout";
import StatCard from "../components/ui/StatCard";
import DashboardChart from "../components/ui/DashboardChart";
import { FLIGHT_API_URL, PASSENGER_API_URL, AIRCRAFT_API_URL } from "../apiConfig";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_flights: 0,
    total_passengers: 0,
    total_airlines: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flightsRes, passengersRes, airlinesRes] = await Promise.all([
          axios.get(`${FLIGHT_API_URL}/flights`).catch(() => ({ data: [] })),
          axios.get(`${PASSENGER_API_URL}/passengers`).catch(() => ({ data: [] })),
          axios.get(`${AIRCRAFT_API_URL}/airlines`).catch(() => ({ data: [] }))
        ]);

        setStats({
          total_flights: flightsRes.data.length || 0,
          total_passengers: passengersRes.data.length || 0,
          total_airlines: airlinesRes.data.length || 0
        });
      } catch (err) {
        console.error("Stats yüklenemedi:", err);
      }
    };

    fetchData();
  }, []);

  // Mock data for charts
  const passengerData = [
    { name: 'Mon', uv: 2000 },
    { name: 'Tue', uv: 3000 },
    { name: 'Wed', uv: 4500 },
    { name: 'Thu', uv: 3200 },
    { name: 'Fri', uv: 5000 },
    { name: 'Sat', uv: 4800 },
    { name: 'Sun', uv: 5500 },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
        <StatCard
          title="Total Passengers"
          value={`${(stats.total_passengers / 1000).toFixed(1)}K`}
          change="13%"
          trend="up"
        />
        <StatCard
          title="Total Flights"
          value={stats.total_flights}
          change="8%"
          trend="up"
        />
        <StatCard
          title="Airlines Active"
          value={stats.total_airlines}
          change="2%"
          trend="down"
        />
        <StatCard
          title="Avg Load Factor"
          value="89%"
          change="5%"
          trend="up"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--spacing-lg)' }}>
        <DashboardChart title="Passengers Over Time" data={passengerData} color="var(--success)" />
        <DashboardChart title="Flight Traffic" type="bar" color="var(--warning)" />
      </div>

      {/* Roster Preview Section (Static for now) */}
      <div style={{ marginTop: 'var(--spacing-lg)', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-card)' }}>
        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Recent Roster Updates</h3>
        <div style={{ color: 'var(--text-muted)' }}>
          No recent roster updates available.
        </div>
      </div>
    </AdminLayout>
  );
}
