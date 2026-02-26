"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Download,
  Share2,
  ShieldCheck,
  AlertTriangle,
  Car,
  Gauge,
  FileText,
  ClipboardCheck,
} from "lucide-react"

interface DashboardReportScreenProps {
  vin: string
  onBack: () => void
  onGoHome: () => void
}

const reportData = {
  vehicle: "2020 Honda Accord EX-L",
  healthScore: 85,
  listingScore: 90,
  recommendation: "Safe to Buy" as const,
  highlights: [
    { label: "Engine Health", value: "85/100", icon: Gauge, color: "text-tm-green" },
    { label: "Listing Reliability", value: "90/100", icon: ClipboardCheck, color: "text-tm-blue" },
    { label: "Accident History", value: "1 found", icon: AlertTriangle, color: "text-tm-caution" },
    { label: "Title Status", value: "Clean", icon: FileText, color: "text-tm-green" },
  ],
}

function getRecommendationStyle(rec: string) {
  if (rec === "Safe to Buy") return { bg: "bg-tm-green/10", text: "text-tm-green", icon: ShieldCheck }
  if (rec === "Proceed with Caution") return { bg: "bg-tm-caution/10", text: "text-tm-caution", icon: AlertTriangle }
  return { bg: "bg-tm-danger/10", text: "text-tm-danger", icon: AlertTriangle }
}

export function DashboardReportScreen({ vin, onBack, onGoHome }: DashboardReportScreenProps) {
  const { vehicle, healthScore, listingScore, recommendation, highlights } = reportData
  const recStyle = getRecommendationStyle(recommendation)
  const RecIcon = recStyle.icon

  const overallScore = Math.round((healthScore + listingScore) / 2)

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
        <h1 className="text-lg font-semibold text-foreground">Vehicle Report</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-5 pb-4">
        {/* Vehicle info */}
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-primary p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary-foreground/15">
            <Car className="size-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary-foreground">{vehicle}</p>
            <p className="font-mono text-xs text-primary-foreground/70">{vin}</p>
          </div>
        </div>

        {/* Recommendation banner */}
        <div className={`mb-5 flex items-center gap-3 rounded-xl ${recStyle.bg} p-4`}>
          <RecIcon className={`size-8 ${recStyle.text}`} />
          <div>
            <p className={`text-base font-bold ${recStyle.text}`}>{recommendation}</p>
            <p className="text-xs text-muted-foreground">Based on combined analysis</p>
          </div>
        </div>

        {/* Score bars */}
        <div className="mb-5">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Overall Scores</h2>

          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Mechanical Health</span>
              <span className="text-xs font-bold text-tm-green">{healthScore}/100</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-tm-green/15">
              <div
                className="h-full rounded-full bg-tm-green transition-all duration-700"
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Listing Reliability</span>
              <span className="text-xs font-bold text-tm-blue">{listingScore}/100</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-tm-blue/15">
              <div
                className="h-full rounded-full bg-tm-blue transition-all duration-700"
                style={{ width: `${listingScore}%` }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Overall Score</span>
              <span className="text-xs font-bold text-foreground">{overallScore}/100</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-primary/15">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${overallScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Highlights grid */}
        <h2 className="mb-3 text-sm font-semibold text-foreground">Key Highlights</h2>
        <div className="mb-5 grid grid-cols-2 gap-2">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex flex-col items-center rounded-lg bg-secondary p-3 text-center">
                <Icon className={`mb-1.5 size-5 ${item.color}`} />
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 px-6 pb-6 pt-2">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-12 rounded-xl"
          onClick={() => {}}
        >
          <Download className="mr-2 size-4" />
          Download
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-12 rounded-xl"
          onClick={() => {}}
        >
          <Share2 className="mr-2 size-4" />
          Share
        </Button>
      </div>
      <div className="px-6 pb-6">
        <Button
          size="lg"
          className="w-full bg-tm-green text-[#FFFFFF] hover:bg-tm-green/90 h-12 text-base font-semibold rounded-xl"
          onClick={onGoHome}
        >
          Start New Audit
        </Button>
      </div>
    </div>
  )
}
