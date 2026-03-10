import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

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

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.role,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

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
                        EDIT USER
                    </h1>
                    <Link
                        href={route('users.index')}
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
                            Name
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
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.email ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                        />
                        {errors.email && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
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
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                            }}
                        >
                            Role
                        </label>
                        <select
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            style={{
                                width: "100%",
                                background: COLORS.surface,
                                border: `1px solid ${errors.role ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                        >
                            <option value="staff">Staff</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.role && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.role}</p>}
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
                            New Password (leave blank to keep current)
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.password ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                        />
                        {errors.password && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.password}</p>}
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
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: `1px solid ${errors.password_confirmation ? COLORS.red : COLORS.border}`,
                                color: COLORS.text,
                                padding: "12px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 14,
                            }}
                        />
                        {errors.password_confirmation && <p style={{ color: COLORS.red, fontSize: 12, marginTop: 4 }}>{errors.password_confirmation}</p>}
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
                        {processing ? 'UPDATING...' : 'UPDATE USER'}
                    </button>
                </form>
            </div>
        </div>
    );
}