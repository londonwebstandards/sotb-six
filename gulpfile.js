// gulp modules
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const cache = require("gulp-cached");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const CacheBuster = require("gulp-cachebust");
const size = require("gulp-size");

// non-gulp modules
const del = require("del");
const argv = require("yargs").argv;
const eyeglass = require("eyeglass");
const sherpa = require("style-sherpa");

// internal modules
const browserSync = require("./gulp/browsersync");
const metalsmith = require("./gulp/metalsmith");
const images = require("./gulp/images");
const scripts = require("./gulp/scripts");
const options = require("./gulp/options");

const config = require("./config.json");
const paths = config.paths;
const cachebust = new CacheBuster();

// Check for --production flag
const PRODUCTION = argv.PRODUCTION || false;

options.setProduction(PRODUCTION);
options.setCachebust(cachebust);

/**
 * Compile Sass into CSS
 * In production, the CSS is compressed
 */
function styles() {
  const sassOpts = {};

  return gulp
    .src(paths.styles.src)
    .pipe(gulpIf(!PRODUCTION, sourcemaps.init()))
    .pipe(sass(eyeglass(sassOpts)))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssnano())
    .pipe(gulpIf(PRODUCTION, cachebust.resources()))
    .pipe(gulpIf(!PRODUCTION, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.styles.dest));
}

/**
 * Generate a style guide from the Markdown content and HTML template in styleguide/
 */
function styleGuide(done) {
  sherpa(
    "src/styleguide/index.md",
    {
      output: `${paths.pages.dest}styleguide.html`,
      template: `${paths.templates.src}styleguide.hbs`
    },
    done
  );
}

// Task: grab static assets (fonts, etc.) and move them to the build folder
function assets() {
  return gulp
    .src(paths.assets.src, {
      dot: true
    })
    .pipe(gulp.dest(paths.assets.dest))
    .pipe(size());
}

/**
 * Clears all the caches
 */
function clearCaches(done) {
  cache.caches = {};
  done();
}

function watch(done) {
  gulp.watch(
    paths.scripts.modules,
    gulp.series(scripts.bundle, browserSync.reload)
  );
  gulp.watch(paths.styles.src, gulp.series(styles, browserSync.reloadCSS));
  gulp.watch(paths.images.src, gulp.series(images.build, browserSync.reload));
  gulp.watch(paths.assets.src, gulp.series(assets, browserSync.reload));
  gulp.watch(
    [paths.pages.src, paths.templates.src, paths.pages.models],
    gulp.series(metalsmith.build, browserSync.reload)
  );
  done();
}

function clean(done) {
  del([paths.pages.dest]);
  done();
}

gulp.task("clean", gulp.series(clean, clearCaches));

// registering main tasks
gulp.task(
  "build",
  gulp.series(
    gulp.parallel(assets, scripts.bundle, styles),
    metalsmith.build,
    images.build,
    styleGuide
  )
);

gulp.task("default", gulp.series("build", browserSync.initTask, watch));
