import React from 'react';
import { Link } from '@inertiajs/react';
import { HiOutlineExclamation, HiOutlineArrowRight } from 'react-icons/hi';

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

export default function LowStockAlert({ products = [], threshold = 5 }) {
    if (!products || products.length === 0) {
        return null;
    }

    const getStockColor = (stock) => {
        if (stock === 0) return COLORS.red;
        if (stock <= 3) return COLORS.red;
        if (stock <= threshold) return COLORS.orange;
        return COLORS.yellow;
    };

    const getStockLabel = (stock) => {
        if (stock === 0) return 'OUT OF STOCK';
        if (stock <= 3) return 'CRITICAL';
        if (stock <= threshold) return 'LOW STOCK';
        return 'IN STOCK';
    };

    return (
        <div
            style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                padding: 24,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 20,
                }}
            >
                <div
                    style={{
                        background: 'rgba(251, 146, 60, 0.1)',
                        border: `1px solid ${COLORS.orange}`,
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <HiOutlineExclamation size={20} color={COLORS.orange} />
                </div>
                <div>
                    <h3
                        style={{
                            fontSize: 16,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: COLORS.text,
                        }}
                    >
                        Low Stock Alert
                    </h3>
                    <p
                        style={{
                            fontSize: 12,
                            color: COLORS.muted,
                            margin: 0,
                        }}
                    >
                        Products below {threshold} units
                    </p>
                </div>
            </div>

            {/* Products List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: COLORS.bg,
                            border: `1px solid ${COLORS.border}`,
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <div
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: COLORS.text,
                                    marginBottom: 4,
                                }}
                            >
                                {product.name}
                            </div>
                            <div
                                style={{
                                    fontSize: 12,
                                    color: COLORS.muted,
                                }}
                            >
                                SKU: {product.sku} • {product.category?.name || 'No Category'}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: getStockColor(product.stock),
                                    fontFamily: "'DM Mono', monospace",
                                }}
                            >
                                {product.stock}
                            </div>
                            <div
                                style={{
                                    fontSize: 10,
                                    color: getStockColor(product.stock),
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontWeight: 600,
                                }}
                            >
                                {getStockLabel(product.stock)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Link */}
            {products.length > 0 && (
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Link
                        href={route('products.index', { stock_status: 'low' })}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            color: COLORS.yellow,
                            fontSize: 12,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            textDecoration: 'none',
                        }}
                    >
                        View All Low Stock Products
                        <HiOutlineArrowRight size={14} />
                    </Link>
                </div>
            )}
        </div>
    );
}

