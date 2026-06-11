"use client";

import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import api from "@/lib/api";
import Image from "next/image";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [userModal, setUserModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success", timeout = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, timeout);
  };

  const openUserModal = (user) => {
    setUserModal(user);
  };

  const closeUserModal = () => setUserModal(null);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get("/admin/users", {
        params: {
          page,
          limit: 10,
          ...(searchName && { search: searchName }),
          ...(searchEmail && { search: searchEmail }),
        },
      });

      if (response.data.success) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(1);
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      setActionLoading(userId);
      const response = await api.patch(
        `/admin/users/updateStatus/${userId}`,
        { status: newStatus }
      );

      if (response.data.success) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
        showToast("Status updated successfully", "success");
        // update modal view if open
        if (userModal?._id === userId) {
          setUserModal((u) => ({ ...u, status: newStatus }));
          closeUserModal();
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Failed to update status", "error");
    } finally {
      setActionLoading(null);
      setConfirmModal(null);
    }
  };

  const suspendUser = async (userId, isSuspended) => {
    try {
      setActionLoading(userId);
      const response = await api.patch(
        `/admin/users/updateSuspension/${userId}`,
        { isSuspended }
      );

      if (response.data.success) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isSuspended, status: isSuspended ? 'suspended' : 'active' } : user
          )
        );
        showToast(isSuspended ? "User suspended successfully" : "User unsuspended successfully", "success");
        if (userModal?._id === userId) {
          setUserModal((u) => ({ ...u, isSuspended, status: isSuspended ? 'suspended' : 'active' }));
          closeUserModal();
        }
      }
    } catch (error) {
      console.error("Error suspending user:", error);
      showToast("Failed to update suspension status", "error");
    } finally {
      setActionLoading(null);
      setConfirmModal(null);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setActionLoading(userId);
      const response = await api.delete(`/admin/users/delete/${userId}`);

      if (response.data.success) {
        setUsers(users.filter((user) => user._id !== userId));
        showToast("User deleted successfully", "success");
        if (userModal?._id === userId) closeUserModal();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("Failed to delete user", "error");
    } finally {
      setActionLoading(null);
      setConfirmModal(null);
    }
  };

  const recoverUser = async (userId) => {
    try {
      setActionLoading(userId);
      const response = await api.post(`/admin/users/recover/${userId}`);

      if (response.data.success) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isDeleted: false } : user
          )
        );
        showToast("User recovered successfully", "success");
        if (userModal?._id === userId) {
          setUserModal((u) => ({ ...u, isDeleted: false }));
          closeUserModal();
        }
      }
    } catch (error) {
      console.error("Error recovering user:", error);
      showToast("Failed to recover user", "error");
    } finally {
      setActionLoading(null);
      setConfirmModal(null);
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  const getStatusColor = (status) => {
    return status === "active" ? "status-active" : "status-inactive";
  };

  const renderStatusElement = (status, isSuspended) => {
    const display = isSuspended ? "suspended" : status;
    if (display === "active") return <span className="badge status-active">Active</span>;
    if (display === "suspended") return <span className="badge bg-danger">Suspended</span>;
    // inactive -> plain text (no background)
    return <span className="badge status-inactive">{display}</span>;
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="page-header pt-0 px-0">
          <h5>Total Users</h5>
          <form onSubmit={handleSearch} className="filter-bar">
            <input
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              placeholder="Search by Email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-sm btn-primary" style={{ backgroundColor: "#4c0b34", borderColor: "#4c0b34" }}>
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchName("");
                setSearchEmail("");
                setCurrentPage(1);
                fetchUsers(1);
              }}
              className="btn btn-sm btn-secondary"
            >
              Clear
            </button>
          </form>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border" style={{ color: "#5a004f" }} role="status">
              <span className="visually-hidden">Loading users...</span>
            </div>
          </div>
        ) : users.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-admin">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Total Reviews</th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const displayStatus = user.isSuspended ? "suspended" : user.status;
                    return (
                      <tr key={user._id} className={user.isDeleted ? "opacity-50" : ""}>
                        <td>{user.fullName || "N/A"}</td>
                        <td>{user.email}</td>
                        <td>{renderStatusElement(user.status, user.isSuspended)}</td>
                        <td>{user.totalReviews || 0}</td>
                        <td>{formatDate(user.lastActive)}</td>
                        <td className="action-icons fs-5">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            {/* View Details - open modal with full user info and actions */}
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              title="View Details"
                              onClick={() => openUserModal(user)}
                              disabled={actionLoading === user._id}
                            >
                              <FaRegEye />
                            </button>

                            {actionLoading === user._id && (
                              <span className="spinner-border spinner-border-sm ms-2" />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    >
                      First
                    </button>
                  </li>
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <li
                          key={pageNum}
                          className={`page-item ${pageNum === currentPage ? "active" : ""
                            }`}
                        >
                          <button
                            className="page-link "
                            style={{ backgroundColor: `${pageNum === currentPage ? "#4c0b34" : ""}`, borderColor: `${pageNum === currentPage ? "#4c0b34" : ""}`, color: `${pageNum === currentPage ? "#fff" : ""}` }}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        </li>
                      );
                    }
                    if (
                      pageNum === 2 ||
                      pageNum === pagination.totalPages - 1
                    ) {
                      return (
                        <li key={pageNum} className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      );
                    }
                    return null;
                  })}

                  <li
                    className={`page-item ${currentPage === pagination.totalPages ? "disabled" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === pagination.totalPages}
                    >
                      Next
                    </button>
                  </li>
                  <li
                    className={`page-item ${currentPage === pagination.totalPages ? "disabled" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pagination.totalPages)}
                      disabled={currentPage === pagination.totalPages}
                    >
                      Last
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No users found</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div
          className="modal fade show"
          style={{ display: "block", zIndex: 3000 }}
          tabIndex="-1"
          role="dialog"
          onClick={() => setConfirmModal(null)}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setConfirmModal(null)}
                />
              </div>
              <div className="modal-body">{confirmModal.message}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setConfirmModal(null)}
                  disabled={actionLoading === confirmModal.userId}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`btn ${confirmModal.type === "delete"
                    ? "btn-danger"
                    : "btn-primary"
                    }`}
                  onClick={() => {
                    if (confirmModal.type === "status") {
                      updateUserStatus(
                        confirmModal.userId,
                        confirmModal.newStatus
                      );
                    } else if (confirmModal.type === "suspend") {
                      suspendUser(confirmModal.userId, confirmModal.isSuspended);
                    } else if (confirmModal.type === "delete") {
                      deleteUser(confirmModal.userId);
                    } else if (confirmModal.type === "recover") {
                      recoverUser(confirmModal.userId);
                    }
                  }}
                  disabled={actionLoading === confirmModal.userId}
                >
                  {actionLoading === confirmModal.userId && (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                    </>
                  )}
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmModal && (
        <div
          className="modal-backdrop fade show"
          style={{ zIndex: 2999 }}
          onClick={() => setConfirmModal(null)}
        />
      )}

      {/* User Details Modal */}
      {userModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          onClick={() => setUserModal(null)}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bolder"><strong>User Details</strong></h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setUserModal(null)}
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-3">
                    {userModal.profileImage ? (
                      <Image
                        src={
                          userModal.profileImage.startsWith("http")
                            ? userModal.profileImage
                            : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${userModal.profileImage}`
                        }
                        width={300}
                        height={400}
                        alt="profile"
                        className="img-fluid rounded"
                      />
                    ) : (
                      <div className="bg-light rounded p-4 text-center">No Image</div>
                    )}
                  </div>
                  <div className="col-md-9">
                    <h5>{userModal.fullName || "N/A"} <small className="text-muted">{userModal.nickName && `(${userModal.nickName})`}</small></h5>
                    <p className="mb-1"><strong>Email:</strong> {userModal.email}</p>
                    <p className="mb-1"><strong>Phone:</strong> {userModal.phone || "N/A"}</p>
                    <p className="mb-1"><strong>DOB:</strong> {userModal.DOB || "N/A"}</p>
                    <p className="mb-1"><strong>Gender:</strong> {userModal.gender || "N/A"}</p>
                    <p className="mb-1"><strong>Location:</strong> {userModal.locationName || "N/A"}</p>
                    <p className="mb-1"><strong>Total Reviews:</strong> {userModal.totalReviews || 0}</p>
                    <p className="mb-1"><strong>Created:</strong> {formatDate(userModal.createdAt)}</p>
                    <p className="mb-1"><strong>Status:</strong> {renderStatusElement(userModal.status, userModal.isSuspended)}</p>
                    <p className="mb-1"><strong>Deleted:</strong> {userModal.isDeleted ? 'Yes' : 'No'}</p>
                    <hr />
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className={`btn btn-sm ${userModal.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => setConfirmModal({ type: 'status', userId: userModal._id, message: `Are you sure you want to ${userModal.status === 'active' ? 'deactivate' : 'activate'} this user?`, newStatus: userModal.status === 'active' ? 'inactive' : 'active' })}
                        disabled={actionLoading === userModal._id}
                      >
                        {userModal.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>

                      <button
                        className={`btn btn-sm ${userModal.isSuspended ? 'btn-success' : 'btn-danger'}`}
                        onClick={() => setConfirmModal({ type: 'suspend', userId: userModal._id, message: `Are you sure you want to ${userModal.isSuspended ? 'unsuspend' : 'suspend'} this user?`, isSuspended: !userModal.isSuspended })}
                        disabled={actionLoading === userModal._id}
                      >
                        {userModal.isSuspended ? 'Unsuspend' : 'Suspend'}
                      </button>

                      {!userModal.isDeleted ? (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => setConfirmModal({ type: 'delete', userId: userModal._id, message: 'Are you sure you want to delete this user? This action can be recovered.' })}
                          disabled={actionLoading === userModal._id}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => setConfirmModal({ type: 'recover', userId: userModal._id, message: 'Are you sure you want to recover this user?' })}
                          disabled={actionLoading === userModal._id}
                        >
                          Recover
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setUserModal(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toasts (Bootstrap) */}
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 5000 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast align-items-center text-bg-${t.type === 'success' ? 'success' : 'danger'} border-0 mb-2 show`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ minWidth: 220 }}
          >
            <div className="d-flex">
              <div className="toast-body">{t.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => setToasts((s) => s.filter((x) => x.id !== t.id))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}