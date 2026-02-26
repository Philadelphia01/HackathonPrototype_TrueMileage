"use client"

import { useState } from "react"
import { PhoneFrame } from "@/components/phone-frame"
import { SplashScreen } from "@/components/screens/splash-screen"
import { WelcomeScreen } from "@/components/screens/welcome-screen"
import { VinEntryScreen } from "@/components/screens/vin-entry-screen"
import { EngineRecordingScreen } from "@/components/screens/engine-recording-screen"
import { EngineAnalysisScreen } from "@/components/screens/engine-analysis-screen"
import { ListingVerificationScreen } from "@/components/screens/listing-verification-screen"
import { DashboardReportScreen } from "@/components/screens/dashboard-report-screen"
import { PastAuditsScreen } from "@/components/screens/past-audits-screen"
import { Home, ClipboardList, Search, User } from "lucide-react"

type Screen =
  | "splash"
  | "welcome"
  | "vin-entry"
  | "engine-recording"
  | "engine-analysis"
  | "listing-verification"
  | "dashboard-report"
  | "past-audits"

export default function TrueMileageApp() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [vin, setVin] = useState("")

  const showBottomNav = screen !== "welcome" && screen !== "splash"

  const navItems = [
    { icon: Home, label: "Home", screen: "welcome" as Screen },
    { icon: Search, label: "Audit", screen: "vin-entry" as Screen },
    { icon: ClipboardList, label: "History", screen: "past-audits" as Screen },
    { icon: User, label: "Profile", screen: "past-audits" as Screen },
  ]

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <div className={`flex-1 overflow-y-auto ${showBottomNav ? "pb-0" : ""}`}>
          {screen === "splash" && (
            <SplashScreen onComplete={() => setScreen("welcome")} />
          )}
          {screen === "welcome" && (
            <WelcomeScreen
              onStartAudit={() => setScreen("vin-entry")}
              onLearnMore={() => setScreen("past-audits")}
            />
          )}
          {screen === "vin-entry" && (
            <VinEntryScreen
              onBack={() => setScreen("welcome")}
              onProceed={(v) => {
                setVin(v)
                setScreen("engine-recording")
              }}
            />
          )}
          {screen === "engine-recording" && (
            <EngineRecordingScreen
              vin={vin}
              onBack={() => setScreen("vin-entry")}
              onAnalysisComplete={() => setScreen("engine-analysis")}
            />
          )}
          {screen === "engine-analysis" && (
            <EngineAnalysisScreen
              onBack={() => setScreen("engine-recording")}
              onProceed={() => setScreen("listing-verification")}
            />
          )}
          {screen === "listing-verification" && (
            <ListingVerificationScreen
              onBack={() => setScreen("engine-analysis")}
              onProceed={() => setScreen("dashboard-report")}
            />
          )}
          {screen === "dashboard-report" && (
            <DashboardReportScreen
              vin={vin}
              onBack={() => setScreen("listing-verification")}
              onGoHome={() => {
                setVin("")
                setScreen("welcome")
              }}
            />
          )}
          {screen === "past-audits" && (
            <PastAuditsScreen
              onBack={() => setScreen("welcome")}
              onStartNew={() => setScreen("vin-entry")}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <nav className="flex items-center justify-around border-t border-border bg-background px-2 py-2" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                screen === item.screen ||
                (item.label === "Audit" && ["vin-entry", "engine-recording", "engine-analysis", "listing-verification", "dashboard-report"].includes(screen))
              return (
                <button
                  key={item.label}
                  onClick={() => setScreen(item.screen)}
                  className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors ${
                    isActive
                      ? "text-tm-green"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="size-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        )}
      </div>
    </PhoneFrame>
  )
}
