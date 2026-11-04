"use client"

import { useEffect, useRef } from "react"

export default function AdBanner() {
  const isLoaded = useRef(false)

  useEffect(() => {
    if (isLoaded.current) return
    try {
      if (typeof window !== "undefined") {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        isLoaded.current = true
      }
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [])

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        textAlign: "center",
        minHeight: "90px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "6px",
        }}
      >
        Publicidad
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3381238987477190"
        data-ad-slot="9270280155"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
