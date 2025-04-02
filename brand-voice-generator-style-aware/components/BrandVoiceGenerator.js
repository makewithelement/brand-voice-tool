
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

const getStyleKey = ({ tone, formal, enthusiasm }) => {
  const toneKey = tone > 70 ? "playful" : tone < 30 ? "serious" : "neutral"
  const formalKey = formal > 70 ? "casual" : formal < 30 ? "formal" : "neutral"
  const energyKey = enthusiasm > 70 ? "high" : enthusiasm < 30 ? "low" : "medium"
  return `${toneKey}-${formalKey}-${energyKey}`
}

const sentences = {
  tech: {
    "playful-casual-high": [
      "Boom! Just launched the next big thing. Wanna play?",
      "This tech is fire – no gatekeeping, just innovation."
    ],
    "serious-formal-low": [
      "We provide robust, enterprise-grade solutions built to scale.",
      "Delivering reliable infrastructure for mission-critical applications."
    ],
    "neutral-neutral-medium": [
      "Innovation meets simplicity. Explore what’s next.",
      "Smart. Scalable. Ready when you are."
    ]
  },
  finance: {
    "playful-casual-high": [
      "Money talks – let’s make it sing. Finance made fun.",
      "Invest with vibes and vision. Let's grow together."
    ],
    "serious-formal-low": [
      "Preserving wealth through strategic financial planning.",
      "Your financial future is our priority. Trusted. Structured. Secure."
    ],
    "neutral-neutral-medium": [
      "Clarity in every number. Confidence in every step.",
      "Tools to manage your money, your way."
    ]
  },
  fashion: {
    "playful-casual-high": [
      "This drop? It’s a vibe. Loud, proud, and wearable.",
      "Fresh fits. Big drip. Let's turn heads."
    ],
    "serious-formal-low": [
      "Understated luxury for elevated living.",
      "Crafted with care. Designed for impact."
    ],
    "neutral-neutral-medium": [
      "Your style, refined. Your look, defined.",
      "Simple. Modern. Unmistakably you."
    ]
  },
  wellness: {
    "playful-casual-high": [
      "Let’s vibe and thrive. Your glow-up starts here.",
      "Breathwork meets hype. Wellness, but fun."
    ],
    "serious-formal-low": [
      "Evidence-based methods for mind-body alignment.",
      "Structured support for sustainable self-care."
    ],
    "neutral-neutral-medium": [
      "Balance, clarity, and everyday rituals.",
      "Real wellness. Real life. Real results."
    ]
  },
  education: {
    "playful-casual-high": [
      "Learning should spark joy – and maybe a meme or two.",
      "Smart feels good. Grow wild."
    ],
    "serious-formal-low": [
      "Curriculum rooted in research. Results driven by clarity.",
      "Structured programs to elevate your potential."
    ],
    "neutral-neutral-medium": [
      "Clarity meets curiosity. Learn your way.",
      "Flexible, modern education for every learner."
    ]
  },
  other: {
    "playful-casual-high": [
      "Let’s talk like humans – bold, clear, and a bit cheeky.",
      "Say less, mean more. Let’s keep it real."
    ],
    "serious-formal-low": [
      "Structured communication for professional contexts.",
      "Clear, direct messaging for mission-driven teams."
    ],
    "neutral-neutral-medium": [
      "Modern voice. Focused message. Friendly tone.",
      "Strong, calm, and easy to understand."
    ]
  }
}

const getSentence = (industry, values) => {
  const key = getStyleKey(values)
  const options = sentences[industry]?.[key] || sentences["other"]["neutral-neutral-medium"]
  return options[Math.floor(Math.random() * options.length)]
}

export default function BrandVoiceGenerator() {
  const [darkMode, setDarkMode] = useState(true)
  const [sliderValues, setSliderValues] = useState({
    tone: 50,
    formal: 50,
    enthusiasm: 50
  })
  const [industry, setIndustry] = useState("tech")

  const bg = darkMode ? "#121212" : "#fff"
  const text = darkMode ? "#f1f1f1" : "#111"
  const border = darkMode ? "#444" : "#ccc"

  const sentence = getSentence(industry, sliderValues)

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
          <label style={{ marginRight: "0.5rem" }}>Select Industry:</label>
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
          border: `1px solid ${border}`,
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
        border: `1px solid ${border}`
      }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Generated Brand Voice</h3>
        <p>{sentence}</p>
        <button onClick={() => navigator.clipboard.writeText(sentence)} style={{
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
