"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

interface EngineAnalysisScreenProps {
  onBack: () => void
  onProceed: () => void
}

const analysisData = {
  overallScore: 85,
  summary: "Engine appears healthy. Minor noise detected in exhaust system.",
  findings: [
    { label: "Engine Block", status: "good" as const, detail: "No knocking detected" },
    { label: "Transmission", status: "good" as const, detail: "Smooth operation confirmed" },
    { label: "Exhaust System", status: "caution" as const, detail: "Minor rattle detected" },
    { label: "Belt System", status: "good" as const, detail: "No squealing detected" },
    { label: "Cooling System", status: "good" as const, detail: "Normal operating sounds" },
  ],
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-tm-green"
  if (score >= 60) return "text-tm-caution"
  return "text-tm-danger"
}

function getScoreRingColor(score: number) {
  if (score >= 80) return "stroke-tm-green"
  if (score >= 60) return "stroke-tm-caution"
  return "stroke-tm-danger"
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Good"
  if (score >= 60) return "Fair"
  return "Poor"
}

function StatusIcon({ status }: { status: "good" | "caution" | "problem" }) {
  if (status === "good") return <CheckCircle2 className="size-5 text-tm-green" />
  if (status === "caution") return <AlertTriangle className="size-5 text-tm-caution" />
  return <XCircle className="size-5 text-tm-danger" />
}

function StatusBadge({ status }: { status: "good" | "caution" | "problem" }) {
  const styles = {
    good: "bg-tm-green/10 text-tm-green",
    caution: "bg-tm-caution/10 text-tm-caution",
    problem: "bg-tm-danger/10 text-tm-danger",
  }
  const labels = { good: "Good", caution: "Caution", problem: "Problem" }
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export function EngineAnalysisScreen({ onBack, onProceed }: EngineAnalysisScreenProps) {
  const { overallScore, summary, findings } = analysisData
  const circumference = 2 * Math.PI * 54
  const strokeOffset = circumference - (overallScore / 100) * circumference

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
        <h1 className="text-lg font-semibold text-foreground">Engine Analysis Result</h1>
      </div>

      {/* Score circle */}
      <div className="flex flex-col items-center px-6 pt-6 pb-4">
        <div className="relative mb-4">
          <svg width="140" height="140" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              className={getScoreRingColor(overallScore)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}
            </span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>

        <div className={`rounded-full px-3 py-1 text-sm font-semibold ${
          overallScore >= 80
            ? "bg-tm-green/10 text-tm-green"
            : overallScore >= 60
            ? "bg-tm-caution/10 text-tm-caution"
            : "bg-tm-danger/10 text-tm-danger"
        }`}>
          Mechanical Health: {getScoreLabel(overallScore)}
        </div>

        <p className="mt-3 text-center text-sm text-muted-foreground leading-relaxed text-pretty">
          {summary}
        </p>
      </div>

      {/* Findings list */}
      <div className="flex-1 px-6 pb-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Detailed Findings</h2>
        <div className="flex flex-col gap-2">
          {findings.map((finding) => (
            <div
              key={finding.label}
              className="flex items-center gap-3 rounded-lg bg-secondary p-3"
            >
              <StatusIcon status={finding.status} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{finding.label}</p>
                <p className="text-xs text-muted-foreground">{finding.detail}</p>
              </div>
              <StatusBadge status={finding.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 pt-2">
        <Button
          size="lg"
          className="w-full bg-tm-green text-[#FFFFFF] hover:bg-tm-green/90 h-12 text-base font-semibold rounded-xl"
          onClick={onProceed}
        >
          Proceed to Listing Verification
          <ArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    </div>
  )
}
