export default function IntegrationsPage() {
  return (
    <div className="admin-page">
      <div className="admin-card">

        {/* Header */}
        <div className="page-header page-header-main pt-0 px-0">
          <h5>Integrations & External Apps</h5>
          <button className="btn-primary-pill">Add Integrations</button>
        </div>

        {/* Connected Apps */}
        <div className="page-header">
          <h6>Connected Apps</h6>
          <button className="btn-primary-pill">Add New</button>
        </div>

        <table className="table table-admin">
          <thead>
            <tr>
              <th>App Name</th>
              <th>Status</th>
              <th>Last Sync</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Booking.com</td>
              <td>Connected</td>
              <td>2025-09-10 15:30</td>
              <td className="text-center">
                <button className="btn-soft green me-2">Refresh</button>
                <button className="btn-soft red">Revoke</button>
              </td>
            </tr>
            <tr>
              <td>Google</td>
              <td>Not Connected</td>
              <td>-</td>
              <td className="text-center">
                <button className="btn-soft green me-2">Refresh</button>
                <button className="btn-soft red">Revoke</button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* API Keys */}
        <div className="page-header mt-4">
          <h6>API Keys</h6>
          <button className="btn-primary-pill">Generate key</button>
        </div>

        <table className="table table-admin">
          <thead>
            <tr>
              <th>Key</th>
              <th>Expiration</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>abcd-1234-efgh-5678</td>
              <td>2025-12-31</td>
              <td className="text-center">
                <button className="btn-soft green me-2">Refresh</button>
                <button className="btn-soft red">Revoke</button>
              </td>
            </tr>
            <tr>
              <td>ijkl-9012-mnop-3456</td>
              <td>-</td>
              <td className="text-center">
                <button className="btn-soft green me-2">Refresh</button>
                <button className="btn-soft red">Revoke</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}
