import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

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

export default function ImportModal({ isOpen, onClose, route, title = 'Import Products' }) {
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setErrors([]);
        setSuccess(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setErrors(['Please select a file to import']);
            return;
        }

        setProcessing(true);
        setErrors([]);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(route, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors.file || [data.message]);
                } else {
                    setErrors([data.message || 'Import failed']);
                }
            } else {
                setSuccess(data.message || 'Import successful');
                setTimeout(() => {
                    onClose();
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            setErrors(['An error occurred during import']);
        } finally {
            setProcessing(false);
        }
    };

    const downloadTemplate = () => {
        window.location.href = route('products.import-template');
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    padding: 32,
                    maxWidth: 500,
                    width: '90%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 style={{ 
                        fontSize: 20, 
                        fontFamily: "'Barlow Condensed', sans-serif", 
                        fontWeight: 700, 
                        textTransform: 'uppercase',
                        color: COLORS.yellow,
                    }}>
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: COLORS.muted,
                            fontSize: 24,
                            cursor: 'pointer',
                            padding: 0,
                            lineHeight: 1,
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Download Template Button */}
                <button
                    onClick={downloadTemplate}
                    style={{
                        background: COLORS.border,
                        color: COLORS.text,
                        border: 'none',
                        padding: '12px 16px',
                        width: '100%',
                        marginBottom: 24,
                        fontSize: 14,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                    }}
                >
                    Download CSV Template
                </button>

                {/* Upload Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{
                            display: 'block',
                            marginBottom: 8,
                            fontSize: 14,
                            color: COLORS.muted,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>
                            Select CSV File
                        </label>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: COLORS.bg,
                                border: `1px solid ${COLORS.border}`,
                                color: COLORS.text,
                                fontSize: 14,
                                fontFamily: "'DM Mono', monospace",
                            }}
                        />
                    </div>

                    {file && (
                        <p style={{ 
                            marginBottom: 16, 
                            color: COLORS.green, 
                            fontSize: 14 
                        }}>
                            Selected: {file.name}
                        </p>
                    )}

                    {/* Error Messages */}
                    {errors.length > 0 && (
                        <div style={{
                            background: 'rgba(248, 113, 113, 0.1)',
                            border: `1px solid ${COLORS.red}`,
                            padding: 12,
                            marginBottom: 16,
                            maxHeight: 150,
                            overflowY: 'auto',
                        }}>
                            {errors.map((error, index) => (
                                <p key={index} style={{ color: COLORS.red, fontSize: 12, marginBottom: 4 }}>
                                    {error}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div style={{
                            background: 'rgba(74, 222, 128, 0.1)',
                            border: `1px solid ${COLORS.green}`,
                            padding: 12,
                            marginBottom: 16,
                            color: COLORS.green,
                            fontSize: 14,
                        }}>
                            {success}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                background: COLORS.border,
                                color: COLORS.text,
                                border: 'none',
                                padding: '12px 16px',
                                fontSize: 14,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !file}
                            style={{
                                flex: 1,
                                background: processing ? COLORS.muted : COLORS.yellow,
                                color: processing ? COLORS.text : COLORS.bg,
                                border: 'none',
                                padding: '12px 16px',
                                fontSize: 14,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                cursor: processing ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {processing ? 'Processing...' : 'Import'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

