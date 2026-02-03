import { FaRegEye } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

export default function CategoriesPage() {
  return (
    <div className="admin-page">
      <div className="admin-card">

        <div className="page-header  pt-0 px-0" >
          <h5>Category Management</h5>
          <button className="btn-primary-pill">
            Add New Category
          </button>
        </div>

        <table className="table table-admin">
          <thead>
            <tr>
              <th>Name</th>
              <th>Descriptions</th>
              <th>Total Establishments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {["Restaurants", "Cafe", "Hotel"].map((c, i) => (
              <tr key={i}>
                <td>{c}</td>
                <td>Places to eat and dine</td>
                <td>152</td>
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
