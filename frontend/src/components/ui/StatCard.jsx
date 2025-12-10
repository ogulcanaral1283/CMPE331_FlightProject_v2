import React from 'react';

const styles = {
    card: {
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
    },
    title: {
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        fontWeight: 500,
        marginBottom: 'var(--spacing-sm)'
    },
    value: {
        fontSize: '2rem',
        fontWeight: 700,
        color: 'var(--text-dark)'
    },
    trend: {
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        marginTop: 'var(--spacing-sm)',
        fontWeight: 600
    }
};

export default function StatCard({ title, value, change, trend = 'neutral', icon }) {
    const trendColor = trend === 'up' ? 'var(--success)' : trend === 'down' ? 'var(--danger)' : 'var(--text-muted)';
    const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '';

    return (
        <div style={styles.card}>
            <div>
                <div style={styles.title}>{title}</div>
                <div style={styles.value}>{value}</div>
            </div>
            {change && (
                <div style={{ ...styles.trend, color: trendColor }}>
                    <span style={{ marginRight: 4 }}>{trendIcon}</span>
                    {change}
                </div>
            )}
            {icon && (
                <div style={{ position: 'absolute', top: 20, right: 20, opacity: 0.1 }}>
                    {icon}
                </div>
            )}
        </div>
    );
}
