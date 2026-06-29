import React, { useEffect, useState } from "react";
import { getLogs } from "../services/api";

function LogTable({
  page,
  setPage,
  search,
  severity,
  status,
  role,
  sortBy,
  order
}) {

  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, [page, search, severity, status, role, sortBy, order]);

  async function fetchLogs() {

    try {

      setLoading(true);

 
        const res = await getLogs({
            page,
            limit: 10,
            search,
            severity,
            status,
            role,
            sortBy,
            order
        });
     
      setLogs(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="card shadow">

      <div className="card-body">

        <div className="d-flex justify-content-between mb-3">

          <h5>
            Total Logs : <span className="text-success">{total}</span>
          </h5>

          <h6>
            Showing {(page - 1) * 10 + 1} -
            {Math.min(page * 10, total)} of {total}
          </h6>

        </div>

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-success">
            <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Role</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Resource Type</th>
                <th>IP Address</th>
                <th>Region</th>
                <th>Severity</th>
                <th>Status</th>
            </tr>
            </thead>

            <tbody>

                {loading ? (

                <tr>
                <td colSpan="10" className="text-center p-4">
                <div className="spinner-border text-success"></div>
                </td>
                </tr>

                ) : (

                logs.map((log) => (

                <tr key={log._id}>

                <td>{new Date(log.timestamp).toLocaleString()}</td>

                <td>{log.actor}</td>

                <td>
                <span className="badge bg-primary">
                {log.role}
                </span>
                </td>

                <td>{log.action}</td>

                <td>{log.resource}</td>

                <td>{log.resourceType}</td>

                <td>{log.ipAddress}</td>

                <td>{log.region}</td>

                <td>

                <span
                className={
                log.severity==="HIGH" ?"badge bg-danger": log.severity==="MEDIUM"?"badge bg-warning text-dark":"badge bg-success"
                }
                >

                {log.severity}

                </span>

                </td>

                <td>

                <span
                className={
                log.status==="Resolved" ?"badge bg-success":"badge bg-secondary"
                }
                >

                {log.status}

                </span>

                </td>

                </tr>

                ))

                )}

                </tbody>
          </table>

        </div>

        {/* Pagination */}

        <div className="d-flex justify-content-center mt-4">

          <button
            className="btn btn-outline-success me-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span className="align-self-center">

            Page {page} of {totalPages}

          </span>

          <button
            className="btn btn-outline-success ms-2"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      </div>

    </div>

  );
}

export default LogTable;