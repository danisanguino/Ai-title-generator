const generateButton = document.getElementById("generateButton");
const loadingIndicator = document.getElementById("loading");

const API_KEY = import.meta.env.VITE_API_KEY;

generateButton.addEventListener("click", (event) => {
  const languaje = document.getElementById("languaje").value;
  const numberOfWords = document.getElementById("numberOfWords").value;
  const text = document.getElementById("text").value;

  event.preventDefault();

  if (!languaje) {
    return alert("Please fill the languaje");
  } else if (!numberOfWords) {
    return alert("Please fill the number of words");
  } else if (!text) {
    return alert("Please fill the text to generate the title");
  }

  async function getCompletion() {

    loadingIndicator.classList.remove("hide");

    const response = await fetch(
      "https://api.openai.com/v1/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          prompt: `Redacta un títular completo en ${numberOfWords} palabra/s en ${languaje} a partir de "${text}, no pongas : para comenzar el título, que sea directo"`,
          max_tokens: 30,
          temperature: 0,
        }),
      }
    );

    const data = await response.json();

    const title = document.getElementById("title-generated");
    title.textContent = data.choices[0].text;

    loadingIndicator.classList.add("hide");


    const copyButton = document.getElementById("copy-title");
    copyButton.classList.remove("hide");


    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(title.textContent);
      alert("Title copied!!!")
    });
  }

  getCompletion();
});
