import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
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

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        sku: '',
        price: '',
        stock: '',
        description: '',
        category_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

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
                        ADD PRODUCT
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

                <form
                    onSubmit={handleSubmit}
                    style={{
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        padding: 32,
                    }}
                >
                    <div style={{ marginBottom: 20 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12,
                                color: COLORS.muted,
                                marginBottom: 8,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.name ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                        />
                        {errors.name && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12,
                                color: COLORS.muted,
                                marginBottom: 8,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            SKU
                        </label>
                        <input
                            type="text"
                            value={data.sku}
                            onChange={(e) => setData('sku', e.target.value)}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.sku ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                        />
                        {errors.sku && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.sku}</p>}
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12,
                                color: COLORS.muted,
                                marginBottom: 8,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Price (₦)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.price ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                        />
                        {errors.price && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.price}</p>}
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12,
                                color: COLORS.muted,
                                marginBottom: 8,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Stock
                        </label>
                        <input
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.stock ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                        />
                        {errors.stock && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.stock}</p>}
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12,
                                color: COLORS.muted,
                                marginBottom: 8,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Category
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.category_id ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.category_id}</p>}
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: 12,
                                color: COLORS.muted,
                                marginBottom: 8,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.description ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                                resize: "vertical",
                            }}
                        />
                        {errors.description && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.description}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
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
                            cursor: processing ? "not-allowed" : "pointer",
                            opacity: processing ? 0.6 : 1,
                        }}
                    >
                    </button>
                </form>
            </div>
        </div>
    );
}