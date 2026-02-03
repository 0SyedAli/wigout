export default function SystemSettingsPage() {
    return (
        <div className="admin-page">
            <div className="admin-card">

                {/* Header */}
                <div className="page-header page-header-main  pt-0 px-0">
                    <h5>System Settings</h5>
                    <button className="btn-primary-pill">Save changes</button>
                </div>

                {/* Admin Roles */}
                <div className="page-header">
                    <h6>Admin Roles</h6>
                    <button className="btn-primary-pill">Add New</button>
                </div>

                <table className="table table-admin">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Last Login</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Alice Admin</td>
                            <td>Super Admin</td>
                            <td>2025-09-10 15:30</td>
                            <td className="text-center">
                                <button className="btn-soft green me-2">Edit</button>
                                <button className="btn-soft red">Remove</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Bob Manager</td>
                            <td>Moderator</td>
                            <td>2025-09-10 15:30</td>
                            <td className="text-center">
                                <button className="btn-soft green me-2">Edit</button>
                                <button className="btn-soft red">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Role Permissions Matrix */}
                <div className="page-header mt-4">
                    <h6>Role Permissions Matrix</h6>
                    <button className="btn-primary-pill">Generate key</button>
                </div>

                <table className="table table-admin permission-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Super Admin</th>
                            <th>Moderator</th>
                            <th>Viewer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Manage Users</td>
                            <td><span className="perm-dot" /></td>
                            <td><span className="perm-dot" /></td>
                            <td><span className="perm-dot active" /></td>
                        </tr>

                        <tr>
                            <td>Edit Establishments</td>
                            <td><span className="perm-dot active" /></td>
                            <td><span className="perm-dot active" /></td>
                            <td><span className="perm-dot" /></td>
                        </tr>

                        <tr>
                            <td>View Analytics</td>
                            <td><span className="perm-dot" /></td>
                            <td><span className="perm-dot active" /></td>
                            <td><span className="perm-dot" /></td>
                        </tr>

                        <tr>
                            <td>System Settings</td>
                            <td><span className="perm-dot" /></td>
                            <td><span className="perm-dot" /></td>
                            <td><span className="perm-dot" /></td>
                        </tr>
                    </tbody>
                </table>

                {/* General Settings */}
                <div className="page-header mt-4">
                    <h6>General Settings</h6>
                </div>

                <div >
                    <div className="d-flex justify-content-between mb-3">
                        <span>Enable Data Privacy Mode</span>
                        <span className="perm-dot active" />
                        {/* <span className="toggle" /> */}
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Automatic Backups</span>
                        <span className="perm-dot" />
                        {/* <span className="toggle active" /> */}
                    </div>


                </div>
            </div>
            <div>
                <button className="btn-primary-pill mt-4 me-2">Backup Now</button>
                <button className="btn btn-outline-secondary rounded-pill">
                    Restore Backup
                </button>
            </div>
        </div>
    );
}
