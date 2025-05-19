fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const dates = data.map(entry => entry.date);
    const scores = data.map(entry => entry.score);

    const ctx = document.getElementById('happinessChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Mutluluk Skoru',
          data: scores,
          borderColor: '#0984e3',
          backgroundColor: 'rgba(9, 132, 227, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Skor'
            }
          }
        }
      }
    });
  });
