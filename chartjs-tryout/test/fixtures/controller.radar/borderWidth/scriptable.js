module.exports = {
  config: {
    type: 'radar',
    data: {
      labels: [0, 1, 2, 3, 4, 5],
      datasets: [
        {
          // option in dataset
          data: [0, 5, 10, null, -10, -5],
          borderColor: '#0000ff',
          borderWidth: function (ctx) {
            var index = ctx.dataIndex === undefined ? ctx.datasetIndex : ctx.dataIndex
            return index % 2 ? 10 : 20
          },
          pointBorderColor: '#00ff00',
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
          borderColor: '#ff0000',
          borderWidth: function (ctx) {
            var index = ctx.dataIndex === undefined ? ctx.datasetIndex : ctx.dataIndex
            return index % 2 ? 10 : 20
          },
          fill: false,
        },
        point: {
          borderColor: '#00ff00',
          borderWidth: 5,
          radius: 10,
        },
      },
      scale: {
        display: false,
        min: -15,
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
