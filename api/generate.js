export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { input, tone } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sei un assistente che scrive email professionali semplici e chiare."
          },
          {
            role: "user",
            content: `Scrivi una email con tono ${tone} basata su questo testo:\n${input}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    // 🔥 QUESTO È IL PUNTO CRITICO
    console.log("OPENAI RESPONSE:", data);

    // ❗ SE OPENAI FALLISCE, LO VEDIAMO SUBITO
    if (!response.ok) {
      return res.status(500).json({
        error: "OpenAI request failed",
        details: data
      });
    }

    // 🔥 ESTRAZIONE SICURA
    const email = data?.choices?.[0]?.message?.content;

    if (!email) {
      return res.status(500).json({
        error: "Empty response from OpenAI",
        raw: data
      });
    }

    return res.status(200).json({ email });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
