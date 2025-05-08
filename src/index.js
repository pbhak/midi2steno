import { Kestrel } from "../dist/kestrel.js";

const currentKey = document.getElementById("pressed-key");
const kestrelOutput = document.getElementById("kestrel");

window.addEventListener("focus", () => start());

async function start() {
  let app = await Kestrel();
  let oldText = "";
  document.addEventListener("keydown", (ev) => {
    app.input.fromQwerty(true, ev.key);
    currentKey.innerText = ev.key;
  });

  document.addEventListener("keyup", (ev) => {
    try {
      app.input.fromQwerty(false, ev.key);
      currentKey.innerText = "";
    } catch (e) {
      console.log("unstable environment detected");
      console.log(e);
    }
  });

  var dict = await (await fetch("../assets/dict.json")).json();

  await app.dictionaries.load(dict);

  await app.output.onData((data) => {
    console.log(data.replace(oldText, ""));
    kestrelOutput.innerText = data.replace(oldText, "");
    oldText = data;
  });
}

start();
// Array.prototype.forEach.call(
//   document.getElementsByClassName("white-key"),
//   (whiteKey) => {
//     whiteKey.addEventListener("mousedown", () => {
//       whiteKey.style.fill = "lightgray";
//       document.getElementById("pressed-key").innerText = whiteKey.id;
//     });

//     whiteKey.addEventListener("mouseup", () => {
//       whiteKey.style.fill = "white";
//       document.getElementById("pressed-key").innerText = "";
//     });

//     whiteKey.addEventListener("mouseleave", () => {
//       whiteKey.style.fill = "white";
//       document.getElementById("pressed-key").innerText = "";
//     });
//   }
// );

// Array.prototype.forEach.call(
//   document.getElementsByClassName("black-key"),
//   (blackKey) => {
//     blackKey.addEventListener("mousedown", () => {
//       blackKey.style.fill = "darkgray";
//       document.getElementById("pressed-key").innerText = blackKey.id;
//     });

//     blackKey.addEventListener("mouseup", () => {
//       blackKey.style.fill = "black";
//       document.getElementById("pressed-key").innerText = "";
//     });

//     blackKey.addEventListener("mouseleave", () => {
//       blackKey.style.fill = "black";
//       document.getElementById("pressed-key").innerText = "";
//     });
//   }
// );
