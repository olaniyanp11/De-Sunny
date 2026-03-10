import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { HiOutlineTrendingUp, HiOutlineClipboardList, HiOutlineExclamationCircle, HiOutlinePlus, HiOutlineShoppingBag, HiOutlineUserGroup } from 'react-icons/hi';

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

const OverView = ({ todaySales, pendingOrders, lowStockProducts }) => {
    const { auth } = usePage().props;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
            }}
        >
            <div className="section-label">
                MONDAY, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()} · SHIFT: MORNING
            </div>

            {/* KPI Cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 1,
                    background: COLORS.border,
                }}
            >
                {[
                    {
                        label: "TOTAL SALES TODAY",
                        val: `₦ ${todaySales?.toLocaleString() || '0'}`,
                        sub: "+12% vs yesterday",
                        color: COLORS.green,
                        icon: HiOutlineTrendingUp,
                    },
                    {
                        label: "PENDING ORDERS",
                        val: pendingOrders?.toString() || '0',
                        sub: "Need attention",
                        color: COLORS.yellow,
                        icon: HiOutlineClipboardList,
                    },
                    {
                        label: "INVENTORY ALERTS",
                        val: `${lowStockProducts || 0} ITEMS`,
                        sub: "Low stock",
                        color: COLORS.red,
                        icon: HiOutlineExclamationCircle,
                    },
                ].map((k, i) => (
                    <div
                        key={i}
                        className="card"
                        style={{
                            padding: 28,
                            background: COLORS.surface,
                            borderTop: `2px solid ${k.color}`,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 16,
                            }}
                        >
                            <span
                                style={{
                                    fontSize: 9,
                                    color: k.color,
                                }}
                            >
                                <k.icon size={16} />
                            </span>
                            <span
                                style={{
                                    fontSize: 9,
                                    color: COLORS.muted,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                {k.label}
                            </span>
                        </div>
                        <div
                            style={{
                                fontSize: 24,
                                fontWeight: 600,
                                marginBottom: 8,
                            }}
                        >
                            {k.val}
                        </div>
                        <div
                            style={{
                                fontSize: 11,
                                color: COLORS.muted,
                            }}
                        >
                            {k.sub}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 16,
                }}
            >
                {(auth.user.role === 'staff' || auth.user.role === 'manager' || auth.user.role === 'admin') && (
                    <Link
                        href={route('orders.create')}
                        style={{
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            padding: 24,
                            textDecoration: "none",
                            color: COLORS.text,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <HiOutlinePlus size={32} />
                        <span
                            style={{
                                fontSize: 14,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            New Order
                        </span>
                    </Link>
                )}

                {(auth.user.role === 'manager' || auth.user.role === 'admin') && (
                    <Link
                        href={route('products.create')}
                        style={{
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            padding: 24,
                            textDecoration: "none",
                            color: COLORS.text,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <HiOutlineShoppingBag size={32} />
                        <span
                            style={{
                                fontSize: 14,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Add Product
                        </span>
                    </Link>
                )}

                {auth.user.role === 'admin' && (
                    <Link
                        href={route('users.create')}
                        style={{
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            padding: 24,
                            textDecoration: "none",
                            color: COLORS.text,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <HiOutlineUserGroup size={32} />
                        <span
                            style={{
                                fontSize: 14,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Add User
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default OverView;
