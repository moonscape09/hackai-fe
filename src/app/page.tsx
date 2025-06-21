"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { UrlInputPage } from "@/components/url-input-page"
import { ReelAnalytics } from "@/components/reel-analytics"

type PageState = "landing" | "url-input" | "analytics"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageState>("landing")
  const [reelUrl, setReelUrl] = useState("")

  const handleGetStarted = () => {
    setCurrentPage("url-input")
  }

  const handleBackToLanding = () => {
    setCurrentPage("landing")
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
      return <LandingPage onGetStarted={handleGetStarted} />
    case "url-input":
      return <UrlInputPage onBack={handleBackToLanding} onAnalyze={handleAnalyze} />
    case "analytics":
      return <ReelAnalytics onBack={handleBackToInput} reelUrl={reelUrl} />
    default:
      return <LandingPage onGetStarted={handleGetStarted} />
  }
}
