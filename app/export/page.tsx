"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Download,
  Share2,
  ArrowLeft,
  Music,
  FileAudio,
  Instagram,
  Twitter,
  Youtube,
  Copy,
  Check,
  Settings,
  Volume2,
  Zap,
} from "lucide-react"

export default function ExportPage() {
  const [trackName, setTrackName] = useState("Midnight Vibes")
  const [exportFormat, setExportFormat] = useState<"mp3" | "wav">("mp3")
  const [quality, setQuality] = useState([320])
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [linkCopied, setLinkCopied] = useState(false)

  const exportFormats = [
    {
      id: "mp3" as const,
      name: "MP3",
      description: "Compressed, smaller file size",
      icon: Music,
      color: "from-cyan-400 to-cyan-600",
    },
    {
      id: "wav" as const,
      name: "WAV",
      description: "Uncompressed, studio quality",
      icon: FileAudio,
      color: "from-fuchsia-400 to-fuchsia-600",
    },
  ]

  const socialPlatforms = [
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      description: "Share to Stories or Reels",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Music,
      color: "from-black to-gray-800",
      description: "Perfect for short videos",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: Twitter,
      color: "from-blue-400 to-blue-600",
      description: "Share with your followers",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "from-red-500 to-red-600",
      description: "Upload as background music",
    },
  ]

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          // Trigger download simulation
          const link = document.createElement("a")
          link.href = "#"
          link.download = `${trackName}.${exportFormat}`
          link.click()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText("https://synth.app/track/midnight-vibes")
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/3 to-transparent animate-pulse" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/3 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10">
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
                Export & Share
              </h1>
              <p className="text-sm text-gray-400">Ready to share your creation</p>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Track Preview */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                  <Music className="w-8 h-8 text-black" />
                </div>
                <div className="flex-1">
                  <Input
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    className="text-lg font-semibold bg-transparent border-none p-0 focus:ring-0 text-white"
                    placeholder="Track name"
                  />
                  <p className="text-sm text-gray-400 mt-1">3:02 • 128 BPM • Created today</p>
                </div>
              </div>

              {/* Mini Waveform */}
              <div className="flex items-end space-x-1 h-8">
                {Array.from({ length: 50 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-cyan-400 to-fuchsia-500 rounded-sm flex-1 opacity-60"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Export Options */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Download className="w-5 h-5 text-cyan-400" />
              <span>Export Audio</span>
            </h2>

            <div className="grid grid-cols-1 gap-4 mb-6">
              {exportFormats.map((format) => {
                const Icon = format.icon
                const isSelected = exportFormat === format.id
                return (
                  <Card
                    key={format.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-br from-gray-800/80 to-black/80 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                        : "bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-800 hover:border-gray-700"
                    }`}
                    onClick={() => setExportFormat(format.id)}
                  >
                    <div className="p-4 flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${format.color} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{format.name}</h3>
                        <p className="text-sm text-gray-400">{format.description}</p>
                      </div>
                      {isSelected && <div className="w-3 h-3 bg-cyan-400 rounded-full" />}
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Quality Settings */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">Quality</span>
                <span className="text-sm text-cyan-400">{quality[0]} kbps</span>
              </div>
              <Slider value={quality} onValueChange={setQuality} min={128} max={320} step={64} className="w-full" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>128 kbps</span>
                <span>192 kbps</span>
                <span>256 kbps</span>
                <span>320 kbps</span>
              </div>
            </div>

            {/* Export Button */}
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              {isExporting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Exporting... {exportProgress}%</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Export {exportFormat.toUpperCase()}</span>
                </div>
              )}
            </Button>
          </div>

          {/* Share Options */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Share2 className="w-5 h-5 text-fuchsia-400" />
              <span>Share Your Track</span>
            </h2>

            {/* Share Link */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 mb-4">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300">
                    https://synth.app/track/midnight-vibes
                  </div>
                  <Button
                    onClick={copyShareLink}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    {linkCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Social Platforms */}
            <div className="grid grid-cols-2 gap-4">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <Card
                    key={platform.id}
                    className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group"
                  >
                    <div className="p-4 text-center">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">{platform.name}</h3>
                      <p className="text-xs text-gray-400">{platform.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-16 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-gray-800 hover:border-cyan-500/50 hover:bg-gray-800/50 text-white flex flex-col items-center justify-center space-y-1 transition-all duration-300"
            >
              <Volume2 className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">Preview</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-gray-800 hover:border-fuchsia-500/50 hover:bg-gray-800/50 text-white flex flex-col items-center justify-center space-y-1 transition-all duration-300"
            >
              <Zap className="w-5 h-5 text-fuchsia-400" />
              <span className="text-sm">Remix</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
