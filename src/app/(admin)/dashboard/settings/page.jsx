"use client";

import { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { getCookie } from "cookies-next";
import api from "@/lib/api";

export default function SystemSettingsPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success", timeout = 4000) => {
        const id = Date.now() + Math.random();
        setToasts((t) => [...t, { id, message, type }]);
        setTimeout(() => {
            setToasts((t) => t.filter((x) => x.id !== id));
        }, timeout);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!oldPassword) {
            showToast("Current password cannot be empty", "error");
            return;
        }

        if (!newPassword) {
            showToast("New password cannot be empty", "error");
            return;
        }

        if (newPassword.length < 5) {
            showToast("Password must be at least 5 characters long", "error");
            return;
        }

        if (newPassword === oldPassword) {
            showToast("New password cannot be the same as current password", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }

        setLoading(true);

        try {
            const token = getCookie("auth_token");

            if (!token) {
                showToast("Auth token not found. Please log in again.", "error");
                setLoading(false);
                return;
            }

            const response = await api.post("admin/changePassword", {
                oldPassword,
                newPassword,
            });

            if (response.data && response.data.success) {
                showToast(response.data.message || "Password updated successfully", "success");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                showToast(response.data?.message || "Failed to update password", "error");
            }
        } catch (err) {
            console.error("Password change error:", err);
            showToast(
                err.response?.data?.message ||
                err.message ||
                "Failed to change password. Please try again.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toast Notifications */}
            {toasts.length > 0 && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        zIndex: 9999,
                        maxWidth: "400px",
                    }}
                >
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={`alert alert-${toast.type === "error" ? "danger" : "success"} alert-dismissible fade show`}
                            role="alert"
                            style={{
                                marginBottom: "10px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            {toast.message}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() =>
                                    setToasts((t) => t.filter((x) => x.id !== toast.id))
                                }
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="admin-page">
                <div className="admin-card">
                    {/* Header */}
                    <div className="page-header page-header-main pt-0 px-0 mb-4 flex-column align-items-start">
                        <h5 style={{ color: "#5a004f", fontWeight: "700" }}>Account Security</h5>
                        <p className="text-muted small mb-0 mt-1">Manage and change your password credentials here.</p>
                    </div>

                    {/* Form */}
                    <div className="row mt-4">
                        <div className="col-lg-6 col-xl-5">
                            <form onSubmit={handleSave}>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label fw-semibold mb-2" style={{ color: '#4b0b32' }}>Current Password</label>
                                            <div className="input-group">
                                                <span
                                                    className="input-group-text bg-white border-end-0 py-2 px-3"
                                                    style={{ border: '1px solid #ddd', borderRadius: '12px 0 0 12px' }}
                                                >
                                                    <FiLock className="text-muted" />
                                                </span>
                                                <input
                                                    type={showOldPassword ? "text" : "password"}
                                                    className="form-control border-start-0 border-end-0 py-2"
                                                    placeholder="Enter current password"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                    required
                                                    style={{ border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none', fontSize: '14px' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="input-group-text bg-white py-2 px-3"
                                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                                    style={{ border: '1px solid #ddd', borderLeft: 'none', borderRadius: '0 12px 12px 0', cursor: 'pointer' }}
                                                >
                                                    {showOldPassword ? <FiEyeOff className="text-muted" /> : <FiEye className="text-muted" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label fw-semibold mb-2" style={{ color: '#4b0b32' }}>New Password</label>
                                            <div className="input-group">
                                                <span
                                                    className="input-group-text bg-white border-end-0 py-2 px-3"
                                                    style={{ border: '1px solid #ddd', borderRadius: '12px 0 0 12px' }}
                                                >
                                                    <FiLock className="text-muted" />
                                                </span>
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    className="form-control border-start-0 border-end-0 py-2"
                                                    placeholder="Enter new password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                    style={{ border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none', fontSize: '14px' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="input-group-text bg-white py-2 px-3"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    style={{ border: '1px solid #ddd', borderLeft: 'none', borderRadius: '0 12px 12px 0', cursor: 'pointer' }}
                                                >
                                                    {showNewPassword ? <FiEyeOff className="text-muted" /> : <FiEye className="text-muted" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label fw-semibold mb-2" style={{ color: '#4b0b32' }}>Confirm New Password</label>
                                            <div className="input-group">
                                                <span
                                                    className="input-group-text bg-white border-end-0 py-2 px-3"
                                                    style={{ border: '1px solid #ddd', borderRadius: '12px 0 0 12px' }}
                                                >
                                                    <FiLock className="text-muted" />
                                                </span>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="form-control border-start-0 border-end-0 py-2"
                                                    placeholder="Confirm new password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                    style={{ border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none', fontSize: '14px' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="input-group-text bg-white py-2 px-3"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    style={{ border: '1px solid #ddd', borderLeft: 'none', borderRadius: '0 12px 12px 0', cursor: 'pointer' }}
                                                >
                                                    {showConfirmPassword ? <FiEyeOff className="text-muted" /> : <FiEye className="text-muted" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 mt-5">
                                        <button
                                            className="btn-primary-pill px-5 py-2.5 d-flex align-items-center gap-2"
                                            type="submit"
                                            disabled={loading}
                                            style={{ cursor: loading ? "not-allowed" : "pointer" }}
                                        >
                                            {loading ? (
                                                <>
                                                    {/* <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> */}
                                                    {/* Saving... */}
                                                    <div className="d-flex justify-content-center py-4">
                                                        <div className="spinner-border" style={{ color: "#5a004f" }} role="status">
                                                            <span className="visually-hidden">Saving...</span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                "Save Password"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

