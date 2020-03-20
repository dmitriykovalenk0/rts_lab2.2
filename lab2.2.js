let n = 14,
  w = 2500,
  N = 64,
  A,
  Fi,
  graphic = [];
number = w / (n - 1);

for (let i = 0; i < N; i++) {
  graphic.push(i);
}

function W(n, w) {
  return w - n * number;
}

w_values = [];

for (let i = 0; i < n; i++) {
  w_values.push(W(i, w));
}

let x = new Array(N).fill(0);

// generating random signal x

for (let i = 0; i < n; i++) {
  A = Math.random();
  Fi = Math.random();
  for (let j = 0; j < N; j++) {
    x[j] += A * Math.sin(w_values[i] * j + Fi);
  }
}

// таблица коеф w[p][k] от N / 2
let w_coeff = [];

for (let i = 0; i < Math.floor(N / 2); i++) {
  w_coeff.push([]);
  for (let j = 0; j < Math.floor(N / 2); j++) {
    w_coeff[i].push(0);
  }
}

for (let i = 0; i < Math.floor(N / 2); i++) {
  for (let j = 0; j < Math.floor(N / 2); j++) {
    w_coeff[i][j] +=
      Math.cos(((4 * Math.PI) / N) * i * j) +
      Math.sin(((4 * Math.PI) / N) * i * j);
  }
}

// табл новых коеф w[p] от N
w_coeff_pN = new Array(N).fill(0);

for (let i = 0; i < N; i++) {
  w_coeff_pN[i] +=
    Math.cos(((2 * Math.PI) / N) * i) + Math.sin(((2 * Math.PI) / N) * i);
}

// непарные
F_I = new Array(Math.floor(N / 2)).fill(0);

// парные
F_II = new Array(Math.floor(N / 2)).fill(0);

// конечная функия
F = new Array(N).fill(0);

// Считаем отдельно для парных и непарных частей функции

for (let i = 0; i < Math.floor(N / 2); i++) {
  for (let j = 0; j < Math.floor(N / 2); j++) {
    // для парных
    F_II[i] += x[2 * j] * w_coeff[i][j];

    // для непарных
    F_I[i] += x[2 * j + 1] * w_coeff[i][j];
  }
}

for (let i = 0; i < N; i++) {
  if (i < Math.floor(N / 2)) {
    F[i] += F_II[i] + w_coeff_pN[i] * F_I[i];
  } else {
    F[i] +=
      F_II[i - Math.floor(N / 2)] - w_coeff_pN[i] * F_I[i - Math.floor(N / 2)];
  }
}

console.log(F);

let config = {
  type: "line",

  data: {
    labels: graphic,
    datasets: [
      {
        label: "Xt",
        borderColor: "black",
        data: x,
        fill: false
      }
    ]
  }
};

let config1 = {
  type: "line",

  data: {
    labels: graphic,
    datasets: [
      {
        label: "F",
        borderColor: "black",
        data: F,
        fill: false
      }
    ]
  }
};

window.onload = function() {
  var ctx = document.getElementById("lab1").getContext("2d");
  window.chart = new Chart(ctx, config);

  var ctx1 = document.getElementById("lab2.2").getContext("2d");
  window.chart = new Chart(ctx1, config1);
};
