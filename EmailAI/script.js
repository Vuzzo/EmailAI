async function generateEmail() {

  const input = document.getElementById("input").value;
  const tone = document.getElementById("tone").value;

  if (!input) {
    alert("Scrivi qualcosa prima.");
    return;
  }

  document.getElementById("output").innerText = "Generazione in corso...";

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

    document.getElementById("output").innerText = data.email;

  } catch (error) {

    document.getElementById("output").innerText = "Errore durante la generazione.";

    console.error(error);
  }
}