// build all images
const gulp = require("gulp");
const cache = require("gulp-cached");
const imagemin = require("gulp-imagemin");
const size = require("gulp-size");
const responsive = require("gulp-responsive");

const imageminPngquant = require("imagemin-pngquant");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");

const paths = require("../config.json").paths;

function responsiveImages() {
  return gulp
    .src([`${paths.images.src}**/*`])
    .pipe(cache("images"))
    .pipe(
      responsive(
        {
          "speakers/*": [
            {
              width: 400,
              rename: {
                extname: ".jpg"
              }
            }
          ]
        },
        {
          format: "jpeg",
          // Global configuration for all images
          // The output quality for JPEG, WebP and TIFF output formats
          quality: 85,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Strip all metadata
          withMetadata: false,
          // Do not emit the error when image is enlarged.
          errorOnEnlargement: false,
          errorOnUnusedConfig: false,
          errorOnUnusedImage: false
        }
      )
    )
    .pipe(gulp.dest(paths.images.dest))
    .pipe(size());
}

function compress() {
  return gulp
    .src([`${paths.images.src}**/*`, `!${paths.images.src}/speakers/**/*`])
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
  compress: compress,
  responsive: responsiveImages
};
