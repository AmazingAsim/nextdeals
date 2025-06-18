"use client"; // Required since this uses hooks and browser APIs

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SuggestionForm() {
  const fetchurl = `${process.env.NEXT_PUBLIC_BASE_URL}/product_api/suggest_product.php`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productName: "",
    productLink: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch(fetchurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", productName: "", productLink: "" });
      } else {
        const data = await response.json();
        setError(data.message || "Submission failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container my-5 mx-auto" style={{ maxWidth: "600px" }}>
      {submitted && (
        <div className="alert alert-success border border-3 border-success" role="alert">
          Thanks for your suggestion! We'll check it out.
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email (Optional):</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            name="productName"
            className="form-control"
            required
            value={formData.productName}
            onChange={handleChange}
            placeholder="e.g. Wireless Earbuds"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Link:</label>
          <input
            type="url"
            name="productLink"
            className="form-control"
            required
            value={formData.productLink}
            onChange={handleChange}
            placeholder="https://example.com/product"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Submit Suggestion
        </button>
      </form>
    </div>
  );
}

export default SuggestionForm;
