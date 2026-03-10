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

export default function Index({ users }) {
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
                        USER MANAGEMENT
                    </h1>
                    <Link
                        href={route('users.create')}
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
                        ADD USER
                    </Link>
                </div>

                <div
                    style={{
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        overflow: "hidden",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    background: COLORS.border,
                                }}
                            >
                                <th
                                    style={{
                                        padding: 16,
                                        textAlign: "left",
                                        fontSize: 12,
                                        color: COLORS.muted,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    Name
                                </th>
                                <th
                                    style={{
                                        padding: 16,
                                        textAlign: "left",
                                        fontSize: 12,
                                        color: COLORS.muted,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    Email
                                </th>
                                <th
                                    style={{
                                        padding: 16,
                                        textAlign: "left",
                                        fontSize: 12,
                                        color: COLORS.muted,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    Role
                                </th>
                                <th
                                    style={{
                                        padding: 16,
                                        textAlign: "left",
                                        fontSize: 12,
                                        color: COLORS.muted,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    style={{
                                        borderBottom: `1px solid ${COLORS.border}`,
                                    }}
                                >
                                    <td style={{ padding: 16 }}>
                                        {user.name}
                                    </td>
                                    <td style={{ padding: 16 }}>
                                        {user.email}
                                    </td>
                                    <td style={{ padding: 16 }}>
                                        <span
                                            style={{
                                                color: user.role === 'admin' ? COLORS.yellow :
                                                       user.role === 'manager' ? COLORS.green : COLORS.text,
                                                textTransform: "uppercase",
                                                fontSize: 12,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: 16 }}>
                                        <Link
                                            href={route('users.edit', user.id)}
                                            style={{
                                                color: COLORS.yellow,
                                                textDecoration: "none",
                                                fontSize: 12,
                                                fontFamily: "'Barlow Condensed', sans-serif",
                                                fontWeight: 600,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.05em",
                                                marginRight: 16,
                                            }}
                                        >
                                            EDIT
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}