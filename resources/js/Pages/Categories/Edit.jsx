import React from 'react';
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

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id));
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
                            EDIT CATEGORY
                        </h1>
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

                    <form onSubmit={handleSubmit}>
                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 32,
                            }}
                        >
                            <div style={{ marginBottom: 24 }}>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: 12,
                                        color: COLORS.muted,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 600,
                                        marginBottom: 8,
                                    }}
                                >
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    style={{
                                        width: "100%",
                                        background: COLORS.bg,
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        padding: "12px",
                                        fontSize: 14,
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                    required
                                />
                                {errors.name && (
                                    <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>
                                        {errors.name}
                                    </p>
                                )}
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
                                }}
                            >
                                {processing ? 'UPDATING...' : 'UPDATE CATEGORY'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}