# State of the Browser

Static site for State of the Browser website.

The website is viewable at <https://www.stateofthebrowser.com>.

# Build pipeline

The project uses [Netlify](https://netlify.com) services, which will build and deploy at every push to master into production.

The following command will simply build all files and make them ready for production:

    $ npm build

All resulting files can be then committed to git.

_If you have any queries please open a ticket or ask in the main Slack channel._

# Development

If you want to contribute, please either fork or branch off the `master` branch (if you are within the LWS org), and create a PR to merge into `master`.

Netlify will automatically build a new preview for every PR created, merging will be forbidden if the build doesn't pass.

## Requirements

These are the basic requirements in order to edit and build the project:

### Node.js

The recommended way to have Node installed is through [nvm](https://github.com/creationix/nvm) (Node Version Manager). There's a handy `.nvmrc` in the root of the project, once you have `nvm` installed, just run the following command:

    $ nvm use

If you don't want to use `nvm` you are free to use any other way to install Node, just be aware that diverting from the current recommended version, might trigger unexpected errors.

You can check the version of Node installed using the following command, e.g.:

    $ node -v
    v7.9.0

### Installing all dependencies

The following two commands need to be run in order to have all the dependencies fetched and installed before being able to run and build the project:

    $ npm install

## Building the project

### For development purposes

The following command will build the project for development

    $ npm start

It will automatically open it on a new window in your default browser. It will also trigger automatic refresh of the browser window every time any source file is being modified.

The project can be accessed at <http://localhost:3000>.

## Pages and Templates

[Handlebar.js](http://handlebarsjs.com/) is in use, together with a set of helpers:

- [Handlebar Layouts](https://github.com/shannonmoeller/handlebars-layouts), more about this later.
- [Helper Moment](https://github.com/helpers/helper-moment), which allows the use of [moment](https://momentjs.com) in templates.
- [Swag](https://github.com/elving/swag), provides a series of block-level helpers (`if`, `gt`, etc...)
- Some custom written helpers that can be found in the file [`/gulp/metalsmith.js`](/gulp/metalsmith.js), like `ext2Png`, `ext2Jpg`, and `different` which can be used to compare dates.

### How are pages created via Metalsmith

The layouts decoration is handled via the Metalsmith plugin [`metalsmith-layouts`](https://github.com/ismay/metalsmith-layouts#readme). This uses Handlebarjs and all the configured helpers.

The basic configuration of where files are, is taken from the [config.json](config.json) file.

The basic idea is that Metalsmith will:

1. read all the pages in `/pages/` (can be `.md`, `.txt`, or even `.html` files),
2. see if there any Frontmatter data (the initial portion that sits between `---`),
3. extract those variables,
4. pass the information to `metalsmith-layouts`, which in turn will send it down to Handlebar.
5. Handlebar will look for the variable `layout`, search for the respective named layout, and inject all the Frontmatter variables into it.
6. Once this is done, the compiled HTML markup will be passed down to further Metalsmith plugins and then outputted as actual files.

This, pretty much sums up how everything works.

### Structure

The most important files are found:

- `/templates/layouts/`: all the main layouts that extend some _"partials"_, one of the partials that is mostly used is `page.hbs`.
- `/templates/partials/`: this is where all the partials live, both the full pages that can be extended, and the snippets of markup that can be called _components_.

Please read the documentation of [Handlebar Layouts](https://github.com/shannonmoeller/handlebars-layouts) for information on the use of `extend`, `block`, and `content`, which are widely used.

**NOTE**: try to use prefixes to organise files in a way that it's clear if there's any dependency/inheritance.
