"use client"
import { Button } from "@/components/ui/button"
import { Music, Sparkles, Play } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Synth</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#create" className="text-gray-300 hover:text-white transition-colors">
            Create
          </a>
          <a href="#library" className="text-gray-300 hover:text-white transition-colors">
            Library
          </a>
          <a href="#share" className="text-gray-300 hover:text-white transition-colors">
            Share
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Login
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2 rounded-full">
            Get Started
          </Button>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
          <span className="text-sm text-gray-300">Futuristic Music Creation</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Create Music, </span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Effortlessly
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
          Design your sound with intuitive gestures. Tap, swipe, and create professional music on your mobile device
          with real-time feedback and tactile controls.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-full text-lg font-semibold"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Start Creating
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 text-gray-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-full text-lg bg-transparent"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 max-w-6xl">
          {/* Left Phone */}
          <div className="relative">
            <div className="w-64 h-[500px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] border-4 border-slate-700 p-2">
              <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                {/* Phone screen content */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-1 bg-slate-600 rounded-full"></div>
                    <div className="text-xs text-gray-400">9:41</div>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-4 top-16">
                  <div className="space-y-4">
                    <div className="h-8 bg-slate-800 rounded-lg"></div>
                    <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 bg-slate-800 rounded-lg"></div>
                      <div className="h-16 bg-slate-800 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Phone - Featured */}
          <div className="relative transform scale-110">
            <div className="w-64 h-[500px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] border-4 border-slate-600 p-2 shadow-2xl">
              <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                {/* Phone screen content */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-1 bg-slate-600 rounded-full"></div>
                    <div className="text-xs text-gray-400">9:41</div>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-white font-semibold">New Track</h3>
                  </div>
                </div>
                <div className="absolute inset-4 top-20">
                  <div className="space-y-4">
                    <div className="h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 flex items-center px-4">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="ml-3 flex-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                    </div>
                    <div className="h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"></div>
                    <div className="h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30"></div>
                    <div className="flex justify-center mt-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Phone */}
          <div className="relative">
            <div className="w-64 h-[500px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] border-4 border-slate-700 p-2">
              <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                {/* Phone screen content */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-1 bg-slate-600 rounded-full"></div>
                    <div className="text-xs text-gray-400">9:41</div>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-white font-semibold text-sm">My Beat</h3>
                  </div>
                </div>
                <div className="absolute inset-4 top-20">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 bg-slate-800 rounded-lg"></div>
                      <div className="h-12 bg-slate-800 rounded-lg"></div>
                      <div className="h-12 bg-slate-800 rounded-lg"></div>
                    </div>
                    <div className="h-20 bg-slate-800 rounded-xl"></div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">0:00</div>
                      <div className="text-xs text-gray-400">2:34</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
