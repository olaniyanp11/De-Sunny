import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
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

export default function Index({ orders, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [date, setDate] = useState(filters.date || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('orders.index'), { search, date }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        setDate('');
        router.get(route('orders.index'), {}, { preserveState: true });
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
                            ORDER HISTORY
                        </h1>
                        <Link
                            href={route('orders.create')}
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
                            NEW ORDER
                        </Link>
                    </div>

                    {/* Search and Filter */}
                    <div
                        style={{
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            padding: 16,
                            marginBottom: 32,
                        }}
                    >
                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Search by Order ID or Customer Name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    flex: 1,
                                    background: COLORS.bg,
                                    border: `1px solid ${COLORS.border}`,
                                    color: COLORS.text,
                                    padding: '8px 12px',
                                    fontSize: 14,
                                    fontFamily: "'DM Mono', monospace",
                                }}
                            />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                style={{
                                    background: COLORS.bg,
                                    border: `1px solid ${COLORS.border}`,
                                    color: COLORS.text,
                                    padding: '8px 12px',
                                    fontSize: 14,
                                    fontFamily: "'DM Mono', monospace",
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    background: COLORS.yellow,
                                    color: COLORS.bg,
                                    border: 'none',
                                    padding: '8px 16px',
                                    fontSize: 12,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    cursor: 'pointer',
                                }}
                            >
                                SEARCH
                            </button>
                            <button
                                type="button"
                                onClick={clearFilters}
                                style={{
                                    background: COLORS.border,
                                    color: COLORS.text,
                                    border: 'none',
                                    padding: '8px 16px',
                                    fontSize: 12,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    cursor: 'pointer',
                                }}
                            >
                                CLEAR
                            </button>
                        </form>
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
                                <tr>
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
                                        Order ID
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
                                        Date
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
                                        Items
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
                                        Total
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
                                        Status
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
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        style={{
                                            borderBottom: `1px solid ${COLORS.border}`,
                                        }}
                                    >
                                        <td style={{ padding: 16 }}>
                                            ORD-{String(order.id).padStart(3, '0')}
                                        </td>
                                        <td style={{ padding: 16 }}>
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: 16 }}>
                                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                        </td>
                                        <td style={{ padding: 16, color: COLORS.yellow }}>
                                            ₦{order.total}
                                        </td>
                                        <td style={{ padding: 16 }}>
                                            <span
                                                style={{
                                                    color: order.status === 'completed' ? COLORS.green : COLORS.yellow,
                                                    textTransform: "uppercase",
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: 16 }}>
                                            <Link
                                                href={route('orders.show', order.id)}
                                                style={{
                                                    color: COLORS.yellow,
                                                    textDecoration: "none",
                                                    fontSize: 12,
                                                    fontFamily: "'Barlow Condensed', sans-serif",
                                                    fontWeight: 600,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em",
                                                }}
                                            >
                                                VIEW
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {orders.length === 0 && (
                            <div
                                style={{
                                    padding: 64,
                                    textAlign: "center",
                                    color: COLORS.muted,
                                }}
                            >
                                No orders found.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {orders.last_page > 1 && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 32,
                                gap: 8,
                            }}
                        >
                            {orders.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.get(link.url, { search, date }, { preserveState: true })}
                                    disabled={!link.url}
                                    style={{
                                        background: link.active ? COLORS.yellow : COLORS.surface,
                                        color: link.active ? COLORS.bg : COLORS.text,
                                        border: `1px solid ${COLORS.border}`,
                                        padding: '8px 12px',
                                        fontSize: 12,
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        cursor: link.url ? 'pointer' : 'not-allowed',
                                        opacity: link.url ? 1 : 0.5,
                                    }}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}