"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { UrlInputPage } from "@/components/url-input-page"
import { ReelAnalytics } from "@/components/reel-analytics"
import Grid from "@/components/grid"

type PageState = "landing" | "url-input" | "analytics" | "grid"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageState>("landing")
  const [reelUrl, setReelUrl] = useState("")

  const handleGetStarted = () => {
    setCurrentPage("url-input")
  }

  const handleBackToLanding = () => {
    setCurrentPage("landing")
  }
  const handleGoToGrid = () => {
    setCurrentPage("grid");
  }


  const handleAnalyze = (url: string) => {
    setReelUrl(url)
    setCurrentPage("analytics")
  }

  const handleBackToInput = () => {
    setCurrentPage("url-input")
  }

  switch (currentPage) {
    case "landing":
      return <LandingPage onGetStarted={handleGetStarted} onGoToGrid={handleGoToGrid}/>
    case "url-input":
      return <UrlInputPage onBack={handleBackToLanding} onAnalyze={handleAnalyze} />
    case "analytics":
      return <ReelAnalytics onBack={handleBackToInput} reelUrl={reelUrl} />
    case "grid":
      return <Grid />
    default:
      return <LandingPage onGetStarted={handleGetStarted} onGoToGrid={handleGoToGrid}/>
  }
}
