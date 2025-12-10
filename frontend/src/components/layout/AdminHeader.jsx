import React from 'react';
import './AdminLayout.css';

export default function AdminHeader({ title }) {
    const username = localStorage.getItem("username") || "Admin";

    return (
        <header className="admin-header">
            <div className="header-title">{title}</div>

            <div className="header-actions">
                {/* Placeholder for search or notifications */}
                <div className="user-profile">
                    <div className="avatar">
                        {username.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{username}</span>
                </div>
            </div>
        </header>
    );
}
