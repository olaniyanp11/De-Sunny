import { Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { useState } from "react";

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

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const userRole = auth.user.role || 'staff';

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

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    marginLeft: 280,
                    padding: 32,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 28,
                        maxWidth: 640,
                    }}
                >
                    <div>
                        <div className="section-label">
                            STAFF ACCOUNT
                        </div>
                        <div
                            style={{
                                fontFamily: "'Barlow Condensed'",
                                fontWeight: 800,
                                fontSize: 32,
                                color: COLORS.text,
                            }}
                        >
                            MY PROFILE
                        </div>
                    </div>

                    {/* Avatar + name */}
                    <div
                        style={{
                            border: `1px solid ${COLORS.border}`,
                            background: COLORS.surface,
                            padding: 32,
                            display: "flex",
                            alignItems: "center",
                            gap: 24,
                        }}
                    >
                        <div
                            style={{
                                width: 64,
                                height: 64,
                                background: COLORS.yellow,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Barlow Condensed'",
                                    fontWeight: 900,
                                    fontSize: 24,
                                    color: "#0a0a0a",
                                }}
                            >
                                {auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div
                                style={{
                                    fontFamily: "'Barlow Condensed'",
                                    fontWeight: 700,
                                    fontSize: 24,
                                    color: COLORS.text,
                                    letterSpacing: "0.05em",
                                }}
                            >
                                {auth.user.name.toUpperCase()}
                            </div>
                            <div
                                style={{
                                    fontSize: 10,
                                    color: COLORS.muted,
                                    letterSpacing: "0.18em",
                                    marginTop: 4,
                                }}
                            >
                                {(userRole || 'STAFF').toUpperCase()} · DSUNNY STORE
                            </div>
                        </div>
                        <span
                            style={{
                                background: "rgba(74,222,128,0.1)",
                                color: COLORS.green,
                                padding: "4px 12px",
                                fontSize: 10,
                                fontFamily: "'Barlow Condensed'",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                            }}
                        >
                            ACTIVE
                        </span>
                    </div>

                    {/* Profile Information Form */}
                    <div
                        style={{
                            border: `1px solid ${COLORS.border}`,
                            background: COLORS.surface,
                            padding: 28,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 24,
                            }}
                        >
                            <div className="section-label">
                                ACCOUNT DETAILS
                            </div>
                        </div>

                        <form method="post" action={route('profile.update')}>
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                            <input type="hidden" name="_method" value="PATCH" />

                            <div style={{ marginBottom: 16 }}>
                                <div
                                    style={{
                                        fontSize: 9,
                                        color: COLORS.muted,
                                        letterSpacing: "0.18em",
                                        marginBottom: 6,
                                    }}
                                >
                                    FULL NAME
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={auth.user.name}
                                    style={{
                                        width: "100%",
                                        background: "#0d0d0d",
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        fontSize: 12,
                                        padding: "10px 14px",
                                        outline: "none",
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <div
                                    style={{
                                        fontSize: 9,
                                        color: COLORS.muted,
                                        letterSpacing: "0.18em",
                                        marginBottom: 6,
                                    }}
                                >
                                    EMAIL ADDRESS
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={auth.user.email}
                                    style={{
                                        width: "100%",
                                        background: "#0d0d0d",
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        fontSize: 12,
                                        padding: "10px 14px",
                                        outline: "none",
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    background: COLORS.yellow,
                                    color: "#0a0a0a",
                                    border: "none",
                                    fontFamily: "'Barlow Condensed'",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    padding: "10px 22px",
                                    cursor: "pointer",
                                    marginTop: 20,
                                }}
                            >
                                SAVE CHANGES
                            </button>
                        </form>
                    </div>

                    {/* Password Change Form */}
                    <div
                        style={{
                            border: `1px solid ${COLORS.border}`,
                            background: COLORS.surface,
                            padding: 28,
                        }}
                    >
                        <div className="section-label">SECURITY</div>
                        <div
                            style={{
                                fontFamily: "'Barlow Condensed'",
                                fontWeight: 700,
                                fontSize: 18,
                                color: COLORS.text,
                                marginBottom: 20,
                            }}
                        >
                            UPDATE PASSWORD
                        </div>

                        <form method="post" action={route('profile.update')}>
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                            <input type="hidden" name="_method" value="PATCH" />

                            <div style={{ marginBottom: 12 }}>
                                <div
                                    style={{
                                        fontSize: 9,
                                        color: COLORS.muted,
                                        letterSpacing: "0.18em",
                                        marginBottom: 6,
                                    }}
                                >
                                    CURRENT PASSWORD
                                </div>
                                <input
                                    type="password"
                                    name="current_password"
                                    style={{
                                        width: "100%",
                                        background: "#0d0d0d",
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        fontSize: 12,
                                        padding: "10px 14px",
                                        outline: "none",
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: 12 }}>
                                <div
                                    style={{
                                        fontSize: 9,
                                        color: COLORS.muted,
                                        letterSpacing: "0.18em",
                                        marginBottom: 6,
                                    }}
                                >
                                    NEW PASSWORD
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    style={{
                                        width: "100%",
                                        background: "#0d0d0d",
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        fontSize: 12,
                                        padding: "10px 14px",
                                        outline: "none",
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <div
                                    style={{
                                        fontSize: 9,
                                        color: COLORS.muted,
                                        letterSpacing: "0.18em",
                                        marginBottom: 6,
                                    }}
                                >
                                    CONFIRM PASSWORD
                                </div>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    style={{
                                        width: "100%",
                                        background: "#0d0d0d",
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        fontSize: 12,
                                        padding: "10px 14px",
                                        outline: "none",
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    background: COLORS.yellow,
                                    color: "#0a0a0a",
                                    border: "none",
                                    fontFamily: "'Barlow Condensed'",
                                    fontWeight: 700,
                                    fontSize: 12,
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    padding: "10px 22px",
                                    cursor: "pointer",
                                }}
                            >
                                UPDATE PASSWORD
                            </button>
                        </form>
                    </div>

                    {/* Logout */}
                    <div
                        style={{
                            border: `1px solid ${COLORS.border}`,
                            background: COLORS.surface,
                            padding: 24,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: COLORS.muted,
                                    letterSpacing: "0.05em",
                                }}
                            >
                                End your session securely.
                            </div>
                            <div
                                style={{
                                    fontSize: 10,
                                    color: COLORS.dim,
                                    letterSpacing: "0.1em",
                                    marginTop: 4,
                                }}
                            >
                                Last login: Today
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            style={{
                                background: "transparent",
                                color: COLORS.red,
                                border: `1px solid ${COLORS.red}`,
                                fontFamily: "'Barlow Condensed'",
                                fontWeight: 600,
                                fontSize: 12,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                padding: "8px 16px",
                                cursor: "pointer",
                            }}
                        >
                            SIGN OUT →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
