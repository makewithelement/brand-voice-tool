
import { useState } from "react"

const sliders = [
  { id: "tone", label: "Serious ↔ Playful" },
  { id: "formal", label: "Formal ↔ Casual" },
  { id: "enthusiasm", label: "Calm ↔ Enthusiastic" },
  { id: "clarity", label: "Detailed ↔ Concise" },
  { id: "voice", label: "Professional ↔ Friendly" }
]

const industries = {
  tech: "Tech Startup",
  finance: "Finance",
  fashion: "Fashion Brand",
  wellness: "Wellness & Health",
  education: "Education"
}

const generateVoiceExamples = (values, industry) => {
  const tone = values.tone > 70 ? "playful" : values.tone < 30 ? "serious" : "balanced"
  const formal = values.formal > 70 ? "casual" : values.formal < 30 ? "formal" : "neutral"
  const enthusiasm = values.enthusiasm > 70 ? "enthusiastic" : values.enthusiasm < 30 ? "calm" : "moderate"
  const clarity = values.clarity > 70 ? "concise" : values.clarity < 30 ? "detailed" : "clear"
  const voice = values.voice > 70 ? "friendly" : values.voice < 30 ? "professional" : "approachable"

  const examples = {
    tech: [
      \`Hey! Ready to change the game? Our \${industry} just dropped something epic!\`,
      \`Discover our latest innovation – designed for simplicity and speed.\`
    ],
    finance: [
      \`We value your trust. Our advisors are here to support your goals.\`,
      \`Your future deserves a secure strategy. We're here to help.\`
    ],
    fashion: [
      \`Step into the season in style – effortless, elegant, iconic.\`,
      \`This drop? All you. Bold looks, easy fits.\`
    ],
    wellness: [
      \`Breathe in, breathe out – wellness is a journey, and we’re here for every step.\`,
      \`Empower your mind and body with rituals designed for balance.\`
    ],
    education: [
      \`Your learning experience, reimagined. Explore new ways to grow.\`,
      \`Clarity meets inspiration – start your learning journey today.\`
    ]
  }

  return examples[industry].map((e, i) => \`\${e} (\${tone}, \${formal}, \${enthusiasm}, \${voice}, \${clarity})\`)
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
  const [industry, setIndustry] = useState("tech")

  const bg = darkMode ? "#121212" : "#fff"
  const text = darkMode ? "#f1f1f1" : "#111"
  const border = darkMode ? "#444" : "#ccc"

  return (
    <div style={{
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "2rem",
      background: bg,
      color: text,
      borderRadius: "1rem",
      fontFamily: "sans-serif",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>🗣 Brand Voice Generator</h1>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
      }}>
        <div>
          <label style={{ marginRight: "0.5rem" }}>Industry:</label>
          <select onChange={(e) => setIndustry(e.target.value)} value={industry} style={{
            padding: "0.4rem",
            borderRadius: "0.4rem"
          }}>
            {Object.entries(industries).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} style={{
          padding: "0.5rem 1rem",
          background: "transparent",
          color: text,
          border: \`1px solid \${border}\`,
          borderRadius: "0.5rem"
        }}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {sliders.map(slider => (
        <div key={slider.id} style={{ marginBottom: "1.2rem" }}>
          <label htmlFor={slider.id}>{slider.label}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValues[slider.id]}
            onChange={(e) =>
              setSliderValues(prev => ({ ...prev, [slider.id]: Number(e.target.value) }))
            }
            style={{ width: "100%" }}
          />
        </div>
      ))}

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        background: darkMode ? "#1e1e1e" : "#f9f9f9",
        borderRadius: "0.5rem",
        border: \`1px solid \${border}\`
      }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Example Brand Voice ({industries[industry]})</h3>
        <ul>
          {generateVoiceExamples(sliderValues, industry).map((line, i) => (
            <li key={i} style={{ marginBottom: "0.5rem" }}>{line}</li>
          ))}
        </ul>
        <button onClick={() => navigator.clipboard.writeText(generateVoiceExamples(sliderValues, industry).join("\n"))} style={{
          marginTop: "1rem",
          padding: "0.4rem 0.8rem",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "0.4rem",
          cursor: "pointer"
        }}>
          Copy All
        </button>
      </div>
    </div>
  )
}
