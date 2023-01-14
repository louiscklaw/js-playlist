module.exports = {
  config: {
    type: 'radar',
    data: {
      labels: [0, 1, 2, 3],
      datasets: [
        {
          // option in dataset
          data: [3, 3, null, 3],
          borderColor: '#ff0000',
          borderJoinStyle: function (ctx) {
            var index = ctx.datasetIndex % 3
            return index === 0 ? 'round' : index === 1 ? 'miter' : 'bevel'
          },
        },
        {
          // option in element (fallback)
          data: [2, 2, null, 2],
          borderColor: '#0000ff',
        },
        {
          // option in element (fallback)
          data: [1, 1, null, 1],
        },
      ],
    },
    options: {
      legend: false,
      title: false,
      elements: {
        line: {
          borderColor: '#00ff00',
          borderJoinStyle: function (ctx) {
            var index = ctx.datasetIndex % 3
            return index === 0 ? 'round' : index === 1 ? 'miter' : 'bevel'
          },
          borderWidth: 25,
          fill: false,
          tension: 0,
        },
      },
      layout: {
        padding: 32,
      },
      scale: {
        display: false,
        beginAtZero: true,
      },
    },
  },
  options: {
    canvas: {
      height: 512,
      width: 512,
    },
  },
}
