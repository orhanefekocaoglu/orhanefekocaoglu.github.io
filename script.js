let happinessData = [
  { date: "2025-03-27", value: 50 },
  { date: "2025-03-28", value: 49 },
  { date: "2025-03-29", value: 47 },
  { date: "2025-03-30", value: 45 },
  { date: "2025-03-31", value: 43 },
  { date: "2025-04-01", value: 41 },
  { date: "2025-04-02", value: 39 },
  { date: "2025-04-03", value: 37 },
  { date: "2025-04-04", value: 38 },
  { date: "2025-04-05", value: 40 },
  { date: "2025-04-06", value: 42 },
  { date: "2025-04-07", value: 44 },
  { date: "2025-04-08", value: 46 },
  { date: "2025-04-09", value: 48 },
  { date: "2025-04-10", value: 50 },
  { date: "2025-04-11", value: 52 },
  { date: "2025-04-12", value: 55 },
  { date: "2025-04-13", value: 58 },
  { date: "2025-04-14", value: 60 },
  { date: "2025-04-15", value: 63 },
  { date: "2025-04-16", value: 64 },
  { date: "2025-04-17", value: 62 },
  { date: "2025-04-18", value: 60 },
  { date: "2025-04-19", value: 58 },
  { date: "2025-04-20", value: 55 },
  { date: "2025-04-21", value: 52 },
  { date: "2025-04-22", value: 50 },
  { date: "2025-04-23", value: 48 },
  { date: "2025-04-24", value: 45 },
  { date: "2025-04-25", value: 42 },
  { date: "2025-04-26", value: 39 },
  { date: "2025-04-27", value: 37 },
  { date: "2025-04-28", value: 38 },
  { date: "2025-04-29", value: 40 },
  { date: "2025-04-30", value: 43 },
  { date: "2025-05-01", value: 45 },
  { date: "2025-05-02", value: 48 },
  { date: "2025-05-03", value: 50 },
  { date: "2025-05-04", value: 52 },
  { date: "2025-05-05", value: 55 },
  { date: "2025-05-06", value: 57 },
  { date: "2025-05-07", value: 60 },
  { date: "2025-05-08", value: 62 },
  { date: "2025-05-09", value: 60 },
  { date: "2025-05-10", value: 58 },
  { date: "2025-05-11", value: 55 },
  { date: "2025-05-12", value: 53 },
  { date: "2025-05-13", value: 50 },
  { date: "2025-05-14", value: 46 },
  { date: "2025-05-15", value: 44 },
  { date: "2025-05-16", value: 42 },
  { date: "2025-05-17", value: 38 },
  { date: "2025-05-18", value: 40 },
  { date: "2025-05-19", value: 45 },
  { date: "2025-05-20", value: 48 },
  { date: "2025-05-21", value: 50 },
  { date: "2025-05-22", value: 25 }  // senin en son eklediğin veri burada
];



document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();

  // Örnek: yeni veri ekleyip grafiği güncellemek için şöyle kullanabilirsin:
  // addNewData("2024-11-04", 57);
});

function addNewData(date, value) {
  // Aynı tarihte veri varsa güncelle, yoksa ekle
  const existing = happinessData.find(d => d.date === date);
  if (existing) {
    existing.value = value;
  } else {
    happinessData.push({ date, value });
  }
  // Tarihe göre sırala
  happinessData.sort((a, b) => new Date(a.date) - new Date(b.date));
  updateDashboard();
}

function updateDashboard() {
  let index = 50; // Başlangıç index
  const labels = [];
  const values = [];

  happinessData.forEach(({ date, value }) => {
    labels.push(date);
    values.push(index);

    const distance = value - index;
    let sensitivity = 0.1;

    if (index >= 50 && value < index) {
      sensitivity = 0.2 * Math.abs(distance) / 100 + 0.1;
    } else if (index < 50 && value > index) {
      sensitivity = 0.2 * Math.abs(distance) / 100 + 0.1;
    } else {
      sensitivity = 0.05 + 0.1 * (Math.abs(distance) / 100);
    }

    index += distance * sensitivity;
    index = Math.max(0, Math.min(100, index));
  });

  drawNeedle(index);
  updateDescription(index);
  const indexValue = document.getElementById("indexValue");
  if (indexValue) indexValue.innerText = `Index: ${index.toFixed(1)}`;

  drawChart(labels, values);
}

function drawNeedle(index) {
  const needle = document.getElementById("needle");
  if (!needle) return;
  const rotation = (index / 100) * 180 - 90;
  needle.style.transform = `rotate(${rotation}deg)`;
}

function updateDescription(value) {
  const descText = document.getElementById("descriptionText");
  if (!descText) return;

  if (value < 20) descText.innerText = "Çok üzgün";
  else if (value < 40) descText.innerText = "Üzgün";
  else if (value < 60) descText.innerText = "Nötr";
  else if (value < 80) descText.innerText = "Mutlu";
  else descText.innerText = "Çok mutlu";
}

let chartInstance = null;
function drawChart(labels, values) {
  const ctx = document.getElementById("happinessChart").getContext("2d");
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Happiness Index",
        data: values,
        borderColor: "red",
        backgroundColor: "rgba(0, 128, 0, 0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 365
          }
        },
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Happiness Score"
          }
        }
      },
      plugins: {
  annotation: {
    annotations: {
      region1: {
        type: 'box',
        yMin: 0,
        yMax: 20,
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // red-ish
      },
      region2: {
        type: 'box',
        yMin: 20,
        yMax: 40,
        backgroundColor: 'rgba(255, 159, 64, 0.2)', // orange-ish
      },
      region3: {
        type: 'box',
        yMin: 40,
        yMax: 60,
        backgroundColor: 'rgba(255, 205, 86, 0.2)', // yellow-ish
      },
      region4: {
        type: 'box',
        yMin: 60,
        yMax: 80,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // green-ish
      },
      region5: {
        type: 'box',
        yMin: 80,
        yMax: 100,
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // blue-ish
      },
    }
  }
}

    }
  });
}
function updateDescription(value) {
  const descText = document.getElementById("descriptionText");
  const statusMessage = document.getElementById("statusMessage");
  if (!descText || !statusMessage) return;

  let mood = "";
  if (value < 20) mood = "very sad";
  else if (value < 40) mood = "sad";
  else if (value < 60) mood = "neutral";
  else if (value < 80) mood = "happy";
  else mood = "very happy";

  descText.innerText = mood;  // gösterge altındaki açıklama sadece mood olsun istersen
  statusMessage.innerText = `Orhan's happiness index is ${value.toFixed(1)}, so Orhan is ${mood}.`;
}


