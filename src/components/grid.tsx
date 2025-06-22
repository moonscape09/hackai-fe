import React, { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SENTIMENT_COLORS: Record<string, string> = {
  positive: "#22c55e",
  neutral: "#fbbf24",
  negative: "#ef4444",
};

const LANG_COLORS: Record<string, string> = {
  casual: "#3A5FCD",
  excited: "#E94E77",
  playful: "#F9DC5C",
  "emoji-heavy": "#26A69A",
  "internet-slang": "#8E44AD",
};

const Grid: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto p-4">
      {posts.length === 0 && (
        <p className="text-center text-gray-500">No posts available.</p>
      )}

      {posts.map((post) => {
        const sentimentData = Object.entries(post.sentiment_distribution || {}).map(
          ([name, value]) => ({
            name,
            value,
            color: SENTIMENT_COLORS[name] || "#8884d8",
          })

        );
        const languageData = Object.entries(post.language_style_distribution || {}).map(
          ([name, value]) => ({
            name,
            value,
            color: LANG_COLORS[name],
          })

        );

        console.log(languageData)

        // const langDist = post.language_style_distribution || {};

        if (!post.icp) return null;

        return (
          <Card
            key={post.id}
            className="shadow-sm w-full cursor-pointer transition hover:shadow-lg"
            onClick={() => window.open(post.url, "_blank", "noopener,noreferrer")}
            tabIndex={0}
            role="link"
            aria-label={`Open Post #${post.id}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.open(post.url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <CardHeader>
              <CardTitle>
                <span className="hover:underline">Post #{post.id}</span>
              </CardTitle>
            </CardHeader>
<CardContent className="space-y-6">
  {/* 1) Chips */}
  <div className="flex flex-wrap items-center gap-3 mb-4">
    <Badge className="px-3 py-1 bg-gradient-to-r from-blue-400 to-yellow-400 text-white">
      ICP: {post.icp}
    </Badge>
    <Badge className="px-3 py-1 bg-green-100 text-green-800">
      Engagement: {post.engagement}
    </Badge>
    <Badge className="px-3 py-1 bg-gray-100 text-gray-800">
      Type: {post.type}
    </Badge>
    {post.score != null && (
      <Badge className="px-3 py-1 bg-purple-100 text-purple-800">
        Score: {post.score}
      </Badge>
    )}
  </div>

  {/* 2) Two Pies */}
  <div className="grid grid-cols-2 gap-8 mb-4">
    {[ 
      { title: 'Sentiment',   data: sentimentData   },
      { title: 'Language',    data: languageData    }
    ].map(({ title, data }) => (
      <div key={title} className="text-center">
        <h3 className="text-sm font-medium mb-2">{title}</h3>
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={50}
              stroke="none"
              label={false}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color!} />
              ))}
            </Pie>
            <Tooltip formatter={(val) => `${val}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    ))}
  </div>

  {/* 3) Legends */}
  <div className="grid grid-cols-2 gap-8">
    <ul className="space-y-1 text-sm">
      {sentimentData.map((s) => (
        <li key={s.name} className="flex items-center space-x-2">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ backgroundColor: s.color }}
          />
          <span className="font-medium">{s.name}</span>
          <span className="text-gray-400">—</span>
          <span className="text-gray-600">{Number(s.value)}%</span>
        </li>
      ))}
    </ul>
    <ul className="space-y-1 text-sm">
      {languageData.map((l) => (
        <li key={l.name} className="flex items-center space-x-2">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ backgroundColor: l.color }}
          />
          <span className="font-medium">{l.name}</span>
          <span className="text-gray-400">—</span>
          <span className="text-gray-600">{Number(l.value)}%</span>
        </li>
      ))}
    </ul>
  </div>

  {/* 4) Timestamps / Reasoning */}
  <div className="mt-4 text-xs text-gray-500">
    <p>Created: {new Date(post.created_at).toLocaleString()}</p>
    <p>Updated: {new Date(post.updated_at).toLocaleString()}</p>
  </div>

  {post.icp_reasoning && (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-sm text-yellow-900">
      {post.icp_reasoning}
    </div>
  )}
</CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Grid;