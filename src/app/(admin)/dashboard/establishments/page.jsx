import { FaRegEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

export default function EstablishmentsPage() {
  return (
    <div className="admin-page">
      <div className="admin-card">

        <div className="page-header  pt-0 px-0">
          <h5>Establishment</h5>
          <div className="filter-bar">
            <input placeholder="Establishment Name" />
            <select><option>Category</option></select>
            <input placeholder="Location" />
            <select><option>Popularity</option></select>
          </div>
        </div>

        <table className="table table-admin">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Locations</th>
              <th>Ratings Summary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i}>
                <td>The Coffee Place</td>
                <td>Restaurant</td>
                <td>Miami</td>
                <td>Likes: 120 / Dislikes: 10</td>
                <td><span className="status-active">Active</span></td>
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
