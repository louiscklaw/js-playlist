const sharp = require('sharp');

// original image
let originalImage = 'originalImage.jpg';

// file name for cropped image
let outputImage = 'croppedImage.jpg';

sharp(originalImage).extract({ width: 1920, height: 1080, left: 60, top: 40 }).toFile(outputImage)
    .then(function(new_file_info) {
        console.log("Image cropped and saved");
    })
    .catch(function(err) {
        console.log("An error occured");
    });