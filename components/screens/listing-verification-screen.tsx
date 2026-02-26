"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, Link2, CheckCircle2, XCircle, Search, Loader2 } from "lucide-react"

interface ListingVerificationScreenProps {
  onBack: () => void
  onProceed: () => void
}

const mockResults = [
  { label: "Year / Make / Model", listed: "2020 Honda Accord", verified: true },
  { label: "Mileage", listed: "45,200 mi", verified: true },
  { label: "Title Status", listed: "Clean", verified: true },
  { label: "Accident History", listed: "No accidents", verified: false, flag: "1 accident found in records" },
  { label: "Service Records", listed: "Full service history", verified: true },
  { label: "Number of Owners", listed: "1 owner", verified: true },
]

export function ListingVerificationScreen({ onBack, onProceed }: ListingVerificationScreenProps) {
  const [url, setUrl] = useState("")
  const [state, setState] = useState<"idle" | "scanning" | "done">("idle")

  const handleScan = () => {
    if (!url.trim()) return
    setState("scanning")
  }

  useEffect(() => {
    if (state === "scanning") {
      const timeout = setTimeout(() => setState("done"), 2500)
      return () => clearTimeout(timeout)
    }
  }, [state])

  const verifiedCount = mockResults.filter((r) => r.verified).length
  const flaggedCount = mockResults.filter((r) => !r.verified).length

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
          <h1 className="text-lg font-semibold text-foreground">Listing Verification</h1>
          <p className="text-xs text-muted-foreground">AI-powered listing analysis</p>
        </div>
      </div>

      {/* URL Input */}
      <div className="px-6 pt-6">
        <label className="mb-2 block text-sm font-medium text-foreground">
          Paste Listing URL
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.cars.com/listing/..."
              className="h-11 rounded-xl pl-9"
              disabled={state !== "idle"}
            />
          </div>
          <Button
            className="h-11 rounded-xl bg-tm-blue text-[#FFFFFF] hover:bg-tm-blue/90 px-4"
            onClick={handleScan}
            disabled={state !== "idle" || !url.trim()}
          >
            {state === "scanning" ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          </Button>
        </div>

        {/* Quick demo URL */}
        {state === "idle" && (
          <button
            onClick={() => setUrl("https://www.cars.com/listing/2020-honda-accord")}
            className="mt-2 text-xs text-tm-blue hover:underline"
          >
            Use demo listing URL
          </button>
        )}
      </div>

      {/* Scanning state */}
      {state === "scanning" && (
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="size-12 animate-spin rounded-full border-4 border-tm-blue border-t-transparent" />
          <p className="mt-4 text-sm font-medium text-foreground">Analyzing listing...</p>
          <p className="mt-1 text-xs text-muted-foreground">Cross-referencing vehicle data</p>
        </div>
      )}

      {/* Results */}
      {state === "done" && (
        <div className="flex-1 px-6 pt-4 pb-4">
          {/* Summary badges */}
          <div className="mb-4 flex gap-3">
            <div className="flex-1 rounded-lg bg-tm-green/10 p-3 text-center">
              <p className="text-2xl font-bold text-tm-green">{verifiedCount}</p>
              <p className="text-xs text-tm-green font-medium">Verified</p>
            </div>
            <div className="flex-1 rounded-lg bg-tm-danger/10 p-3 text-center">
              <p className="text-2xl font-bold text-tm-danger">{flaggedCount}</p>
              <p className="text-xs text-tm-danger font-medium">Flagged</p>
            </div>
          </div>

          {/* Individual results */}
          <h2 className="mb-3 text-sm font-semibold text-foreground">Audit Results</h2>
          <div className="flex flex-col gap-2">
            {mockResults.map((result) => (
              <div
                key={result.label}
                className={`flex items-start gap-3 rounded-lg p-3 ${
                  result.verified ? "bg-secondary" : "bg-tm-danger/5 border border-tm-danger/15"
                }`}
              >
                {result.verified ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-tm-green" />
                ) : (
                  <XCircle className="mt-0.5 size-5 shrink-0 text-tm-danger" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{result.label}</p>
                  <p className="text-xs text-muted-foreground">Listed: {result.listed}</p>
                  {result.flag && (
                    <p className="mt-1 text-xs font-medium text-tm-danger">{result.flag}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {state === "done" && (
        <div className="px-6 pb-6 pt-2">
          <Button
            size="lg"
            className="w-full bg-tm-green text-[#FFFFFF] hover:bg-tm-green/90 h-12 text-base font-semibold rounded-xl"
            onClick={onProceed}
          >
            View Full Report
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
