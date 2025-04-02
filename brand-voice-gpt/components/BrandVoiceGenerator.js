
import { useState } from "react"

const sliders = [
  { id: "tone", label: "Serious ↔ Playful" },
  { id: "formal", label: "Formal ↔ Casual" },
  { id: "enthusiasm", label: "Calm ↔ Enthusiastic" }
]

const industries = {
  tech: "Tech Startup",
  finance: "Finance",
  fashion: "Fashion Brand",
  wellness: "Wellness & Health",
  education: "Education",
  other: "Other"
}

export default function BrandVoiceGenerator() {
  const [darkMode, setDarkMode] = useState(true)
  const [sliderValues, setSliderValues] = useState({ tone: 50, formal: 50, enthusiasm: 50 })
  const [industry, setIndustry] = useState("tech")
  const [generated, setGenerated] = useState("")
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...sliderValues, industry })
    })
    const data = await res.json()
    setGenerated(data.message)
    setLoading(false)
  }

  const bg = darkMode ? "#121212" : "#fff"
  const text = darkMode ? "#f1f1f1" : "#111"
  const border = darkMode ? "#444" : "#ccc"

  return (
    <div style={{
      maxWidth: "800px", margin: "2rem auto", padding: "2rem",
      background: bg, color: text, borderRadius: "1rem", fontFamily: "sans-serif"
    }}>
      <h1>🗣 Brand Voice Generator (AI)</h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div>
          <label>Select Industry: </label>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ padding: "0.4rem" }}>
            {Object.entries(industries).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} style={{
          padding: "0.5rem 1rem", background: "transparent", color: text, border: `1px solid ${border}`,
          borderRadius: "0.5rem"
        }}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {sliders.map(slider => (
        <div key={slider.id} style={{ marginBottom: "1.2rem" }}>
          <label>{slider.label}</label>
          <input type="range" min="0" max="100" value={sliderValues[slider.id]}
            onChange={(e) => setSliderValues(prev => ({ ...prev, [slider.id]: Number(e.target.value) }))}
            style={{ width: "100%" }}
          />
        </div>
      ))}

      <button onClick={generate} disabled={loading} style={{
        marginTop: "1rem", padding: "0.6rem 1.2rem", fontSize: "1rem",
        background: "#0070f3", color: "#fff", border: "none", borderRadius: "0.4rem"
      }}>
        {loading ? "Generating..." : "Generate with AI"}
      </button>

      {generated && (
        <div style={{
          marginTop: "2rem", padding: "1rem",
          background: darkMode ? "#1e1e1e" : "#f3f3f3", borderRadius: "0.5rem"
        }}>
          <h3>Generated Message</h3>
          <p>{generated}</p>
        </div>
      )}
    </div>
  )
}
