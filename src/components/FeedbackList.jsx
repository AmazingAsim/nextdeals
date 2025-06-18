"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FeedbackCard from "./FeedbackCard";


export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const fetchUrl = `${baseUrl}/product_api/get_feedbacks.php`;

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="mt-5 d-flex flex-wrap"
      style={{ justifyContent: "space-around", columnGap: "20px", rowGap: "20px" }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbacks.map((item, index) => (
          <FeedbackCard key={index} item={item} index={index} />
        ))
      )}
    </div>
  );
}
