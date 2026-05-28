async function generateEmail() {
  const input = document.getElementById("input").value;
  const tone = document.getElementById("tone").value;
  const output = document.getElementById("output");

  output.innerText = "Generazione in corso...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input,
        tone
      })
    });

    const data = await response.json();

    // 🔥 QUESTO È IL PUNTO CHIAVE
    console.log("RISPOSTA BACKEND COMPLETA:", data);

    // MOSTRA TUTTO TEMPORANEAMENTE
    output.innerText = JSON.stringify(data, null, 2);

  } catch (error) {
    console.error(error);
    output.innerText = "Errore di rete o server";
  }
}
