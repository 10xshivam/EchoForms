"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";

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
            console.log(response.data)
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
        <p>Loading analysis...</p>
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
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Form Analysis</CardTitle>
          <CardDescription>
            Insights, trends, and actionable recommendations based on form responses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analysis && (
            <>
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Summary</h3>
                <p>{analysis.summary}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Key Findings</h3>
                <ul className="list-disc pl-6">
                  {analysis.keyFindings.map((finding, index) => (
                    <li key={index}>{finding}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Sentiment Analysis</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold">Positive:</p>
                    <p>{analysis.sentimentAnalysis.positive}%</p>
                  </div>
                  <div>
                    <p className="font-semibold">Negative:</p>
                    <p>{analysis.sentimentAnalysis.negative}%</p>
                  </div>
                  <div>
                    <p className="font-semibold">Neutral:</p>
                    <p>{analysis.sentimentAnalysis.neutral}%</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Recommendations</h3>
                <ul className="list-disc pl-6">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Analysis
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
