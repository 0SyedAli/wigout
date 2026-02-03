import { FaRegEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function SupportPage() {
    return (
        <div className="admin-page">
            <div className="admin-card">

                {/* Header */}
                <div className="page-header page-header-main pt-0 px-0">
                    <h5>Support & Help</h5>
                    <button className="btn-primary-pill">New Ticket</button>
                </div>

                {/* Tickets */}
                <div className="page-header">
                    <h6>Tickets</h6>
                </div>

                <table className="table table-admin">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Issue</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jane Doe</td>
                            <td>Unable to reset password</td>
                            <td>2025-09-10</td>
                            <td><button className="btn-soft orange">Open</button></td>
                            <td className="action-icons fs-5">
                                <div className="d-flex align-items-center gap-3">
                                    <FaRegEye />
                                    <MdOutlineModeEdit />
                                    <RiDeleteBin6Line color="red"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>John Smith</td>
                            <td>App keeps crashing</td>
                            <td>2025-09-10</td>
                            <td><button className="btn-soft green">Resolved</button></td>
                            <td className="action-icons fs-5">
                                <div className="d-flex align-items-center gap-3">
                                    <FaRegEye />
                                    <MdOutlineModeEdit />
                                    <RiDeleteBin6Line color="red"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* FAQ */}
                <div className="page-header mt-4">
                    <h6>FAQ Management</h6>
                    <button className="btn-primary-pill">Add FAQ</button>
                </div>

                <div className="">
                    <div className="faq-item mb-3">
                        <span>How do I reset my password?</span>
                        <div>
                            <button className="btn-soft red me-2">Delete</button>
                            <button className="btn-soft green">Edit</button>
                        </div>
                    </div>

                    <div className="faq-item">
                        <span>How do I report an issue?</span>
                        <div>
                            <button className="btn-soft red me-2">Delete</button>
                            <button className="btn-soft green">Edit</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
