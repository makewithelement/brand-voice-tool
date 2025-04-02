
import { useState } from "react"

const sliders = [
  { id: "tone", label: "Serious ↔ Playful" },
  { id: "formal", label: "Formal ↔ Casual" },
  { id: "enthusiasm", label: "Calm ↔ Enthusiastic" },
  { id: "clarity", label: "Detailed ↔ Concise" },
  { id: "voice", label: "Professional ↔ Friendly" }
]


const generateVoice = (values) => {
  const tone = values.tone > 70 ? "playful" : values.tone < 30 ? "serious" : "balanced";
  const formal = values.formal > 70 ? "very casual" : values.formal < 30 ? "very formal" : "somewhat formal";
  const enthusiasm = values.enthusiasm > 70 ? "high-energy and excited" : values.enthusiasm < 30 ? "calm and reserved" : "moderately enthusiastic";
  const clarity = values.clarity > 70 ? "very concise" : values.clarity < 30 ? "highly detailed" : "clear but balanced";
  const voice = values.voice > 70 ? "super friendly and personal" : values.voice < 30 ? "professional and neutral" : "approachable";

  return `Hey there! This is a ${tone}, ${formal} message. It's written in a ${voice} tone, is ${enthusiasm}, and aims to be ${clarity}.`;
}

  const tone = values.tone > 50 ? "playful" : "serious"
  const formal = values.formal > 50 ? "casual" : "formal"
  const enthusiasm = values.enthusiasm > 50 ? "enthusiastic" : "calm"
  const clarity = values.clarity > 50 ? "concise" : "detailed"
  const voice = values.voice > 50 ? "friendly" : "professional"

  return `Hi there! This is a ${tone}, ${formal}, and ${enthusiasm} message written in a ${voice} tone, aiming to be ${clarity}.`
}

export default function BrandVoiceGenerator() {
  const [darkMode, setDarkMode] = useState(true)
  const [sliderValues, setSliderValues] = useState({
    tone: 50,
    formal: 50,
    enthusiasm: 50,
    clarity: 50,
    voice: 50
  })

  const handleChange = (id, value) => {
    setSliderValues(prev => ({
      ...prev,
      [id]: Number(value)
    }))
  }

  const bg = darkMode ? "#121212" : "#fff"
  const text = darkMode ? "#f1f1f1" : "#111"
  const border = darkMode ? "#444" : "#ccc"

  return (
    <div style={{
      maxWidth: "700px",
      margin: "2rem auto",
      padding: "2rem",
      background: bg,
      color: text,
      borderRadius: "1rem",
      fontFamily: "sans-serif",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>🗣 Brand Voice Generator</h1>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
      <div>
        <label>Presets:</label>
        <select onChange={(e) => {
          const preset = JSON.parse(e.target.value)
          setSliderValues(preset)
        }} style={{
          marginLeft: "0.5rem",
          padding: "0.4rem",
          borderRadius: "0.4rem"
        }}>
          <option value="">Select a preset</option>
          <option value='{"tone":20,"formal":80,"enthusiasm":30,"clarity":60,"voice":30}'>Corporate</option>
          <option value='{"tone":80,"formal":30,"enthusiasm":80,"clarity":50,"voice":80}'>Startup</option>
          <option value='{"tone":50,"formal":50,"enthusiasm":50,"clarity":50,"voice":50}'>Balanced</option>
        </select>
      </div>
      <button onClick={() => setDarkMode(!darkMode)} style={{
        marginBottom: "2rem",
        padding: "0.5rem 1rem",
        background: "transparent",
        color: text,
        border: `1px solid ${border}`,
        borderRadius: "0.5rem"
      }}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button></div>

      {sliders.map(slider => (
        <div key={slider.id} style={{ marginBottom: "1.5rem" }}>
          <label htmlFor={slider.id}>{slider.label}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValues[slider.id]}
            onChange={(e) => handleChange(slider.id, e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      ))}

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        background: darkMode ? "#1e1e1e" : "#f9f9f9",
        borderRadius: "0.5rem",
        border: `1px solid ${border}`
      }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Example Brand Voice</h3>
        <p>{generateVoice(sliderValues)}</p>
      <button onClick={() => navigator.clipboard.writeText(generateVoice(sliderValues))} style={{
        marginTop: "1rem",
        padding: "0.4rem 0.8rem",
        background: "#0070f3",
        color: "#fff",
        border: "none",
        borderRadius: "0.4rem",
        cursor: "pointer"
      }}>
        Copy
      </button>
      </div>
    </div>
  )
}
