import { getCompletion } from "./utils/api.js";


const generateButton = document.getElementById("generateButton");
const loadingIndicator = document.getElementById("loading");

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

    const titleElement = document.getElementById("title-generated");
    const copyButton = document.getElementById("copy-title");

    getCompletion({ languaje, numberOfWords, text, loadingIndicator, titleElement, copyButton });
});
