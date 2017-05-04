const gulp = require('gulp');
const gulpIf = require('gulp-if');
const filter = require('gulp-filter');
const fs = require('fs');
const replace = require('gulp-replace');

// reads the content of package.json
var getPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

// run metalsmith (static site generator)
gulp.task('metalsmith', function () {
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
  const tags = require('metalsmith-tags');
  const debug = require('metalsmith-debug');

  var fmFilter = filter('**/*.{html,md,htb}', { restore: true }); // filter out files with front matter

  // reget package
  var pkg = getPackageJson();

  // register Handlebars helpers
  handlebars.registerHelper('moment', require('helper-moment'));
  require('swag').registerHelpers(handlebars);
  handlebars.registerHelper('ext2Png', function (str) {
    return str.substr(0, str.lastIndexOf('.')) + '.png';
  });
  handlebars.registerHelper('ext2Jpg', function (str) {
    return str.substr(0, str.lastIndexOf('.')) + '.jpg';
  });

  return gulp.src('./src/**/*')
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
            'title': SITE_TITLE
          }
        })
        .use(pageTitles())
        .use(markdown())
        .use(permalinks(':collection/:title'))
        .use(tags({
          'handle': 'tags',
          'path': 'portfolio/:tag/index.html',
          'layout': 'landing-tags.hbs',
          // provide posts sorted by 'date' (optional)
          'sortBy': 'date',
          // sort direction (optional)
          'reverse': true,
          // skip updating metalsmith's metadata object.
          // useful for improving performance on large blogs
          // (optional)
          'skipMetadata': false,
          // 'slug': function(tag) { return tag.toLowerCase() },
          'slug': { 'mode': 'rfc3986' },
          'hyphenate': true
        }))
        .use(layouts({
          'engine': 'handlebars',
          'directory': path.templates,
          'partials': path.templates + '/partials'
        }))
        .use(sitemap({
          'hostname': 'http://peach.smartart.it',
          'changefreq': 'yearly',
          'pattern': [ '{illustration,photo,pixelart}/**', 'about/*' ],
          'omitIndex': true
        }))
        .use(htmlMinifier())
        .use(debug())
   )
    .pipe(gulpIf(production, replace('.css', '.' + pkg.version + '.css')))
    .pipe(gulpIf(production, replace(/(main|vendor|modernizr)\.js/g, '$1.' + pkg.version + '.js')))
    .pipe(gulp.dest('./' + path.build))
    .pipe(browserSync.reload({ stream: true }));
});
