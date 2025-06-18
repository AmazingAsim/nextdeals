"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FeedbackList from "@/components/FeedbackList";
import Footer from "@/components/Footer";

export default function FeedbackPage() {
  const router = useRouter();

  return (
    <div>
      <div className="container" id="feedbacklist" style={{ minHeight: "63vh" }}>
        <h1 className="display-6 border-bottom border-3 border-primary mb-5 py-4">
          See what our customers have to say
        </h1>
        <button
          id="send_feedback_btn"
          className="btn btn-primary"
          onClick={() => router.push("/send_feedback")}
        >
          Send us a feedback
        </button>

        <FeedbackList />
      </div>

      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
