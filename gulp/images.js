// build all images
const gulp = require("gulp");
const cache = require("gulp-cached");
const imagemin = require("gulp-imagemin");
const size = require("gulp-size");

const imageminPngquant = require("imagemin-pngquant");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");

const paths = require("../config.json").paths;

function images() {
  return gulp
    .src([`${paths.images.src}**/*`])
    .pipe(cache("images"))
    .pipe(
      imagemin(
        [
          imageminJpegRecompress({
            loop: 4,
            min: 50,
            max: 95,
            quality: "high"
          }),
          imageminPngquant()
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(gulp.dest(paths.images.dest))
    .pipe(size());
}

module.exports = {
  build: images
};
