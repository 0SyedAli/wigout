"use client";

import { useEffect, useState } from "react";
import { FaRegEye, FaTimes, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "@/lib/api";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionType, setActionType] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [toasts, setToasts] = useState([]);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const showToast = (message, type = "success", timeout = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, timeout);
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  const fetchReviews = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
      };

      if (searchQuery) params.search = searchQuery;
      if (actionType) params.actionType = actionType;
      if (dateFilter) params.date = dateFilter;

      const response = await api.get("/admin/reviews", { params });

      if (response.data.success) {
        setReviews(response.data.reviews || []);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      showToast("Failed to fetch reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchReviews(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setActionType("");
    setDateFilter("");
    setCurrentPage(1);
    fetchReviews(1);
  };

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setPhotoIndex(0);
  };

  const closeReviewModal = () => {
    setSelectedReview(null);
    setPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (selectedReview?.photos) {
      setPhotoIndex((prev) =>
        prev === selectedReview.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedReview?.photos) {
      setPhotoIndex((prev) =>
        prev === 0 ? selectedReview.photos.length - 1 : prev - 1
      );
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar
            key={i}
            style={{ color: "#ff9f1c", marginRight: "2px" }}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span
            key={i}
            style={{
              display: "inline-block",
              position: "relative",
              marginRight: "2px",
            }}
          >
            {/* <FaStar style={{ color: "#ddd" }} /> */}
            <FaStarHalfAlt
              style={{
                color: "#ff9f1c",
              }}
            />
          </span>
        );
      } else {
        stars.push(
          <FaStar
            key={i}
            style={{ color: "#ddd", marginRight: "2px" }}
          />
        );
      }
    }
    return stars;
  };

  const getRatingDisplay = (rating) => {
    const ratingMap = {
      "Go Again": "Go Again",
      "avoid": "Avoid",
    };
    return ratingMap[rating] || rating;
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
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
          {/* Page Header and Filters */}
          <div className="page-header pt-0 px-0 flex-wrap">
            <h5>All Ratings & Reviews</h5>
            <form onSubmit={handleSearch} className="filter-bar">
              <input
                type="text"
                placeholder="Search by Restaurant Name, Review & Address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  padding: "8px 14px",
                  fontSize: "14px",
                  width: "370px",
                }}
              />
              {/* <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="form-control"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  padding: "8px 14px",
                  fontSize: "14px",
                }}
              /> */}
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="form-select"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  padding: "8px 14px",
                  fontSize: "14px",
                  width: "150px",
                }}
              >
                <option value="">Filter By Type</option>
                <option value="Go Again">Go Again</option>
                <option value="Avoid">Avoid</option>
              </select>
              <button
                type="submit"
                className="btn btn-sm"
                style={{
                  backgroundColor: "#5a004f",
                  color: "#fff",
                  borderColor: "#5a004f",
                  borderRadius: "12px",
                  border: "none",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "150px",
                }}
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-sm"
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "150px",
                }}
              >
                Reset
              </button>
            </form>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                role="status"
                style={{
                  color: "#5a004f",
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : reviews.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-admin">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Establishment</th>
                      <th>Type</th>
                      <th>Rating</th>
                      <th>Review</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review._id}>
                        <td>
                          <span style={{ fontWeight: "500", color: "#333" }}>
                            {review.userId?.fullName || "Anonymous"}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: "#5a004f", fontWeight: "500" }}>
                            {review.restaurantName || "N/A"}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: "#5a004f", fontWeight: "500" }}>
                            {review.actionType || "N/A"}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            {getRatingStars(review.rating)}
                            <span style={{ marginLeft: "6px", fontSize: "14px", color: "#666" }}>
                              {review.rating}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span
                            style={{
                              color: "#666",
                              maxWidth: "250px",
                              display: "inline-block",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                            title={review.reviewText || "No text"}
                          >
                            {review.reviewText || "No review text"}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: "#999", fontSize: "13px" }}>
                            {formatDate(review.createdAt)}
                          </span>
                        </td>
                        <td className="action-icons fs-5">
                          <div className="d-flex align-items-center gap-3 py-2">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              title="View Details"
                              style={{
                                color: "#5a004f",
                                borderColor: "#5a004f",
                              }}
                              onClick={() => openReviewModal(review)}
                              disabled={actionLoading === review._id}
                            >
                              <FaRegEye />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              title="Edit Review"
                              style={{
                                color: "#5a004f",
                                borderColor: "#5a004f",
                              }}
                              disabled={actionLoading === review._id}
                            >
                              <MdOutlineModeEdit />
                            </button>
                            {actionLoading === review._id && (
                              <span
                                className="spinner-border spinner-border-sm"
                                style={{ color: "#5a004f" }}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center flex-wrap">
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
                              className="page-link"
                              style={{
                                backgroundColor:
                                  pageNum === currentPage ? "#5a004f" : "",
                                borderColor:
                                  pageNum === currentPage ? "#5a004f" : "",
                                color: pageNum === currentPage ? "#fff" : "",
                              }}
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
                      className={`page-item ${currentPage === pagination.totalPages
                        ? "disabled"
                        : ""
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
                      className={`page-item ${currentPage === pagination.totalPages
                        ? "disabled"
                        : ""
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

              {/* Table Footer */}
              <div className="table-footer">
                <span>
                  {pagination ? (
                    <>
                      {(currentPage - 1) * 10 + 1}–
                      {Math.min(currentPage * 10, pagination.total)} of{" "}
                      {pagination.total} items
                    </>
                  ) : (
                    "0 items"
                  )}
                </span>
                <span>
                  {pagination
                    ? `Page ${currentPage} of ${pagination.totalPages}`
                    : "Page 0 of 0"}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <p style={{ color: "#999", fontSize: "16px" }}>
                No reviews found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "20px",
          }}
          onClick={closeReviewModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              padding: "40px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeReviewModal}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#f0f0f0",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "20px",
                color: "#5a004f",
              }}
            >
              <FaTimes />
            </button>

            {/* User Info Section */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "24px",
                borderBottom: "1px solid #eee",
                paddingBottom: "24px",
              }}
            >
              {selectedReview.userId?.profileImage && (
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedReview.userId.profileImage}`}
                  alt={selectedReview.userId?.fullName}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <h6
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#333",
                  }}
                >
                  {selectedReview.userId?.fullName || "Anonymous"}
                </h6>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    color: "#999",
                  }}
                >
                  {selectedReview.userId?.email || "No email"}
                </p>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "13px",
                    color: "#999",
                  }}
                >
                  Joined {formatDate(selectedReview.userId?.createdAt)}
                </p>
              </div>
            </div>

            {/* Restaurant & Rating Info */}
            <div
              style={{
                marginBottom: "24px",
                borderBottom: "1px solid #eee",
                paddingBottom: "24px",
              }}
            >
              <h6
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                Restaurant Details
              </h6>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                    Restaurant Name
                  </label>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "14px",
                      color: "#333",
                      fontWeight: "600",
                    }}
                  >
                    {selectedReview.restaurantName || "N/A"}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                    Category
                  </label>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "14px",
                      color: "#5a004f",
                      fontWeight: "600",
                    }}
                  >
                    {selectedReview.category || "N/A"}
                  </p>
                </div>
              </div>
              <div style={{ marginTop: "12px" }}>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                  Address
                </label>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  {selectedReview.address || "N/A"}
                </p>
              </div>
            </div>

            {/* Rating & Action Type */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "24px",
                borderBottom: "1px solid #eee",
                paddingBottom: "24px",
              }}
            >
              <div>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                  Star Rating
                </label>
                <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  {getRatingStars(selectedReview.rating)}
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#5a004f",
                      marginLeft: "8px",
                    }}
                  >
                    {selectedReview.rating}/5
                  </span>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                  Action Type
                </label>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: "18px",
                  }}
                >
                  {getRatingDisplay(selectedReview.actionType)}
                </p>
              </div>
            </div>

            {/* Review Text */}
            <div style={{ marginBottom: "24px", borderBottom: "1px solid #eee", paddingBottom: "24px" }}>
              <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                Review Text
              </label>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: "1.6",
                  minHeight: "60px",
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                {selectedReview.reviewText || "No review text provided"}
              </p>
            </div>

            {/* Photos Gallery */}
            {selectedReview.photos && selectedReview.photos.length > 0 && (
              <div style={{ marginBottom: "24px", borderBottom: "1px solid #eee", paddingBottom: "24px" }}>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                  Photos ({selectedReview.photos.length})
                </label>
                <div
                  style={{
                    marginTop: "12px",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "#f0f0f0",
                    aspectRatio: "16/9",
                  }}
                >
                  <img
                    src={selectedReview.photos[photoIndex]}
                    alt={`Review photo ${photoIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {selectedReview.photos.length > 1 && (
                    <>
                      <button
                        onClick={prevPhoto}
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(90, 0, 79, 0.7)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        ←
                      </button>
                      <button
                        onClick={nextPhoto}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(90, 0, 79, 0.7)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        →
                      </button>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "rgba(0, 0, 0, 0.6)",
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {photoIndex + 1} / {selectedReview.photos.length}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Location Info */}
            {/*<div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "24px",
                borderBottom: "1px solid #eee",
                paddingBottom: "24px",
              }}
            >
              <div>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                  Latitude
                </label>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  {selectedReview.latitude || "N/A"}
                </p>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                  Longitude
                </label>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  {selectedReview.longitude || "N/A"}
                </p>
              </div>
            </div>*/}

            {/* Metadata */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                  Created Date
                </label>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  {new Date(selectedReview.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>
                  Updated Date
                </label>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  {new Date(selectedReview.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
