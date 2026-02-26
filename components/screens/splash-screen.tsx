"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete(), 300)
          return 100
        }
        return prev + 1
      })
    }, 40)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-6">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="TrueMileage logo"
            width={280}
            height={168}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Loading Section */}
      <div className="absolute bottom-12 left-6 right-6">
        <div className="flex flex-col items-center">
          {/* Progress Bar */}
          <div className="w-full max-w-xs">
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center text-xs text-gray-500">{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
