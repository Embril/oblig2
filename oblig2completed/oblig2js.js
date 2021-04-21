//model

let contentDiv = document.getElementById('content'); //hjelpevariabel
let stolpeNummer = 'ingen stolpe valgt'; //hjelpevariebel for border
let numbers = [6, 3, 1, 5, 4.5]; //array
let Knapp = 'disabled'; //hjelpevariabel for disabling of knapper

// view

show(); //MVC kjøret
function show() {
  let svgInnerHtml = ''; //variabel som lager stolper = createBar funksjonen
  for (let i = 0; i < numbers.length; i++) {
    //gir en verdi til i
    let barNo = i + 1; //gir en verdi til barNo (barNo = nummer på stolpe)
    let border = 0; //sier at det ikke skal være noen border på noen av stolpene
    if (barNo == stolpeNummer) {
      border = 1;
    }
    svgInnerHtml += createBar(numbers[i], i + 1, border); //svginnerHTML er det samme som Createbar funksjonen men som variabel
  }
  contentDiv.innerHTML = `
      <svg id="chart" width="500" viewBox="0 0 80 60">
          ${svgInnerHtml}
      </svg><br/>
      Valgt stolpe: <i id="textdisplay">${stolpeNummer}</i>
      <br />
      Verdi:
      <input type="number" min="1" max="10" oninput="inputValue = this.value" />
      <button onclick="addStolpe()">Legg til stolpe</button>
      <button onclick="changeStolpe()" ${Knapp}>Endre valgt stolpe</button><br/>
      <button onclick="barDrap()" ${Knapp}>Fjerne valgt stolpe</button>
      `;
} //det som vises på siden

function createBar(number, barNo, border) {
  const width = 8; //width sier hvor brede stolpene skal være
  const spacing = 2; //plassen mellom stolpene
  let x = (barNo - 1) * (width + spacing); //hvor på x aksen stolpen skal begynne
  let height = number * 10; //høyde på stolpene
  let y = 60 - height; //plass på y aksen
  let color = calcColor(1, 10, barNo); //uviktig

  return `<rect onclick="barBorder(${barNo})" width="${width}" height="${height}"
                      x="${x}" y="${y}" fill="${color}"
                      stroke-width="${border}"
                      stroke="black";></rect>`;
  show();
}

function calcColor(min, max, val) {
  var minHue = 240,
    maxHue = 0;
  var curPercent = (val - min) / (max - min);
  var colString =
    'hsl(' + (curPercent * (maxHue - minHue) + minHue) + ',100%,50%)';
  return colString;
}

// controller (ingenting her ennå)

function barBorder(barNo) {
  if (barNo == stolpeNummer) {
    stolpeNummer = 'ingen stolpe er valgt';
    Knapp = 'disabled';
  } else {
    stolpeNummer = barNo;
    Knapp = '';
  }
  show();
}

function barDrap() {
  numbers.splice(stolpeNummer - 1, 1);
  show();
}

function changeStolpe() {
  if (inputValue < 1 || inputValue > 10) {
    alert('ugyldig verdi');
    return inputValue;
  }
  numbers.splice(stolpeNummer - 1, 1, inputValue);
  show();
}

function addStolpe() {
  if (inputValue < 1 || inputValue > 10) {
    alert('ugyldig verdi');
    return inputValue;
  }
  numbers.push(inputValue);
  show();
}
