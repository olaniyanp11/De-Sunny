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

export default function Create({ products, errors }) {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [processing, setProcessing] = useState(false);

    const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];

    const filteredProducts = selectedCategory ? products.filter(p => p.category === selectedCategory) : products;

    const addToCart = (product) => {
        const existing = cart.find(item => item.product_id === product.id);
        const currentQuantity = existing ? existing.quantity : 0;
        if (currentQuantity >= product.stock) return; // Prevent adding more than stock

        if (existing) {
            setCart(cart.map(item =>
                item.product_id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, {
                product_id: product.id,
                quantity: 1,
                price: product.price,
                name: product.name,
            }]);
        }
    };

    const updateQuantity = (productId, quantity) => {
        const product = products.find(p => p.id === productId);
        if (quantity > product.stock) return; // Prevent exceeding stock

        if (quantity <= 0) {
            setCart(cart.filter(item => item.product_id !== productId));
        } else {
            setCart(cart.map(item =>
                item.product_id === productId
                    ? { ...item, quantity }
                    : item
            ));
        }
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        setProcessing(true);
        console.log('Submitting order with cart:', cart);
        console.log('Items to send:', cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
        })));

        router.post(route('orders.store'), {
            items: cart.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
            })),
        }, {
            onFinish: () => setProcessing(false),
        });
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
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gap: 32,
                    }}
                >
                    {/* Products */}
                    <div>
                        <h1
                            style={{
                                fontSize: 24,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                marginBottom: 32,
                            }}
                        >
                            SELECT PRODUCTS
                        </h1>

                        {/* Category Filter */}
                        <div style={{ marginBottom: 16 }}>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{
                                    background: COLORS.bg,
                                    border: `1px solid ${COLORS.border}`,
                                    color: COLORS.text,
                                    padding: '8px 12px',
                                    fontSize: 14,
                                    fontFamily: "'DM Mono', monospace",
                                    width: '100%',
                                    maxWidth: 300,
                                }}
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                                gap: 16,
                            }}
                        >
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    style={{
                                        background: COLORS.surface,
                                        border: `1px solid ${COLORS.border}`,
                                        padding: 16,
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontWeight: 600,
                                            marginBottom: 8,
                                        }}
                                    >
                                        {product.name}
                                    </h3>
                                    <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>
                                        {product.category?.name}
                                    </p>
                                    <p style={{ color: COLORS.yellow, fontSize: 18, marginBottom: 8 }}>
                                        ₦{product.price}
                                    </p>
                                    <p style={{ color: COLORS.muted, fontSize: 12, marginBottom: 16 }}>
                                        Stock: {product.stock}
                                    </p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock <= 0}
                                        style={{
                                            width: "100%",
                                            background: product.stock > 0 ? COLORS.yellow : COLORS.muted,
                                            color: COLORS.bg,
                                            border: "none",
                                            padding: "8px",
                                            fontSize: 12,
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            cursor: product.stock > 0 ? "pointer" : "not-allowed",
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart */}
                    <div>
                        <h2
                            style={{
                                fontSize: 20,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                marginBottom: 16,
                            }}
                        >
                            CART
                        </h2>

                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 16,
                                marginBottom: 16,
                            }}
                        >
                            {cart.length === 0 ? (
                                <p style={{ color: COLORS.muted, textAlign: "center" }}>
                                    No items in cart
                                </p>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.product_id}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 8,
                                            paddingBottom: 8,
                                            borderBottom: `1px solid ${COLORS.border}`,
                                        }}
                                    >
                                        <div>
                                            <p style={{ fontSize: 14, marginBottom: 4 }}>
                                                {item.name}
                                            </p>
                                            <p style={{ color: COLORS.yellow, fontSize: 12 }}>
                                                ₦{item.price} x {item.quantity}
                                            </p>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                style={{
                                                    background: COLORS.border,
                                                    color: COLORS.text,
                                                    border: "none",
                                                    width: 24,
                                                    height: 24,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                style={{
                                                    background: COLORS.border,
                                                    color: COLORS.text,
                                                    border: "none",
                                                    width: 24,
                                                    height: 24,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div
                            style={{
                                background: COLORS.surface,
                                border: `1px solid ${COLORS.border}`,
                                padding: 16,
                                marginBottom: 16,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: 18,
                                    fontWeight: 600,
                                }}
                            >
                                <span>TOTAL:</span>
                                <span style={{ color: COLORS.yellow }}>₦{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {errors?.error && (
                            <div
                                style={{
                                    background: COLORS.red,
                                    color: COLORS.text,
                                    padding: 16,
                                    marginBottom: 16,
                                    border: `1px solid ${COLORS.border}`,
                                }}
                            >
                                {errors.error}
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || processing}
                            style={{
                                width: "100%",
                                background: cart.length > 0 ? COLORS.green : COLORS.muted,
                                color: COLORS.bg,
                                border: "none",
                                padding: "16px",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 700,
                                fontSize: 15,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                cursor: cart.length > 0 && !processing ? "pointer" : "not-allowed",
                            }}
                        >
                            {processing ? 'PROCESSING...' : 'CHECKOUT'}
                        </button>

                        <Link
                            href={route('orders.index')}
                            style={{
                                display: "block",
                                textAlign: "center",
                                marginTop: 16,
                                color: COLORS.yellow,
                                textDecoration: "none",
                                fontSize: 14,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            VIEW ORDER HISTORY
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}