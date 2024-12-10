const API_KEY = import.meta.env.VITE_API_KEY;

export const getCompletion = async ({ languaje, numberOfWords, text, loadingIndicator, titleElement, copyButton }) => {
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
                prompt: `Redacta un títular completo en ${numberOfWords} palabra/s en ${languaje} a partir de "${text}", no pongas : para comenzar el título, que sea directo"`,
                max_tokens: 30,
                temperature: 0,
            }),
        }
    );

    const data = await response.json();

    titleElement.textContent = data.choices[0].text;

    loadingIndicator.classList.add("hide");
    copyButton.classList.remove("hide");

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(titleElement.textContent);
        alert("Title copied!!!");
    });
}
