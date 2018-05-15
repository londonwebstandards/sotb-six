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
