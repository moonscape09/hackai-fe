"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Users,
  BarChart3,
  Target,
  Instagram,
  Linkedin,
  TrendingUp,
  MessageSquare,
  Eye,
  Heart,
  Share2,
  CheckCircle,
  Zap,
  Brain,
  Sparkles,
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Persona Analysis",
      description: "Advanced algorithms analyze your audience's psychographic profiles and engagement patterns",
    },
    {
      icon: Target,
      title: "Precise Audience Segmentation",
      description: "Discover distinct fan personas based on Big Five personality traits and behavior patterns",
    },
    {
      icon: BarChart3,
      title: "Deep Engagement Analytics",
      description: "Get insights into peak activity times, content preferences, and engagement drivers",
    },
    {
      icon: MessageSquare,
      title: "Smart Content Recommendations",
      description: "Receive personalized suggestions for content that resonates with each persona segment",
    },
  ]

  const benefits = [
    "Increase engagement rates by 40%+ with targeted content",
    "Understand your audience's psychological drivers",
    "Optimize posting times for maximum reach",
    "Create content that converts viewers to loyal fans",
    "Build stronger community connections",
  ]

  const steps = [
    {
      step: "1",
      title: "Share Your Instagram Reel/LinkedIn Post",
      description: "Simply paste your Instagram reel or LinkedIn post URL to get started",
      icon: Instagram,
    },
    {
      step: "2",
      title: "AI Analysis in Progress",
      description: "Our AI analyzes comments, engagement patterns, and audience behavior",
      icon: Zap,
    },
    {
      step: "3",
      title: "Get Detailed Insights",
      description: "Receive comprehensive persona profiles and actionable recommendations",
      icon: Sparkles,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Insight+
              </span>
            </div>
            <Button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100">
            <Sparkles className="mr-1 h-3 w-3" />
            AI-Powered Audience Intelligence
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Unlock Your
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Fan's Psychology
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your Instagram or Linkedin content strategy with deep audience insights. Discover who your fans really are,
            what drives their engagement, and how to create content that converts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
            >
              Analyze Your Reel Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Watch Demo
              <Eye className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>99.9% Accuracy Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free to Start</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get deep audience insights in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative flex justify-center mb-6">
                    <div className="flex justify-center gap-2 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    {step.step === "1" && (
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Linkedin className="h-8 w-8 text-white" />
                      </div>
                    )}
                    </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to understand and engage your audience better
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Creators Choose FanPersona</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of creators who've transformed their content strategy with data-driven insights.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                onClick={onGetStarted}
                className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Start Your Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">+127%</div>
                    <div className="text-sm text-gray-600">Engagement Boost</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Users className="h-8 w-8 text-blue-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">5.2M</div>
                    <div className="text-sm text-gray-600">Fans Analyzed</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Heart className="h-8 w-8 text-red-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">94%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Share2 className="h-8 w-8 text-purple-500 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">10K+</div>
                    <div className="text-sm text-gray-600">Happy Creators</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Understand Your Fans?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Start your free analysis today and discover what makes your audience tick.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6"
          >
            Get Started - It's Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">FanPersona</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering creators with AI-driven audience insights</p>
          <p className="text-sm text-gray-500">© 2024 FanPersona. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
