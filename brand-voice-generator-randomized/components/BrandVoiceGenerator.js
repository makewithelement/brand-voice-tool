
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
  education: "Education",
  other: "Other"
}

const phrases = {
  tech: {
    playful: [
      "We launched something wild – and you're gonna want in. Go play.",
      "Ready to break the internet? So are we. Let's build something epic."
    ],
    serious: [
      "This solution is engineered for performance and scalability.",
      "Cutting-edge infrastructure for ambitious teams."
    ],
    balanced: [
      "Built to scale. Designed to impress.",
      "Where innovation meets clarity – your tech edge starts here."
    ]
  },
  finance: {
    playful: [
      "Budgeting doesn’t have to be boring. Let’s make money make sense.",
      "Save smart. Spend bold. Finance, but fun."
    ],
    serious: [
      "We provide structured solutions to protect and grow your assets.",
      "Trust, stability, and long-term vision in every transaction."
    ],
    balanced: [
      "Financial tools built for people, not spreadsheets.",
      "Clarity and confidence – for every financial move you make."
    ]
  },
  fashion: {
    playful: [
      "Hot drop. Fresh fits. Go flex.",
      "Style shouldn’t be serious – it should be you."
    ],
    serious: [
      "Timeless design. Modern craftsmanship.",
      "Minimal. Luxurious. Made to last."
    ],
    balanced: [
      "Confident, curated looks for every day.",
      "Your signature style starts here."
    ]
  },
  wellness: {
    playful: [
      "Zen, but make it fun. Stretch, smile, repeat.",
      "Feel-good vibes only. Let’s glow."
    ],
    serious: [
      "Holistic support for your mind and body.",
      "Backed by science. Centered on you."
    ],
    balanced: [
      "Wellness that works, for real life.",
      "Daily rituals designed to bring you balance."
    ]
  },
  education: {
    playful: [
      "Learning that doesn’t feel like homework.",
      "Get curious. Stay clever."
    ],
    serious: [
      "Evidence-based education for today’s learners.",
      "Structured programs to elevate your potential."
    ],
    balanced: [
      "Learn clearly, grow confidently.",
      "Smart content. Simple formats. Real impact."
    ]
  },
  other: {
    playful: [
      "Say hey, stay fresh – and keep it real.",
      "Big energy. Small words. Human-first comms."
    ],
    serious: [
      "We bring structure and clarity to your message.",
      "Professional tone with purpose and precision."
    ],
    balanced: [
      "Confident voice. Clear message.",
      "Let’s communicate with style and substance."
    ]
  }
}

const getTone = (value) => {
  if (value > 70) return "playful"
  if (value < 30) return "serious"
  return "balanced"
}

const getRandomPhrase = (industry, toneKey) => {
  const options = phrases[industry][toneKey]
  return options[Math.floor(Math.random() * options.length)]
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

  const toneKey = getTone(sliderValues.tone)
  const phrase = getRandomPhrase(industry, toneKey)

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
        <p>{phrase}</p>
        <button onClick={() => navigator.clipboard.writeText(phrase)} style={{
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
