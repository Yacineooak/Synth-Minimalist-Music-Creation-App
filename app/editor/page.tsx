"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  Settings,
  ArrowLeft,
  Plus,
  Minus,
  Music,
  Zap,
  Layers,
} from "lucide-react"

interface Beat {
  id: string
  x: number
  track: number
  type: "kick" | "snare" | "hihat" | "synth"
  color: string
}

interface Track {
  id: number
  name: string
  color: string
  volume: number
  muted: boolean
  waveform: number[]
}

export default function EditorPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [beats, setBeats] = useState<Beat[]>([])
  const [selectedTool, setSelectedTool] = useState<"beat" | "pitch" | "zoom">("beat")
  const timelineRef = useRef<HTMLDivElement>(null)

  const [tracks] = useState<Track[]>([
    {
      id: 1,
      name: "Kick",
      color: "from-cyan-400 to-cyan-600",
      volume: 80,
      muted: false,
      waveform: [60, 80, 40, 90, 30, 70, 50, 85, 45, 75, 35, 65],
    },
    {
      id: 2,
      name: "Snare",
      color: "from-fuchsia-400 to-fuchsia-600",
      volume: 75,
      muted: false,
      waveform: [40, 70, 60, 50, 80, 45, 75, 55, 85, 40, 70, 50],
    },
    {
      id: 3,
      name: "Hi-Hat",
      color: "from-lime-400 to-lime-600",
      volume: 60,
      muted: false,
      waveform: [30, 60, 80, 35, 70, 55, 85, 40, 75, 50, 80, 45],
    },
    {
      id: 4,
      name: "Synth",
      color: "from-purple-400 to-purple-600",
      volume: 90,
      muted: false,
      waveform: [50, 85, 45, 75, 60, 80, 35, 70, 55, 85, 40, 75],
    },
  ])

  // Handle timeline click to place beats
  const handleTimelineClick = (e: React.MouseEvent, trackId: number) => {
    if (selectedTool !== "beat") return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100

    const newBeat: Beat = {
      id: Date.now().toString(),
      x,
      track: trackId,
      type: trackId === 1 ? "kick" : trackId === 2 ? "snare" : trackId === 3 ? "hihat" : "synth",
      color: tracks.find((t) => t.id === trackId)?.color || "from-gray-400 to-gray-600",
    }

    setBeats((prev) => [...prev, newBeat])
  }

  // Handle beat removal
  const removeBeat = (beatId: string) => {
    setBeats((prev) => prev.filter((beat) => beat.id !== beatId))
  }

  // Simulate playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev + 1) % 100)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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
            <h1 className="text-lg font-semibold">New Track</h1>
            <p className="text-sm text-gray-400">128 BPM • 4/4</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="flex items-center justify-center space-x-4 p-4 border-b border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={() => setCurrentTime(0)}
        >
          <RotateCcw className="w-5 h-5" />
        </Button>

        <Button
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-black rounded-full w-14 h-14 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={() => setIsPlaying(false)}
        >
          <Square className="w-5 h-5" />
        </Button>
      </div>

      {/* Tool Selection */}
      <div className="flex items-center justify-center space-x-2 p-4 border-b border-gray-800">
        <div className="flex bg-gray-900 rounded-lg p-1">
          <Button
            variant={selectedTool === "beat" ? "default" : "ghost"}
            size="sm"
            className={`${selectedTool === "beat" ? "bg-cyan-500 text-black" : "text-gray-400 hover:text-white"}`}
            onClick={() => setSelectedTool("beat")}
          >
            <Music className="w-4 h-4 mr-2" />
            Beat
          </Button>
          <Button
            variant={selectedTool === "pitch" ? "default" : "ghost"}
            size="sm"
            className={`${selectedTool === "pitch" ? "bg-fuchsia-500 text-black" : "text-gray-400 hover:text-white"}`}
            onClick={() => setSelectedTool("pitch")}
          >
            <Zap className="w-4 h-4 mr-2" />
            Pitch
          </Button>
          <Button
            variant={selectedTool === "zoom" ? "default" : "ghost"}
            size="sm"
            className={`${selectedTool === "zoom" ? "bg-lime-500 text-black" : "text-gray-400 hover:text-white"}`}
            onClick={() => setSelectedTool("zoom")}
          >
            <Layers className="w-4 h-4 mr-2" />
            Zoom
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-hidden">
        {/* Time Ruler */}
        <div className="h-8 bg-gray-900 border-b border-gray-800 flex items-center px-4">
          <div className="flex-1 relative">
            {Array.from({ length: 17 }, (_, i) => (
              <div key={i} className="absolute text-xs text-gray-500" style={{ left: `${(i / 16) * 100}%` }}>
                {i}
              </div>
            ))}
            {/* Playhead */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-fuchsia-500 transition-all duration-100"
              style={{ left: `${currentTime}%` }}
            />
          </div>
        </div>

        {/* Tracks */}
        <div className="flex-1 overflow-y-auto">
          {tracks.map((track) => (
            <div key={track.id} className="flex border-b border-gray-800">
              {/* Track Header */}
              <div className="w-32 bg-gray-900 p-4 flex flex-col justify-center border-r border-gray-800">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${track.color}`} />
                  <span className="text-sm font-medium">{track.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-3 h-3 text-gray-400" />
                  <div className="flex-1">
                    <Slider value={[track.volume]} max={100} step={1} className="w-full" />
                  </div>
                </div>
              </div>

              {/* Track Timeline */}
              <div
                className="flex-1 h-20 bg-gray-950 relative cursor-crosshair hover:bg-gray-900/50 transition-colors"
                onClick={(e) => handleTimelineClick(e, track.id)}
                ref={track.id === 1 ? timelineRef : undefined}
              >
                {/* Grid Lines */}
                {Array.from({ length: 17 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 w-px bg-gray-800"
                    style={{ left: `${(i / 16) * 100}%` }}
                  />
                ))}

                {/* Waveform Background */}
                <div className="absolute inset-0 flex items-end px-2 py-2">
                  {track.waveform.map((height, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-t ${track.color} opacity-20 rounded-sm flex-1 mx-px`}
                      style={{ height: `${height * 0.6}%` }}
                    />
                  ))}
                </div>

                {/* Beats */}
                {beats
                  .filter((beat) => beat.track === track.id)
                  .map((beat) => (
                    <div
                      key={beat.id}
                      className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r ${beat.color} rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg`}
                      style={{ left: `${beat.x}%` }}
                      onClick={(e) => {
                        e.stopPropagation()
                        removeBeat(beat.id)
                      }}
                    />
                  ))}

                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-fuchsia-500 transition-all duration-100 pointer-events-none"
                  style={{ left: `${currentTime}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center justify-center space-x-4 p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Zoom</span>
          <div className="w-20 text-center text-sm font-mono">{Math.round(zoom * 100)}%</div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={() => setZoom(Math.min(4, zoom + 0.25))}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Gesture Hints */}
      <div className="absolute bottom-20 left-4 right-4 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-3">
          <div className="text-xs text-gray-400 text-center">
            {selectedTool === "beat" && "Tap to place beats • Tap beats to remove"}
            {selectedTool === "pitch" && "Swipe up/down to adjust pitch"}
            {selectedTool === "zoom" && "Pinch to zoom timeline"}
          </div>
        </div>
      </div>
    </div>
  )
}
