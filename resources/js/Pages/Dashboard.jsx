import OverView from "@/Components/OverView";
import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";

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

export default function Dashboard() {
    const { todaySales, pendingOrders, lowStockProducts } = usePage().props;

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
                    }}
                >
                    <div>
                        <div className="section-label">
                            DASHBOARD
                        </div>
                        <div
                            style={{
                                fontFamily: "'Barlow Condensed'",
                                fontWeight: 800,
                                fontSize: 32,
                                color: COLORS.text,
                            }}
                        >
                            WELCOME BACK
                        </div>
                    </div>

                    <OverView
                        todaySales={todaySales}
                        pendingOrders={pendingOrders}
                        lowStockProducts={lowStockProducts}
                    />
                </div>
            </div>
        </div>
    );
}
