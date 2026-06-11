"use client";

import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { fetchSupportTickets, updateSupportStatus } from "@/lib/api";

export default function SupportPage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [modalUpdating, setModalUpdating] = useState(false);
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success", timeout = 4000) => {
        const id = Date.now() + Math.random();
        setToasts((currentToasts) => [...currentToasts, { id, message, type }]);
        setTimeout(() => {
            setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
        }, timeout);
    };

    const loadTickets = async (page = 1) => {
        try {
            setLoading(true);

            const response = await fetchSupportTickets({
                page,
                limit: 10,
                ...(statusFilter ? { status: statusFilter } : {}),
                ...(appliedSearchQuery ? { search: appliedSearchQuery } : {}),
            });

            if (response.data.success) {
                setTickets(response.data.data || []);
                setPagination(response.data.pagination || null);
            } else {
                showToast(response.data.message || "Failed to fetch support tickets", "error");
            }
        } catch (error) {
            console.error("Error fetching support tickets:", error);
            showToast("Failed to fetch support tickets", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets(currentPage);
    }, [currentPage, statusFilter, appliedSearchQuery]);

    const handleSearch = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        setAppliedSearchQuery(searchQuery.trim());
    };

    const handleReset = () => {
        setSearchQuery("");
        setAppliedSearchQuery("");
        setStatusFilter("");
        setCurrentPage(1);
    };

    const openTicketModal = (ticket) => {
        setSelectedTicket(ticket);
        setShowTicketModal(true);
    };

    const closeTicketModal = () => {
        setShowTicketModal(false);
        setSelectedTicket(null);
    };

    const handleResolveTicket = async () => {
        if (!selectedTicket) return;

        try {
            setModalUpdating(true);
            const response = await updateSupportStatus(selectedTicket._id, "resolved");

            if (response.data.success) {
                setTickets((currentTickets) =>
                    currentTickets.map((ticket) =>
                        ticket._id === selectedTicket._id ? { ...ticket, status: "resolved" } : ticket
                    )
                );
                setSelectedTicket((currentTicket) =>
                    currentTicket ? { ...currentTicket, status: "resolved" } : currentTicket
                );
                showToast("Ticket marked as resolved", "success");
            } else {
                showToast(response.data.message || "Failed to update ticket status", "error");
            }
        } catch (error) {
            console.error("Error updating ticket status:", error);
            showToast("Failed to update ticket status", "error");
        } finally {
            setModalUpdating(false);
        }
    };

    const formatDate = (dateString) =>
        dateString ? new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
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
                <div className="admin-card">
                    <div className="page-header  pt-0 px-0 flex-wrap">
                        <div>
                            <h5>Support & Help</h5>
                            <p className="mb-0 text-muted">Manage customer support requests and status.</p>
                        </div>
                        <form onSubmit={handleSearch} className="filter-bar">
                            <input
                                type="text"
                                placeholder="Search requests by name, email, or issue..."
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                className="form-control"
                                style={{
                                    borderRadius: "12px",
                                    border: "1px solid #ddd",
                                    padding: "8px 14px",
                                    fontSize: "14px",
                                    minWidth: "320px",
                                }}
                            />
                            <select
                                value={statusFilter}
                                onChange={(event) => {
                                    setStatusFilter(event.target.value);
                                    setCurrentPage(1);
                                }}
                                className="form-select"
                                style={{
                                    borderRadius: "12px",
                                    border: "1px solid #ddd",
                                    padding: "8px 14px",
                                    fontSize: "14px",
                                    minWidth: "160px",
                                }}
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            <button type="submit" className="btn-primary-pill" style={{
                                borderRadius: "12px"
                            }}>Search</button>
                            <button
                                type="button"
                                className="btn-soft"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </form>
                    </div>

                    {loading ? (
                        <div className="d-flex justify-content-center py-4">
                            <div className="spinner-border" style={{ color: "#5a004f" }} role="status">
                                <span className="visually-hidden">Loading support tickets...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-admin">
                                    <thead>
                                        <tr>
                                            <th style={{ minWidth: "200px" }}>User</th>
                                            <th style={{ minWidth: "200px" }}>Issue</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tickets.length > 0 ? (
                                            tickets.map((ticket) => (
                                                <tr key={ticket._id}>
                                                    <td>
                                                        <div className="d-flex flex-column">
                                                            <strong>{ticket.name || ticket.userId?.fullName || "Unknown User"}</strong>
                                                            <span className="text-muted small">{ticket.email || ticket.userId?.email || "N/A"}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-column">
                                                            <strong>{ticket.subject || "No subject"}</strong>
                                                            <span className="text-muted small text-wrap">
                                                                {ticket.message.slice(0, 30) + "..." || "No description"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>{formatDate(ticket.createdAt)}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${ticket.status === "resolved" ? "bg-success" : "bg-secondary text-white"}`}
                                                            style={{ fontSize: "12px", padding: "6px 10px" }}
                                                        >
                                                            {ticket.status === "resolved" ? "Resolved" : "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="action-icons fs-5">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary p-0 text-decoration-none"
                                                                style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                                                onClick={() => openTicketModal(ticket)}
                                                                aria-label={`View details for ${ticket.name || ticket.userId?.fullName || "ticket"}`}
                                                            >
                                                                <FaRegEye />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">
                                                    No support tickets found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {pagination && pagination.totalPages > 1 && (
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="text-muted small">
                                        Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalSupportRequests || 0} total tickets)
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
                        </>
                    )}
                </div>
            </div>

            {showTicketModal && selectedTicket && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1050,
                    }}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content" style={{ borderRadius: "16px", padding: "30px" }}>
                            <div className="modal-header border-0 p-0 pt-0">
                                <div className="d-flex flex-column flex-md-row align-items-md-center gap-5">
                                    <div>
                                        <h5 className="modal-title fw-bold">Support Details</h5>
                                    </div>
                                    <span
                                        className={`badge ${selectedTicket.status === "resolved" ? "bg-success" : "bg-secondary text-white"}`}
                                        style={{ fontSize: "12px", padding: "6px 10px" }}
                                    >
                                        {selectedTicket.status === "resolved" ? "Resolved" : "Pending"}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeTicketModal}
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body  px-0 pb-0">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h6 className="mb-1"><strong>Subject:</strong> {selectedTicket.subject || "No subject"}</h6>
                                    </div>

                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="p-3 border rounded bg-light  h-100">
                                            <div className="small fw-bolder text-uppercase mb-1">User Details</div>
                                            <div className="small"><strong>Full Name:</strong> {selectedTicket.userId?.fullName || selectedTicket.name || "N/A"}</div>
                                            <div className="small"><strong>Email:</strong> {selectedTicket.userId?.email || selectedTicket.email || "N/A"}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="p-3 border rounded bg-light  h-100">
                                            <div className="small fw-bolder text-uppercase mb-1">Created On</div>
                                            <div className="small">{formatDate(selectedTicket.createdAt)}</div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="p-3 border rounded bg-light">
                                            <div className="small fw-bolder text-uppercase mb-1">Message</div>
                                            <div className="small">{selectedTicket.message || "No description provided."}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer border-0  px-0 pb-0">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeTicketModal}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${selectedTicket.status === "resolved" ? "btn-success" : "btn-primary"}`}
                                    disabled={selectedTicket.status === "resolved" || modalUpdating}
                                    onClick={handleResolveTicket}
                                >
                                    {modalUpdating
                                        ? "Updating..."
                                        : selectedTicket.status === "resolved"
                                            ? "Resolved"
                                            : "Mark as Resolved"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
