import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import ActivityLogTable from '@/Components/ActivityLogTable';

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

export default function Index({ logs, filters, users, actions }) {
    const [search, setSearch] = useState(filters.action || '');
    const [userId, setUserId] = useState(filters.user_id || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('activity-logs.index'), {
            action: search,
            user_id: userId,
            date_from: dateFrom,
            date_to: dateTo,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        setUserId('');
        setDateFrom('');
        setDateTo('');
        router.get(route('activity-logs.index'), {}, { preserveState: true });
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
                            ACTIVITY LOGS
                        </h1>
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
                            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: showAdvanced ? 16 : 0 }}>
                                <select
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
                                >
                                    <option value="">All Actions</option>
                                    {actions && actions.map(action => (
                                        <option key={action} value={action}>{action}</option>
                                    ))}
                                </select>
                                <select
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    style={{
                                        flex: 1,
                                        background: COLORS.bg,
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        padding: '8px 12px',
                                        fontSize: 14,
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                >
                                    <option value="">All Users</option>
                                    {users && users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
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

                    {/* Activity Log Table */}
                    <ActivityLogTable logs={logs.data} />

                    {/* Pagination */}
                    {logs.last_page > 1 && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 32,
                                gap: 8,
                            }}
                        >
                            {logs.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.get(link.url, { search, userId, dateFrom, dateTo }, { preserveState: true })}
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

