const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let w = window.innerWidth;
let h = window.innerHeight;
let cx = w / 2;
let cy = h / 2;

let stars = [];
const STAR_COUNT = 140;
const MAX_DEPTH = 8;

const COLORS = [
  '#ffffff', // белый
  '#00bfff', // голубой
  '#ff00ff', // фиолетовый
  '#ffff66', // жёлтый
  '#ff8c00', // оранжевый
  '#00ff88'  // бирюза
];

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  cx = w / 2;
  cy = h / 2;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resize);
resize();

function resetStar(s) {
  s.x = (Math.random() * 2 - 1) * w;
  s.y = (Math.random() * 2 - 1) * h;
  s.z = Math.random() * MAX_DEPTH + 0.1;
  s.color = COLORS[Math.floor(Math.random() * COLORS.length)];
}

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    let s = { x: 0, y: 0, z: 0, color: '#fff' };
    resetStar(s);
    stars.push(s);
  }
}
initStars();

function render() {
  requestAnimationFrame(render);

  ctx.fillStyle = 'rgba(2,3,8,0.7)';
  ctx.fillRect(0, 0, w, h);

  const speed = 0.12;

  for (const s of stars) {
    let prevZ = s.z;
    s.z -= speed;
    if (s.z <= 0.1) {
      resetStar(s);
      continue;
    }

    let sx = (s.x / s.z) + cx;
    let sy = (s.y / s.z) + cy;

    let px = (s.x / (prevZ + 0.0001)) + cx;
    let py = (s.y / (prevZ + 0.0001)) + cy;

    if (sx < 0 || sx > w || sy < 0 || sy > h) {
      resetStar(s);
      continue;
    }

    ctx.strokeStyle = s.color;
    ctx.lineWidth = 1 + (MAX_DEPTH - s.z) * 0.15;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(sx, sy);
    ctx.stroke();
  }
}
render();