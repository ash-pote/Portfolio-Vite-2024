// Copy email to clipboard
// Universal  Copy function
const copyClipboard = function () {
  // create new element to copy string value 'poteashleigh@gmail.com
  let emailEl = document.createElement("textarea");
  emailEl.value = "poteashleigh@gmail.com";
  // Set non-editable to avoid focus and move outside of view
  emailEl.setAttribute("readonly", "");
  emailEl.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(emailEl);

  // Select text inside element
  emailEl.select();
  // Copy text to clipboard
  document.execCommand("copy");
  // Remove temporary element
  document.body.removeChild(emailEl);
};

// Desktop email copy
const tooltip = document.getElementById("myTooltip");

const copyFunctionDesktop = function () {
  copyClipboard();
  tooltip.innerHTML = "Email copied";
};

const outFunctionDesktop = function () {
  copyClipboard();
  tooltip.innerHTML = "Copy to clipboard";
};

// Desktop email footer copy
const footerTooltip = document.getElementById("myTooltip-footer");

const copyFunctionFooter = function () {
  copyClipboard();
  footerTooltip.innerHTML = "Email copied";
};

const outFunctionFooter = function () {
  copyClipboard();
  footerTooltip.innerHTML = "Copy to clipboard";
};

// Mobile email copy
const tooltipMobile = document.getElementById("mobile-tooltip");

const copyFunctionMobile = function () {
  tooltipMobile.style.display = "block";
  copyClipboard();

  // hide tooltip after 2 seconds
  setTimeout(function () {
    document.getElementById("mobile-tooltip").style.display = "none";
  }, 2000);
};
/////////////////////////////////////////////////

// texture background
// if Safari disable
const canvasTag = document.querySelector("#texture_canvas");
if (
  (navigator.userAgent.indexOf("Safari") != -1 &&
    navigator.userAgent.indexOf("Chrome") == -1) ||
  window.innerWidth < 900
) {
  canvasTag.classList.add("display-none");
  // alert('Its Safari');
} else {
  canvasTag.classList.remove("display-none");
}

// canvas
// Resource: https://codepen.io/zadvorsky/pen/PwyoMm
let viewWidth,
  viewHeight,
  canvas = document.getElementById("texture_canvas"),
  ctx;
// change these settings
let patternSize = 84,
  patternScaleX = 3,
  patternScaleY = 2,
  patternRefreshInterval = 4,
  patternAlpha = 31; // int between 0 and 255,
let patternPixelDataLength = patternSize * patternSize * 4,
  patternCanvas,
  patternCtx,
  patternData,
  frame = 0;
window.onload = function () {
  initCanvas();
  initGrain();
  requestAnimationFrame(loop);
};
// create a canvas which will render the grain
function initCanvas() {
  viewWidth = canvas.width = canvas.clientWidth;
  viewHeight = canvas.height = canvas.clientHeight;
  ctx = canvas.getContext("2d");
  ctx.scale(patternScaleX, patternScaleY);
}
// create a canvas which will be used as a pattern
function initGrain() {
  patternCanvas = document.createElement("canvas");
  patternCanvas.width = patternSize;
  patternCanvas.height = patternSize;
  patternCtx = patternCanvas.getContext("2d");
  patternData = patternCtx.createImageData(patternSize, patternSize);
}
// put a random shade of gray into every pixel of the pattern
function update() {
  let value;
  for (let i = 0; i < patternPixelDataLength; i += 4) {
    value = (Math.random() * 255) | 0;
    patternData.data[i] = value;
    patternData.data[i + 1] = value;
    patternData.data[i + 2] = value;
    patternData.data[i + 3] = patternAlpha;
  }
  patternCtx.putImageData(patternData, 0, 0);
}
// fill the canvas using the pattern
function draw() {
  ctx.clearRect(0, 0, viewWidth, viewHeight);
  ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
  ctx.fillRect(0, 0, viewWidth, viewHeight);
}

function loop() {
  if (++frame % patternRefreshInterval === 0) {
    update();
    draw();
  }
  requestAnimationFrame(loop);
}
