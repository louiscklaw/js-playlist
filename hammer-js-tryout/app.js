var square = document.querySelector(".square");

var myOptions = {};

var hammertime = new Hammer(square, myOptions);

hammertime.on("pan", function (ev) {
  console.log(ev);
});
