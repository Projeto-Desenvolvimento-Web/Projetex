let res = document.querySelector("#res");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const incentivo = document.getElementById("incentivo");
const listaPalavras = []
const botao = document.getElementById("botao");

botao.addEventListener("click", () => {
  res.classList.remove("res");
  let input = document.getElementById("entrada").value;
  fetch(`${url}${input}`)
    .then((Response) => Response.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">a palavra ${input} existe! mandou bem.</h3>`; 
        listaPalavras.push(" " + input);
        console.log(listaPalavras);
      } else {
        incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">a palavra ${input} não existe! tente de novo.</h3>`;
      }
    });
});
