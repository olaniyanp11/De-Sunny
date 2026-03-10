import React from 'react';
import { Link, usePage } from '@inertiajs/react';

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

export default function Index({ products }) {
    const { auth } = usePage().props;

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
                    maxWidth: 1200,
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
                        PRODUCTS
                    </h1>
                    <Link
                        href={route('products.create')}
                        style={{
                            background: COLORS.yellow,
                            color: COLORS.bg,
                            padding: "12px 24px",
                            textDecoration: "none",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            fontSize: 14,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        ADD PRODUCT
                    </Link>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 20,
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 20,
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 18,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }}
                            >
                                {product.name}
                            </h3>
                            <p style={{ color: COLORS.muted, marginBottom: 4 }}>
                                SKU: {product.sku}
                            </p>
                            <p style={{ color: COLORS.yellow, fontSize: 20, marginBottom: 8 }}>
                                ₦{product.price}
                            </p>
                            <p style={{ color: COLORS.muted, marginBottom: 4 }}>
                                Stock: {product.stock}
                            </p>
                            <p style={{ color: COLORS.muted, marginBottom: 16 }}>
                                Category: {product.category}
                            </p>
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
                                        padding: "8px 16px",
                                        textDecoration: "none",
                                        fontSize: 12,
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    EDIT
                                </Link>
                                <Link
                                    href={route('products.show', product.id)}
                                    style={{
                                        background: COLORS.border,
                                        color: COLORS.text,
                                        padding: "8px 16px",
                                        textDecoration: "none",
                                        fontSize: 12,
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    VIEW
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}