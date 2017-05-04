/* global PRODUCTION PATH CONST */
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const filter = require('gulp-filter');
const fs = require('fs');
const replace = require('gulp-replace');
const browserSync = require('browser-sync');
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

// reads the content of package.json
function getPackageJson () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}

/** run metalsmith (static site generator)
 * if `PRODUCTION` is set to true, additionally append the package.json version
 * to the css file
 */
function metalsmith () { // eslint-disable-line no-unused-vars
  var fmFilter = filter('**/*.{html,md,htb}', { restore: true }); // filter out files with front matter

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
          'directory': PATH.templates,
          'partials': PATH.templates + '/partials'
        }))
        .use(sitemap({
          'hostname': 'http://stateofthebrowser.org',
          'changefreq': 'yearly',
          'pattern': [ '{illustration,photo,pixelart}/**', 'about/*' ], // FIXME do something here
          'omitIndex': true
        }))
        .use(htmlMinifier())
        .use(debug())
   )
    .pipe(gulpIf(PRODUCTION, replace('.css', '.' + pkg.version + '.css')))
    // .pipe(gulpIf(PRODUCTION, replace(/(main|vendor|modernizr)\.js/g, '$1.' + pkg.version + '.js')))
    .pipe(gulp.dest('./' + PATH.dist))
    .pipe(browserSync.reload({ stream: true }));
}
