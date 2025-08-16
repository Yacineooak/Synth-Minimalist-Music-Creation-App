"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AIComposer } from "@/components/ai-composer"
import {
  Plus,
  Play,
  MoreVertical,
  Clock,
  Music2,
  AudioWaveformIcon as Waveform,
  Users,
  Share2,
  Download,
  Heart,
  Zap,
  Sparkles,
  Mic,
} from "lucide-react"

export default function DashboardPage() {
  const [recentProjects] = useState([
    {
      id: 1,
      title: "Midnight Vibes",
      duration: "2:34",
      lastModified: "2 hours ago",
      waveform: [40, 60, 80, 45, 90, 30, 70, 55, 85, 35, 75, 50],
      color: "from-cyan-500 to-blue-600",
      collaborators: 2,
      likes: 24,
      isPlaying: false,
    },
    {
      id: 2,
      title: "Neon Dreams",
      duration: "3:12",
      lastModified: "1 day ago",
      waveform: [30, 70, 50, 85, 40, 95, 60, 75, 45, 80, 35, 65],
      color: "from-fuchsia-500 to-pink-600",
      collaborators: 1,
      likes: 18,
      isPlaying: false,
    },
    {
      id: 3,
      title: "Electric Pulse",
      duration: "1:58",
      lastModified: "3 days ago",
      waveform: [60, 45, 90, 35, 75, 50, 85, 40, 70, 55, 90, 30],
      color: "from-lime-500 to-green-600",
      collaborators: 0,
      likes: 31,
      isPlaying: false,
    },
    {
      id: 4,
      title: "Synth Wave",
      duration: "4:21",
      lastModified: "1 week ago",
      waveform: [50, 80, 35, 70, 55, 85, 40, 75, 60, 45, 80, 35],
      color: "from-purple-500 to-indigo-600",
      collaborators: 3,
      likes: 42,
      isPlaying: false,
    },
  ])

  const [liveCollabs] = useState([
    { id: 1, title: "Future Bass Collab", users: 3, genre: "Electronic" },
    { id: 2, title: "Lo-Fi Study Session", users: 7, genre: "Chill" },
    { id: 3, title: "Trap Beats Lab", users: 2, genre: "Hip-Hop" },
  ])

  const [trendingTracks] = useState([
    { id: 1, title: "Cosmic Journey", artist: "SynthMaster", plays: "12.3K" },
    { id: 2, title: "Digital Dreams", artist: "NeonWave", plays: "8.7K" },
    { id: 3, title: "Retro Future", artist: "CyberBeat", plays: "15.1K" },
  ])

  const [playingProject, setPlayingProject] = useState<number | null>(null)

  const [animatedWaveforms, setAnimatedWaveforms] = useState<{ [key: number]: number[] }>({})

  useEffect(() => {
    const interval = setInterval(() => {
      if (playingProject) {
        setAnimatedWaveforms((prev) => ({
          ...prev,
          [playingProject]: Array.from({ length: 12 }, () => Math.random() * 100),
        }))
      }
    }, 150)

    return () => clearInterval(interval)
  }, [playingProject])

  const handlePlay = (projectId: number) => {
    if (playingProject === projectId) {
      setPlayingProject(null)
    } else {
      setPlayingProject(projectId)
    }
  }

  const handleAISuggestion = (suggestion: any) => {
    console.log("[v0] AI suggestion applied:", suggestion)
    // Handle AI suggestion application
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Your Studio
            </h1>
            <p className="text-gray-400 mt-1">Create something amazing today</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800 relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              <Users className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center space-x-2 mb-2">
              <Music2 className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-400">Tracks</span>
            </div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-cyan-400">+3 this week</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-fuchsia-500/30 transition-all">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-fuchsia-400" />
              <span className="text-sm text-gray-400">Hours</span>
            </div>
            <div className="text-2xl font-bold text-white">8.5</div>
            <div className="text-xs text-fuchsia-400">+2.1 today</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-lime-500/30 transition-all">
            <div className="flex items-center space-x-2 mb-2">
              <Waveform className="w-4 h-4 text-lime-400" />
              <span className="text-sm text-gray-400">BPM Avg</span>
            </div>
            <div className="text-2xl font-bold text-white">128</div>
            <div className="text-xs text-lime-400">Perfect tempo</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-orange-500/30 transition-all">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-gray-400">Collabs</span>
            </div>
            <div className="text-2xl font-bold text-white">6</div>
            <div className="text-xs text-orange-400">2 active now</div>
          </div>
        </div>

        <div className="mb-8">
          <AIComposer onSuggestionApply={handleAISuggestion} />
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-200">Recent Projects</h2>
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white group-hover:text-cyan-200 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-gray-400">{project.lastModified}</p>
                        {project.collaborators > 0 && (
                          <div className="flex items-center space-x-1 text-xs text-orange-400">
                            <Users className="w-3 h-3" />
                            <span>{project.collaborators}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1 text-xs text-fuchsia-400">
                          <Heart className="w-3 h-3" />
                          <span>{project.likes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-400">{project.duration}</span>
                      <Button size="icon" variant="ghost" className="text-gray-400 hover:text-cyan-400 w-8 h-8">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-gray-400 hover:text-lime-400 w-8 h-8">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => handlePlay(project.id)}
                        className={`rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 shadow-lg ${
                          playingProject === project.id
                            ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 animate-pulse"
                            : "bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400"
                        }`}
                      >
                        <Play className="w-4 h-4 text-black" />
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Waveform Preview */}
                  <div className="flex items-end space-x-1 h-12 mb-2">
                    {(animatedWaveforms[project.id] || project.waveform).map((height, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-t ${project.color} rounded-sm flex-1 transition-all duration-150 group-hover:opacity-80 ${
                          playingProject === project.id ? "animate-pulse" : ""
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Live Collaborations */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse mr-3" />
              Live Collaborations
            </h2>
            <div className="space-y-3">
              {liveCollabs.map((collab) => (
                <div
                  key={collab.id}
                  className="p-4 rounded-lg bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800 hover:border-lime-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white group-hover:text-lime-300">{collab.title}</h3>
                      <p className="text-xs text-gray-400">{collab.genre}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-xs text-lime-400">
                        <Users className="w-3 h-3" />
                        <span>{collab.users}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-lime-500/20 hover:bg-lime-500/30 text-lime-400 border-lime-500/30"
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tracks */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
              <Zap className="w-5 h-5 text-fuchsia-400 mr-2" />
              Trending Now
            </h2>
            <div className="space-y-3">
              {trendingTracks.map((track, index) => (
                <div
                  key={track.id}
                  className="p-4 rounded-lg bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800 hover:border-fuchsia-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-fuchsia-400">#{index + 1}</div>
                      <div>
                        <h3 className="text-sm font-medium text-white group-hover:text-fuchsia-300">{track.title}</h3>
                        <p className="text-xs text-gray-400">{track.artist}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{track.plays} plays</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Quick Start</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-gray-800 hover:border-cyan-500/50 hover:bg-gray-800/50 text-white flex flex-col items-center justify-center space-y-2 transition-all duration-300 group"
            >
              <Music2 className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Beat Maker</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-gray-800 hover:border-fuchsia-500/50 hover:bg-gray-800/50 text-white flex flex-col items-center justify-center space-y-2 transition-all duration-300 group"
            >
              <Waveform className="w-6 h-6 text-fuchsia-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Melody Lab</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-gray-800 hover:border-lime-500/50 hover:bg-gray-800/50 text-white flex flex-col items-center justify-center space-y-2 transition-all duration-300 group"
            >
              <Mic className="w-6 h-6 text-lime-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Voice Record</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-gray-800 hover:border-orange-500/50 hover:bg-gray-800/50 text-white flex flex-col items-center justify-center space-y-2 transition-all duration-300 group"
            >
              <Sparkles className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm">AI Remix</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-6">
        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-black font-semibold rounded-full w-16 h-16 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/30 neon-glow"
          onClick={() => (window.location.href = "/editor")}
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>

      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-lime-500/3 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  )
}
