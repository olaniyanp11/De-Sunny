import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
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

export default function Index({ orders, filters, users, products }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [userId, setUserId] = useState(filters.user_id || '');
    const [productId, setProductId] = useState(filters.product_id || '');
    const [minAmount, setMinAmount] = useState(filters.min_amount || '');
    const [maxAmount, setMaxAmount] = useState(filters.max_amount || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const isAdminOrManager = auth.user.role === 'admin' || auth.user.role === 'manager';

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('orders.index'), {
            search,
            status: status !== 'all' ? status : '',
            user_id: userId,
            product_id: productId,
            min_amount: minAmount,
            max_amount: maxAmount,
            date_from: dateFrom,
            date_to: dateTo
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        setUserId('');
        setProductId('');
        setMinAmount('');
        setMaxAmount('');
        setDateFrom('');
        setDateTo('');
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 600, color: COLORS.yellow, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Filters
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                style={{
                                    background: 'transparent',
                                    color: COLORS.yellow,
                                    border: 'none',
                                    fontSize: 12,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    cursor: 'pointer',
                                }}
                            >
                                {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
                            </button>
                        </div>

                        <form onSubmit={handleSearch}>
                            {/* Basic Filters */}
                            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: showAdvanced ? 16 : 0 }}>
                                <input
                                    type="text"
                                    placeholder="Search by Order ID, Customer, or Product"
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
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    style={{
                                        background: COLORS.bg,
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        padding: '8px 12px',
                                        fontSize: 14,
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
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
                            </div>

                            {/* Advanced Filters */}
                            {showAdvanced && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                                    {/* Product Filter */}
                                    {products && (
                                        <select
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                            style={{
                                                background: COLORS.bg,
                                                border: `1px solid ${COLORS.border}`,
                                                color: COLORS.text,
                                                padding: '8px 12px',
                                                fontSize: 14,
                                                fontFamily: "'DM Mono', monospace",
                                            }}
                                        >
                                            <option value="">All Products</option>
                                            {products.map(product => (
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            ))}
                                        </select>
                                    )}
                                    
                                    {/* Staff Filter (admin/manager only) */}
                                    {isAdminOrManager && users && (
                                        <select
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            style={{
                                                background: COLORS.bg,
                                                border: `1px solid ${COLORS.border}`,
                                                color: COLORS.text,
                                                padding: '8px 12px',
                                                fontSize: 14,
                                                fontFamily: "'DM Mono', monospace",
                                            }}
                                        >
                                            <option value="">All Staff</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    )}
                                    <input
                                        type="number"
                                        placeholder="Min Amount"
                                        value={minAmount}
                                        onChange={(e) => setMinAmount(e.target.value)}
                                        style={{
                                            background: COLORS.bg,
                                            border: `1px solid ${COLORS.border}`,
                                            color: COLORS.text,
                                            padding: '8px 12px',
                                            fontSize: 14,
                                            fontFamily: "'DM Mono', monospace",
                                        }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max Amount"
                                        value={maxAmount}
                                        onChange={(e) => setMaxAmount(e.target.value)}
                                        style={{
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
                                        placeholder="Date From"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        style={{
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
                                        placeholder="Date To"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        style={{
                                            background: COLORS.bg,
                                            border: `1px solid ${COLORS.border}`,
                                            color: COLORS.text,
                                            padding: '8px 12px',
                                            fontSize: 14,
                                            fontFamily: "'DM Mono', monospace",
                                        }}
                                    />
                                </div>
                            )}
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
                                    {isAdminOrManager && (
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
                                            Created By
                                        </th>
                                    )}
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
                                {orders.data.map((order) => (
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
                                        {isAdminOrManager && (
                                            <td style={{ padding: 16 }}>
                                                {order.user?.name || 'Unknown'}
                                            </td>
                                        )}
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

                        {orders.data.length === 0 && (
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
                                    onClick={() => link.url && router.get(link.url, { search, status, userId, productId, minAmount, maxAmount, dateFrom, dateTo }, { preserveState: true })}
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

