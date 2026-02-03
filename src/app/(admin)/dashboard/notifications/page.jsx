import { BiSolidBell, BiSolidParty } from "react-icons/bi";
import { IoIosWarning } from "react-icons/io";

export default function NotificationsPage() {
    return (
        <div className="admin-page">

            {/* ===== HEADER ===== */}
            <div className="admin-card py-2 mb-4">
                <div className="page-header px-0">
                    <h5>Notifications & Alerts Management</h5>
                    <button className="btn-primary-pill">Create Alert</button>
                </div>
            </div>

            {/* ===== STATS ===== */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="stat-card  h-100">
                        <div>
                            <h6 className="fw-bold mb-5">Total Alerts Sent</h6>
                            <div className="stat-value">4,132</div>
                        </div>
                        <BiSolidBell size={60} color="#51004F" />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="stat-card  h-100">
                        <div>
                            <h6 className="fw-bold mb-5">Warnings</h6>
                            <div className="stat-value stat-danger">1,234</div>
                        </div>
                        <IoIosWarning size={60} color="#E51A13" />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="stat-card  h-100">
                        <div>
                            <h6 className="fw-bold mb-5">Celebrations</h6>
                            <div className="stat-value stat-success">27</div>
                        </div>
                        <BiSolidParty size={60} color="#2FBF66" />
                    </div>
                </div>
            </div>

            {/* ===== ACTIVITY + CONFIG ===== */}
            <div className="row g-4 mb-4">

                {/* Activity */}
                <div className="col-lg-7">
                    <div className="admin-card p-4 h-100">
                        <div className="d-flex justify-content-between mb-3">
                            <h6 className="mb-3 fw-bold">Recent Alerts Activity</h6>
                            <span className="text-muted">Most recent 20</span>
                        </div>

                        <div className="alert-item position-relative">
                            <div className="alert-title">User milestone</div>
                            <div className="alert-meta">2025-09-05 18:20</div>
                            <div className="alert-desc">
                                1,000 users signed up this month
                            </div>
                            <span className="alert-icon">
                                <BiSolidBell size={20} color="#51004F" />

                            </span>
                        </div>

                        <div className="alert-item position-relative">
                            <div className="alert-title">Green Diner flagged</div>
                            <div className="alert-meta">2025-09-05 18:20</div>
                            <div className="alert-desc">
                                Green Diner hit 60% dislikes in 24h
                            </div>
                            <span className="alert-icon">
                                <IoIosWarning size={20} color="#E51A13" />

                            </span>
                        </div>

                        <div className="alert-item position-relative">
                            <div className="alert-title">User milestone</div>
                            <div className="alert-meta">2025-09-05 18:20</div>
                            <div className="alert-desc">
                                1,000 users signed up this month
                            </div>
                            <span className="alert-icon">
                                <BiSolidParty size={20} color="#2FBF66" />

                            </span>
                        </div>
                    </div>
                </div>

                {/* Config */}
                <div className="col-lg-5">
                    <div className="admin-card p-4  h-100">
                        <h6 className="mb-3 fw-bold">Alert Configurations</h6>

                        <div className="mb-3">
                            <label className="fw-semibold mb-1">Sound</label>
                            <select className="form-control">
                                <option>Ping</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="fw-semibold mb-1">Animation</label>
                            <select className="form-control">
                                <option>Pulses</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="fw-semibold mb-1">Trigger Conditions</label>
                            <select className="form-control">
                                <option>Manual</option>
                            </select>
                        </div>

                        <button className="btn-primary-pill me-2">Save</button>
                        <button className="btn btn-outline-secondary rounded-pill">
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== BUILDER ===== */}
            <div className="admin-card p-4 mb-4">
                <h6 className="mb-3 fw-bold">Custom Notification Builder</h6>

                <div className="row g-3 mb-3">
                    <div className="col-md-4">
                        <input className="form-control" placeholder="Avoid Alert" />
                    </div>
                    <div className="col-md-4">
                        <select className="form-control">
                            <option>Warnings</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-control">
                            <option>All users</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="fw-semibold mb-1">Title</label>
                    <input className="form-control" placeholder="Avoid Alert" />
                </div>

                <div className="mb-4">
                    <label className="fw-semibold mb-1">Message</label>
                    <textarea className="form-control" rows="4" placeholder="Avoid Alert" />

                </div>

                <button className="btn-primary-pill me-2">Save Template</button>
                <button className="btn btn-outline-secondary rounded-pill">
                    Preview
                </button>
            </div>

            {/* ===== SAVED TEMPLATES ===== */}
            <div className="admin-card p-4">
                <h6 className="mb-3 fw-bold">Save Template</h6>

                <div className="template-item mb-3">
                    <div>
                        <div className="template-title">Top Spot</div>
                        <div className="template-sub">Celebration • All Users</div>
                    </div>
                    <div>
                        <button className="btn-soft red me-2">Delete</button>
                        <button className="btn-soft green">Edit</button>
                    </div>
                </div>

                <div className="template-item">
                    <div>
                        <div className="template-title">Top Spot</div>
                        <div className="template-sub">Celebration • All Users</div>
                    </div>
                    <div>
                        <button className="btn-soft red me-2">Delete</button>
                        <button className="btn-soft green">Edit</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
