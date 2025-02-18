"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import User from "@/components/User";

interface AnalysisData {
  summary: string;
  keyFindings: string[];
  sentimentAnalysis: {
    positive: string;
    negative: string;
    neutral: string;
  };
  recommendations: string[];
}

export default function AnalyzeForm() {
  const { formId } = useParams();
  const [analysis, setAnalysis] = useState<AnalysisData>({
    summary: "",
    keyFindings: [],
    sentimentAnalysis: {
      positive: "0%",
      negative: "0%",
      neutral: "0%",
    },
    recommendations: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`/api/forms/analyze?formId=${formId}`);
        if (response.data.success) {
          setAnalysis(response.data.analysis);
        } else {
          setError(response.data.message || "Failed to fetch analysis");
        }
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError("An error occurred while fetching the analysis.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [formId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>
          <Loader
            className="text-black dark:text-white animate-spin"
            size={40}
          />
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-20">
      <div className="w-full px-5 absolute top-4 left-0 flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className=" py-2 px-3 rounded-lg flex justify-center items-center"
        >
          <ChevronLeft
            className="inline text-zinc-500 mr-3"
            size={20}
            strokeWidth={2}
          />{" "}
          Back
        </Link>
        <User />
      </div>
      <div>
      <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1">
      AI-Powered Form Analysis
        </h1>
        <p className="text-zinc-500 font-medium mb-6 mt-1 tracking-tight text-base">
        Insights, trends, and actionable recommendations based on form
        responses.
        </p>
      </div>
      <div className="w-full px-5 absolute top-4 left-0 flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className=" py-2 px-3 rounded-lg flex justify-center items-center"
        >
          <ChevronLeft
            className="inline text-zinc-500 mr-3"
            size={20}
            strokeWidth={2}
          />{" "}
          Back
        </Link>
        <div className="flex gap-x-3">
          <User />
        </div>
      </div>
      <div className="flex flex-col border p-5">
        <div className="bg-zinc-600/10 dark:bg-zinc-700/30 p-5 rounded-lg">
          {analysis && (
            <>
              <div className="mb-6">
                <h3 className="font-bold text-2xl mb-2 ">Summary</h3>
                <p className="text-zinc-500 dark:text-zinc-400">{analysis.summary}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-2xl mb-2 ">Key Findings</h3>
                <ul className="list-disc pl-6">
                  {analysis.keyFindings.map((finding, index) => (
                    <li key={index} className="text-zinc-500 dark:text-zinc-400">{finding}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-2xl mb-2 ">Sentiment Analysis</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold text-zinc-500 dark:text-zinc-400">Positive:</p>
                    <p>{analysis.sentimentAnalysis.positive}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-500 dark:text-zinc-400">Negative:</p>
                    <p>{analysis.sentimentAnalysis.negative}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-500 dark:text-zinc-400">Neutral:</p>
                    <p>{analysis.sentimentAnalysis.neutral}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-2xl mb-2 ">Recommendations</h3>
                <ul className="list-disc pl-6">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-zinc-500 dark:text-zinc-400">{recommendation}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <Button variant="outline" onClick={() => window.location.reload()} className="mt-5 w-fit">
            Refresh Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
