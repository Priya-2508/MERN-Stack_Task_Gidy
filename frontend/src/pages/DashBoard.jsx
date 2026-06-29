import React, { useState } from "react";
import Filters from "../components/Filters";
import LogTable from "../components/LogTable";

function Dashboard() {

  // Pagination
  const [page, setPage] = useState(1);

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState("timestamp");
  const [order, setOrder] = useState("desc");

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">

      <h2 className="text-success fw-bold mb-4">
        Log Management Dashboard
      </h2>

      <Filters
        search={search}
        setSearch={setSearch}

        severity={severity}
        setSeverity={setSeverity}

        status={status}
        setStatus={setStatus}

        role={role}
        setRole={setRole}

        sortBy={sortBy}
        setSortBy={setSortBy}

        order={order}
        setOrder={setOrder}

        setPage={setPage}
      />

      <LogTable

        page={page}
        setPage={setPage}

        search={search}
        severity={severity}
        status={status}
        role={role}

        sortBy={sortBy}
        order={order}

      />

    </div>
  );
}

export default Dashboard;