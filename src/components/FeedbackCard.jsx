"use client";

import React, { useState } from "react";
import Avatar from "./Avatar";

export default function FeedbackCard({ item, index }) {
  const [extended, setExtended] = useState(false);

  const shortFeedback =
    item.feedback.length > 100
      ? item.feedback.slice(0, 100) + "..."
      : item.feedback;

  return (
    <div
      key={index}
      className="row border p-3 rounded-2"
      style={{ width: "400px", flexShrink: "0" }}
      id="feedback_card"
    >
      <div className="col-md-2 d-flex align-items-center justify-content-start flex-column">
        <Avatar name={item.name} />
      </div>
      <div className="col-md-10">
        <h5>@{item.email.split("@")[0]}</h5>
        <p>
          {extended ? item.feedback : shortFeedback}
          {item.feedback.length > 100 && (
            <button
              className="btn btn-link p-0 ms-1"
              onClick={() => setExtended(!extended)}
            >
              {extended ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
        <small>{new Date(item.created_at).toDateString()}</small>
      </div>
    </div>
  );
}
