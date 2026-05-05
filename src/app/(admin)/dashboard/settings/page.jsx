"use client";

import { FiCamera, FiMail, FiUser } from "react-icons/fi";

export default function SystemSettingsPage() {
    return (
        <div className="admin-page">
            <div className="admin-card">

                {/* Header */}
                <div className="page-header page-header-main  pt-0 px-0">
                    <h5>Account Settings</h5>
                    {/* <button className="btn-primary-pill px-4">Save changes</button> */}
                </div>

                {/* Form */}
                <div className="mt-4">
                    <div className="row">
                        <div className="col-lg-7 col-xl-6">
                            <form>
                                {/* Profile Image Section */}
                                <div className="mb-5 d-flex align-items-center gap-4">
                                    <div className="position-relative">
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center overflow-hidden border shadow-sm"
                                            style={{ width: '110px', height: '110px', background: '#fdf2f8' }}
                                        >
                                            <FiUser size={45} color="#d7a1be" />
                                            {/* Once we have an actual image: 
                                            <img src="/images/avatar.png" alt="Profile" className="w-100 h-100 object-fit-cover" /> 
                                            */}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary rounded-circle position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center p-0 shadow"
                                            style={{ width: '32px', height: '32px', border: '2px solid white', backgroundColor: '#6a003f' }}
                                        >
                                            <FiCamera size={14} />
                                        </button>
                                    </div>
                                    <div>
                                        <h6 className="mb-1 fw-bold" style={{ color: '#4b0b32' }}>Profile Photo</h6>
                                        <p className="text-muted small mb-0">Update your profile picture here.</p>
                                        <button type="button" className="btn btn-link p-0 text-decoration-none small mt-1" style={{ color: '#6a003f' }}>Remove photo</button>
                                    </div>
                                </div>

                                <div className="row g-4">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label fw-semibold mb-2" style={{ color: '#4b0b32' }}>Full Name</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 py-2 px-3">
                                                    <FiUser className="text-muted" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Enter your name"
                                                    defaultValue="Admin User"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label fw-semibold mb-2" style={{ color: '#4b0b32' }}>Email Address</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0 py-2 px-3">
                                                    <FiMail className="text-muted" />
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Email address"
                                                    disabled
                                                    defaultValue="admin@wigout.com"
                                                    style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
                                                />
                                            </div>
                                            {/* <p className="text-muted small mt-2 mb-0">Email address cannot be changed for security reasons.</p> */}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        {/* <div>
                            <h6 className="mb-1 fw-bold" style={{ color: '#4b0b32' }}>System Backup</h6>
                            <p className="text-muted small mb-0">Keep your system data safe by creating regular backups.</p>
                        </div> */}
                        <div className="d-flex gap-2">
                            {/* <button className="btn btn-outline-secondary rounded-pill px-4 py-2 small fw-semibold">
                                Restore Backup
                            </button> */}
                            <button className="btn-primary-pill px-4 py-2">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

