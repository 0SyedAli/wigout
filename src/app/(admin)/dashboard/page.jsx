"use client";

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
import { Line, Doughnut } from "react-chartjs-2";
import { ImArrowDownLeft2, ImArrowUpRight2 } from "react-icons/im";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: 'Top "Go Again" Spots',
      data: [180, 310, 240, 190, 300, 260, 180],
      borderColor: "#6A1B9A",
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: 'Top "Avoid" Spots',
      data: [120, 270, 220, 150, 210, 190, 130],
      borderColor: "#FF7A00",
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1f1f1f",
      padding: 12,
      borderRadius: 8,
    },
  },
  scales: {
    y: {
      grid: { color: "#f0f0f0" },
      ticks: { stepSize: 100 },
    },
    x: { grid: { display: false } },
  },
};

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
  return (
    <div className="container-fluid dashboard-page py-4">

      {/* ================= TOP STATS ================= */}
      <div className="row g-4 mb-4">
        <StatCard title="Total Users" value="12,482" />
        <StatCard title="Total Establishments" value="1,234" />
        <StatCard title="Active Alerts Sent" value="27" danger />
        <StatCard title="New Signups Today" value="56" />
      </div>

      {/* ================= FEED + RATINGS ================= */}
      <div className="row g-4 mb-4">

        {/* Activity Feed */}
        <div className="col-lg-7">
          <div className="card clean-card h-100">
            <div className="card-header clean-header">
              <span className="fw-bold">Recent Activity Feed</span>
              <select className="clean-select">
                <option>Latest Ratings</option>
              </select>
            </div>

            <div className="card-body activity-list">
              <Activity type="new" badge="New" />
              <Activity type="flagged" badge="Flagged" />
              <Activity type="helpful" badge="+ Helpful" />
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="col-lg-5">
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
        </div>

      </div>

      {/* ================= LINE GRAPH ================= */}
      <div className="card clean-card">
        <div className="card-header clean-header">
          <span className="fw-bold">Engagement trend line graph</span>
          <span className="muted">Past 30 days</span>
        </div>

        <div className="card-body w0-line-canva">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, danger }) {
  return (
    <div className="col-xl-3 col-md-6">
      <div className="card stat-card align-items-stretch clean-card">
        <span className="stat-title">{title}</span>
        <div className="d-flex justify-content-between">
          <div>
            <div className="stat-row">
              <h3>{value}</h3>
            </div>
            <span className={`stat-badge ${danger ? "red" : ""}`}>{danger ? <ImArrowDownLeft2  /> : <ImArrowUpRight2 />} 4.8%</span>
          </div>
          <Image width={89.79} height={36.77} alt="" src={`/images/${danger ? 'wo-chart-icon2.png' : 'wo-chart-icon1.png'}`} />
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
