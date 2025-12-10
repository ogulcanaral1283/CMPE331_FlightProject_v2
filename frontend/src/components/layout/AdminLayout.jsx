import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import './AdminLayout.css';

export default function AdminLayout({ children, title = "Overview" }) {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <AdminHeader title={title} />
                <div className="admin-content">
                    <div className="admin-content-wrapper">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
