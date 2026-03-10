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

export default function Show({ order }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: COLORS.bg,
                color: COLORS.text,
                fontFamily: "'DM Mono', monospace",
                padding: 20,
            }}
        >
            <div
                style={{
                    maxWidth: 800,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 32,
                    }}
                >
                    <h1
                        style={{
                            fontSize: 24,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                        }}
                    >
                        ORDER DETAILS
                    </h1>
                    <Link
                        href={route('orders.index')}
                        style={{
                            color: COLORS.yellow,
                            textDecoration: "none",
                            fontSize: 14,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        ← BACK
                    </Link>
                </div>

                <div
                    style={{
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        padding: 32,
                        marginBottom: 32,
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 16,
                            marginBottom: 24,
                        }}
                    >
                        <div>
                            <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 4 }}>
                                ORDER ID
                            </p>
                            <p style={{ fontSize: 16 }}>
                                ORD-{String(order.id).padStart(3, '0')}
                            </p>
                        </div>
                        <div>
                            <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 4 }}>
                                DATE
                            </p>
                            <p style={{ fontSize: 16 }}>
                                {new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 4 }}>
                                STAFF
                            </p>
                            <p style={{ fontSize: 16 }}>
                                {order.user.name}
                            </p>
                        </div>
                        <div>
                            <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 4 }}>
                                STATUS
                            </p>
                            <span
                                style={{
                                    color: order.status === 'completed' ? COLORS.green : COLORS.yellow,
                                    textTransform: "uppercase",
                                    fontSize: 16,
                                    fontWeight: 600,
                                }}
                            >
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <h3
                        style={{
                            fontSize: 18,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 600,
                            marginBottom: 16,
                        }}
                    >
                        ITEMS
                    </h3>

                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px 0",
                                    borderBottom: index < order.items.length - 1 ? `1px solid ${COLORS.border}` : "none",
                                }}
                            >
                                <div>
                                    <p style={{ fontSize: 14, marginBottom: 4 }}>
                                        Product ID: {item.product_id}
                                    </p>
                                    <p style={{ color: COLORS.muted, fontSize: 12 }}>
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <p style={{ color: COLORS.yellow, fontSize: 16 }}>
                                    ₦{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingTop: 16,
                            borderTop: `1px solid ${COLORS.border}`,
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        <span>TOTAL:</span>
                        <span style={{ color: COLORS.yellow }}>₦{order.total}</span>
                    </div>
                </div>

                {/* Download Receipt Button */}
                <a
                    href={route('orders.receipt', order.id)}
                    style={{
                        display: "block",
                        width: "100%",
                        background: COLORS.green,
                        color: COLORS.bg,
                        border: "none",
                        padding: "16px",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        textAlign: "center",
                        cursor: "pointer",
                        marginBottom: 16,
                    }}
                >
                    DOWNLOAD RECEIPT (PDF)
                </a>

                {/* Print Receipt Button */}
                <button
                    onClick={() => window.print()}
                    style={{
                        width: "100%",
                        background: COLORS.yellow,
                        color: COLORS.bg,
                        border: "none",
                        padding: "16px",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                    }}
                >
                    PRINT RECEIPT
                </button>
            </div>
        </div>
    );
}