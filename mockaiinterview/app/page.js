"use client";

import { Button } from "../@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Video } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">

        {/* Hero Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-4 h-4 mr-2" />
          <span>AI-Powered Interview Prep</span>
        </div>

        {/* Hero Text */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Master Your Next Interview <br />
            <span className="text-indigo-600">With AI Confidence</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice with our intelligent AI interviewer. Get real-time feedback, improve your speaking skills, and crack your dream job.
          </p>
        </div>

        {/* CTA Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto mt-12 animate-in zoom-in duration-500 delay-200 hover:shadow-2xl transition-all">
          <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
            <Video className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Start?</h3>
          <p className="text-gray-500 mb-6">Launch a realistic mock interview session tailored to your role.</p>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 rounded-xl transition-all"
            onClick={() => router.push('/dashboard')}
          >
            Start Mock Interview <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-12">
          Powered by Gemini AI • Integrated with Preplaced
        </p>
      </div>
    </div>
  );
}
