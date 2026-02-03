import { FaRegEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

export default function ReviewsPage() {
  return (
    <div className="admin-page">
      <div className="admin-card">

        <div className="page-header  pt-0 px-0">
          <h5>All Ratings & Reviews</h5>
          <div className="filter-bar">
            <input type="date" />
            <select><option>Category</option></select>
            <select><option>Rating Type</option></select>
          </div>
        </div>

        <table className="table table-admin">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Establishment</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i}>
                <td>Jane Doe</td>
                <td>The Coffee Place</td>
                <td>👍 Like</td>
                <td>Great ambiance and service</td>
                <td>2025-09-10</td>
                <td className="action-icons fs-5">
                  <div className="d-flex align-items-center gap-3 py-2">
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
