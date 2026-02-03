import { FaRegEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

export default function UsersPage() {
  return (
    <div className="admin-page">
      <div className="admin-card">

        <div className="page-header  pt-0 px-0">
          <h5>Users</h5>
          <div className="filter-bar">
            <input placeholder="Name" />
            <input placeholder="Email" />
            <select><option>Status</option></select>
            <input placeholder="Location" />
            <input type="date" />
          </div>
        </div>

        <table className="table table-admin">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Total Ratings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i}>
                <td>Jane Doe</td>
                <td>jane@example.com</td>
                <td><span className="status-active">Active</span></td>
                <td>2025-09-10</td>
                <td>152</td>
                <td className="action-icons fs-5">
                  <div className="d-flex align-items-center gap-3">
                    <FaRegEye />
                    <MdOutlineModeEdit />
                  {/* <span className="action-danger">Suspend</span> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>1–10 of 200 items</span>
          <span>Page 1 of 44</span>
        </div>

      </div>
    </div>
  );
}
