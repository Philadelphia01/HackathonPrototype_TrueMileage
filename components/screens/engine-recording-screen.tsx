"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mic, Square, Volume2 } from "lucide-react"

interface EngineRecordingScreenProps {
  vin: string
  onBack: () => void
  onAnalysisComplete: () => void
}

export function EngineRecordingScreen({ vin, onBack, onAnalysisComplete }: EngineRecordingScreenProps) {
  const [state, setState] = useState<"idle" | "recording" | "analyzing" | "done">("idle")
  const [seconds, setSeconds] = useState(0)
  const [waveform, setWaveform] = useState<number[]>(Array(24).fill(4))
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const waveRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (state === "recording") {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
      waveRef.current = setInterval(() => {
        setWaveform(Array(24).fill(0).map(() => Math.random() * 28 + 4))
      }, 100)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      if (waveRef.current) clearInterval(waveRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (waveRef.current) clearInterval(waveRef.current)
    }
  }, [state])

  useEffect(() => {
    if (state === "analyzing") {
      const timeout = setTimeout(() => {
        setState("done")
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [state])

  const handleRecord = () => {
    setState("recording")
    setSeconds(0)
  }

  const handleStop = () => {
    setState("analyzing")
    setWaveform(Array(24).fill(4))
  }

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button
          onClick={onBack}
          className="flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Record Engine Sound</h1>
          <p className="text-xs text-muted-foreground font-mono">{vin}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {/* Status text */}
        <div className="mb-8 text-center">
          {state === "idle" && (
            <>
              <Volume2 className="mx-auto mb-3 size-8 text-tm-blue" />
              <p className="text-sm font-medium text-foreground">Ready to Record</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Start the engine and place your phone near the hood. Tap record when ready.
              </p>
            </>
          )}
          {state === "recording" && (
            <>
              <p className="text-3xl font-bold tabular-nums text-foreground">{formatTime(seconds)}</p>
              <p className="mt-1 text-sm text-tm-green font-medium">Recording...</p>
            </>
          )}
          {state === "analyzing" && (
            <>
              <p className="text-sm font-medium text-foreground">Analyzing... Please wait</p>
              <p className="mt-1 text-xs text-muted-foreground">AI is processing the engine sound</p>
            </>
          )}
          {state === "done" && (
            <>
              <p className="text-sm font-medium text-tm-green">Analysis Complete</p>
              <p className="mt-1 text-xs text-muted-foreground">Tap below to view results</p>
            </>
          )}
        </div>

        {/* Waveform visualization */}
        <div className="mb-8 flex h-16 items-end justify-center gap-1">
          {waveform.map((height, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full transition-all duration-100"
              style={{
                height: `${height}px`,
                backgroundColor:
                  state === "recording"
                    ? `hsl(${140 + i * 2}, 70%, 50%)`
                    : state === "analyzing"
                    ? `hsl(210, 70%, ${40 + Math.sin(Date.now() / 500 + i) * 20}%)`
                    : "var(--color-border)",
              }}
            />
          ))}
        </div>

        {/* Record / Stop button */}
        {state === "idle" && (
          <button
            onClick={handleRecord}
            className="flex size-24 items-center justify-center rounded-full bg-tm-green shadow-lg shadow-tm-green/30 transition-transform hover:scale-105 active:scale-95"
            aria-label="Start recording"
          >
            <Mic className="size-10 text-[#FFFFFF]" />
          </button>
        )}

        {state === "recording" && (
          <button
            onClick={handleStop}
            className="flex size-24 items-center justify-center rounded-full bg-destructive shadow-lg shadow-destructive/30 transition-transform hover:scale-105 active:scale-95"
            aria-label="Stop recording"
          >
            <Square className="size-8 text-[#FFFFFF]" />
          </button>
        )}

        {state === "analyzing" && (
          <div className="flex size-24 items-center justify-center rounded-full bg-tm-blue/10 border-2 border-tm-blue">
            <div className="size-8 animate-spin rounded-full border-4 border-tm-blue border-t-transparent" />
          </div>
        )}

        {state === "done" && (
          <div className="flex size-24 items-center justify-center rounded-full bg-tm-green/10 border-2 border-tm-green">
            <svg className="size-10 text-tm-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Recording tips */}
        {state === "idle" && (
          <div className="mt-8 w-full rounded-lg bg-secondary p-4">
            <p className="mb-2 text-xs font-medium text-foreground">Tips for best results:</p>
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 block size-1.5 shrink-0 rounded-full bg-tm-green" />
                Record in a quiet environment
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 block size-1.5 shrink-0 rounded-full bg-tm-green" />
                Hold phone 1-2 feet from the engine
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 block size-1.5 shrink-0 rounded-full bg-tm-green" />
                Record for at least 10 seconds
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      {state === "done" && (
        <div className="px-6 pb-6 pt-2">
          <Button
            size="lg"
            className="w-full bg-tm-green text-[#FFFFFF] hover:bg-tm-green/90 h-12 text-base font-semibold rounded-xl"
            onClick={onAnalysisComplete}
          >
            View Analysis Results
          </Button>
        </div>
      )}
    </div>
  )
}
