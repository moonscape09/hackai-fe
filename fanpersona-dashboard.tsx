"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Target,
  User,
  Settings,
  LogOut,
  Download,
  Copy,
  MessageSquare,
  ImageIcon,
  Leaf,
  Smartphone,
  Heart,
  Music,
  Gamepad2,
} from "lucide-react"

// Mock data
const summaryMetrics = {
  totalFans: 12847,
  personaSegments: 5,
  engagementScore: 87,
}

const personaData = [
  {
    id: 1,
    name: "Eco-Explorer",
    avatar: "🌱",
    color: "#22c55e",
    traits: {
      openness: 85,
      conscientiousness: 72,
      extraversion: 68,
      agreeableness: 91,
      neuroticism: 34,
    },
    keywords: ["sustainability", "nature", "green", "eco-friendly", "climate", "organic", "renewable"],
    interests: [
      { name: "Environmental Issues", icon: Leaf },
      { name: "Outdoor Activities", icon: Target },
      { name: "Sustainable Living", icon: Heart },
    ],
    analytics: {
      engagementRate: 94,
      peakHours: [7, 8, 12, 18, 19, 20],
      contentPreferences: [
        { type: "Video", value: 45, color: "#22c55e" },
        { type: "Stories", value: 30, color: "#16a34a" },
        { type: "Polls", value: 25, color: "#15803d" },
      ],
    },
    fanCount: 3421,
  },
  {
    id: 2,
    name: "Tech Trendsetter",
    avatar: "📱",
    color: "#3b82f6",
    traits: {
      openness: 92,
      conscientiousness: 78,
      extraversion: 85,
      agreeableness: 65,
      neuroticism: 42,
    },
    keywords: ["innovation", "gadgets", "AI", "startup", "coding", "future", "tech"],
    interests: [
      { name: "Technology", icon: Smartphone },
      { name: "Innovation", icon: TrendingUp },
      { name: "Gaming", icon: Gamepad2 },
    ],
    analytics: {
      engagementRate: 89,
      peakHours: [9, 10, 14, 15, 21, 22],
      contentPreferences: [
        { type: "Video", value: 55, color: "#3b82f6" },
        { type: "Polls", value: 30, color: "#2563eb" },
        { type: "Stories", value: 15, color: "#1d4ed8" },
      ],
    },
    fanCount: 2876,
  },
  {
    id: 3,
    name: "Creative Soul",
    avatar: "🎨",
    color: "#a855f7",
    traits: {
      openness: 96,
      conscientiousness: 58,
      extraversion: 74,
      agreeableness: 82,
      neuroticism: 61,
    },
    keywords: ["art", "creative", "design", "inspiration", "aesthetic", "beauty", "artistic"],
    interests: [
      { name: "Art & Design", icon: ImageIcon },
      { name: "Music", icon: Music },
      { name: "Photography", icon: ImageIcon },
    ],
    analytics: {
      engagementRate: 91,
      peakHours: [11, 12, 16, 17, 20, 21],
      contentPreferences: [
        { type: "Stories", value: 50, color: "#a855f7" },
        { type: "Video", value: 35, color: "#9333ea" },
        { type: "Polls", value: 15, color: "#7c3aed" },
      ],
    },
    fanCount: 4102,
  },
  {
    id: 4,
    name: "Fitness Enthusiast",
    avatar: "💪",
    color: "#f59e0b",
    traits: {
      openness: 71,
      conscientiousness: 89,
      extraversion: 79,
      agreeableness: 76,
      neuroticism: 28,
    },
    keywords: ["fitness", "health", "workout", "nutrition", "strength", "wellness", "active"],
    interests: [
      { name: "Fitness", icon: Target },
      { name: "Nutrition", icon: Heart },
      { name: "Wellness", icon: Users },
    ],
    analytics: {
      engagementRate: 86,
      peakHours: [6, 7, 12, 13, 18, 19],
      contentPreferences: [
        { type: "Video", value: 60, color: "#f59e0b" },
        { type: "Stories", value: 25, color: "#d97706" },
        { type: "Polls", value: 15, color: "#b45309" },
      ],
    },
    fanCount: 2448,
  },
]

const radarData = (traits: any) => [
  { subject: "Openness", A: traits.openness, fullMark: 100 },
  { subject: "Conscientiousness", A: traits.conscientiousness, fullMark: 100 },
  { subject: "Extraversion", A: traits.extraversion, fullMark: 100 },
  { subject: "Agreeableness", A: traits.agreeableness, fullMark: 100 },
  { subject: "Neuroticism", A: traits.neuroticism, fullMark: 100 },
]

