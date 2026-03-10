import { Link, usePage } from "@inertiajs/react";
import {
    HiOutlineHome,
    HiOutlineShoppingBag,
    HiOutlineClipboardList,
    HiOutlineUsers,
    HiOutlineChartBar,
    HiOutlineTrendingUp,
    HiOutlineCog,
    HiOutlineLogout,
    HiOutlineClock
} from "react-icons/hi";

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

const getNavItems = (userRole) => {
    const baseItems = [
        { id: "overview", label: "OVERVIEW", icon: HiOutlineHome, route: "dashboard" },
    ];

    if (userRole === 'staff') {
        baseItems.push(
            { id: "orders", label: "ORDERS", icon: HiOutlineClipboardList, route: "orders.index" },
        );
    }

    if (userRole === 'manager' || userRole === 'admin') {
        baseItems.push(
            { id: "analytics", label: "ANALYTICS", icon: HiOutlineTrendingUp, route: "analytics.index" },
            { id: "products", label: "PRODUCTS", icon: HiOutlineShoppingBag, route: "products.index" },
            { id: "categories", label: "CATEGORIES", icon: HiOutlineChartBar, route: "categories.index" },
            { id: "orders", label: "ORDERS", icon: HiOutlineClipboardList, route: "orders.index" },
        );
    }

    if (userRole === 'admin') {
        baseItems.push(
            { id: "users", label: "USERS", icon: HiOutlineUsers, route: "users.index" },
        );
    }

    // Activity Logs - Admin and Manager only
    if (userRole === 'admin' || userRole === 'manager') {
        baseItems.push(
            { id: "activity-logs", label: "ACTIVITY LOGS", icon: HiOutlineClock, route: "activity-logs.index" },
        );
    }

    baseItems.push(
        { id: "reports", label: "REPORTS", icon: HiOutlineChartBar, route: "dashboard" },
        { id: "profile", label: "PROFILE", icon: HiOutlineCog, route: "profile.edit" },
    );

    return baseItems;
};

export default function Sidebar() {
    const { auth } = usePage().props;
    const userRole = auth.user.role || 'staff';
    const navItems = getNavItems(userRole);

    return (
        <div
            style={{
                width: 280,
                background: COLORS.surface,
                borderRight: `1px solid ${COLORS.border}`,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 10,
            }}
        >
            <div
                style={{
                    marginBottom: 48,
                }}
            >
                <h1
                    style={{
                        fontSize: 20,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: COLORS.yellow,
                    }}
                >
                    DSUNNY STORE
                </h1>
                <p
                    style={{
                        fontSize: 12,
                        color: COLORS.muted,
                        marginTop: 4,
                    }}
                >
                    {auth.user.name} • {(userRole || 'STAFF').toUpperCase()}
                </p>
            </div>

            <nav style={{ flex: 1 }}>
                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <Link
                            key={item.id}
                            href={route(item.route)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "12px 16px",
                                marginBottom: 8,
                                textDecoration: "none",
                                color: COLORS.text,
                                borderRadius: 4,
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = COLORS.border;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "transparent";
                            }}
                        >
                            <IconComponent size={16} />
                            <span
                                style={{
                                    fontSize: 14,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div
                style={{
                    marginTop: "auto",
                    paddingTop: 24,
                    borderTop: `1px solid ${COLORS.border}`,
                }}
            >
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    style={{
                        width: "100%",
                        background: "transparent",
                        border: `1px solid ${COLORS.red}`,
                        color: COLORS.red,
                        padding: "12px",
                        fontSize: 12,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                    }}
                >
                    <HiOutlineLogout size={14} />
                    LOGOUT
                </Link>
            </div>
        </div>
    );
}