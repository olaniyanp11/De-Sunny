import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import ImportModal from '@/Components/ImportModal';

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

export default function Index({ products, categories, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');
    const [stockStatus, setStockStatus] = useState(filters.stock_status || '');
    const [showImportModal, setShowImportModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Only admin and manager can import
    const canImport = auth.user.role === 'admin' || auth.user.role === 'manager';

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('products.index'), {
            search,
            category_id: categoryId,
            stock_status: stockStatus,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        setCategoryId('');
        setStockStatus('');
        router.get(route('products.index'), {}, { preserveState: true });
    };

    const getStockColor = (stock) => {
        if (stock === 0) return COLORS.red;
        if (stock <= 5) return COLORS.orange;
        return COLORS.green;
    };

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
                        PRODUCTS
                    </h1>
                    <div style={{ display: 'flex', gap: 12 }}>
                        {canImport && (
                            <button
                                onClick={() => setShowImportModal(true)}
                                style={{
                                    background: COLORS.surface,
                                    color: COLORS.yellow,
                                    padding: "12px 24px",
                                    textDecoration: "none",
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    border: `1px solid ${COLORS.yellow}`,
                                    cursor: "pointer",
                                }}
                            >
                                IMPORT CSV
                            </button>
                        )}
                        <Link
                            href={route('products.create')}
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
                            ADD PRODUCT
                        </Link>
                    </div>
                </div>

                {/* Search and Filters */}
                <div
                    style={{
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        padding: 16,
                        marginBottom: 24,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
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
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    <form onSubmit={handleSearch}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Search products by name or SKU..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    flex: 1,
                                    background: COLORS.bg,
                                    border: `1px solid ${COLORS.border}`,
                                    color: COLORS.text,
                                    padding: '10px 14px',
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
                                    padding: '10px 16px',
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
                                    padding: '10px 16px',
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

                        {showFilters && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    style={{
                                        background: COLORS.bg,
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        padding: '10px 14px',
                                        fontSize: 14,
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                >
                                    <option value="">All Categories</option>
                                    {categories && categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <select
                                    value={stockStatus}
                                    onChange={(e) => setStockStatus(e.target.value)}
                                    style={{
                                        background: COLORS.bg,
                                        border: `1px solid ${COLORS.border}`,
                                        color: COLORS.text,
                                        padding: '10px 14px',
                                        fontSize: 14,
                                        fontFamily: "'DM Mono', monospace",
                                    }}
                                >
                                    <option value="">All Stock Levels</option>
                                    <option value="low">Low Stock (≤5)</option>
                                    <option value="out">Out of Stock</option>
                                 <option value="in">In Stock </option>
                                </select>
                            </div>
                        )}
                    </form>
                </div>

                {/* Products Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: 20,
                    }}
                >
                    {products.data.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 20,
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 18,
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }}
                            >
                                {product.name}
                            </h3>
                            <p style={{ color: COLORS.muted, marginBottom: 4 }}>
                                SKU: {product.sku}
                            </p>
                            <p style={{ color: COLORS.yellow, fontSize: 20, marginBottom: 8 }}>
                                ₦{product.price}
                            </p>
                            <p style={{ color: getStockColor(product.stock), marginBottom: 4, fontWeight: 600 }}>
                                Stock: {product.stock}
                            </p>
                            <p style={{ color: COLORS.muted, marginBottom: 16 }}>
                                Category: {product.category?.name || 'No Category'}
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 8,
                                }}
                            >
                                {canImport && (
                                    <Link
                                        href={route('products.edit', product.id)}
                                        style={{
                                            background: COLORS.yellow,
                                            color: COLORS.bg,
                                            padding: "8px 16px",
                                            textDecoration: "none",
                                            fontSize: 12,
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        EDIT
                                    </Link>
                                )}
                                <Link
                                    href={route('products.show', product.id)}
                                    style={{
                                        background: COLORS.border,
                                        color: COLORS.text,
                                        padding: "8px 16px",
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
                            </div>
                        </div>
                    ))}
                </div>

                {products.data.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 48, color: COLORS.muted }}>
                        No products found.
                    </div>
                )}

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 32,
                            gap: 8,
                        }}
                    >
                        {products.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && router.get(link.url, { search, category_id: categoryId, stock_status: stockStatus }, { preserveState: true })}
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

            {/* Import Modal */}
            <ImportModal
                isOpen={showImportModal}
                onClose={() => setShowImportModal(false)}
                route={route('products.import')}
                title="Import Products from CSV"
            />
        </div>
    );
}

