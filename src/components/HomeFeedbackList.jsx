"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";

export default function HomeFeedbackList() {
  const router = useRouter();
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
      onClick={() => {
        router.push("/feedback");
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="mt-5 container" id="feedback_list_home">
        {loading ? (
          <p>Loading...</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          feedbacks.map((item, index) => (
            <div
              key={index}
              className="row border p-3 rounded-2 bg-dark text-light"
              style={{ width: "400px", flexShrink: "0" }}
              id="feedback_card"
            >
              <div className="col-md-2 d-flex align-items-center justify-content-center flex-column">
                <Avatar name={item.name} />
              </div>
              <div className="col-md-10">
                <h5>@{item.email.split("@")[0]}</h5>
                <p>{item.feedback.slice(0, 100)}</p>
                <small>{new Date(item.created_at).toDateString()}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
