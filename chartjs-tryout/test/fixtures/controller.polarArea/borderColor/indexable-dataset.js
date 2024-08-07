module.exports = {
  config: {
    type: 'polarArea',
    data: {
      labels: [0, 1, 2, 3, 4, 5],
      datasets: [
        {
          // option in dataset
          data: [0, 2, 4, null, 6, 8],
          borderColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#000000'],
        },
      ],
    },
    options: {
      legend: false,
      title: false,
      elements: {
        arc: {
          backgroundColor: 'transparent',
          borderWidth: 8,
        },
      },
      scale: {
        display: false,
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
