// run metalsmith (static site generator)
const config = require("../config.json");
const paths = config.paths;

const gulp = require("gulp");
const gulpIf = require("gulp-if");
const gulpsmith = require("gulpsmith");
const frontMatter = require("gulp-front-matter");
const filter = require("gulp-filter");
const assign = require("lodash.assign");
const handlebars = require("handlebars");

const htmlMinifier = require("metalsmith-html-minifier");
const markdown = require("metalsmith-markdown");
const dataLoader = require("metalsmith-data-loader");
const drafts = require("metalsmith-drafts");
const layouts = require("metalsmith-layouts");
const pageTitles = require("metalsmith-page-titles");
const permalinks = require("metalsmith-permalinks");
const sitemap = require("metalsmith-mapsite");
const debug = require("metalsmith-debug");
const discoverPartials = require("metalsmith-discover-partials");
const collections = require("metalsmith-collections");
const slugify = require("./metalsmith/slugify");

const options = require("./options");

function changeExtension(filename, newExt) {
  // if newExt doesn't start with '.', add it
  if (newExt.charAt(0) !== ".") {
    newExt = `.${newExt}`;
  }

  return `${filename.substr(0, filename.lastIndexOf("."))}${newExt}`;
}

function registerHandlebarsHelpers() {
  // register Handlebars helpers
  handlebars.registerHelper("moment", require("helper-moment"));
  require("swag").registerHelpers(handlebars);
  require("handlebars-layouts").register(handlebars);
  handlebars.registerHelper("ext2Png", str => changeExtension(str, "png"));
  handlebars.registerHelper("ext2Jpg", str => changeExtension(str, "jpg"));
  handlebars.registerHelper("different", function(lvalue, rvalue, options) {
    if (arguments.length < 3) {
      throw new Error('Handlebars Helper "equal" needs 2 parameters');
    }
    // in case we're using this on a Date object
    if (typeof lvalue.getTime === "function") {
      lvalue = lvalue.getTime();
    }
    if (typeof rvalue.getTime === "function") {
      rvalue = rvalue.getTime();
    }
    if (lvalue !== rvalue) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
}
// limit an array to a maximum of elements (from the start)
handlebars.registerHelper("limit", function(arr, limit) {
  return arr.slice(0, limit);
});

function metalsmith() {
  // filter out files with front matter
  const fmFilter = filter("**/*.{html,md,txt}", { restore: true });

  registerHandlebarsHelpers();

  return gulp
    .src(paths.pages.src)
    .pipe(fmFilter)
    .pipe(
      frontMatter({
        property: "frontMatter"
      })
    )
    .on("data", function(file) {
      assign(file, file.frontMatter);
      delete file.frontMatter;
    })
    .pipe(fmFilter.restore)
    .pipe(
      gulpsmith()
        .metadata({
          site: {
            title: config.title,
            URL: `https://${config.domain}`
          },
          ogImage: config.sharingImg
        })
        .use(dataLoader())
        .use(drafts())
        .use(
          collections({
            speakers: {
              pattern: "speakers/*.md",
              sortBy: "order",
              reverse: true,
              refer: false
            }
          })
        )
        .use(pageTitles())
        .use(markdown())
        .use(slugify())
        .use(
          permalinks({
            pattern: ":title_slugged",
            linksets: [
              {
                match: { collection: "speakers" },
                pattern: "speakers/:title_slugged"
              }
            ]
          })
        )
        .use(
          discoverPartials({
            directory: `${paths.templates.src}${paths.templates.partials}`
          })
        )
        .use(
          layouts({
            directory: `${paths.templates.src}${paths.templates.layouts}`
          })
        )
        .use(
          sitemap({
            hostname: `https://${config.URL}`,
            changefreq: "daily",
            omitIndex: true
          })
        )
        .use(htmlMinifier())
        .use(debug())
    )
    .pipe(gulpIf(options.getProduction(), options.getCachebust().references()))
    .pipe(gulp.dest(paths.pages.dest));
}

module.exports = {
  build: metalsmith
};
