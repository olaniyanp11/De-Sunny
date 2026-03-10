import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

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
    blue: "#3b82f6",
    purple: "#8b5cf6",
};

export default function Index({ salesData, ordersData, topProducts, summary, filters }) {
    const { auth } = usePage().props;
    const [selectedPeriod, setSelectedPeriod] = useState(filters.period);
    const [selectedDate, setSelectedDate] = useState(filters.date);

    const handleFilterChange = () => {
        router.get(route('analytics.index'), {
            period: selectedPeriod,
            date: selectedDate,
        }, { preserveState: true });
    };

    // Sales Chart Data
    const salesChartData = {
        labels: salesData.map(item => item.label),
        datasets: [
            {
                label: 'Sales (₦)',
                data: salesData.map(item => item.sales),
                borderColor: COLORS.yellow,
                backgroundColor: COLORS.yellow + '20',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const salesChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: COLORS.text },
            },
            title: {
                display: true,
                text: 'Sales Trend',
                color: COLORS.text,
            },
        },
        scales: {
            x: {
                ticks: { color: COLORS.muted },
                grid: { color: COLORS.border },
            },
            y: {
                ticks: { color: COLORS.muted },
                grid: { color: COLORS.border },
            },
        },
    };

    // Orders Chart Data
    const ordersChartData = {
        labels: ordersData.map(item => item.label),
        datasets: [
            {
                label: 'Total Orders',
                data: ordersData.map(item => item.total),
                backgroundColor: COLORS.blue,
                borderColor: COLORS.blue,
                borderWidth: 1,
            },
            {
                label: 'Completed Orders',
                data: ordersData.map(item => item.completed),
                backgroundColor: COLORS.green,
                borderColor: COLORS.green,
                borderWidth: 1,
            },
            {
                label: 'Pending Orders',
                data: ordersData.map(item => item.pending),
                backgroundColor: COLORS.orange,
                borderColor: COLORS.orange,
                borderWidth: 1,
            },
        ],
    };

    const ordersChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: COLORS.text },
            },
            title: {
                display: true,
                text: 'Orders Overview',
                color: COLORS.text,
            },
        },
        scales: {
            x: {
                ticks: { color: COLORS.muted },
                grid: { color: COLORS.border },
            },
            y: {
                ticks: { color: COLORS.muted },
                grid: { color: COLORS.border },
            },
        },
    };

    // Top Products Chart Data
    const topProductsChartData = {
        labels: topProducts.map(item => item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name),
        datasets: [
            {
                label: 'Revenue (₦)',
                data: topProducts.map(item => item.revenue),
                backgroundColor: [
                    COLORS.yellow,
                    COLORS.green,
                    COLORS.blue,
                    COLORS.purple,
                    COLORS.orange,
                    COLORS.red,
                ],
                borderWidth: 1,
            },
        ],
    };

    const topProductsChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: COLORS.text },
            },
            title: {
                display: true,
                text: 'Top Products by Revenue',
                color: COLORS.text,
            },
        },
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
                        maxWidth: 1400,
                        margin: "0 auto",
                    }}
                >
                    {/* Header */}
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
                            ANALYTICS & REPORTS
                        </h1>

                        {/* Filters */}
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                style={{
                                    background: COLORS.surface,
                                    border: `1px solid ${COLORS.border}`,
                                    color: COLORS.text,
                                    padding: "8px 12px",
                                    fontSize: 14,
                                    fontFamily: "'DM Mono', monospace",
                                }}
                            >
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>

                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                style={{
                                    background: COLORS.surface,
                                    border: `1px solid ${COLORS.border}`,
                                    color: COLORS.text,
                                    padding: "8px 12px",
                                    fontSize: 14,
                                    fontFamily: "'DM Mono', monospace",
                                }}
                            />

                            <button
                                onClick={handleFilterChange}
                                style={{
                                    background: COLORS.yellow,
                                    color: COLORS.bg,
                                    border: "none",
                                    padding: "8px 16px",
                                    fontSize: 14,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    cursor: "pointer",
                                }}
                            >
                                APPLY
                            </button>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: 20,
                            marginBottom: 32,
                        }}
                    >
                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.yellow, marginBottom: 8 }}>
                                ₦{summary.total_sales.toLocaleString()}
                            </div>
                            <div style={{ color: COLORS.muted, fontSize: 14, textTransform: "uppercase" }}>
                                Total Sales
                            </div>
                        </div>

                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.blue, marginBottom: 8 }}>
                                {summary.total_orders}
                            </div>
                            <div style={{ color: COLORS.muted, fontSize: 14, textTransform: "uppercase" }}>
                                Total Orders
                            </div>
                        </div>

                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.green, marginBottom: 8 }}>
                                {summary.completed_orders}
                            </div>
                            <div style={{ color: COLORS.muted, fontSize: 14, textTransform: "uppercase" }}>
                                Completed Orders
                            </div>
                        </div>

                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.orange, marginBottom: 8 }}>
                                {summary.pending_orders}
                            </div>
                            <div style={{ color: COLORS.muted, fontSize: 14, textTransform: "uppercase" }}>
                                Pending Orders
                            </div>
                        </div>

                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.red, marginBottom: 8 }}>
                                {summary.low_stock_products}
                            </div>
                            <div style={{ color: COLORS.muted, fontSize: 14, textTransform: "uppercase" }}>
                                Low Stock Products
                            </div>
                        </div>

                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.purple, marginBottom: 8 }}>
                                {summary.total_products}
                            </div>
                            <div style={{ color: COLORS.muted, fontSize: 14, textTransform: "uppercase" }}>
                                Total Products
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 32,
                            marginBottom: 32,
                        }}
                    >
                        {/* Sales Chart */}
                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                            }}
                        >
                            <Line data={salesChartData} options={salesChartOptions} />
                        </div>

                        {/* Orders Chart */}
                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 24,
                            }}
                        >
                            <Bar data={ordersChartData} options={ordersChartOptions} />
                        </div>
                    </div>

                    {/* Top Products */}
                    <div
                        style={{
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            padding: 24,
                            marginBottom: 32,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: 20,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                marginBottom: 16,
                            }}
                        >
                            TOP PRODUCTS BY REVENUE
                        </h3>

                        <div style={{ height: 300 }}>
                            <Bar data={topProductsChartData} options={topProductsChartOptions} />
                        </div>
                    </div>

                    {/* Top Products Table */}
                    <div
                        style={{
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            padding: 24,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: 20,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                marginBottom: 16,
                            }}
                        >
                            TOP PRODUCTS DETAILS
                        </h3>

                        <div style={{ overflowX: 'auto' }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th style={{ padding: 12, textAlign: "left", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.muted, fontSize: 12, textTransform: "uppercase" }}>
                                            Product
                                        </th>
                                        <th style={{ padding: 12, textAlign: "right", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.muted, fontSize: 12, textTransform: "uppercase" }}>
                                            Quantity Sold
                                        </th>
                                        <th style={{ padding: 12, textAlign: "right", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.muted, fontSize: 12, textTransform: "uppercase" }}>
                                            Revenue (₦)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: 12, borderBottom: `1px solid ${COLORS.border}` }}>
                                                {product.name}
                                            </td>
                                            <td style={{ padding: 12, textAlign: "right", borderBottom: `1px solid ${COLORS.border}` }}>
                                                {product.quantity}
                                            </td>
                                            <td style={{ padding: 12, textAlign: "right", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.yellow }}>
                                                ₦{product.revenue.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}