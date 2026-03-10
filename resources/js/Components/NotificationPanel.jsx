import React, { useState, useEffect } from 'react';
import { HiOutlineBell, HiOutlineX, HiOutlineCheck } from 'react-icons/hi';

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

export default function NotificationPanel({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            // For now, we'll use the notifications passed from props
            // In production, you'd fetch from an API endpoint
            const response = await fetch('/api/notifications', {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    const markAllAsRead = () => {
        setNotifications([]);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const getNotificationIcon = (type) => {
        const iconStyle = { width: 16, height: 16 };
        switch (type) {
            case 'order.created':
                return <span style={{ ...iconStyle, color: COLORS.green }}>📦</span>;
            case 'product.created':
            case 'product.updated':
                return <span style={{ ...iconStyle, color: COLORS.yellow }}>📝</span>;
            case 'product.deleted':
                return <span style={{ ...iconStyle, color: COLORS.red }}>🗑️</span>;
            case 'low_stock':
                return <span style={{ ...iconStyle, color: COLORS.orange }}>⚠️</span>;
            case 'inventory.updated':
                return <span style={{ ...iconStyle, color: COLORS.yellow }}>📊</span>;
            default:
                return <span style={{ ...iconStyle, color: COLORS.muted }}>🔔</span>;
        }
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 380,
                background: COLORS.surface,
                borderLeft: `1px solid ${COLORS.border}`,
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: 20,
                    borderBottom: `1px solid ${COLORS.border}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: 18,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: COLORS.text,
                    }}
                >
                    NOTIFICATIONS
                </h2>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={markAllAsRead}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: COLORS.muted,
                            cursor: 'pointer',
                            padding: 4,
                        }}
                        title="Mark all as read"
                    >
                        <HiOutlineCheck size={20} />
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: COLORS.muted,
                            cursor: 'pointer',
                            padding: 4,
                        }}
                    >
                        <HiOutlineX size={20} />
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: 32, color: COLORS.muted }}>
                        Loading...
                    </div>
                ) : notifications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 32, color: COLORS.muted }}>
                        <HiOutlineBell size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                        <p>No notifications</p>
                    </div>
                ) : (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            style={{
                                padding: 16,
                                marginBottom: 12,
                                background: COLORS.bg,
                                border: `1px solid ${COLORS.border}`,
                                borderRadius: 4,
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                <div style={{ marginTop: 2 }}>
                                    {getNotificationIcon(notification.type)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: COLORS.text,
                                            marginBottom: 4,
                                        }}
                                    >
                                        {notification.title}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            color: COLORS.muted,
                                            marginBottom: 8,
                                        }}
                                    >
                                        {notification.message}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: COLORS.muted,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        {formatTime(notification.created_at)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div
                style={{
                    padding: 16,
                    borderTop: `1px solid ${COLORS.border}`,
                    textAlign: 'center',
                }}
            >
                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: COLORS.yellow,
                        fontSize: 12,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                    }}
                >
                    View All Activity
                </button>
            </div>
        </div>
    );
}

