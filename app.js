let calculationArray = [];
let result = 0;
let currentNum = "";

$("body").keydown(function (event) {
  if (!$("#inputField").is(":focus")) {
    if (event.key == "+") {
      $("#addBtn").click();
    } else if (event.key == "-") {
      $("#subBtn").click();
    } else if (event.key == "=" || event.key == "Enter") {
      $("#equalBtn").click();
    } else {
      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105)
      ) {
        $("#inputField").val(function (i, val) {
          return val + event.key;
        });
        $("#resultText").addClass("fadeOut");
        $("#resultText").removeClass("textFadeInFlash");
        $("#calculationText").removeClass("fadeIn");
        console.log(currentNum);
      }
    }
  }
});

$("#contentContainer").mouseover(function () {
  $("button").css("margin-right", "0.3em");
});
$("#contentContainer").mouseout(function () {
  $("button").css("margin-right", "0.0em");
});

$("#addBtn").click(function () {
  if ($("#inputField").val() != "" || isNaN($("#inputField").val())) {
    if (calculationArray.length != 0) {
      $("#calculationText").append("+" + $("#inputField").val());
    } else {
      $("#calculationText").append($("#inputField").val());
    }
    calculationArray.push($("#inputField").val());
  }
  $("#inputField").val("");
  $("#resultText").text("");
  $("#calculationText").removeClass("fadeOut");
  $("#calculationText").addClass("fadeIn");
  currentNum = "";
});

$("#subBtn").click(function () {
  if ($("#inputField").val() != "") {
    $("#calculationText").append("-" + $("#inputField").val());
    calculationArray.push("-" + $("#inputField").val());
  }
  $("#inputField").val("");
  $("#resultText").text("");
  $("#calculationText").removeClass("fadeOut");
  $("#calculationText").addClass("fadeIn");
  currentNum = "";
});

$("#equalBtn").click(function () {
  $("#resultText").removeClass("fadeOut");
  if (calculationArray.length != 0) {
    calculationArray.forEach((element) => {
      console.log(element);
      result += parseInt(element);
    });
    $("#resultText").addClass("textFadeInFlash");
    $("#resultText").append(result);
  }

  calculationArray = [];
  $("#calculationText").removeClass("fadeIn");
  $("#calculationText").addClass("fadeOut");
  $("#calculationText").text("");
  result = 0;
  currentNum = "";
});

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let w;
let h;

const setCanvasExtents = () => {
  w = document.body.clientWidth;
  h = document.body.clientHeight;
  canvas.width = w;
  canvas.height = h;
};

setCanvasExtents();

window.onresize = () => {
  setCanvasExtents();
};

const makeStars = (count) => {
  const out = [];
  for (let i = 0; i < count; i++) {
    const s = {
      x: Math.random() * 1600 - 800,
      y: Math.random() * 900 - 450,
      z: Math.random() * 1000,
    };
    out.push(s);
  }
  return out;
};

let stars = makeStars(5000);

const clear = () => {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const putPixel = (x, y, brightness) => {
  const intensity = brightness * 255;
  const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
  c.fillStyle = rgb;
  c.fillRect(x, y, 1, 1);
};

const moveStars = (distance) => {
  const count = stars.length;
  for (var i = 0; i < count; i++) {
    const s = stars[i];
    s.z -= distance;
    while (s.z <= 1) {
      s.z += 1000;
    }
  }
};

let prevTime;
const init = (time) => {
  prevTime = time;
  requestAnimationFrame(tick);
};

const tick = (time) => {
  let elapsed = time - prevTime;
  prevTime = time;

  moveStars(elapsed * 0.1);

  clear();

  const cx = w / 2;
  const cy = h / 2;

  const count = stars.length;
  for (var i = 0; i < count; i++) {
    const star = stars[i];

    const x = cx + star.x / (star.z * 0.001);
    const y = cy + star.y / (star.z * 0.001);

    if (x < 0 || x >= w || y < 0 || y >= h) {
      continue;
    }

    const d = star.z / 1000.0;
    const b = 1 - d * d;

    putPixel(x, y, b);
  }

  requestAnimationFrame(tick);
};

requestAnimationFrame(init);
