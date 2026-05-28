export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { input, tone } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
  }

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
            content: "Sei un assistente che trasforma appunti in email professionali chiare, utili e ben scritte."
          },
          {
            role: "user",
            content: `Scrivi un'email dal tono ${tone} basata su questi appunti:\n\n${input}`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    const email = data?.choices?.[0]?.message?.content;

    return res.status(200).json({ email });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
