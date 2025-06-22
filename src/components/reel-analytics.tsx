import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Eye,
  Clock,
  Target,
  Copy,
  User,
  Settings,
  LogOut,
  Instagram,
  Linkedin,
  Globe,
  Zap,
  Sparkles,
  ThumbsUp,
  BookOpen,
  Music,
  Camera,
  Smartphone,
} from "lucide-react"

import { getComments, getPost } from "@/lib/api"
interface ReelAnalyticsProps {
  onBack: () => void
  reelUrl: string
}

export function ReelAnalytics({ onBack, reelUrl }: ReelAnalyticsProps) {
  const [selectedPersona, setSelectedPersona] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [numComments, setNumComments] = useState(0)
  const [post, setPost] = useState<any>(null);

  // Mock reel data
  const reelData = {
    url: reelUrl,
    title: "Amazing sunset timelapse 🌅",
    views: 45672,
    likes: 3421,
    comments: 287,
    shares: 156,
    saves: 892,
    engagementRate: 8.7,
    postedDate: "2024-01-15",
    duration: "00:30",
  }

  // const summaryData =

  // Mock persona data
  const personaData = [
    {
      id: 1,
      name: "Nature Enthusiast",
      avatar: "🌿",
      color: "#22c55e",
      percentage: 35,
      count: 15985,
      traits: {
        openness: 88,
        conscientiousness: 75,
        extraversion: 65,
        agreeableness: 92,
        neuroticism: 28,
      },
      keywords: ["nature", "peaceful", "beautiful", "sunset", "amazing", "love", "perfect"],
      interests: [
        { name: "Nature Photography", icon: Camera },
        { name: "Travel", icon: Globe },
        { name: "Mindfulness", icon: Heart },
      ],
      demographics: {
        ageGroups: [
          { age: "18-24", percentage: 25 },
          { age: "25-34", percentage: 45 },
          { age: "35-44", percentage: 20 },
          { age: "45+", percentage: 10 },
        ],
        topLocations: ["California", "New York", "Florida", "Texas", "Colorado"],
      },
      engagement: {
        avgLikes: 156,
        avgComments: 23,
        avgShares: 8,
        peakHours: [7, 8, 18, 19, 20],
        preferredContent: ["Videos", "Stories", "Carousels"],
      },
    },
    {
      id: 2,
      name: "Creative Explorer",
      avatar: "🎨",
      color: "#a855f7",
      percentage: 28,
      count: 12788,
      traits: {
        openness: 95,
        conscientiousness: 62,
        extraversion: 78,
        agreeableness: 85,
        neuroticism: 45,
      },
      keywords: ["creative", "artistic", "inspiration", "colors", "aesthetic", "mood", "vibes"],
      interests: [
        { name: "Art & Design", icon: Sparkles },
        { name: "Photography", icon: Camera },
        { name: "Music", icon: Music },
      ],
      demographics: {
        ageGroups: [
          { age: "18-24", percentage: 40 },
          { age: "25-34", percentage: 35 },
          { age: "35-44", percentage: 20 },
          { age: "45+", percentage: 5 },
        ],
        topLocations: ["Los Angeles", "New York", "San Francisco", "Austin", "Portland"],
      },
      engagement: {
        avgLikes: 189,
        avgComments: 31,
        avgShares: 12,
        peakHours: [11, 12, 16, 17, 21],
        preferredContent: ["Stories", "Reels", "IGTV"],
      },
    },
    {
      id: 3,
      name: "Tech Savvy",
      avatar: "📱",
      color: "#3b82f6",
      percentage: 22,
      count: 10048,
      traits: {
        openness: 91,
        conscientiousness: 82,
        extraversion: 73,
        agreeableness: 68,
        neuroticism: 35,
      },
      keywords: ["tech", "quality", "professional", "gear", "camera", "settings", "editing"],
      interests: [
        { name: "Technology", icon: Smartphone },
        { name: "Photography Gear", icon: Camera },
        { name: "Video Editing", icon: BookOpen },
      ],
      demographics: {
        ageGroups: [
          { age: "18-24", percentage: 30 },
          { age: "25-34", percentage: 50 },
          { age: "35-44", percentage: 15 },
          { age: "45+", percentage: 5 },
        ],
        topLocations: ["San Francisco", "Seattle", "Austin", "Boston", "Denver"],
      },
      engagement: {
        avgLikes: 142,
        avgComments: 28,
        avgShares: 15,
        peakHours: [9, 10, 14, 15, 22],
        preferredContent: ["Reels", "IGTV", "Carousels"],
      },
    },
    {
      id: 4,
      name: "Lifestyle Seeker",
      avatar: "✨",
      color: "#f59e0b",
      percentage: 15,
      count: 6851,
      traits: {
        openness: 76,
        conscientiousness: 68,
        extraversion: 89,
        agreeableness: 81,
        neuroticism: 42,
      },
      keywords: ["lifestyle", "goals", "motivation", "inspiration", "dream", "wanderlust", "blessed"],
      interests: [
        { name: "Lifestyle", icon: Heart },
        { name: "Travel", icon: Globe },
        { name: "Wellness", icon: Sparkles },
      ],
      demographics: {
        ageGroups: [
          { age: "18-24", percentage: 45 },
          { age: "25-34", percentage: 35 },
          { age: "35-44", percentage: 15 },
          { age: "45+", percentage: 5 },
        ],
        topLocations: ["Miami", "Los Angeles", "New York", "Las Vegas", "San Diego"],
      },
      engagement: {
        avgLikes: 203,
        avgComments: 35,
        avgShares: 18,
        peakHours: [12, 13, 19, 20, 21],
        preferredContent: ["Stories", "Reels", "Posts"],
      },
    },
  ]

  const engagementOverTime = [
    { time: "00:00", engagement: 100 },
    { time: "00:05", engagement: 85 },
    { time: "00:10", engagement: 92 },
    { time: "00:15", engagement: 78 },
    { time: "00:20", engagement: 88 },
    { time: "00:25", engagement: 95 },
    { time: "00:30", engagement: 82 },
  ]

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(63);
      setComments(data);
      setNumComments(data.length);
    };
    fetchComments();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPost(67);
      setPost(data[0]);
    };
    fetchPost();
  }, []);
  const [sentimentData, setSentimentData] = useState<
    { name: string; value: number; color?: string }[]
  >([]);

  const [languageData, setLanguageData] = useState<
    { name: string; value: number; color?: string }[]
  >([]);

  useEffect(() => {
    if (!post) return;

    // 1) Turn the object into [ [key, val], [key, val], … ]
    const entries = Object.entries(post.sentiment_distribution);

    const total = entries.reduce((sum, [, value]) => sum + (value as number), 0);

    // 2) Map that into the shape your chart wants
    const data = entries.map(([key, value]) => ({
      name:
      key.charAt(0).toUpperCase() + key.slice(1), // "positive" → "Positive"
      value: Math.round((value as number / total) * 100),
      color:
      key === "positive"
        ? "#22c55e"
        : key === "neutral"
        ? "#6b7280"
        : "#ef4444",
    }));

    setSentimentData(data);
  }, [post]);

    useEffect(() => {
    if (!post) return;

    // 1) Turn the object into [ [key, val], [key, val], … ]
    const entries = Object.entries(post.language_style_distribution);

    const total = entries.reduce((sum, [, value]) => sum + (value as number), 0);

    // 2) Map that into the shape your chart wants
    const data = entries.map(([key, value]) => ({
      name:
        key.charAt(0).toUpperCase() + key.slice(1), // "positive" → "Positive"
      value: Math.round((value as number / total) * 100),
      color:
        key === "casual"
          ? "#22C55E"
          : key === "neutral"
          ? "#F59E0B"
          : key === "playful"
          ? "#8B5CF6"
          : key === "emoji-heavy"
          ? "#3B82F6"
          : key === "internet-slang"
          ? "#EF4444"
          : "#000000"
    }));

    setLanguageData(data);
  }, [post]);

  useEffect(() => {
    console.log(sentimentData)
  }, [sentimentData]);

  const radarData = (traits: any) => [
    { subject: "Openness", A: traits.openness, fullMark: 100 },
    { subject: "Conscientiousness", A: traits.conscientiousness, fullMark: 100 },
    { subject: "Extraversion", A: traits.extraversion, fullMark: 100 },
    { subject: "Agreeableness", A: traits.agreeableness, fullMark: 100 },
    { subject: "Neuroticism", A: traits.neuroticism, fullMark: 100 },
  ]

  const copyInsights = () => {
    const insights = `Reel Analysis: ${reelData.views.toLocaleString()} views, Engagement score: ${post ? post.engagement : null}. ICP score: ${post ? post.icpScore : null}. Key insights: High positive sentiment (}}), peak engagement at TODO .`
    navigator.clipboard.writeText(insights)
  }

  if (selectedPersona) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSelectedPersona(null)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Insight+</h1>
                <p className="text-sm text-gray-600">{selectedPersona.name} Deep Dive</p>
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
                  {selectedPersona.count.toLocaleString()} fans • {selectedPersona.percentage}% of your audience
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personality Traits */}
            <Card>
              <CardHeader>
                <CardTitle>Personality Profile</CardTitle>
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

            {/* Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Age Distribution</h4>
                    <div className="space-y-2">
                      {selectedPersona.demographics.ageGroups.map((group: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{group.age}</span>
                          <div className="flex items-center gap-2 flex-1 ml-4">
                            <Progress value={group.percentage} className="flex-1" />
                            <span className="text-sm font-medium w-10">{group.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Top Locations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPersona.demographics.topLocations.map((location: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
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

            {/* Engagement Patterns */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold" style={{ color: selectedPersona.color }}>
                        {selectedPersona.engagement.avgLikes}
                      </div>
                      <div className="text-sm text-gray-600">Avg Likes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold" style={{ color: selectedPersona.color }}>
                        {selectedPersona.engagement.avgComments}
                      </div>
                      <div className="text-sm text-gray-600">Avg Comments</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold" style={{ color: selectedPersona.color }}>
                        {selectedPersona.engagement.avgShares}
                      </div>
                      <div className="text-sm text-gray-600">Avg Shares</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Peak Activity Hours</h4>
                    <div className="flex gap-1">
                      {Array.from({ length: 24 }, (_, i) => (
                        <div
                          key={i}
                          className={`h-8 flex-1 rounded ${
                            selectedPersona.engagement.peakHours.includes(i) ? "opacity-100" : "opacity-20"
                          }`}
                          style={{ backgroundColor: selectedPersona.color }}
                          title={`${i}:00`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Keywords */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Common Keywords & Phrases</CardTitle>
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
                      fontSize: `${Math.random() * 0.3 + 0.9}rem`,
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
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Insight+</h1>
              <p className="text-sm text-gray-600">Reel Analytics Report</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={copyInsights}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Report
            </Button>
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
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Reel Overview */}
{post && (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle className="text-xl">Reel & Post Summary</CardTitle>
      <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium break-all"
        >
          {post.type === "LINKEDIN" ? <Linkedin className="mr-2" size={20} /> : <Instagram className="mr-2" size={20} />}
          View post
        </a>
    </CardHeader>
    <CardContent className="space-y-8">

      {/* 1) Reel Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="text-center">
          <Eye className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{reelData.views.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Views</div>
        </div>
        <div className="text-center">
          <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{reelData.likes.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Likes</div>
        </div>
        <div className="text-center">
          <MessageSquare className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{numComments}</div>
          <div className="text-sm text-gray-600">Comments</div>
        </div>
      </div>

      {/* 2) Engagement & ICP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shadow-sm">
            <Eye className="text-blue-600" size={28} />
          </div>
          <div>
            <div className="text-2xl font-bold">{post.engagement}</div>
            <div className="text-sm text-gray-500">Engagement</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shadow-sm">
            <Target className="text-green-600" size={28} />
          </div>
          <div>
            <div className="text-2xl font-bold">{post.icp}</div>
            <div className="text-sm text-gray-500">ICP Score</div>
          </div>
        </div>
        <div className="col-span-full md:col-span-2">
          <h4 className="text-sm font-medium mb-1">ICP Reasoning</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {post.icp_reasoning}
          </p>
        </div>
      </div>

      {/* 3) Sub-cards: Sentiment & Language */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-26 h-26">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    paddingAngle={0}
                    stroke="none"
                  >
                    {sentimentData.map((entry, i) => (
                      <Cell key={i} fill={entry.color!} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-1 text-sm">
              {sentimentData.map((s) => (
                <li key={s.name} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="font-medium">{s.name}</span>
                  <span className="text-gray-400">—</span>
                  <span className="text-gray-600">{s.value}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Language Style */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Language Style Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="w-26 h-26">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    paddingAngle={0}
                    stroke="none"
                  >
                    {languageData.map((entry, i) => (
                      <Cell key={i} fill={entry.color!} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-1 text-sm">
              {languageData.map((l) => (
                <li key={l.name} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: l.color }}
                  />
                  <span className="font-medium">{l.name}</span>
                  <span className="text-gray-400">—</span>
                  <span className="text-gray-600">{l.value}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

    </CardContent>
  </Card>
  
)}

{post && (
  // 4) Top Comments
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    {/* Unreplied Comments */}
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Top 3 Unreplied Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments
          .filter((c) => c.has_author_replied === 1)
          .slice(0, 3)
          .map((c) => {
            // Gradient based on ICP score (0-100): blue (low) → yellow → orange → red (high)
            const icp = c.icp_score ?? 0
            let gradient = ""
            if (icp >= 8.0) {
              gradient = "linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)" // orange to red (fire)
            } else if (icp >= 6.0) {
              gradient = "linear-gradient(90deg, #fde68a 0%, #f59e0b 100%)" // yellow to orange
            } else if (icp >= 4.0) {
              gradient = "linear-gradient(90deg, #3b82f6 0%, #fde68a 100%)" // blue to yellow
            } else {
              gradient = "linear-gradient(90deg, #0ea5e9 0%, #3b82f6 100%)" // cyan to blue (cold)
            }
            // Sentiment color
            const sentimentColor =
              c.sentiment === "positive"
                ? "bg-green-100 text-green-800"
                : c.sentiment === "neutral"
                ? "bg-gray-100 text-gray-800"
                : "bg-red-100 text-red-800"
            // Language style color
            const langColor =
              c.language_style === "casual"
                ? "bg-green-100 text-green-800"
                : c.language_style === "neutral"
                ? "bg-yellow-100 text-yellow-800"
                : c.language_style === "playful"
                ? "bg-purple-100 text-purple-800"
                : c.language_style === "emoji-heavy"
                ? "bg-blue-100 text-blue-800"
                : c.language_style === "internet-slang"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            return (
              <div
                key={c.id}
                className="space-y-2 p-4 rounded-lg border border-gray-100 bg-gray-50 shadow-sm break-words"
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: gradient,
                      color: "#fff",
                    }}
                  >
                    ICP: {c.icp_score}
                  </Badge>
                  <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {c.likes} Likes
                  </Badge>
                  <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {c.replies} Replies
                  </Badge>
                  <Badge className={`px-2 py-1 rounded-full text-xs font-medium ${sentimentColor}`}>
                    {c.sentiment?.charAt(0).toUpperCase() + c.sentiment?.slice(1)}
                  </Badge>
                  <Badge className={`px-2 py-1 rounded-full text-xs font-medium ${langColor}`}>
                    {c.language_style?.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </Badge>
                </div>
                <p
                  className="text-sm text-gray-700 italic break-words"
                  style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                >
                  "{c.comment}"
                </p>
                {c.icp_reasoning && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-sm text-yellow-900 mt-1">
                    {c.icp_reasoning}
                  </div>
                )}
              </div>
            )
          })}
        {comments.filter((c) => c.has_author_replied === 1).length === 0 && (
          <p className="text-sm text-gray-500">No unreplied comments found.</p>
        )}
      </CardContent>
    </Card>

    {/* Top Comments Overall */}
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Top 3 Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.slice(0, 3).map((c) => {
          const icp = c.icp_score ?? 0
          let gradient = ""
          if (icp >= 8.0) {
            gradient = "linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)"
          } else if (icp >= 6.0) {
            gradient = "linear-gradient(90deg, #fde68a 0%, #f59e0b 100%)"
          } else if (icp >= 4.0) {
            gradient = "linear-gradient(90deg, #3b82f6 0%, #fde68a 100%)"
          } else {
            gradient = "linear-gradient(90deg, #0ea5e9 0%, #3b82f6 100%)"
          }
          const sentimentColor =
            c.sentiment === "positive"
              ? "bg-green-100 text-green-800"
              : c.sentiment === "neutral"
              ? "bg-gray-100 text-gray-800"
              : "bg-red-100 text-red-800"
          const langColor =
            c.language_style === "casual"
              ? "bg-green-100 text-green-800"
              : c.language_style === "neutral"
              ? "bg-yellow-100 text-yellow-800"
              : c.language_style === "playful"
              ? "bg-purple-100 text-purple-800"
              : c.language_style === "emoji-heavy"
              ? "bg-blue-100 text-blue-800"
              : c.language_style === "internet-slang"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          return (
            <div
              key={c.id}
              className="space-y-2 p-4 rounded-lg border border-gray-100 bg-gray-50 shadow-sm break-words"
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge
                  className="px-2 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: gradient,
                    color: "#fff",
                  }}
                >
                  ICP: {c.icp_score}
                </Badge>
                <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {c.likes} Likes
                </Badge>
                <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {c.replies} Replies
                </Badge>
                <Badge className={`px-2 py-1 rounded-full text-xs font-medium ${sentimentColor}`}>
                  {c.sentiment?.charAt(0).toUpperCase() + c.sentiment?.slice(1)}
                </Badge>
                <Badge className={`px-2 py-1 rounded-full text-xs font-medium ${langColor}`}>
                  {c.language_style?.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </Badge>
              </div>
              <p
                className="text-sm text-gray-700 italic break-words"
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                "{c.comment}"
              </p>
              {c.icp_reasoning && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-sm text-yellow-900 mt-1">
                  {c.icp_reasoning}
                </div>
              )}
            </div>
          )
        })}
        {comments.length === 0 && (
          <p className="text-sm text-gray-500">No comments available.</p>
        )}
      </CardContent>
    </Card>
  </div>
)}

{post && (
   <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>All Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.map((c) => {
          const icp = c.icp_score ?? 0
          let gradient = ""
          if (icp >= 8.0) {
            gradient = "linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)"
          } else if (icp >= 6.0) {
            gradient = "linear-gradient(90deg, #fde68a 0%, #f59e0b 100%)"
          } else if (icp >= 4.0) {
            gradient = "linear-gradient(90deg, #3b82f6 0%, #fde68a 100%)"
          } else {
            gradient = "linear-gradient(90deg, #0ea5e9 0%, #3b82f6 100%)"
          }
          const sentimentColor =
            c.sentiment === "positive"
              ? "bg-green-100 text-green-800"
              : c.sentiment === "neutral"
              ? "bg-gray-100 text-gray-800"
              : "bg-red-100 text-red-800"
          const langColor =
            c.language_style === "casual"
              ? "bg-green-100 text-green-800"
              : c.language_style === "neutral"
              ? "bg-yellow-100 text-yellow-800"
              : c.language_style === "playful"
              ? "bg-purple-100 text-purple-800"
              : c.language_style === "emoji-heavy"
              ? "bg-blue-100 text-blue-800"
              : c.language_style === "internet-slang"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          return (
            <div
              key={c.id}
              className="space-y-2 p-4 rounded-lg border border-gray-100 bg-gray-50 shadow-sm break-words"
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge
                  className="px-2 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: gradient,
                    color: "#fff",
                  }}
                >
                  ICP: {c.icp_score}
                </Badge>
                <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {c.likes} Likes
                </Badge>
                <Badge className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {c.replies} Replies
                </Badge>
                <Badge className={`px-2 py-1 rounded-full text-xs font-medium ${sentimentColor}`}>
                  {c.sentiment?.charAt(0).toUpperCase() + c.sentiment?.slice(1)}
                </Badge>
                <Badge className={`px-2 py-1 rounded-full text-xs font-medium ${langColor}`}>
                  {c.language_style?.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </Badge>
              </div>
              <p
                className="text-sm text-gray-700 italic break-words"
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                "{c.comment}"
              </p>
              {c.icp_reasoning && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-sm text-yellow-900 mt-1">
                  {c.icp_reasoning}
                </div>
              )}
            </div>
          )
        })}
        {comments.length === 0 && (
          <p className="text-sm text-gray-500">No comments available.</p>
        )}
      </CardContent>
    </Card>
)}
        <Tabs defaultValue="personas" className="space-y-6">
          {/* <TabsList className="flex w-full space-x-4"> */}
            {/* <TabsTrigger value="personas">Fan Personas</TabsTrigger> */}
            {/* <TabsTrigger value="behavioural">Behavioural</TabsTrigger> */}
            {/* <TabsTrigger value="engagement">Engagement</TabsTrigger> */}
            {/* <TabsTrigger value="sentiment">Sentiment</TabsTrigger> */}
            {/* <TabsTrigger value="language">Language</TabsTrigger> */}
          {/* </TabsList> */}
          <strong> Mock Personas:</strong>
          <TabsContent value="personas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personaData.map((persona) => (
                <Card
                  key={persona.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => setSelectedPersona(persona)}
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
                        <p className="text-sm text-gray-600">{persona.percentage}% of audience</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: persona.color }}>
                        {persona.count.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Fans</div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Top Traits</h4>
                      {Object.entries(persona.traits)
                        .sort(([, a], [, b]) => (b as number) - (a as number))
                        .slice(0, 3)
                        .map(([trait, value]) => (
                          <div key={trait} className="flex justify-between text-xs">
                            <span className="capitalize">{trait}</span>
                            <span>{value}%</span>
                          </div>
                        ))}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-1">
                        {persona.keywords.slice(0, 3).map((keyword, index) => (
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="behavioural" className="space-y-6">
            <p> BEHAVIOURAL </p>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={engagementOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="engagement" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peak Engagement Moments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">00:25s - Sunset Reveal</div>
                        <div className="text-sm text-gray-600">Highest engagement spike</div>
                      </div>
                      <div className="text-green-600 font-bold">95%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">00:10s - Color Transition</div>
                        <div className="text-sm text-gray-600">Strong visual impact</div>
                      </div>
                      <div className="text-blue-600 font-bold">92%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium">00:20s - Music Peak</div>
                        <div className="text-sm text-gray-600">Audio-visual sync</div>
                      </div>
                      <div className="text-purple-600 font-bold">88%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Positive Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">@naturelover_23</span>
                      </div>
                      <p className="text-sm">"This is absolutely breathtaking! The colors are incredible 😍"</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">@sunset_chaser</span>
                      </div>
                      <p className="text-sm">"Perfect timing! This made my day ✨"</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">@photo_enthusiast</span>
                      </div>
                      <p className="text-sm">"Amazing capture! What camera settings did you use?"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="language" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Content Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                      <h4 className="font-medium text-green-800 mb-2">For Nature Enthusiasts (35%)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Post more golden hour content</li>
                        <li>• Share behind-the-scenes of your photography process</li>
                        <li>• Create time-lapse series of different natural phenomena</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                      <h4 className="font-medium text-purple-800 mb-2">For Creative Explorers (28%)</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Experiment with color grading tutorials</li>
                        <li>• Share your editing workflow</li>
                        <li>• Create artistic interpretations of landscapes</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Optimal Posting Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Best Times to Post</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-blue-50 rounded text-center">
                          <div className="font-medium text-blue-800">7-8 AM</div>
                          <div className="text-xs text-blue-600">Morning commute</div>
                        </div>
                        <div className="p-2 bg-blue-50 rounded text-center">
                          <div className="font-medium text-blue-800">6-8 PM</div>
                          <div className="text-xs text-blue-600">Evening wind-down</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Content Mix Recommendation</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Nature Timelapses</span>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Behind-the-scenes</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Educational Content</span>
                          <span className="text-sm font-medium">20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Interactive Posts</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-500" />
                    Actionable Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Immediate Actions (This Week)</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-green-600">1</span>
                          </div>
                          <div>
                            <div className="font-medium">Create a sunset photography series</div>
                            <div className="text-sm text-gray-600">
                              Your Nature Enthusiasts love golden hour content
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-green-600">2</span>
                          </div>
                          <div>
                            <div className="font-medium">Share your editing process</div>
                            <div className="text-sm text-gray-600">
                              Creative Explorers want to learn your techniques
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-green-600">3</span>
                          </div>
                          <div>
                            <div className="font-medium">Post during peak hours (7-8 AM, 6-8 PM)</div>
                            <div className="text-sm text-gray-600">
                              Maximize reach when your audience is most active
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Long-term Strategy (Next Month)</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-blue-600">1</span>
                          </div>
                          <div>
                            <div className="font-medium">Develop persona-specific content pillars</div>
                            <div className="text-sm text-gray-600">
                              Create targeted content for each audience segment
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-blue-600">2</span>
                          </div>
                          <div>
                            <div className="font-medium">Launch interactive Q&A series</div>
                            <div className="text-sm text-gray-600">
                              Engage Tech Savvy audience with technical discussions
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-blue-600">3</span>
                          </div>
                          <div>
                            <div className="font-medium">Track and analyze performance</div>
                            <div className="text-sm text-gray-600">Monitor how persona-targeted content performs</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
