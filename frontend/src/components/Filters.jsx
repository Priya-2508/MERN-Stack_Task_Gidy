import React from "react";

function Filters({
  search,
  setSearch,
  severity,
  setSeverity,
  status,
  setStatus,
  role,
  setRole,
  sortBy,
  setSortBy,
  order,
  setOrder,
  setPage
}) {

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <div className="row g-3 align-items-end">

          {/* Search */}

          <div className="col-lg-3">

            <label className="form-label fw-bold">
              Search
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Actor, Action, Resource..."
              value={search}
              onChange={handleSearch}
            />

          </div>

          {/* Severity */}

          <div className="col-lg-2">

            <label className="form-label fw-bold">
              Severity
            </label>

            <select
              className="form-select"
              value={severity}
              onChange={(e) => {
                setSeverity(e.target.value);
                setPage(1);
              }}
            >

              <option value="">All</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>

            </select>

          </div>

          {/* Status */}

          <div className="col-lg-2">

            <label className="form-label fw-bold">
              Status
            </label>

            <select
              className="form-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >

              <option value="">All</option>
              <option value="Resolved">Resolved</option>
              <option value="Unresolved">Unresolved</option>

            </select>

          </div>

          {/* Role */}

          <div className="col-lg-2">

            <label className="form-label fw-bold">
              Role
            </label>

            <select
              className="form-select"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setPage(1);
              }}
            >

              <option value="">All</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="system">System</option>

            </select>

          </div>

          {/* Sort */}

          <div className="col-lg-2">

            <label className="form-label fw-bold">
              Sort By
            </label>

            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
            >

              <option value="timestamp">Timestamp</option>
              <option value="severity">Severity</option>
              <option value="actor">Actor</option>

            </select>

          </div>


          <div className="col-lg-1">

            <button
              className="btn btn-success w-100"
              onClick={() => {
                setOrder(order === "asc" ? "desc" : "asc");
                setPage(1);
              }}
            >
              {order === "asc" ? "↑" : "↓"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Filters;