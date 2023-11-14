let res = document.querySelector("#res");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const incentivo = document.getElementById("incentivo");
const certas = document.getElementById("certas");
const erradas = document.getElementById("erradas");
let scoreElement = document.getElementById("score");
let score = parseInt(scoreElement.innerHTML) || 0;
const listaCertas = [];
const listaErradas = [];
const botao = document.getElementById("botao");
let tempo;

// Adiciona o input ao corpo do documento
const input = document.createElement('input');
input.type = 'text';
input.name = 'entrada';
input.size = 40;

botao.addEventListener("click", () => {
  res.classList.remove("res");
  let input = document.getElementById("entrada").value;

  clearInterval(tempo);

  fetch(`${url}${input}`)
    .then((Response) => Response.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        let palavraEncontrada = listaCertas.includes(input);
        if (palavraEncontrada) {
          incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">${input} já foi inserido. Tente outra!</h3>`;
          document.getElementById('incentivo').style.setProperty("background-color", "yellow");
          // colocar aqui ficando amarelo
        } else {
          incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">A palavra ${input} existe! Mandou bem.</h3>`;
          //colocar aqui ficando verde
          listaCertas.push(input);
          score += 10;
          scoreElement.innerHTML = `<h3 id="score">${score}</h3>`;
          certas.innerHTML = `<p id="certas" class="certas">${listaCertas.join(", ")}</p>`;
        }
      } else {
        let palavraEncontrada = listaErradas.includes(input);
        if (palavraEncontrada) {
          incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">${input} já foi inserido. Tente outra!</h3>`;
          //colocar aqui ficando amarelo
        } else {
          incentivo.innerHTML = `<h3 id="incentivo" class="incentivo">A palavra ${input} não existe! Tente de novo.</h3>`;
          //colocar aqui ficando vermelho
          listaErradas.push(input);
          score -= 2;
          scoreElement.innerHTML = `<h3 id="score">${score}</h3>`;
          erradas.innerHTML = `<p id="erradas" class="erradas">${listaErradas.join(", ")}</p>`;
        }
      }
    });

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
    var soma = parseInt(cronometro, 10);
    soma = isNaN(soma) ? 0 : soma - 1;
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

