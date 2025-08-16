"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Music, Zap, RefreshCw } from "lucide-react"

interface AIComposerProps {
  onSuggestionApply: (suggestion: any) => void
}

export function AIComposer({ onSuggestionApply }: AIComposerProps) {
  const [suggestions, setSuggestions] = useState<
    Array<{
      id: string
      type: "melody" | "rhythm" | "harmony" | "effect"
      title: string
      description: string
      confidence: number
    }>
  >([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSuggestions = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newSuggestions = [
      {
        id: "1",
        type: "melody" as const,
        title: "Ascending Arpeggio",
        description: "C major arpeggio with syncopated rhythm",
        confidence: 0.92,
      },
      {
        id: "2",
        type: "rhythm" as const,
        title: "Trap Hi-Hats",
        description: "32nd note pattern with velocity variations",
        confidence: 0.87,
      },
      {
        id: "3",
        type: "harmony" as const,
        title: "Jazz Chord Progression",
        description: "ii-V-I with extended chords",
        confidence: 0.79,
      },
      {
        id: "4",
        type: "effect" as const,
        title: "Reverb Tail",
        description: "Hall reverb with 2.3s decay",
        confidence: 0.85,
      },
    ]

    setSuggestions(newSuggestions)
    setIsGenerating(false)
  }

  useEffect(() => {
    generateSuggestions()
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "melody":
        return Music
      case "rhythm":
        return Zap
      case "harmony":
        return Sparkles
      case "effect":
        return RefreshCw
      default:
        return Music
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "melody":
        return "cyan"
      case "rhythm":
        return "fuchsia"
      case "harmony":
        return "lime"
      case "effect":
        return "orange"
      default:
        return "cyan"
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-lg">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Composer</h3>
            <p className="text-sm text-gray-400">Smart suggestions for your track</p>
          </div>
        </div>

        <Button
          onClick={generateSuggestions}
          disabled={isGenerating}
          className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-cyan-500/20 hover:to-fuchsia-500/20 text-white border border-gray-600 hover:border-cyan-500/50"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          <span className="ml-2">Refresh</span>
        </Button>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => {
          const Icon = getTypeIcon(suggestion.type)
          const color = getTypeColor(suggestion.type)

          return (
            <div
              key={suggestion.id}
              className="p-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
              onClick={() => onSuggestionApply(suggestion)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-${color}-500/20 rounded-lg`}>
                    <Icon className={`w-4 h-4 text-${color}-400`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {suggestion.title}
                    </h4>
                    <p className="text-xs text-gray-400">{suggestion.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-xs text-gray-500">{Math.round(suggestion.confidence * 100)}%</div>
                  <div className={`w-2 h-2 rounded-full bg-${color}-400`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
