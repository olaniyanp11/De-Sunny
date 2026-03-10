import React from 'react';
import { Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

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

export default function Show({ category }) {
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

            <div
                style={{
                    flex: 1,
                    marginLeft: 280,
                    padding: 32,
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
                            CATEGORY: {category.name}
                        </h1>
                        <div>
                            <Link
                                href={route('categories.edit', category.id)}
                                style={{
                                    color: COLORS.yellow,
                                    textDecoration: "none",
                                    fontSize: 14,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    marginRight: 16,
                                }}
                            >
                                EDIT
                            </Link>
                            <Link
                                href={route('categories.index')}
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
                    </div>

                    <div
                        style={{
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            padding: 32,
                            marginBottom: 32,
                        }}
                    >
                        <h2
                            style={{
                                fontSize: 18,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                marginBottom: 16,
                            }}
                        >
                            Products in this Category
                        </h2>

                        {category.products.length === 0 ? (
                            <p style={{ color: COLORS.muted }}>
                                No products in this category.
                            </p>
                        ) : (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                                    gap: 16,
                                }}
                            >
                                {category.products.map((product) => (
                                    <div
                                        key={product.id}
                                        style={{
                                            background: COLORS.bg,
                                            border: `1px solid ${COLORS.border}`,
                                            padding: 16,
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: 16,
                                                fontFamily: "'Barlow Condensed', sans-serif",
                                                fontWeight: 600,
                                                marginBottom: 8,
                                            }}
                                        >
                                            {product.name}
                                        </h3>
                                        <p style={{ color: COLORS.yellow, fontSize: 18, marginBottom: 8 }}>
                                            ₦{product.price}
                                        </p>
                                        <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>
                                            SKU: {product.sku}
                                        </p>
                                        <p style={{ color: COLORS.muted, fontSize: 12 }}>
                                            Stock: {product.stock}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}