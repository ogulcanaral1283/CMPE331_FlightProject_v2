import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './AdminLayout.css';

// Simple Icons as Components
const DashboardIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const UsersIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const FlightIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24"><path d="M2 12h20"></path><path d="M13 2a9 9 0 0 1 9 9v11H2V11a9 9 0 0 1 9-9z"></path></svg>
);
const CalendarIcon = () => (
    <svg className="nav-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

export default function AdminSidebar() {
    const { logout } = useAuth();

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                ✈️ Airline Admin
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <DashboardIcon />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/roster" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <CalendarIcon />
                    <span>Roster & Schedule</span>
                </NavLink>

                <NavLink to="/admin/flights" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <FlightIcon />
                    <span>Flights</span>
                </NavLink>

                <NavLink to="/admin/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <UsersIcon />
                    <span>Crew & Users</span>
                </NavLink>
            </nav>

            <div style={{ padding: '20px' }}>
                <button
                    onClick={logout}
                    style={{
                        width: '100%',
                        padding: '10px',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: 'var(--danger)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
