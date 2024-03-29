module.exports = {
  config: {
    type: 'doughnut',
    data: {
      labels: [0, 1, 2, 3, 4, 5],
      datasets: [
        {
          // option in dataset
          data: [0, 2, 4, null, 6, 8],
          borderWidth: [0, 1, 2, 3, 4, 5],
        },
        {
          // option in element (fallback)
          data: [0, 2, 4, null, 6, 8],
        },
      ],
    },
    options: {
      legend: false,
      title: false,
      elements: {
        arc: {
          backgroundColor: 'transparent',
          borderColor: '#888',
          borderWidth: [5, 4, 3, 2, 1, 0],
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
