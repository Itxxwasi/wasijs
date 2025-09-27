// wasi.js – All-in-one Math Toolkit

const wasi = {
  // ---------------- BASIC ----------------
  basic: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    },
    mod: (a, b) => a % b,
    pow: (a, b) => Math.pow(a, b),
    sqrt: (a) => Math.sqrt(a),
    abs: (a) => Math.abs(a),
    round: (a, decimals = 0) =>
      Number(Math.round(a + "e" + decimals) + "e-" + decimals),
  },

  // ---------------- ALGEBRA ----------------
  algebra: {
    factorial: function (n) {
      if (n < 0) throw new Error("Negative factorial not allowed");
      return n <= 1 ? 1 : n * this.factorial(n - 1);
    },
    gcd: function (a, b) {
      return b === 0 ? a : this.gcd(b, a % b);
    },
    lcm: function (a, b) {
      return (a * b) / this.gcd(a, b);
    },
    quadratic: (a, b, c) => {
      const disc = b * b - 4 * a * c;
      if (disc < 0) return [];
      if (disc === 0) return [-b / (2 * a)];
      return [
        (-b + Math.sqrt(disc)) / (2 * a),
        (-b - Math.sqrt(disc)) / (2 * a),
      ];
    },
  },

  // ---------------- GEOMETRY ----------------
  geometry: {
    areaCircle: (r) => Math.PI * r * r,
    circumference: (r) => 2 * Math.PI * r,
    areaRectangle: (w, h) => w * h,
    areaTriangle: (b, h) => 0.5 * b * h,
    pythagoras: (a, b) => Math.sqrt(a * a + b * b),
  },

  // ---------------- STATISTICS ----------------
  statistics: {
    mean: (arr) => arr.reduce((a, b) => a + b, 0) / arr.length,
    median: (arr) => {
      arr = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(arr.length / 2);
      return arr.length % 2 !== 0
        ? arr[mid]
        : (arr[mid - 1] + arr[mid]) / 2;
    },
    mode: (arr) => {
      const freq = {};
      arr.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
      let max = Math.max(...Object.values(freq));
      return Object.keys(freq)
        .filter((k) => freq[k] === max)
        .map(Number);
    },
    variance: function (arr) {
      const m = this.mean(arr);
      return this.mean(arr.map((x) => (x - m) ** 2));
    },
    stdDev: function (arr) {
      return Math.sqrt(this.variance(arr));
    },
  },

  // ---------------- MATRIX ----------------
  matrix: {
    add: (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j])),
    subtract: (A, B) => A.map((row, i) => row.map((v, j) => v - B[i][j])),
    multiply: (A, B) => {
      const result = Array(A.length)
        .fill(0)
        .map(() => Array(B[0].length).fill(0));
      for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
          for (let k = 0; k < B.length; k++) {
            result[i][j] += A[i][k] * B[k][j];
          }
        }
      }
      return result;
    },
    transpose: (A) => A[0].map((_, i) => A.map((row) => row[i])),
  },

  // ---------------- RANDOM ----------------
  random: {
    randomInt: (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min,
    randomFloat: (min, max) => Math.random() * (max - min) + min,
    choice: (arr) => arr[Math.floor(Math.random() * arr.length)],
    shuffle: (arr) => {
      let a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  },

  // ---------------- TRIGONOMETRY ----------------
  trigonometry: {
    sin: (x) => Math.sin(x),
    cos: (x) => Math.cos(x),
    tan: (x) => Math.tan(x),
    cot: (x) => 1 / Math.tan(x),
    sec: (x) => 1 / Math.cos(x),
    csc: (x) => 1 / Math.sin(x),
    asin: (x) => Math.asin(x),
    acos: (x) => Math.acos(x),
    atan: (x) => Math.atan(x),
    degToRad: (deg) => (deg * Math.PI) / 180,
    radToDeg: (rad) => (rad * 180) / Math.PI,
  },

  // ---------------- CALCULUS ----------------
  calculus: {
    derivative: (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h),
    integrate: (f, a, b, n = 1000) => {
      const h = (b - a) / n;
      let sum = 0.5 * (f(a) + f(b));
      for (let i = 1; i < n; i++) {
        sum += f(a + i * h);
      }
      return sum * h;
    },
    newtonRaphson: (f, guess = 1, tolerance = 1e-7, maxIter = 100) => {
      let x = guess;
      for (let i = 0; i < maxIter; i++) {
        let fx = f(x);
        let dfx = (f(x + 1e-6) - f(x - 1e-6)) / (2e-6);
        if (Math.abs(dfx) < 1e-12) throw new Error("Derivative too small");
        let x1 = x - fx / dfx;
        if (Math.abs(x1 - x) < tolerance) return x1;
        x = x1;
      }
      throw new Error("No convergence");
    },
  },
};

module.exports = wasi;
