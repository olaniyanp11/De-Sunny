import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/feColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

export default function LoginPage({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [focused, setFocused] = useState(null);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0a0a0a",
                display: "flex",
                fontFamily: "'DM Mono', monospace",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Head title="Log in" />

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Barlow+Condensed:wght@300;400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .input-field {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #2a2a2a;
          color: #f0f0f0;
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          padding: 14px 0;
          outline: none;
          transition: border-color 0.3s ease;
          letter-spacing: 0.05em;
        }

        .input-field::placeholder { color: #3a3a3a; }
        .input-field:focus { border-bottom-color: #e8c547; }

        .submit-btn {
          width: 100%;
          background: #e8c547;
          color: #0a0a0a;
          border: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover { background: #f0d060; transform: translateY(-1px); }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .grid-line { position: absolute; background: #1a1a1a; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }

        .card { animation: fadeUp 0.6s ease both; }
        .card-delay-1 { animation-delay: 0.1s; }
        .card-delay-2 { animation-delay: 0.2s; }
        .card-delay-3 { animation-delay: 0.3s; }

        .forgot-link { color: #555; font-size: 11px; text-decoration: none; letter-spacing: 0.08em; transition: color 0.2s; }
        .forgot-link:hover { color: #e8c547; }

        .eye-btn { background: none; border: none; cursor: pointer; color: #3a3a3a; transition: color 0.2s; padding: 0; display: flex; align-items: center; }
        .eye-btn:hover { color: #e8c547; }
      `}</style>

            {/* Grid background */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={`v${i}`}
                    className="grid-line"
                    style={{
                        left: `${i * 14.28}%`,
                        top: 0,
                        width: "1px",
                        height: "100%",
                    }}
                />
            ))}
            {[...Array(6)].map((_, i) => (
                <div
                    key={`h${i}`}
                    className="grid-line"
                    style={{
                        top: `${i * 20}%`,
                        left: 0,
                        height: "1px",
                        width: "100%",
                    }}
                />
            ))}

            {/* Left panel */}
            <div
                style={{
                    width: "45%",
                    borderRight: "1px solid #1a1a1a",
                    padding: "60px 56px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                }}
            >
                <div className="card">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                border: "2px solid #e8c547",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 3,
                                padding: 5,
                            }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background:
                                            i === 0 ? "#e8c547" : "#2a2a2a",
                                    }}
                                />
                            ))}
                        </div>
                        <span
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 700,
                                fontSize: 18,
                                color: "#f0f0f0",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                            }}
                        >
                            STOREFRONT
                        </span>
                    </div>
                    <div
                        style={{
                            width: 32,
                            height: 1,
                            background: "#e8c547",
                            marginBottom: 4,
                            marginLeft: 38,
                        }}
                    />
                </div>
            </div>

            {/* Right panel — Login form */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 60,
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    className="card card-delay-2"
                    style={{ width: "100%", maxWidth: 380 }}
                >
                    <Head title="Log in" />

                    {/* Header */}
                    <div style={{ marginBottom: 52 }}>
                        <p
                            style={{
                                color: "#e8c547",
                                fontSize: 11,
                                letterSpacing: "0.18em",
                                marginBottom: 10,
                            }}
                        >
                            SECURE ACCESS
                        </p>
                        <h2
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 36,
                                fontWeight: 700,
                                color: "#f0f0f0",
                                letterSpacing: "0.02em",
                            }}
                        >
                            Sign in
                        </h2>
                    </div>

                    {/* Email */}
                    <div
                        className="card card-delay-3"
                        style={{ marginBottom: 36, position: "relative" }}
                    >
                        <label
                            style={{
                                display: "block",
                                color: focused === "email" ? "#e8c547" : "#444",
                                fontSize: 10,
                                letterSpacing: "0.18em",
                                marginBottom: 4,
                                transition: "color 0.3s",
                            }}
                        >
                            EMAIL ADDRESS
                        </label>
                        <input
                            className="input-field"
                            type="email"
                            placeholder="you@company.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                        />
                        {errors.email && (
                            <p style={{ color: "#ff6b6b", fontSize: 12 }}>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div
                        className="card card-delay-3"
                        style={{ marginBottom: 14, position: "relative" }}
                    >
                        <label
                            style={{
                                display: "block",
                                color:
                                    focused === "password" ? "#e8c547" : "#444",
                                fontSize: 10,
                                letterSpacing: "0.18em",
                                marginBottom: 4,
                                transition: "color 0.3s",
                            }}
                        >
                            PASSWORD
                        </label>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <input
                                className="input-field"
                                type={showPass ? "text" : "password"}
                                placeholder="••••••••••••"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                onFocus={() => setFocused("password")}
                                onBlur={() => setFocused(null)}
                                style={{ paddingRight: 32 }}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPass(!showPass)}
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    bottom: 14,
                                }}
                            >
                                {showPass ? (
                                    <svg
                                        width="16"
                                        height="16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                                    </svg>
                                ) : (
                                    <svg
                                        width="16"
                                        height="16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p style={{ color: "#ff6b6b", fontSize: 12 }}>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Forgot */}
                    {canResetPassword && (
                        <div style={{ textAlign: "right", marginBottom: 40 }}>
                            <Link
                                href={route("password.request")}
                                className="forgot-link"
                            >
                                FORGOT PASSWORD?
                            </Link>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={processing || !data.email || !data.password}
                    >
                        {processing ? (
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10,
                                }}
                            >
                                <span
                                    style={{
                                        width: 14,
                                        height: 14,
                                        border: "2px solid #0a0a0a",
                                        borderTopColor: "transparent",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                        animation: "spin 0.8s linear infinite",
                                    }}
                                />
                                AUTHENTICATING...
                            </span>
                        ) : (
                            "ACCESS SYSTEM →"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
