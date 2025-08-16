"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Search,
  Play,
  Pause,
  Download,
  Heart,
  Filter,
  ArrowLeft,
  Volume2,
  Clock,
  Zap,
  Music,
  Drum,
  Piano,
  Guitar,
  Mic,
} from "lucide-react"

interface SoundSample {
  id: string
  name: string
  category: "drums" | "synth" | "bass" | "vocal" | "fx" | "melody"
  duration: string
  bpm: number
  key: string
  color: string
  waveform: number[]
  isPlaying: boolean
  isFavorite: boolean
}

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [playingSample, setPlayingSample] = useState<string | null>(null)

  const [samples] = useState<SoundSample[]>([
    {
      id: "1",
      name: "Neon Kick",
      category: "drums",
      duration: "0:02",
      bpm: 128,
      key: "C",
      color: "from-cyan-400 to-cyan-600",
      waveform: [80, 60, 90, 40, 70, 50, 85, 45, 75, 55, 80, 35],
      isPlaying: false,
      isFavorite: false,
    },
    {
      id: "2",
      name: "Electric Snare",
      category: "drums",
      duration: "0:01",
      bpm: 128,
      key: "C",
      color: "from-fuchsia-400 to-fuchsia-600",
      waveform: [60, 80, 45, 75, 55, 85, 40, 70, 60, 80, 45, 75],
      isPlaying: false,
      isFavorite: true,
    },
    {
      id: "3",
      name: "Synth Wave",
      category: "synth",
      duration: "0:04",
      bpm: 120,
      key: "Am",
      color: "from-lime-400 to-lime-600",
      waveform: [40, 70, 60, 50, 80, 45, 75, 55, 85, 40, 70, 50],
      isPlaying: false,
      isFavorite: false,
    },
    {
      id: "4",
      name: "Deep Bass",
      category: "bass",
      duration: "0:08",
      bpm: 128,
      key: "Em",
      color: "from-purple-400 to-purple-600",
      waveform: [90, 45, 80, 35, 75, 50, 85, 40, 70, 55, 90, 30],
      isPlaying: false,
      isFavorite: false,
    },
    {
      id: "5",
      name: "Vocal Chop",
      category: "vocal",
      duration: "0:03",
      bpm: 140,
      key: "F",
      color: "from-orange-400 to-orange-600",
      waveform: [50, 85, 45, 75, 60, 80, 35, 70, 55, 85, 40, 75],
      isPlaying: false,
      isFavorite: true,
    },
    {
      id: "6",
      name: "Reverb Tail",
      category: "fx",
      duration: "0:06",
      bpm: 0,
      key: "-",
      color: "from-teal-400 to-teal-600",
      waveform: [30, 60, 80, 35, 70, 55, 85, 40, 75, 50, 80, 45],
      isPlaying: false,
      isFavorite: false,
    },
    {
      id: "7",
      name: "Pluck Melody",
      category: "melody",
      duration: "0:16",
      bpm: 128,
      key: "Dm",
      color: "from-pink-400 to-pink-600",
      waveform: [70, 50, 85, 40, 75, 60, 80, 45, 70, 55, 85, 35],
      isPlaying: false,
      isFavorite: false,
    },
    {
      id: "8",
      name: "Analog Hi-Hat",
      category: "drums",
      duration: "0:01",
      bpm: 128,
      key: "C",
      color: "from-cyan-400 to-cyan-600",
      waveform: [40, 80, 30, 70, 50, 85, 35, 75, 45, 80, 40, 70],
      isPlaying: false,
      isFavorite: true,
    },
  ])

  const categories = [
    { id: "all", name: "All", icon: Music, count: samples.length },
    { id: "drums", name: "Drums", icon: Drum, count: samples.filter((s) => s.category === "drums").length },
    { id: "synth", name: "Synth", icon: Zap, count: samples.filter((s) => s.category === "synth").length },
    { id: "bass", name: "Bass", icon: Guitar, count: samples.filter((s) => s.category === "bass").length },
    { id: "vocal", name: "Vocal", icon: Mic, count: samples.filter((s) => s.category === "vocal").length },
    { id: "melody", name: "Melody", icon: Piano, count: samples.filter((s) => s.category === "melody").length },
    { id: "fx", name: "FX", icon: Volume2, count: samples.filter((s) => s.category === "fx").length },
  ]

  const filteredSamples = samples.filter((sample) => {
    const matchesSearch = sample.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || sample.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const togglePlay = (sampleId: string) => {
    if (playingSample === sampleId) {
      setPlayingSample(null)
    } else {
      setPlayingSample(sampleId)
      // Simulate stopping after duration
      setTimeout(() => setPlayingSample(null), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Sound Library
            </h1>
            <p className="text-sm text-gray-400">{filteredSamples.length} samples available</p>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search sounds, loops, effects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 text-white placeholder-gray-400 transition-all duration-300"
          />
          {/* Glowing underline animation */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 transform scale-x-0 transition-transform duration-300 focus-within:scale-x-100" />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "ghost"}
                size="sm"
                className={`flex-shrink-0 ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black hover:from-cyan-400 hover:to-fuchsia-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Sample Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredSamples.map((sample) => (
            <Card
              key={sample.id}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-white group-hover:text-cyan-200 transition-colors">
                        {sample.name}
                      </h3>
                      {sample.isFavorite && <Heart className="w-4 h-4 text-red-400 fill-current" />}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{sample.duration}</span>
                      </span>
                      {sample.bpm > 0 && <span>{sample.bpm} BPM</span>}
                      {sample.key !== "-" && <span>Key: {sample.key}</span>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                      <Download className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-black rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-500/25"
                      onClick={() => togglePlay(sample.id)}
                    >
                      {playingSample === sample.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Waveform Visualization */}
                <div className="flex items-end space-x-1 h-12 mb-2">
                  {sample.waveform.map((height, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-t ${sample.color} rounded-sm flex-1 transition-all duration-300 ${
                        playingSample === sample.id ? "animate-pulse" : "group-hover:opacity-80"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                {/* Category Badge */}
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${sample.color} text-black`}
                  >
                    {sample.category.toUpperCase()}
                  </span>

                  {playingSample === sample.id && (
                    <div className="flex items-center space-x-1 text-xs text-cyan-400">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      <span>Playing</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredSamples.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No samples found</div>
            <div className="text-sm text-gray-500">Try adjusting your search or category filter</div>
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-fuchsia-500/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  )
}
