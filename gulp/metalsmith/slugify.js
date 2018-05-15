// we would like you to use debug
const debug = require("debug")("metalsmith-slugify");
const multimatch = require("multimatch");
const slug = require("slug");

// Expose `plugin`.
module.exports = slugify;

function slugify(opts) {
  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      debug("slugifying %s", file);
      if (files[file].title) {
        files[file].title_slugged = slug(files[file].title);
      }
    });
    done();
  };
}
