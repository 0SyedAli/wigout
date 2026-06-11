"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";
import { ImArrowDownLeft2, ImArrowUpRight2 } from "react-icons/im";
import { ResponsiveLine } from "@nivo/line";
import api from "@/lib/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const ratingsData = {
  datasets: [
    {
      data: [80, 75],
      backgroundColor: ["#440A2E", "#922E6C"],
      borderWidth: 1,
    },
  ],
};

const ratingsOptions = {
  cutout: "70%",
  plugins: { legend: { display: false } },
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  const [selectedYear, setSelectedYear] = useState("2026");
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState("");

  // Fetch Dashboard Stats
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      setStatsError("");
      try {
        const response = await api.get("admin/dashboard/stats");
        if (response.data && response.data.success) {
          setStats(response.data.data);
        } else {
          setStatsError(response.data?.message || "Failed to fetch dashboard stats.");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStatsError("Error loading dashboard stats.");
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Fetch Monthly User Chart Data
  useEffect(() => {
    const fetchChartData = async () => {
      setChartLoading(true);
      setChartError("");
      try {
        const response = await api.get("admin/dashboard/userChart", {
          params: { date: selectedYear },
        });
        if (response.data && response.data.success) {
          setChartData(response.data.data);
        } else {
          setChartError(response.data?.message || "Failed to fetch chart data.");
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setChartError("Error loading chart data.");
      } finally {
        setChartLoading(false);
      }
    };
    fetchChartData();
  }, [selectedYear]);

  // Format data for Nivo ResponsiveLine
  const nivoData = chartData
    ? [
      {
        id: "Users",
        color: "#6A1B9A",
        data: chartData.labels.map((label, index) => ({
          x: label,
          y: chartData.users[index] ?? 0,
        })),
      },
    ]
    : [];

  return (
    <div className="container-fluid dashboard-page py-4">
      {/* ================= TOP STATS ================= */}
      <div className="row g-3 mb-4">
        {statsLoading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border" style={{ color: "#6A1B9A" }} role="status">
              <span className="visually-hidden">Loading stats...</span>
            </div>
          </div>
        ) : statsError ? (
          <div className="col-12">
            <div className="alert alert-danger">{statsError}</div>
          </div>
        ) : stats ? (
          <>
            <StatCard
              title="Total Users"
              count={stats.users?.count}
              growth={stats.users?.growth}
              isPositive={stats.users?.isPositive}
              label={stats.users?.label}
            />
            <StatCard
              title="Total Reviews"
              count={stats.reviews?.count}
              growth={stats.reviews?.growth}
              isPositive={stats.reviews?.isPositive}
              label={stats.reviews?.label}
            />
            <StatCard
              title="Positive Reviews"
              count={stats.positive?.count}
              growth={stats.positive?.growth}
              isPositive={stats.positive?.isPositive}
              label={stats.positive?.label}
            />
            <StatCard
              title="Negative Reviews"
              count={stats.negative?.count}
              growth={stats.negative?.growth}
              isPositive={stats.negative?.isPositive}
              label={stats.negative?.label}
            />
            <StatCard
              title="New Signups Today"
              count={stats.newSignups?.count}
              growth={stats.newSignups?.growth}
              isPositive={stats.newSignups?.isPositive}
              label={stats.newSignups?.label}
            />
          </>
        ) : null}
      </div>

      {/* ================= FEED + RATINGS ================= */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="card clean-card">
            <div className="card-header clean-header">
              <span className="fw-bold">Monthly Users Chart</span>
              <select
                className="clean-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            <div className="card-body w0-line-canva" style={{ height: "400px" }}>
              {chartLoading ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="spinner-border" style={{ color: "#6A1B9A" }} role="status">
                    <span className="visually-hidden">Loading chart...</span>
                  </div>
                </div>
              ) : chartError ? (
                <div className="alert alert-danger m-3">{chartError}</div>
              ) : chartData ? (
                <ResponsiveLine
                  data={nivoData}
                  margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false,
                  }}
                  yFormat=" >-.0f"
                  curve="monotoneX"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: "Month",
                    legendOffset: 36,
                    legendPosition: "middle",
                    truncateTickAt: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Users",
                    legendOffset: -40,
                    legendPosition: "middle",
                    truncateTickAt: 0,
                  }}
                  enableGridX={false}
                  gridYValues={5}
                  colors={["#6A1B9A"]}
                  lineWidth={3}
                  enablePoints={true}
                  pointSize={8}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabel="data.yFormatted"
                  pointLabelYOffset={-12}
                  enableTouchCrosshair={true}
                  useMesh={true}
                  tooltip={({ point }) => (
                    <div
                      style={{
                        background: "#1f1f1f",
                        color: "#ffffff",
                        padding: "9px 12px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-1">
                        {/* <span
                          style={{
                            width: 10,
                            height: 10,
                            background: point.serieColor,
                            borderRadius: "50%",
                            display: "inline-block",
                          }}
                        /> */}
                        <strong>Month:</strong> {point.data.xFormatted || point.data.x}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        {/* <span
                          style={{
                            width: 10,
                            height: 10,
                            background: "transparent",
                            display: "inline-block",
                          }}
                        /> */}
                        <strong>Student:</strong> {point.data.yFormatted || point.data.y}
                      </div>
                    </div>
                  )}
                  theme={{
                    axis: {
                      domain: { line: { stroke: "#e0e0e0" } },
                      ticks: {
                        line: { stroke: "#e0e0e0", strokeWidth: 1 },
                        text: {
                          fontSize: 12,
                          fill: "#666666",
                          fontFamily: "var(--font-quicksand), sans-serif",
                        },
                      },
                      legend: {
                        text: {
                          fontSize: 13,
                          fill: "#333333",
                          fontWeight: 600,
                          fontFamily: "var(--font-quicksand), sans-serif",
                        },
                      },
                    },
                    grid: { line: { stroke: "#f0f0f0", strokeWidth: 1 } },
                    tooltip: {
                      container: {
                        background: "#1f1f1f",
                        color: "#ffffff",
                        fontSize: 13,
                        borderRadius: 8,
                        padding: 12,
                      },
                    },
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* Activity Feed */}
        {/* <div className="col-lg-7">
          <div className="card clean-card h-100">
            <div className="card-header clean-header">
              <span className="fw-bold">Recent Activity Feed</span>
              <select className="clean-select">
                <option>Latest Feed</option>
              </select>
            </div>

            <div className="card-body activity-list">
              <Activity type="new" badge="New" />
              <Activity type="flagged" badge="Flagged" />
              <Activity type="helpful" badge="+ Helpful" />
            </div>
          </div>
        </div> */}

        {/* Ratings */}
        {/* <div className="col-lg-5">
          <div className="card clean-card h-100">
            <div className="card-header clean-header">
              <span className="fw-bold">Ratings Summary</span>
              <select className="clean-select">
                <option>Week</option>
              </select>
            </div>

            <div className="card-body w0-donut-canva text-center">
              <Doughnut
                data={ratingsData}
                options={ratingsOptions}
              />

              <div className="rating-meta">
                <div><span className="dot like" /> Likes <b>80%</b></div>
                <div><span className="dot dislike" /> Dislikes <b>75%</b></div>
              </div>

              <div className="row text-start mt-4">
                <div className="col">
                  <h6 className="fw-bold">Top “Go Again” Spots</h6>
                  <ol>
                    <li>The Coffee Place</li>
                    <li>Sunset Bar</li>
                    <li>Bella Pizzeria</li>
                  </ol>
                </div>
                <div className="col">
                  <h6 className="fw-bold">Top “Avoid” Spots</h6>
                  <ol>
                    <li>Roadside Diner</li>
                    <li>Green Diner</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* ================= LINE GRAPH ================= */}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, count, growth, isPositive, label }) {
  const isNegativeMetric = title.toLowerCase().includes("negative");
  const danger = isNegativeMetric ? isPositive : !isPositive;

  return (
    <div className="col-xl col-lg-4 col-md-6">
      <div className="card stat-card align-items-stretch clean-card h-100">
        <span className="stat-title mb-2">{title}</span>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="w-100">
            <div className="stat-row">
              <h3>{count ?? 0}</h3>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-2">

              <span className={`stat-badge ${danger ? "red" : ""}`}>
                {danger ? <ImArrowDownLeft2 /> : <ImArrowUpRight2 />} {growth ?? 0}%
              </span>
              <Image
                width={40}
                height={22}
                alt=""
                src={`/images/${danger ? "wo-chart-icon2.png" : "wo-chart-icon1.png"}`}
              />
            </div>
            {label && (
              <div className="text-muted mt-1" style={{ fontSize: "11px" }}>
                {label}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function Activity({ type, badge }) {
  const map = {
    new: "activity-new",
    flagged: "activity-flagged",
    helpful: "activity-helpful",
  };

  return (
    <div className={`activity-item ${map[type]}`}>
      <div className="d-flex justify-content-between">
        <strong>
          {type === "new" && "New establishment added: Blue Ocean Hotel"}
          {type === "flagged" && "Reported issue at Green Diner"}
          {type === "helpful" && "Jane D. rated The Coffee Place 5★"}
        </strong>
        <span className="badge">{badge}</span>
      </div>
      <small>10 minutes ago</small>
      <p className="mb-0 mt-2">"Sample activity description text."</p>
    </div>
  );
}

