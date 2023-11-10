let res = document.querySelector("#res");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const incentivo = document.getElementById("incentivo");
const certas = document.getElementById("certas");
const erradas = document.getElementById("erradas");
let score = parseInt(scoreElement.innerHTML);

const listaCertas = [];
const listaErradas = [];
const botao = document.getElementById("botao");
let tempo; // Declare the tempo variable

botao.addEventListener("click", () => {
  res.classList.remove("res");
  let input = document.getElementById("entrada").value;

  // Clear previous timer before starting a new one
  clearInterval(tempo);

  fetch(`${url}${input}`)
    .then((Response) => Response.json())
    .then((data) => {
      let score = parseInt(scoreElement.innerHTML); // Parse the current score from the HTML

      if (Array.isArray(data) && data.length > 0) {
        let palavraEncontrada = listaCertas.includes(input);
        if (palavraEncontrada) {
          incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">${input} já foi inserido. Tente outra!</h3>`;
        } else {
          incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">A palavra ${input} existe! Mandou bem.</h3>`;
          listaCertas.push(input);
          parseInt(score += 10); // Increment the score by 10
          scoreElement.innerHTML = `<h3 id="score">${score}</h3>`;
          certas.innerHTML = `<p id="certas" class="certas">${listaCertas.join(", ")}</p>`;
        }
      } else {
        let palavraEncontrada = listaErradas.includes(input);
        if (palavraEncontrada) {
          incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">${input} já foi inserido. Tente outra!</h3>`;
        } else {
          incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">A palavra ${input} não existe! Tente de novo.</h3>`;
          listaErradas.push(input);
          parseInt(score -= 2); // Decrement the score by 2
          scoreElement.innerHTML = `<h3 id="score">${score}</h3>`;
          erradas.innerHTML = `<p id="erradas" class="erradas">${listaErradas.join(", ")}</p>`;
        }
      }
    });

  // Start the countdown timer after fetching data
  contagem();
});

document.getElementById("botao").addEventListener("click", function () {
  if (!tempo) {
    contagem();
  }
});

function contagem() {
  tempo = setInterval(function () {
    var cronometro = document.getElementById('tempo').innerHTML;
    var soma = parseInt(cronometro) - 1;
    if (soma === 0) {
      document.getElementById('tempo').innerHTML = "Tempo esgotado";
      pararcontagem();
    } else {
      document.getElementById('tempo').innerHTML = soma;
    }
  }, 2000);
}

function pararcontagem() {
  clearInterval(tempo);
}
