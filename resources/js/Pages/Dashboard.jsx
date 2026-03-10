import React, { useState } from 'react';
import OverView from "@/Components/OverView";
import Sidebar from "@/Components/Sidebar";
import LowStockAlert from "@/Components/LowStockAlert";
import NotificationPanel from "@/Components/NotificationPanel";
import { usePage } from "@inertiajs/react";
import { HiOutlineBell } from "react-icons/hi";

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

export default function Dashboard() {
    const { todaySales, pendingOrders, lowStockProducts, lowStockProductList, recentOrders } = usePage().props;
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: COLORS.bg,
                color: COLORS.text,
                fontFamily: "'DM Mono', monospace",
                display: "flex",
            }}
        >
            <Sidebar />

            {/* Notification Panel */}
            <NotificationPanel 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
            />

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    marginLeft: 280,
                    padding: 32,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 28,
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="section-label">
                                DASHBOARD
                            </div>
                            <div
                                style={{
                                    fontFamily: "'Barlow Condensed'",
                                    fontWeight: 800,
                                    fontSize: 32,
                                    color: COLORS.text,
                                }}
                            >
                                WELCOME BACK
                            </div>
                        </div>
                        
                        {/* Notification Bell */}
                        <button
                            onClick={() => setShowNotifications(true)}
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: '12px',
                                cursor: 'pointer',
                                position: 'relative',
                            }}
                        >
                            <HiOutlineBell size={20} color={COLORS.yellow} />
                            {lowStockProducts > 0 && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: -4,
                                        right: -4,
                                        background: COLORS.orange,
                                        color: COLORS.bg,
                                        fontSize: 10,
                                        fontWeight: 700,
                                        padding: '2px 6px',
                                        borderRadius: '50%',
                                        minWidth: 18,
                                        textAlign: 'center',
                                    }}
                                >
                                    {lowStockProducts}
                                </span>
                            )}
                        </button>
                    </div>

                    <OverView
                        todaySales={todaySales}
                        pendingOrders={pendingOrders}
                        lowStockProducts={lowStockProducts}
                    />

                    {/* Two Column Layout for Alerts and Recent Orders */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 24,
                        }}
                    >
                        {/* Low Stock Alert */}
                        <LowStockAlert 
                            products={lowStockProductList || []} 
                            threshold={5} 
                        />

                        {/* Recent Orders */}
                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 16,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: COLORS.text,
                                    marginBottom: 20,
                                }}
                            >
                                Recent Orders
                            </h3>
                            
                            {recentOrders && recentOrders.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {recentOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '12px 16px',
                                                background: COLORS.bg,
                                                border: `1px solid ${COLORS.border}`,
                                            }}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: 600,
                                                        color: COLORS.text,
                                                    }}
                                                >
                                                    ORD-{String(order.id).padStart(3, '0')}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 12,
                                                        color: COLORS.muted,
                                                    }}
                                                >
                                                    {order.user?.name || 'Unknown'} • {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: 700,
                                                        color: COLORS.yellow,
                                                        fontFamily: "'DM Mono', monospace",
                                                    }}
                                                >
                                                    ₦{order.total}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 10,
                                                        color: order.status === 'completed' ? COLORS.green : COLORS.yellow,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {order.status}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: 24, color: COLORS.muted }}>
                                    No recent orders
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

