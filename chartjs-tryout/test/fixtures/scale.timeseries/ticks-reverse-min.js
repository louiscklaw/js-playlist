module.exports = {
  threshold: 0.01,
  config: {
    type: 'line',
    data: {
      labels: ['2017', '2019', '2020', '2025', '2042'],
      datasets: [{ data: [0, 1, 2, 3, 4], fill: false }],
    },
    options: {
      scales: {
        x: {
          type: 'timeseries',
          min: '2012',
          time: {
            parser: 'YYYY',
          },
          reverse: true,
          ticks: {
            source: 'labels',
          },
        },
        y: {
          display: false,
        },
      },
      legend: false,
    },
  },
  options: {
    spriteText: true,
  },
}
