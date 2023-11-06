let res = document.querySelector("#res");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const incentivo = document.getElementById("incentivo");
const listaPalavras = []
const botao = document.getElementById("botao");

botao.addEventListener("click", () => { // clica no botão e faz isso
  res.classList.remove("res"); // quando clicar no botão aparece toda a classe
  let input = document.getElementById("entrada").value; // entrada (palavra digitada)
  fetch(`${url}${input}`) // pesquisa a url junto com o input, verifica se a palavra existe
    .then((Response) => Response.json()) //pega o arquivo em json
    .then((data) => { //pega esse dado aqui
      if (Array.isArray(data) && data.length > 0) { // se a lista que ele puxar for maior que 0, significa que existe
        incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">a palavra ${input} existe! mandou bem.</h3>`; //muda no html a frase "paabens"
        listaPalavras.push(" " + input);
        console.log(listaPalavras); // criar uma lista de palavra. (palavras certas e erradas)
      } else { 
        incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">a palavra ${input} não existe! tente de novo.</h3>`;
      }
    });
});
