import * as React from "react";
import {
  MagnifyingGlassIcon,
  LightBulbIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { NavBar } from "./nav-bar";

export default async function LumiraHomepage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Home page user:", user);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <NavBar user={user} />
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Transform YouTube Content into Searchable Knowledge
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Lumira is a video intelligence platform that makes YouTube content
            searchable, answerable, and insightful using advanced AI technology.
          </p>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MagnifyingGlassIcon}
              title="Intelligent Search"
              description="Search across your entire video library or dive deep into specific videos."
            />
            <FeatureCard
              icon={LightBulbIcon}
              title="AI-Powered Insights"
              description="Get contextual answers and insights, not just keyword matches."
            />
            <FeatureCard
              icon={ClockIcon}
              title="Time-Stamped Results"
              description="Quickly navigate to relevant parts of videos with precise timestamps."
            />
          </div>
        </section>

        <section id="how-it-works" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <ProcessStep
                number={1}
                title="Upload"
                description="Enter any YouTube video URL"
              />
              <ProcessStep
                number={2}
                title="Transcribe"
                description="AI automatically transcribes the content"
              />
              <ProcessStep
                number={3}
                title="Process"
                description="Content is chunked and stored in a vector database"
              />
              <ProcessStep
                number={4}
                title="Query"
                description="Ask questions and get intelligent answers"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="h-6 w-6" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
