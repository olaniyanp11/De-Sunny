import React from 'react';
import { Link } from '@inertiajs/react';

const COLORS = {
    bg: "#0a0a0a",
    surface: "#111111",
    border: "#1a1a1a",
    border2: "#222",
    yellow: "#e8c547",
    yellowHover: "#f5d660",
    text: "#ffffff",
    muted: "#555",
    dim: "#ffffff",
    vdim: "#ffffff",
    green: "#4ade80",
    red: "#f87171",
    orange: "#fb923c",
};

export default function ActivityLogTable({ logs = [], showPagination = true }) {
    const getActionColor = (action) => {
        if (action.includes('created') || action.includes('created')) return COLORS.green;
        if (action.includes('updated')) return COLORS.yellow;
        if (action.includes('deleted')) return COLORS.red;
        if (action.includes('order')) return COLORS.green;
        if (action.includes('low_stock')) return COLORS.orange;
        return COLORS.muted;
    };

    const getActionIcon = (action) => {
        if (action.includes('order')) return '📦';
        if (action.includes('product')) return '📝';
        if (action.includes('inventory')) return '📊';
        if (action.includes('user')) return '👤';
        if (action.includes('category')) return '📁';
        if (action.includes('low_stock')) return '⚠️';
        return '🔔';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!logs || logs.length === 0) {
        return (
            <div
                style={{
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    padding: 48,
                    textAlign: 'center',
                    color: COLORS.muted,
                }}
            >
                No activity logs found.
            </div>
        );
    }

    return (
        <div
            style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                overflow: 'hidden',
            }}
        >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th
                            style={{
                                padding: 16,
                                textAlign: 'left',
                                fontSize: 12,
                                color: COLORS.muted,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                borderBottom: `1px solid ${COLORS.border}`,
                            }}
                        >
                            Timestamp
                        </th>
                        <th
                            style={{
                                padding: 16,
                                textAlign: 'left',
                                fontSize: 12,
                                color: COLORS.muted,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                borderBottom: `1px solid ${COLORS.border}`,
                            }}
                        >
                            User
                        </th>
                        <th
                            style={{
                                padding: 16,
                                textAlign: 'left',
                                fontSize: 12,
                                color: COLORS.muted,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                borderBottom: `1px solid ${COLORS.border}`,
                            }}
                        >
                            Action
                        </th>
                        <th
                            style={{
                                padding: 16,
                                textAlign: 'left',
                                fontSize: 12,
                                color: COLORS.muted,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                borderBottom: `1px solid ${COLORS.border}`,
                            }}
                        >
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr
                            key={log.id}
                            style={{ borderBottom: `1px solid ${COLORS.border}` }}
                        >
                            <td style={{ padding: 16, fontSize: 13, color: COLORS.muted }}>
                                {formatDate(log.created_at)}
                            </td>
                            <td style={{ padding: 16 }}>
                                <span
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: COLORS.text,
                                    }}
                                >
                                    {log.user?.name || 'Unknown'}
                                </span>
                            </td>
                            <td style={{ padding: 16 }}>
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: getActionColor(log.action),
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    <span>{getActionIcon(log.action)}</span>
                                    {log.action}
                                </span>
                            </td>
                            <td style={{ padding: 16, fontSize: 13, color: COLORS.text }}>
                                {log.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

