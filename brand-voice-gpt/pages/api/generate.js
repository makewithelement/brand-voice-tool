
export default async function handler(req, res) {
  const { tone, formal, enthusiasm, industry } = req.body

  const toneText = tone > 70 ? "playful" : tone < 30 ? "serious" : "balanced"
  const formalText = formal > 70 ? "casual" : formal < 30 ? "formal" : "neutral"
  const enthusiasmText = enthusiasm > 70 ? "enthusiastic" : enthusiasm < 30 ? "calm" : "moderate"

  const prompt = `Write a brand voice sentence for a ${industry} brand that is ${toneText}, ${formalText}, and ${enthusiasmText}. Make it short, engaging, and original.`

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 60
    })
  })

  const data = await response.json()
  const message = data.choices?.[0]?.message?.content?.trim() || "No response."
  res.status(200).json({ message })
}
