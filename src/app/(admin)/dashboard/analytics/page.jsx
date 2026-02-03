"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
const barData = {
    labels: ["Instagram", "Facebook", "Twitter", "Tiktok", "Youtube", "Pinterest"],
    datasets: [
        {
            data: [18, 30, 19, 35, 8, 22],
            backgroundColor: [
                "#8c6b80",
                "#2b0033",
                "#4a0055",
                "#a21a78",
                "#b04ca5",
                "#7d5c6f",
            ],
            borderRadius: 8,
            barThickness: 36,
        },
    ],
};

const barOptions = {
    plugins: {
        legend: { display: false },
    },
    scales: {
        x: { grid: { display: false } },
        y: {
            ticks: { stepSize: 10 },
            grid: { color: "#f0f0f0" },
        },
    },
};
export default function AnalyticsPage() {
    return (
        <div className="admin-page">

            {/* ===== HEADER ===== */}
            <div className="admin-card mb-4">
                <div className="page-header">
                    <h5>Analytics & Reports</h5>

                    <div className="d-flex gap-2">
                        <button className="btn-primary-pill light">Export CSV</button>
                        <button className="btn-primary-pill">Export PDF</button>
                    </div>
                </div>

                <div className="px-4 pb-4">
                    <div className="filter-bar">
                        <select><option>Time Range</option></select>
                        <select><option>Category</option></select>
                        <input placeholder="Location" />
                        <button className="btn-primary-pill">Apply</button>
                    </div>
                </div>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="row g-4">

                {/* Bar Chart */}
                <div className="col-lg-6">
                    <div className="admin-card p-4 h-100">
                        <h6 className="mb-4">Most Popular Establishments</h6>
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>

                {/* Heatmap */}
                <div className="col-lg-6">
                    <div className="admin-card p-4 h-100">
                        <h6 className="mb-4">Engagement Heatmap</h6>
                        <Heatmap />
                    </div>
                </div>

            </div>
        </div>
    );
}

/* =======================
   HEATMAP COMPONENT
======================= */

function Heatmap() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const hours = ["9am", "10am", "11am", "12am", "1am", "2pm", "3pm"];

    // intensity: 0 (empty) → 4 (dark)
    const data = [
        [0, 0, 1, 4, 3, 2, 0],
        [0, 1, 3, 2, 3, 3, 0],
        [0, 0, 2, 4, 3, 3, 0],
        [2, 2, 1, 4, 3, 1, 0],
        [0, 2, 3, 4, 4, 3, 0],
        [0, 0, 1, 4, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];

    return (
        <div className="heatmap">
            <div className="heatmap-grid">
                <div></div>
                {days.map(d => <div key={d} className="heatmap-day">{d}</div>)}

                {hours.map((h, i) => (
                    <div key={h}>
                        <div className="heatmap-hour">{h}</div>
                        {data[i].map((v, j) => (
                            <div key={j} className={`heat-cell level-${v}`} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
