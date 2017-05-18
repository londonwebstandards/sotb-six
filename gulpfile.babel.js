'use strict';

import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import gulp from 'gulp';
import del from 'del';
import sherpa from 'style-sherpa';
import yaml from 'js-yaml';
import fs from 'fs';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, CONST } = loadConfig();

function loadConfig () {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
gulp.series(clean, gulp.parallel(metalsmith, sass, javascript, images, copy), styleGuide));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean (done) {
  return del([PATHS.dist]);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy () {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'));
}

// reads the content of package.json
function getPackageJson () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}

/** run metalsmith (static site generator)
 * if `PRODUCTION` is set to true, additionally append the package.json version
 * to the css file
 */
function metalsmith () { // eslint-disable-line no-unused-vars
  // Metalsmith-specific requires
  const gulpsmith = require('gulpsmith');
  const frontMatter = require('gulp-front-matter');
  const assign = require('lodash.assign');
  const handlebars = require('handlebars');
  const htmlMinifier = require('metalsmith-html-minifier');
  const markdown = require('metalsmith-markdown');
  const layouts = require('metalsmith-layouts');
  const pageTitles = require('metalsmith-page-titles');
  const permalinks = require('metalsmith-permalinks');
  const sitemap = require('metalsmith-mapsite');
  const debug = require('metalsmith-debug');

  // filter out files with front matter
  var fmFilter = $.filter('**/*.{html,md,htb}', { restore: true });

  // reget package
  var pkg = getPackageJson();

  // register Handlebars helpers
  handlebars.registerHelper('moment', require('helper-moment'));
  require('swag').registerHelpers(handlebars);
  // custom helpers
  handlebars.registerHelper('ext2Png', function (str) {
    return str.substr(0, str.lastIndexOf('.')) + '.png';
  });
  handlebars.registerHelper('ext2Jpg', function (str) {
    return str.substr(0, str.lastIndexOf('.')) + '.jpg';
  });

  return gulp.src('./src/pages/**/*')
    .pipe(fmFilter)
     // grab files with front matter and assign them as a property so metalsmith will find it
    .pipe(frontMatter({
      property: 'frontMatter'
    })).on('data', function (file) {
      assign(file, file.frontMatter);
      delete file.frontMatter;
    })
    // remove the filter (back to everything in /src) and let metalsmith do its thing
    .pipe(fmFilter.restore)
    .pipe(
      gulpsmith()
        .metadata({
          'site': {
            'title': CONST.title
          }
        })
        .use(pageTitles())
        .use(markdown())
        .use(permalinks(':collection/:title'))
        .use(layouts({
          'engine': 'handlebars',
          'directory': PATHS.templates,
          'partials': PATHS.templates + '/partials'
        }))
        .use(sitemap({
          'hostname': 'http://stateofthebrowser.com',
          'changefreq': 'yearly',
          'pattern': [ '{illustration,photo,pixelart}/**', 'about/*' ], // FIXME do something here
          'omitIndex': true
        }))
        .use(htmlMinifier())
        .use(debug())
   )
    .pipe($.if(PRODUCTION, $.replace('.css', '.' + pkg.version + '.css')))
    // .pipe($.if(PRODUCTION, replace(/(main|vendor|modernizr)\.js/g, '$1.' + pkg.version + '.js')))
    .pipe(gulp.dest('./' + PATHS.dist))
    .pipe(browser.reload({ stream: true }));
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide (done) {
  sherpa('src/styleguide/index.md', {
    output: PATHS.dist + '/styleguide.html',
    template: 'src/templates/styleguide.hbs'
  }, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass () {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    // .pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/css'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript () {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel({ignore: ['what-input.js']}))
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); }) // eslint-disable-line no-console
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/assets/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images () {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/assets/img'));
}

// Start a server with BrowserSync to preview the site in
function server (done) {
  browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload (done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch () {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/pages/**/*.md').on('all', gulp.series(metalsmith, browser.reload));
  gulp.watch('src/templates/**/*.hbs').on('all', gulp.series(metalsmith, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', sass);
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, browser.reload));
}
