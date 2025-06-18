"use client";

import React from "react";
import FeedbackForm from "@/components/FeedbackForm";
import HomeFeedbackList from "@/components/HomeFeedbackList";

export default function SendFeedbackPage() {
  return (
    <div className="mb-2" style={{ overflowY: "hidden", minHeight: "84vh" }}>
      <div className="container">
        <h4 className="display-6 border-bottom border-3 border-primary mb-5 py-2">
          Send us a feedback
        </h4>
        <div className="w-75 mx-auto">
          <FeedbackForm />
        </div>
      </div>
      <HomeFeedbackList />
    </div>
  );
}
