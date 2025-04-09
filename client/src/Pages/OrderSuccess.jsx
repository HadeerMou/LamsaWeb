import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow text-center">
        <i className="fa fa-check-circle text-success display-2 fs-2"></i>
        <h2 className="mt-3">Order Placed Successfully!</h2>
        <p className="text-muted">
          Thank you for your purchase. Your order is being processed.
        </p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
