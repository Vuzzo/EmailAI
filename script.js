async function generateEmail() {
  const input = document.getElementById("input").value;
  const tone = document.getElementById("tone").value;
  const output = document.getElementById("output");

  if (!input) {
    alert("Scrivi qualcosa prima");
    return;
  }

  output.innerText = "Generazione in corso...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: input,
        tone: tone
      })
    });

    const data = await response.json();

    if (data.email) {
      output.innerText = data.email;
    } else {
      output.innerText = "Errore: nessuna email ricevuta";
    }

  } catch (error) {
    console.error(error);
    output.innerText = "Errore durante la generazione";
  }
}
