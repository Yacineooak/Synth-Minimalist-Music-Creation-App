"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Share,
  Heart,
  ArrowLeft,
  MoreHorizontal,
} from "lucide-react"

export default function PlaybackPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180) // 3 minutes
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "one" | "all">("off")

  // Real-time waveform data
  const [waveformData, setWaveformData] = useState<number[]>([])
  const waveformRef = useRef<HTMLDivElement>(null)

  // Generate dynamic waveform data
  useEffect(() => {
    const generateWaveform = () => {
      const data = Array.from({ length: 100 }, () => Math.random() * 100)
      setWaveformData(data)
    }

    generateWaveform()
    const interval = setInterval(generateWaveform, 100)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  // Simulate haptic feedback
  const triggerHapticFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    triggerHapticFeedback()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (currentTime / duration) * 100

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="text-center">
          <h1 className="text-sm font-medium text-gray-400">NOW PLAYING</h1>
        </div>

        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Album Art / Visualizer */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative w-80 h-80 max-w-full max-h-full">
          {/* Outer Glow Ring */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 blur-xl opacity-30 transition-all duration-300 ${
              isPlaying ? "animate-pulse scale-110" : "scale-100"
            }`}
          />

          {/* Main Visualizer Circle */}
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-full border border-gray-800 overflow-hidden">
            {/* Waveform Visualization */}
            <div className="absolute inset-4 rounded-full overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Circular Waveform */}
                <div className="absolute inset-0">
                  {waveformData.map((height, index) => {
                    const angle = (index / waveformData.length) * 360
                    const radius = 120
                    const waveHeight = isPlaying ? height * 0.3 : 20
                    return (
                      <div
                        key={index}
                        className="absolute bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full transition-all duration-100"
                        style={{
                          width: "2px",
                          height: `${waveHeight}px`,
                          left: "50%",
                          top: "50%",
                          transformOrigin: "1px 0px",
                          transform: `translate(-50%, -${radius}px) rotate(${angle}deg)`,
                        }}
                      />
                    )
                  })}
                </div>

                {/* Center Play Button */}
                <Button
                  size="lg"
                  className="relative z-10 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-black rounded-full w-20 h-20 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/30"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
              </div>
            </div>

            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(75, 85, 99, 0.3)" strokeWidth="1" />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${progress * 3.01} 301`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F7FF" />
                  <stop offset="100%" stopColor="#FF00D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="text-center px-8 mb-8">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Midnight Vibes
        </h2>
        <p className="text-gray-400 mb-4">Your Creation</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="relative h-1 bg-gray-800 rounded-full mb-2">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 mb-8">
        {/* Secondary Controls */}
        <div className="flex items-center justify-center space-x-8 mb-6">
          <Button
            variant="ghost"
            size="icon"
            className={`text-gray-400 hover:text-white hover:bg-gray-800 ${isShuffled ? "text-cyan-400" : ""}`}
            onClick={() => {
              setIsShuffled(!isShuffled)
              triggerHapticFeedback()
            }}
          >
            <Shuffle className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`${isLiked ? "text-red-400" : "text-gray-400 hover:text-white"} hover:bg-gray-800`}
            onClick={() => {
              setIsLiked(!isLiked)
              triggerHapticFeedback()
            }}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`text-gray-400 hover:text-white hover:bg-gray-800 ${
              repeatMode !== "off" ? "text-lime-400" : ""
            }`}
            onClick={() => {
              const modes: ("off" | "one" | "all")[] = ["off", "one", "all"]
              const currentIndex = modes.indexOf(repeatMode)
              setRepeatMode(modes[(currentIndex + 1) % modes.length])
              triggerHapticFeedback()
            }}
          >
            <Repeat className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
            <Share className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => {
              setCurrentTime(Math.max(0, currentTime - 10))
              triggerHapticFeedback()
            }}
          >
            <SkipBack className="w-6 h-6" />
          </Button>

          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-black rounded-full w-16 h-16 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => {
              setCurrentTime(Math.min(duration, currentTime + 10))
              triggerHapticFeedback()
            }}
          >
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted || volume[0] === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>

          <div className="flex-1">
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={(value) => {
                setVolume(value)
                setIsMuted(false)
              }}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <span className="text-sm text-gray-400 w-8 text-right">{isMuted ? 0 : volume[0]}</span>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl transition-all duration-1000 ${
            isPlaying ? "animate-pulse scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl transition-all duration-1000 ${
            isPlaying ? "animate-pulse scale-110" : "scale-100"
          }`}
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  )
}
