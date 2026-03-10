import { useState, useEffect, useRef } from "react";

export default function DesunnyLanding() {
    const [scrollY, setScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((p) => (p + 1) % 4);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: "▦",
            label: "INVENTORY",
            desc: "Track every product and stock level — built specifically for Dsunny's catalog and operations.",
        },
        {
            icon: "◈",
            label: "SALES & ORDERS",
            desc: "Simplify how Dsunny processes sales and manages orders from start to finish.",
        },
        {
            icon: "◉",
            label: "REPORTS",
            desc: "Monitor Dsunny's performance with real-time insights and tailored analytics.",
        },
        {
            icon: "◎",
            label: "STAFF",
            desc: "Manage Dsunny's employees, roles, and system access with full control.",
        },
    ];

    const stats = [
        { num: "1", label: "STORE. DSUNNY." },
        { num: "100%", label: "BUILT FOR YOU" },
        { num: "REAL", label: "TIME INSIGHTS" },
        { num: "ZERO", label: "GENERIC SETUP" },
    ];

    return (
        <div
            style={{
                background: "#0a0a0a",
                minHeight: "100vh",
                fontFamily: "'DM Mono', monospace",
                overflowX: "hidden",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Barlow+Condensed:wght@300;400;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #e8c547; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        .fade-up { animation: fadeUp 0.7s ease both; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.35s; }
        .d4 { animation-delay: 0.5s; }
        .d5 { animation-delay: 0.65s; }

        .nav-link {
          color: #444; font-size: 11px; letter-spacing: 0.15em;
          text-decoration: none; transition: color 0.2s;
        }
        .nav-link:hover { color: #e8c547; }

        .cta-primary {
          background: #e8c547; color: #0a0a0a; border: none;
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 14px 32px; cursor: pointer; transition: all 0.2s;
          text-decoration: none; display: inline-block;
        }
        .cta-primary:hover { background: #f5d660; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,197,71,0.25); }

        .cta-secondary {
          background: transparent; color: #555; border: 1px solid #222;
          font-family: 'Barlow Condensed', sans-serif; font-weight: 600;
          font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 14px 32px; cursor: pointer; transition: all 0.2s;
          text-decoration: none; display: inline-block;
        }
        .cta-secondary:hover { border-color: #e8c547; color: #e8c547; }

        .feature-card {
          border: 1px solid #1a1a1a; padding: 32px;
          transition: all 0.35s ease; cursor: pointer;
          position: relative; overflow: hidden; background: #0a0a0a;
        }
        .feature-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(232,197,71,0.05) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.35s;
        }
        .feature-card:hover::before, .feature-card.active::before { opacity: 1; }
        .feature-card:hover, .feature-card.active { border-color: #e8c547; transform: translateY(-2px); }

        .stat-item {
          border-left: 1px solid #1a1a1a; padding: 0 40px; transition: border-color 0.3s;
        }
        .stat-item:hover { border-left-color: #e8c547; }
        .stat-item:first-child { border-left: none; padding-left: 0; }

        .ticker-wrap { overflow: hidden; white-space: nowrap; border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; }
        .ticker-inner { display: inline-flex; animation: ticker 22s linear infinite; }

        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px);
          background-size: 60px 60px; opacity: 0.4;
        }

        .yellow-dot {
          width: 6px; height: 6px; background: #e8c547;
          border-radius: 50%; animation: pulse 2s ease infinite; display: inline-block;
        }

        .section-label {
          font-size: 10px; letter-spacing: 0.25em; color: #e8c547;
          text-transform: uppercase; margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .section-label::before {
          content: ''; display: block; width: 20px; height: 1px; background: #e8c547;
        }

        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; }
        .hamburger span { display: block; width: 22px; height: 1px; background: #555; transition: all 0.3s; }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .desktop-nav { display: none !important; }
          .hero-title { font-size: 52px !important; line-height: 0.9 !important; }
          .stats-row { flex-direction: column; gap: 24px !important; }
          .stat-item { border-left: none !important; border-top: 1px solid #1a1a1a; padding: 24px 0 0 0 !important; }
          .stat-item:first-child { border-top: none; padding-top: 0 !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .split-section { flex-direction: column !important; }
          .split-section > * { width: 100% !important; }
          .hero-btns { flex-direction: column; align-items: flex-start; }
          .cta-band { padding: 48px 28px !important; margin: 0 24px 60px !important; }
          .cta-band h2 { font-size: 44px !important; }
          section, footer { padding-left: 24px !important; padding-right: 24px !important; }
          .ticker-wrap { display: none; }
        }
      `}</style>

            {/* NAV */}
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background:
                        scrollY > 40 ? "rgba(10,10,10,0.95)" : "transparent",
                    backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
                    borderBottom:
                        scrollY > 40
                            ? "1px solid #1a1a1a"
                            : "1px solid transparent",
                    transition: "all 0.4s ease",
                    padding: "0 48px",
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                        style={{
                            width: 26,
                            height: 26,
                            border: "2px solid #e8c547",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 3,
                            padding: 4,
                        }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    background: i === 0 ? "#e8c547" : "#2a2a2a",
                                }}
                            />
                        ))}
                    </div>
                    <span
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 800,
                            fontSize: 17,
                            color: "#f0f0f0",
                            letterSpacing: "0.1em",
                        }}
                    >
                        DSUNNY
                    </span>
                    <span
                        style={{
                            color: "#2a2a2a",
                            fontSize: 11,
                            letterSpacing: "0.05em",
                            marginLeft: 2,
                        }}
                    >
                        STORE
                    </span>
                </div>

                <div
                    className="desktop-nav"
                    style={{ display: "flex", alignItems: "center", gap: 36 }}
                >
                    {["FEATURES", "REPORTS", "STAFF", "CONTACT"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="nav-link"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <div
                    className="desktop-nav"
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                    <a href="/login" className="nav-link">
                        LOG IN
                    </a>
                    <a
                        href="#"
                        className="cta-primary"
                        style={{ padding: "10px 22px", fontSize: 11 }}
                    >
                        ACCESS SYSTEM
                    </a>
                </div>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span
                        style={{
                            transform: menuOpen
                                ? "rotate(45deg) translate(4px, 4px)"
                                : "none",
                        }}
                    />
                    <span style={{ opacity: menuOpen ? 0 : 1 }} />
                    <span
                        style={{
                            transform: menuOpen
                                ? "rotate(-45deg) translate(4px, -4px)"
                                : "none",
                        }}
                    />
                </button>
            </nav>

            {menuOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 64,
                        left: 0,
                        right: 0,
                        zIndex: 99,
                        background: "#0d0d0d",
                        borderBottom: "1px solid #1a1a1a",
                        padding: "24px 32px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                    }}
                >
                    {["FEATURES", "REPORTS", "STAFF", "LOG IN"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="nav-link"
                            style={{ fontSize: 14 }}
                        >
                            {item}
                        </a>
                    ))}
                    <a
                        href="#"
                        className="cta-primary"
                        style={{ textAlign: "center", marginTop: 8 }}
                    >
                        ACCESS SYSTEM →
                    </a>
                </div>
            )}

            {/* HERO */}
            <section
                style={{
                    position: "relative",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                <div className="grid-bg" />
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        right: "5%",
                        width: 500,
                        height: 500,
                        background:
                            "radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 65%)",
                        pointerEvents: "none",
                        transform: `translateY(${scrollY * 0.15}px)`,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "0%",
                        width: 300,
                        height: 300,
                        background:
                            "radial-gradient(circle, rgba(232,197,71,0.04) 0%, transparent 65%)",
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        padding: "120px 48px 80px",
                        width: "100%",
                    }}
                >
                    <div
                        className="fade-up d1 section-label"
                        style={{ marginBottom: 28 }}
                    >
                        <span className="yellow-dot" />
                        DEDICATED STORE MANAGEMENT · BUILT FOR DSUNNY
                    </div>

                    <h1
                        className="fade-up d2 hero-title"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: 96,
                            fontWeight: 900,
                            color: "#f0f0f0",
                            lineHeight: 0.88,
                            letterSpacing: "-0.01em",
                            marginBottom: 32,
                            maxWidth: 820,
                        }}
                    >
                        DSUNNY STORE.
                        <br />
                        <span style={{ color: "#e8c547" }}>YOUR STORE,</span>
                        <br />
                        SIMPLIFIED.
                    </h1>

                    <p
                        className="fade-up d3"
                        style={{
                            color: "#555",
                            fontSize: 14,
                            lineHeight: 2,
                            letterSpacing: "0.04em",
                            maxWidth: 480,
                            marginBottom: 44,
                        }}
                    >
                        Dsunny Store is built exclusively for Dsunny. Manage
                        inventory, track sales, process orders, and generate
                        reports — no generic setup, no extra noise. Everything
                        here is made just for you.
                    </p>

                    <div
                        className="fade-up d4 hero-btns"
                        style={{
                            display: "flex",
                            gap: 16,
                            alignItems: "center",
                        }}
                    >
                        <a href="#" className="cta-primary">
                            ACCESS THE SYSTEM →
                        </a>
                        <a href="#features" className="cta-secondary">
                            SEE FEATURES
                        </a>
                    </div>

                    <div
                        className="fade-up d5"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 12,
                            border: "1px solid #1a1a1a",
                            padding: "12px 20px",
                            marginTop: 52,
                            background: "rgba(255,255,255,0.02)",
                        }}
                    >
                        <span className="yellow-dot" />
                        <span
                            style={{
                                color: "#333",
                                fontSize: 11,
                                letterSpacing: "0.12em",
                            }}
                        >
                            TAILORED EXCLUSIVELY FOR DSUNNY · NOT A GENERIC TOOL
                        </span>
                    </div>
                </div>
            </section>

            {/* TICKER */}
            <div className="ticker-wrap" style={{ padding: "14px 0" }}>
                <div className="ticker-inner">
                    {[...Array(2)].map((_, ri) => (
                        <span key={ri} style={{ display: "inline-flex" }}>
                            {[
                                "INVENTORY TRACKING",
                                "SALES PROCESSING",
                                "ORDER MANAGEMENT",
                                "REAL-TIME REPORTS",
                                "STAFF ACCESS CONTROL",
                                "DSUNNY-ONLY SETUP",
                                "PERFORMANCE ANALYTICS",
                                "STOCK MONITORING",
                            ].map((item, i) => (
                                <span
                                    key={i}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 24,
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#2a2a2a",
                                            fontSize: 11,
                                            letterSpacing: "0.2em",
                                        }}
                                    >
                                        {item}
                                    </span>
                                    <span
                                        style={{
                                            color: "#e8c547",
                                            margin: "0 24px",
                                        }}
                                    >
                                        ◆
                                    </span>
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

            {/* STATS */}
            <section
                style={{
                    padding: "80px 48px",
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
            >
                <div className="stats-row" style={{ display: "flex", gap: 0 }}>
                    {stats.map((s, i) => (
                        <div key={i} className="stat-item" style={{ flex: 1 }}>
                            <div
                                style={{
                                    fontFamily:
                                        "'Barlow Condensed', sans-serif",
                                    fontSize: 52,
                                    fontWeight: 800,
                                    color: "#f0f0f0",
                                    lineHeight: 1,
                                    letterSpacing: "-0.01em",
                                    marginBottom: 8,
                                }}
                            >
                                {s.num}
                            </div>
                            <div
                                style={{
                                    color: "#333",
                                    fontSize: 10,
                                    letterSpacing: "0.2em",
                                }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section
                id="features"
                style={{
                    padding: "80px 48px",
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
            >
                <div className="section-label">WHAT IT DOES</div>
                <h2
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 52,
                        fontWeight: 800,
                        color: "#f0f0f0",
                        letterSpacing: "0.01em",
                        marginBottom: 16,
                        lineHeight: 1,
                    }}
                >
                    EVERYTHING DSUNNY
                    <br />
                    <span style={{ color: "#e8c547" }}>ACTUALLY NEEDS.</span>
                </h2>
                <p
                    style={{
                        color: "#333",
                        fontSize: 12,
                        letterSpacing: "0.08em",
                        marginBottom: 48,
                        maxWidth: 480,
                        lineHeight: 1.9,
                    }}
                >
                    No bloat. No features for someone else's store. Just the
                    tools Dsunny needs to run smoothly every day.
                </p>

                <div
                    className="features-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 1,
                        background: "#111",
                    }}
                >
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className={`feature-card ${activeFeature === i ? "active" : ""}`}
                            onMouseEnter={() => setActiveFeature(i)}
                        >
                            <div
                                style={{
                                    fontFamily:
                                        "'Barlow Condensed', sans-serif",
                                    fontSize: 28,
                                    color:
                                        activeFeature === i
                                            ? "#e8c547"
                                            : "#2a2a2a",
                                    marginBottom: 20,
                                    transition: "color 0.3s",
                                }}
                            >
                                {f.icon}
                            </div>
                            <div
                                style={{
                                    fontFamily:
                                        "'Barlow Condensed', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    color: "#f0f0f0",
                                    letterSpacing: "0.1em",
                                    marginBottom: 12,
                                }}
                            >
                                {f.label}
                            </div>
                            <p
                                style={{
                                    color: "#444",
                                    fontSize: 12,
                                    lineHeight: 1.9,
                                    letterSpacing: "0.03em",
                                }}
                            >
                                {f.desc}
                            </p>
                            <div
                                style={{
                                    marginTop: 28,
                                    color:
                                        activeFeature === i
                                            ? "#e8c547"
                                            : "#1a1a1a",
                                    fontSize: 18,
                                    transition: "color 0.3s",
                                }}
                            >
                                →
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SPLIT — WHY */}
            <section
                style={{
                    padding: "80px 48px",
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
            >
                <div
                    className="split-section"
                    style={{ display: "flex", gap: 80, alignItems: "center" }}
                >
                    <div style={{ flex: 1 }}>
                        <div className="section-label">
                            THE DSUNNY DIFFERENCE
                        </div>
                        <h2
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 52,
                                fontWeight: 800,
                                color: "#f0f0f0",
                                lineHeight: 1,
                                marginBottom: 28,
                            }}
                        >
                            NOT BUILT FOR
                            <br />
                            EVERYONE.
                            <br />
                            <span style={{ color: "#e8c547" }}>
                                BUILT FOR YOU.
                            </span>
                        </h2>
                        <p
                            style={{
                                color: "#444",
                                fontSize: 13,
                                lineHeight: 2,
                                letterSpacing: "0.04em",
                                marginBottom: 36,
                            }}
                        >
                            Generic store systems come with features for
                            hundreds of different businesses. Dsunny Store
                            strips all of that away. Every screen, every report,
                            every workflow is shaped around how Dsunny operates
                            — nothing more, nothing less.
                        </p>
                        {[
                            "Inventory configured for Dsunny's product catalog",
                            "Reports designed around Dsunny's KPIs",
                            "Staff roles built for Dsunny's team structure",
                            "No irrelevant settings or confusing toggles",
                        ].map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                    marginBottom: 14,
                                }}
                            >
                                <div
                                    style={{
                                        width: 5,
                                        height: 5,
                                        background: "#e8c547",
                                        flexShrink: 0,
                                    }}
                                />
                                <span
                                    style={{
                                        color: "#555",
                                        fontSize: 12,
                                        letterSpacing: "0.06em",
                                    }}
                                >
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Dashboard preview */}
                    <div style={{ flex: 1, position: "relative" }}>
                        <div
                            style={{
                                border: "1px solid #1a1a1a",
                                padding: 40,
                                background: "rgba(255,255,255,0.01)",
                                position: "relative",
                            }}
                        >
                            {/* Corner accents */}
                            {[
                                {
                                    top: "-1px",
                                    left: "-1px",
                                    borderTop: "2px solid #e8c547",
                                    borderLeft: "2px solid #e8c547",
                                },
                                {
                                    top: "-1px",
                                    right: "-1px",
                                    borderTop: "2px solid #e8c547",
                                    borderRight: "2px solid #e8c547",
                                },
                                {
                                    bottom: "-1px",
                                    right: "-1px",
                                    borderBottom: "2px solid #e8c547",
                                    borderRight: "2px solid #e8c547",
                                },
                                {
                                    bottom: "-1px",
                                    left: "-1px",
                                    borderBottom: "2px solid #e8c547",
                                    borderLeft: "2px solid #e8c547",
                                },
                            ].map((style, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: "absolute",
                                        width: 12,
                                        height: 12,
                                        ...style,
                                    }}
                                />
                            ))}

                            <div
                                style={{
                                    fontFamily: "'Barlow Condensed'",
                                    color: "#e8c547",
                                    fontSize: 11,
                                    letterSpacing: "0.2em",
                                    marginBottom: 24,
                                }}
                            >
                                DSUNNY · LIVE OVERVIEW
                            </div>

                            {[
                                {
                                    label: "TODAY'S SALES",
                                    val: "₦ 847,200",
                                    up: true,
                                },
                                {
                                    label: "PENDING ORDERS",
                                    val: "23",
                                    up: true,
                                },
                                {
                                    label: "LOW STOCK ITEMS",
                                    val: "4 PRODUCTS",
                                    up: false,
                                },
                                { label: "STAFF ON DUTY", val: "6", up: true },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "14px 0",
                                        borderBottom:
                                            i < 3 ? "1px solid #111" : "none",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#333",
                                            fontSize: 10,
                                            letterSpacing: "0.15em",
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily:
                                                    "'Barlow Condensed'",
                                                fontWeight: 700,
                                                color: "#f0f0f0",
                                                fontSize: 18,
                                                letterSpacing: "0.05em",
                                            }}
                                        >
                                            {item.val}
                                        </span>
                                        <span
                                            style={{
                                                color: item.up
                                                    ? "#4ade80"
                                                    : "#f87171",
                                                fontSize: 10,
                                            }}
                                        >
                                            {item.up ? "▲" : "▼"}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div style={{ marginTop: 28 }}>
                                <div
                                    style={{
                                        color: "#222",
                                        fontSize: 10,
                                        letterSpacing: "0.15em",
                                        marginBottom: 12,
                                    }}
                                >
                                    DSUNNY WEEKLY SALES
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 6,
                                        alignItems: "flex-end",
                                        height: 52,
                                    }}
                                >
                                    {[45, 60, 38, 75, 50, 88, 62].map(
                                        (h, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    flex: 1,
                                                    height: `${h}%`,
                                                    background:
                                                        i === 5
                                                            ? "#e8c547"
                                                            : "#1a1a1a",
                                                    transition:
                                                        "height 0.5s ease",
                                                }}
                                            />
                                        ),
                                    )}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 6,
                                        marginTop: 6,
                                    }}
                                >
                                    {["M", "T", "W", "T", "F", "S", "S"].map(
                                        (d, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    flex: 1,
                                                    textAlign: "center",
                                                    color: "#222",
                                                    fontSize: 9,
                                                }}
                                            >
                                                {d}
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section
                style={{
                    padding: "80px 48px",
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
            >
                <div className="section-label">HOW IT WORKS</div>
                <h2
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 52,
                        fontWeight: 800,
                        color: "#f0f0f0",
                        lineHeight: 1,
                        marginBottom: 56,
                    }}
                >
                    SIMPLE BY
                    <br />
                    <span style={{ color: "#e8c547" }}>DESIGN.</span>
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 1,
                        background: "#111",
                    }}
                >
                    {[
                        {
                            step: "01",
                            title: "LOG IN",
                            body: "Authorized Dsunny staff access the system securely. No public signups — access is controlled.",
                        },
                        {
                            step: "02",
                            title: "MANAGE",
                            body: "Update inventory, process orders, and track sales in real time — all within a clean, focused interface.",
                        },
                        {
                            step: "03",
                            title: "REPORT",
                            body: "Generate performance reports for Dsunny at any time. Know exactly where things stand.",
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            style={{
                                background: "#0a0a0a",
                                padding: 36,
                                borderTop:
                                    i === 1
                                        ? "2px solid #e8c547"
                                        : "2px solid transparent",
                                transition: "border-color 0.3s",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.borderTopColor =
                                    "#e8c547")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.borderTopColor =
                                    i === 1 ? "#e8c547" : "transparent")
                            }
                        >
                            <div
                                style={{
                                    fontFamily: "'Barlow Condensed'",
                                    fontWeight: 900,
                                    fontSize: 72,
                                    color: "#111",
                                    lineHeight: 1,
                                    marginBottom: 20,
                                }}
                            >
                                {s.step}
                            </div>
                            <div
                                style={{
                                    fontFamily: "'Barlow Condensed'",
                                    fontWeight: 700,
                                    fontSize: 20,
                                    color: "#f0f0f0",
                                    letterSpacing: "0.1em",
                                    marginBottom: 12,
                                }}
                            >
                                {s.title}
                            </div>
                            <p
                                style={{
                                    color: "#444",
                                    fontSize: 12,
                                    lineHeight: 1.9,
                                    letterSpacing: "0.04em",
                                }}
                            >
                                {s.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA BAND */}
            <section
                className="cta-band"
                style={{
                    margin: "0 48px 80px",
                    border: "1px solid #1a1a1a",
                    padding: "72px 60px",
                    position: "relative",
                    overflow: "hidden",
                    background: "rgba(232,197,71,0.02)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "-50%",
                        right: "-10%",
                        width: 400,
                        height: 400,
                        background:
                            "radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 65%)",
                        pointerEvents: "none",
                    }}
                />
                <div style={{ position: "relative" }}>
                    <div className="section-label">READY TO GO</div>
                    <h2
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: 64,
                            fontWeight: 900,
                            color: "#f0f0f0",
                            lineHeight: 0.95,
                            letterSpacing: "-0.01em",
                            marginBottom: 24,
                        }}
                    >
                        DSUNNY'S STORE.
                        <br />
                        <span style={{ color: "#e8c547" }}>
                            FULLY IN CONTROL.
                        </span>
                    </h2>
                    <p
                        style={{
                            color: "#444",
                            fontSize: 13,
                            letterSpacing: "0.05em",
                            marginBottom: 40,
                            maxWidth: 420,
                            lineHeight: 2,
                        }}
                    >
                        Everything you need to run Dsunny is right here.
                        Inventory, sales, reports, and staff — simplified and in
                        one place, exactly how Dsunny needs it.
                    </p>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <a href="#" className="cta-primary">
                            ACCESS THE SYSTEM →
                        </a>
                        <a href="#features" className="cta-secondary">
                            LEARN MORE
                        </a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer
                style={{
                    borderTop: "1px solid #111",
                    padding: "36px 48px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 20,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                        style={{
                            width: 20,
                            height: 20,
                            border: "1.5px solid #e8c547",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 2,
                            padding: 3,
                        }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    background: i === 0 ? "#e8c547" : "#1a1a1a",
                                }}
                            />
                        ))}
                    </div>
                    <span
                        style={{
                            fontFamily: "'Barlow Condensed'",
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#2a2a2a",
                            letterSpacing: "0.1em",
                        }}
                    >
                        DSUNNY STORE
                    </span>
                </div>

                <div style={{ display: "flex", gap: 28 }}>
                    {["FEATURES", "REPORTS", "STAFF", "CONTACT"].map((item) => (
                        <a key={item} href="#" className="nav-link">
                            {item}
                        </a>
                    ))}
                </div>

                <span
                    style={{
                        color: "#1a1a1a",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                    }}
                >
                    © 2026 DSUNNY. INTERNAL USE ONLY.
                </span>
            </footer>
        </div>
    );
}
