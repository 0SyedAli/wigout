"use client";

import { useEffect, useMemo, useState } from "react";
import { createNotification, fetchNotifications } from "@/lib/api";

const emptyForm = {
    title: "",
    message: "",
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState(emptyForm);
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success", timeout = 4000) => {
        const id = Date.now() + Math.random();
        setToasts((currentToasts) => [...currentToasts, { id, message, type }]);
        setTimeout(() => {
            setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
        }, timeout);
    };

    const loadNotifications = async (page = 1) => {
        try {
            setLoading(true);
            const response = await fetchNotifications({ page, limit: 10 });

            if (response.data.success) {
                setNotifications(response.data.notifications || []);
                setPagination(response.data.pagination || null);
            } else {
                showToast(response.data.message || "Failed to fetch notifications", "error");
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            showToast("Failed to fetch notifications", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications(currentPage);
    }, [currentPage]);

    const summary = useMemo(() => {
        return notifications.reduce(
            (acc, notification) => {
                acc.totalSent += Number(notification.sent || 0);
                acc.totalFailed += Number(notification.failed || 0);
                acc.totalUsers += Number(notification.totalUsers || 0);
                return acc;
            },
            { totalSent: 0, totalFailed: 0, totalUsers: 0 }
        );
    }, [notifications]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.title.trim() || !formData.message.trim()) {
            showToast("Title and message are required", "error");
            return;
        }

        try {
            setSubmitting(true);
            const response = await createNotification({
                title: formData.title.trim(),
                message: formData.message.trim(),
            });

            if (response.data.success) {
                setFormData(emptyForm);
                setCurrentPage(1);
                await loadNotifications(1);
                showToast(response.data.message || "Notification sent successfully", "success");
            } else {
                showToast(response.data.message || "Failed to create notification", "error");
            }
        } catch (error) {
            console.error("Error creating notification:", error);
            showToast("Failed to create notification", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString) =>
        dateString ? new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }) : "N/A";

    return (
        <>
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
                            }}
                        >
                            {toast.message}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setToasts((currentToasts) => currentToasts.filter((item) => item.id !== toast.id))}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className="admin-page">
                <div className="admin-card mb-4">
                    <div className="page-header py-0 px-0 flex-wrap">
                        <div>
                            <h5>Notifications</h5>
                            <p className="mb-0 text-muted">Create new alerts and review recent notification sends.</p>
                        </div>
                    </div>
                </div>

                <div className="row g-4 align-items-start">
                    <div className="col-lg-6">
                        <div className="admin-card p-4 h-100">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h6 className="mb-1 fw-bold">Create Notification</h6>
                                    <span className="text-muted small">Send a new message to users</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter notification title"
                                        value={formData.title}
                                        onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Message</label>
                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        placeholder="Enter notification message"
                                        value={formData.message}
                                        onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                                        required
                                    />
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn-primary-pill"
                                        disabled={submitting}
                                    >
                                        {submitting ? "Sending..." : "Send Notification"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-soft"
                                        onClick={() => setFormData(emptyForm)}
                                        disabled={submitting}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="admin-card p-4 h-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h6 className="mb-1 fw-bold">All Notifications</h6>
                                    <span className="text-muted small">Recent campaign history</span>
                                </div>
                                <div className="badge bg-light text-dark border">
                                    {pagination?.totalNotifications || notifications.length} total
                                </div>
                            </div>

                            {/* <div className="row g-3 mb-3">
                                <div className="col-4">
                                    <div className="p-3 border rounded bg-light">
                                        <div className="small text-muted">Sent</div>
                                        <div className="fw-bold fs-5">{summary.totalSent}</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border rounded bg-light">
                                        <div className="small text-muted">Failed</div>
                                        <div className="fw-bold fs-5 text-danger">{summary.totalFailed}</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 border rounded bg-light">
                                        <div className="small text-muted">Total Users</div>
                                        <div className="fw-bold fs-5">{summary.totalUsers}</div>
                                    </div>
                                </div>
                            </div> */}

                            {loading ? (
                                <div className="d-flex justify-content-center py-4">
                                    <div className="spinner-border" style={{ color: "#5a004f" }} role="status">
                                        <span className="visually-hidden">Loading notifications...</span>
                                    </div>
                                </div>
                            ) : notifications.length > 0 ? (
                                <div className="d-flex flex-column gap-3">
                                    {notifications.map((notification) => (
                                        <div key={notification._id} className="border rounded p-3 bg-white">
                                            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                                                <div>
                                                    <h6 className="mb-1 fw-bold text-capitalize">{notification.title}</h6>
                                                    <div className="small text-muted">{formatDate(notification.createdAt)}</div>
                                                </div>
                                                <span className="badge bg-primary-subtle text-primary">{notification.sent || 0} sent</span>
                                            </div>

                                            <p className="mb-0 text-muted" style={{ whiteSpace: "pre-line" }}>
                                                {notification.message}
                                            </p>

                                            {/* <div className="row g-2">
                                                <div className="col-4">
                                                    <div className="p-2 rounded bg-light text-center">
                                                        <div className="small text-muted">Sent</div>
                                                        <div className="fw-semibold">{notification.sent || 0}</div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="p-2 rounded bg-light text-center">
                                                        <div className="small text-muted">Failed</div>
                                                        <div className="fw-semibold text-danger">{notification.failed || 0}</div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="p-2 rounded bg-light text-center">
                                                        <div className="small text-muted">Users</div>
                                                        <div className="fw-semibold">{notification.totalUsers || 0}</div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 text-muted">
                                    No notifications yet.
                                </div>
                            )}

                            {pagination && pagination.totalPages > 1 && (
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="text-muted small">
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </span>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn-soft"
                                            disabled={pagination.currentPage <= 1}
                                            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-primary-pill"
                                            disabled={pagination.currentPage >= pagination.totalPages}
                                            onClick={() => setCurrentPage((page) => Math.min(page + 1, pagination.totalPages))}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}