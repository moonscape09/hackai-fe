"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Instagram, Linkedin, Link, CheckCircle, AlertCircle, Loader2, Users, Zap, Brain } from "lucide-react"
// import { postReel } from "@/lib/api";

interface UrlInputPageProps {
  onBack: () => void
  onAnalyze: (url: string) => void
}

export function UrlInputPage({ onBack, onAnalyze }: UrlInputPageProps) {
  const [url, setUrl] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const validateInstagramUrl = (url: string) => {
    const instagramReelRegex = /^https?:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?(\?.*)?$/
    return instagramReelRegex.test(url)
  }

  const handleUrlChange = (value: string) => {
    setUrl(value)
    setValidationError("")
  }

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setValidationError("Please enter an Instagram Reel/LinkedIn Post URL")
      return
    }

    setIsValidating(true)

    // Simulate validation delay
    // await postReel(url);

    if (!validateInstagramUrl(url)) {
      setValidationError("Please enter a valid URL (e.g., https://instagram.com/reel/ABC123)")
      setIsValidating(false)
      return
    }

    setIsValidating(false)
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            onAnalyze(url)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)
  }

  const analysisSteps = [
    { step: 1, text: "Fetching post data...", completed: analysisProgress > 20 },
    { step: 2, text: "Analyzing comments and engagement...", completed: analysisProgress > 40 },
    { step: 3, text: "Processing audience sentiments...", completed: analysisProgress > 60 },
    { step: 4, text: "Generating analytics...", completed: analysisProgress > 80 },
    { step: 5, text: "Finalizing report...", completed: analysisProgress >= 100 },
  ]

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white animate-pulse" />
            </div>
            <CardTitle className="text-2xl">Analyzing Your Reel</CardTitle>
            <p className="text-gray-600">Our AI is processing your content and audience data...</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analysis Progress</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="h-3" />
            </div>

            <div className="space-y-3">
              {analysisSteps.map((step) => (
                <div key={step.step} className="flex items-center gap-3">
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      {analysisProgress > (step.step - 1) * 20 ? (
                        <Loader2 className="h-3 w-3 animate-spin text-purple-600" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      )}
                    </div>
                  )}
                  <span className={`text-sm ${step.completed ? "text-gray-900" : "text-gray-500"}`}>{step.text}</span>
                </div>
              ))}
            </div>

            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                This usually takes 30-60 seconds. We're analyzing thousands of data points to give you the most accurate
                insights.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Insight+
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
                <div className="flex gap-2 justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Linkedin className="h-8 w-8 text-white" />
                </div>
                </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Share Your Instagram Reel/LinkedIn Post</CardTitle>
              <p className="text-lg text-gray-600 mt-2">
                Paste your Instagram reel/LinkedIn post URL below to get detailed audience analytics.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="url"
                    placeholder="https://instagram.com/reel/ABC123..."
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="pl-10 h-12 text-lg"
                    disabled={isValidating}
                  />
                </div>

                {validationError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleAnalyze}
                  disabled={isValidating || !url.trim()}
                  className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Validating URL...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                      Analyze My Reel
                    </>
                  )}
                </Button>
              </div>

              {/* Example URLs */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Example URLs:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <code className="bg-white px-2 py-1 rounded">https://instagram.com/reel/ABC123</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <code className="bg-white px-2 py-1 rounded">https://www.instagram.com/p/DEF456</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <code className="bg-white px-2 py-1 rounded">https://www.linkedin.com/posts/ABC123</code>
                  </div>
                </div>
              </div>

              {/* What We Analyze */}
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Audience Behavior</h4>
                  <p className="text-sm text-gray-600">Comments, likes, shares, and engagement patterns</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Sentiment Analysis</h4>
                  <p className="text-sm text-gray-600">Analysis of user sentiments with content</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Actionable Insights</h4>
                  <p className="text-sm text-gray-600">Recommendations to boost engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>🔒 Your data is secure and private. We only analyze public engagement data.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
