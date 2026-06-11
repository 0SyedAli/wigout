"use client";

import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import api from "@/lib/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const monthsList = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];

const yearsList = ["2026", "2025", "2024", "2023"];

export default function AnalyticsPage() {
    // 1. Rating Chart State (Yearly)
    const [ratingYear, setRatingYear] = useState("2026");
    const [ratingData, setRatingData] = useState(null);
    const [ratingLoading, setRatingLoading] = useState(true);
    const [ratingError, setRatingError] = useState("");

    // 2. Rating Summary State (Monthly)
    const [summaryMonth, setSummaryMonth] = useState("04");
    const [summaryYear, setSummaryYear] = useState("2026");
    const [summaryData, setSummaryData] = useState(null);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [summaryError, setSummaryError] = useState("");

    // 3. User Platform State (Monthly)
    const [platformMonth, setPlatformMonth] = useState("05");
    const [platformYear, setPlatformYear] = useState("2026");
    const [platformData, setPlatformData] = useState(null);
    const [platformLoading, setPlatformLoading] = useState(true);
    const [platformError, setPlatformError] = useState("");

    // Fetch Rating Chart (Yearly)
    useEffect(() => {
        const fetchRatingChart = async () => {
            setRatingLoading(true);
            setRatingError("");
            try {
                const response = await api.get("/admin/dashboard/ratingChart", {
                    params: { date: ratingYear },
                });
                if (response.data && response.data.success) {
                    setRatingData(response.data.data);
                } else {
                    setRatingError(response.data?.message || "Failed to fetch yearly rating data.");
                }
            } catch (err) {
                console.error("Error fetching rating chart:", err);
                setRatingError("Error loading rating chart.");
            } finally {
                setRatingLoading(false);
            }
        };
        fetchRatingChart();
    }, [ratingYear]);

    // Fetch Ratings Summary (Monthly)
    useEffect(() => {
        const fetchRatingsSummary = async () => {
            setSummaryLoading(true);
            setSummaryError("");
            try {
                const response = await api.get("/admin/dashboard/ratingsSummary", {
                    params: { date: `${summaryMonth}/${summaryYear}` },
                });
                if (response.data && response.data.success) {
                    setSummaryData(response.data.data);
                } else {
                    setSummaryError(response.data?.message || "Failed to fetch rating summary.");
                }
            } catch (err) {
                console.error("Error fetching ratings summary:", err);
                setSummaryError("Error loading ratings summary.");
            } finally {
                setSummaryLoading(false);
            }
        };
        fetchRatingsSummary();
    }, [summaryMonth, summaryYear]);

    // Fetch User Platform Chart (Monthly)
    useEffect(() => {
        const fetchUserPlatform = async () => {
            setPlatformLoading(true);
            setPlatformError("");
            try {
                const response = await api.get("/admin/dashboard/userPlatformChart", {
                    params: { date: `${platformMonth}/${platformYear}` },
                });
                if (response.data && response.data.success) {
                    setPlatformData(response.data.data);
                } else {
                    setPlatformError(response.data?.message || "Failed to fetch user platform data.");
                }
            } catch (err) {
                console.error("Error fetching user platform:", err);
                setPlatformError("Error loading platform data.");
            } finally {
                setPlatformLoading(false);
            }
        };
        fetchUserPlatform();
    }, [platformMonth, platformYear]);

    // Rating Chart (Yearly) configurations
    const ratingBarData = ratingData ? {
        labels: ratingData.labels || [],
        datasets: [
            {
                label: "Positive Reviews",
                data: ratingData.positive || [],
                backgroundColor: "#5a004f",
                borderRadius: 6,
                barThickness: 16,
            },
            {
                label: "Negative Reviews",
                data: ratingData.negative || [],
                backgroundColor: "#ff3b30",
                borderRadius: 6,
                barThickness: 16,
            }
        ]
    } : null;

    const ratingBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12,
                    font: {
                        family: "var(--font-quicksand), sans-serif",
                        weight: "600",
                    }
                }
            },
            tooltip: {
                padding: 12,
                cornerRadius: 8,
                backgroundColor: "#1f1f1f",
                titleFont: {
                    family: "var(--font-quicksand), sans-serif",
                    weight: "bold",
                },
                bodyFont: {
                    family: "var(--font-quicksand), sans-serif",
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: {
                        family: "var(--font-quicksand), sans-serif",
                        weight: "500",
                    }
                }
            },
            y: {
                grid: { color: "#f0f0f0" },
                ticks: {
                    font: {
                        family: "var(--font-quicksand), sans-serif",
                        weight: "500",
                    }
                }
            },
        },
    };

    // Ratings Summary (Monthly) configurations
    const likesCount = summaryData?.summary?.likes?.count || 0;
    const dislikesCount = summaryData?.summary?.dislikes?.count || 0;
    const likesPercentage = summaryData?.summary?.likes?.percentage || 0;
    const dislikesPercentage = summaryData?.summary?.dislikes?.percentage || 0;

    const summaryDoughnutData = summaryData ? {
        labels: ["Likes", "Dislikes"],
        datasets: [
            {
                data: [likesPercentage, dislikesPercentage],
                backgroundColor: ["#5a004f", "#ff3b30"],
                borderWidth: 0,
            }
        ]
    } : null;

    const summaryDoughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#1f1f1f",
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => {
                        const val = context.raw;
                        const count = context.label === "Likes" ? likesCount : dislikesCount;
                        return ` ${context.label}: ${val}% (${count} reviews)`;
                    }
                },
                titleFont: {
                    family: "var(--font-quicksand), sans-serif",
                },
                bodyFont: {
                    family: "var(--font-quicksand), sans-serif",
                }
            }
        }
    };

    // User Platform Chart (Monthly) configurations
    const userPlatformDoughnutData = platformData ? {
        labels: platformData.labels || [],
        datasets: [
            {
                data: platformData.values || [],
                backgroundColor: ["#5a004f", "#b04ca5"],
                borderWidth: 0,
            }
        ]
    } : null;

    const userPlatformDoughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    font: {
                        family: "var(--font-quicksand), sans-serif",
                        weight: "600",
                    }
                }
            },
            tooltip: {
                backgroundColor: "#1f1f1f",
                padding: 12,
                cornerRadius: 8,
                titleFont: {
                    family: "var(--font-quicksand), sans-serif",
                },
                bodyFont: {
                    family: "var(--font-quicksand), sans-serif",
                }
            }
        }
    };

    return (
        <div className="admin-page">
            {/* ===== HEADER ===== */}
            <div className="admin-card mb-4">
                <div className="page-header py-0">
                    <h5>Analytics & Reports</h5>
                </div>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="row g-4">

                {/* Yearly Rating Chart */}
                <div className="col-lg-8">
                    <div className="admin-card p-4 h-100 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                            <h6 className="m-0" style={{ fontWeight: "700", color: "#5a004f" }}>Yearly Ratings Breakdown</h6>
                            <select
                                className="clean-select"
                                value={ratingYear}
                                onChange={(e) => setRatingYear(e.target.value)}
                                style={{ outline: "none", cursor: "pointer" }}
                            >
                                {yearsList.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ height: "320px", position: "relative", flexGrow: 1 }} className="d-flex justify-content-center align-items-center">
                            {ratingLoading ? (
                                <div className="spinner-border" style={{ color: "#5a004f" }} role="status">
                                    <span className="visually-hidden">Loading chart...</span>
                                </div>
                            ) : ratingError ? (
                                <div className="alert alert-danger w-100 text-center m-3">{ratingError}</div>
                            ) : ratingBarData ? (
                                <Bar data={ratingBarData} options={ratingBarOptions} />
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* User Platform Chart */}
                <div className="col-lg-4">
                    <div className="admin-card p-4 h-100 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                            <h6 className="m-0" style={{ fontWeight: "700", color: "#5a004f" }}>Registration Platforms</h6>
                            <div className="d-flex gap-2">
                                <select
                                    className="clean-select"
                                    value={platformMonth}
                                    onChange={(e) => setPlatformMonth(e.target.value)}
                                    style={{ outline: "none", cursor: "pointer" }}
                                >
                                    {monthsList.map((m) => (
                                        <option key={m.value} value={m.value}>{m.label.substring(0, 3)}</option>
                                    ))}
                                </select>
                                <select
                                    className="clean-select"
                                    value={platformYear}
                                    onChange={(e) => setPlatformYear(e.target.value)}
                                    style={{ outline: "none", cursor: "pointer" }}
                                >
                                    {yearsList.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ height: "320px", position: "relative", flexGrow: 1 }} className="d-flex justify-content-center align-items-center">
                            {platformLoading ? (
                                <div className="spinner-border" style={{ color: "#5a004f" }} role="status">
                                    <span className="visually-hidden">Loading chart...</span>
                                </div>
                            ) : platformError ? (
                                <div className="alert alert-danger w-100 text-center m-3">{platformError}</div>
                            ) : userPlatformDoughnutData ? (
                                <div style={{ position: "relative", height: "100%", width: "100%" }}>
                                    <Doughnut data={userPlatformDoughnutData} options={userPlatformDoughnutOptions} />
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -75%)",
                                            textAlign: "center",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <span style={{ fontSize: "11px", color: "#999", fontWeight: "600", textTransform: "uppercase" }}>Total</span>
                                        <h4 style={{ margin: 0, fontWeight: "700", color: "#333" }}>
                                            {(platformData?.values || []).reduce((a, b) => a + b, 0)}
                                        </h4>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Ratings Summary (Unified Section) */}
                <div className="col-lg-12">
                    <div className="admin-card p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                            <h6 className="m-0" style={{ fontWeight: "700", color: "#5a004f" }}>Monthly Ratings Summary & Top Spots</h6>
                            <div className="d-flex gap-2">
                                <select
                                    className="clean-select"
                                    value={summaryMonth}
                                    onChange={(e) => setSummaryMonth(e.target.value)}
                                    style={{ outline: "none", cursor: "pointer" }}
                                >
                                    {monthsList.map((m) => (
                                        <option key={m.value} value={m.value}>{m.label}</option>
                                    ))}
                                </select>
                                <select
                                    className="clean-select"
                                    value={summaryYear}
                                    onChange={(e) => setSummaryYear(e.target.value)}
                                    style={{ outline: "none", cursor: "pointer" }}
                                >
                                    {yearsList.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {summaryLoading ? (
                            <div className="d-flex justify-content-center align-items-center py-5">
                                <div className="spinner-border" style={{ color: "#5a004f" }} role="status">
                                    <span className="visually-hidden">Loading summary...</span>
                                </div>
                            </div>
                        ) : summaryError ? (
                            <div className="alert alert-danger text-center m-3">{summaryError}</div>
                        ) : summaryData ? (
                            <div className="row g-4 align-items-center">
                                {/* Doughnut Chart Column */}
                                <div className="col-md-4 text-center">
                                    <div style={{ height: "220px", position: "relative", margin: "0 auto", maxWidth: "220px" }}>
                                        <Doughnut data={summaryDoughnutData} options={summaryDoughnutOptions} />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                textAlign: "center",
                                                pointerEvents: "none"
                                            }}
                                        >
                                            <span style={{ fontSize: "11px", color: "#999", fontWeight: "600", textTransform: "uppercase" }}>Likes</span>
                                            <h3 style={{ margin: 0, fontWeight: "700", color: "#5a004f" }}>{likesPercentage}%</h3>
                                        </div>
                                    </div>
                                    <div className="rating-meta justify-content-center gap-4 mt-3">
                                        <div><span className="dot like" style={{ backgroundColor: "#5a004f" }} /> Likes: <b>{likesCount}</b> ({likesPercentage}%)</div>
                                        <div><span className="dot dislike" style={{ backgroundColor: "#ff3b30" }} /> Dislikes: <b>{dislikesCount}</b> ({dislikesPercentage}%)</div>
                                    </div>
                                </div>

                                {/* Top Go Again Spots */}
                                <div className="col-md-4">
                                    <div className="p-3" style={{ background: "#fdf8fc", borderRadius: "12px", border: "1px solid #f9ebf5", height: "100%", minHeight: "220px" }}>
                                        <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#5a004f" }}>
                                            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#2ecc71" }} />
                                            Top "Go Again" Spots
                                        </h6>
                                        {summaryData.topGoAgainSpots && summaryData.topGoAgainSpots.length > 0 ? (
                                            <ol className="m-0 ps-3" style={{ fontSize: "14px", lineHeight: "2" }}>
                                                {summaryData.topGoAgainSpots.map((spot, idx) => (
                                                    <li key={idx} className="fw-medium text-dark">{spot}</li>
                                                ))}
                                            </ol>
                                        ) : (
                                            <p className="text-muted small m-0">No top spots found for this period.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Top Avoid Spots */}
                                <div className="col-md-4">
                                    <div className="p-3" style={{ background: "#fff5f5", borderRadius: "12px", border: "1px solid #ffe3e3", height: "100%", minHeight: "220px" }}>
                                        <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#d9534f" }}>
                                            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ff3b30" }} />
                                            Top "Avoid" Spots
                                        </h6>
                                        {summaryData.topAvoidSpots && summaryData.topAvoidSpots.length > 0 ? (
                                            <ol className="m-0 ps-3" style={{ fontSize: "14px", lineHeight: "2" }}>
                                                {summaryData.topAvoidSpots.map((spot, idx) => (
                                                    <li key={idx} className="fw-medium text-dark">{spot}</li>
                                                ))}
                                            </ol>
                                        ) : (
                                            <p className="text-muted small m-0">No avoid spots found for this period.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

            </div>
        </div>
    );
}
