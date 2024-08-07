module.exports = {
  config: {
    type: 'line',
    data: {
      labels: [0, 1, 2, 3, 4, 5],
      datasets: [
        {
          // option in dataset
          data: [0, 5, 10, null, -10, -5],
          pointBackgroundColor: '#ff0000',
          pointBorderColor: '#ff0000',
          pointStyle: function (ctx) {
            var value = ctx.dataset.data[ctx.dataIndex] || 0
            return value > 8 ? 'rect' : value > 0 ? 'star' : value > -8 ? 'cross' : 'triangle'
          },
        },
        {
          // option in element (fallback)
          data: [4, -5, -10, null, 10, 5],
        },
      ],
    },
    options: {
      legend: false,
      title: false,
      elements: {
        line: {
          fill: false,
        },
        point: {
          backgroundColor: '#0000ff',
          borderColor: '#0000ff',
          pointStyle: function (ctx) {
            var value = ctx.dataset.data[ctx.dataIndex] || 0
            return value > 8 ? 'triangle' : value > 0 ? 'cross' : value > -8 ? 'star' : 'rect'
          },
          radius: 10,
        },
      },
      scales: {
        x: { display: false },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    },
  },
  options: {
    canvas: {
      height: 256,
      width: 512,
    },
  },
}