const peakHoursData = (hours: number[]) => {
  const data = []
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: i,
      activity: hours.includes(i) ? Math.random() * 80 + 20 : Math.random() * 30,
    })
  }
  return data
}

export default function FanPersonaDashboard() {
  const [selectedPersona, setSelectedPersona] = useState<any>(null)
  const [surveyModalOpen, setSurveyModalOpen] = useState(false)

  const handlePersonaClick = (persona: any) => {
    setSelectedPersona(persona)
  }

  const handleBackToOverview = () => {
    setSelectedPersona(null)
  }

  const copyInsights = (persona: any) => {
    const insights = `${persona.name} represents ${persona.fanCount.toLocaleString()} fans with ${persona.analytics.engagementRate}% engagement rate. They're highly interested in ${persona.interests.map((i: any) => i.name.toLowerCase()).join(", ")} and most active during peak hours.`
    navigator.clipboard.writeText(insights)
  }

  if (selectedPersona) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleBackToOverview}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FanPersona</h1>
                <p className="text-sm text-gray-600">{selectedPersona.name} Details</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {/* Persona Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${selectedPersona.color}20` }}
              >
                {selectedPersona.avatar}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedPersona.name}</h2>
                <p className="text-gray-600">
                  {selectedPersona.fanCount.toLocaleString()} fans • {selectedPersona.analytics.engagementRate}%
                  engagement rate
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex gap-3">
              <Dialog open={surveyModalOpen} onOpenChange={setSurveyModalOpen}>
                <DialogTrigger asChild>
                  <Button style={{ backgroundColor: selectedPersona.color }}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Generate Survey
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate Survey for {selectedPersona.name}</DialogTitle>
                    <DialogDescription>Create a targeted 2-question poll for this persona segment.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="question1">Question 1</Label>
                      <Input id="question1" placeholder="What's your biggest challenge with..." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="question2">Question 2</Label>
                      <Textarea id="question2" placeholder="How do you prefer to..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" style={{ backgroundColor: selectedPersona.color }}>
                      Create Survey
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>

              <Button variant="outline" onClick={() => copyInsights(selectedPersona)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Insights
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trait Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Personality Traits</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData(selectedPersona.traits)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Traits"
                      dataKey="A"
                      stroke={selectedPersona.color}
                      fill={selectedPersona.color}
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Top Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedPersona.interests.map((interest: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${selectedPersona.color}20` }}
                      >
                        <interest.icon className="h-5 w-5" style={{ color: selectedPersona.color }} />
                      </div>
                      <span className="font-medium">{interest.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Peak Activity Times */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Activity Times</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={peakHoursData(selectedPersona.analytics.peakHours)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="activity" fill={selectedPersona.color} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Content Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={selectedPersona.analytics.contentPreferences}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ type, value }) => `${type}: ${value}%`}
                    >
                      {selectedPersona.analytics.contentPreferences.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Keywords Word Cloud */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Top Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedPersona.keywords.map((keyword: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm"
                    style={{
                      backgroundColor: `${selectedPersona.color}20`,
                      color: selectedPersona.color,
                      fontSize: `${Math.random() * 0.5 + 0.8}rem`,
                    }}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Insight+</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fans Analyzed</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryMetrics.totalFans.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Persona Segments</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryMetrics.personaSegments}</div>
              <p className="text-xs text-muted-foreground">Distinct personality types</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryMetrics.engagementScore}%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Persona Segments */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Fan Persona Segments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {personaData.map((persona) => (
              <Card
                key={persona.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handlePersonaClick(persona)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${persona.color}20` }}
                    >
                      {persona.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{persona.name}</CardTitle>
                      <p className="text-sm text-gray-600">{persona.fanCount.toLocaleString()} fans</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Big Five Traits */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Personality Traits</h4>
                    {Object.entries(persona.traits).map(([trait, value]) => (
                      <div key={trait} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="capitalize">{trait}</span>
                          <span>{value}%</span>
                        </div>
                        <Progress
                          value={value as number}
                          className="h-1"
                          style={{
                            backgroundColor: `${persona.color}20`,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Keywords */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Top Keywords</h4>
                    <div className="flex flex-wrap gap-1">
                      {persona.keywords.slice(0, 4).map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: `${persona.color}20`,
                            color: persona.color,
                          }}
                        >
                          {keyword}
                        </Badge>
                      ))}
                      {persona.keywords.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{persona.keywords.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Engagement Rate */}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Engagement Rate</span>
                      <span className="font-semibold" style={{ color: persona.color }}>
                        {persona.analytics.engagementRate}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
