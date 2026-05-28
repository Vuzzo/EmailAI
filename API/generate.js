export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { input, tone } = req.body;

  try {

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Sei un assistente che trasforma appunti in email professionali dal tono ${tone}.`
          },
          {
            role: 'user',
            content: input
          }
        ]
      })
    });

    const data = await response.json();

    const email = data.choices[0].message.content;

    res.status(200).json({ email });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Errore server'
    });
  }
}
