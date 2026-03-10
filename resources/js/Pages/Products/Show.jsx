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

export default function Show({ product }) {
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
                    maxWidth: 600,
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
                        PRODUCT DETAILS
                    </h1>
                    <Link
                        href={route('products.index')}
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
                    }}
                >
                    <h2
                        style={{
                            fontSize: 20,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 600,
                            marginBottom: 16,
                        }}
                    >
                        {product.name}
                    </h2>

                    <div style={{ marginBottom: 16 }}>
                        <p style={{ color: COLORS.muted, marginBottom: 4 }}>
                            <strong>SKU:</strong> {product.sku}
                        </p>
                        <p style={{ color: COLORS.yellow, fontSize: 24, marginBottom: 8 }}>
                            ₦{product.price}
                        </p>
                        <p style={{ color: product.stock > 0 ? COLORS.green : COLORS.red, marginBottom: 4 }}>
                            <strong>Stock:</strong> {product.stock}
                        </p>
                        <p style={{ color: COLORS.muted, marginBottom: 16 }}>
                            <strong>Category:</strong> {product.category}
                        </p>
                        {product.description && (
                            <p style={{ color: COLORS.text, lineHeight: 1.6 }}>
                                <strong>Description:</strong><br />
                                {product.description}
                            </p>
                        )}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 8,
                        }}
                    >
                        <Link
                            href={route('products.edit', product.id)}
                            style={{
                                background: COLORS.yellow,
                                color: COLORS.bg,
                                padding: "12px 24px",
                                textDecoration: "none",
                                fontSize: 14,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            EDIT
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}