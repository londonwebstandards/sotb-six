# SotB v6
Static site for State of the Browser 2017.

# Viewing the project (no build required)

Open `dist/index.html` in your preferred browser and that's it.

# Building the project

## Requirements

These are the basic requirements in order to edit and build the project:

### Node.js
The recommended way to have Node installed is through [nvm](https://github.com/creationix/nvm) (Node Version Manager). There's a handy `.nvmrc` in the root of the project, once you have `nvm` installed, just run the following command:

    $ nvm use

If you don't want to use `nvm` you are free to use any other way to install Node, just be aware that diverting from the current recommended version, might trigger unexpected errors.

You can check the version of Node installed using the following command:

    $ node -v
    v7.9.0

### Bower

Once you have Node (and `npm` that comes with it) installed, you would need to install [Bower](https://bower.io/) with the following commands:

    $ npm install -g bower

You can check the version of Bower installed using the following commands:

    $ bower -v
    1.8.0

### Installing all dependencies

The following two commands need to be run in order to have all the dependencies fetched and installed before being able to run and build the project:

    $ npm install
    $ bower install

## Building the project

### For development purposes

The following command will build the project for development

    $ npm start

It will automatically open it on a new window in your default browser. It will also trigger automatic refresh of the browser window every time any source file is being modified.

The project can be accessed at [localhost:8000](http://localhost:8000).

**NOTE**: no file in the `dist/` folder should be committed to git, see the following section on how to build for production.

### For production purposes

The following command will simply build all files and make them ready for production:

    $ npm build

All resulting files can be then committed to git. 

_If you have any queries please open a ticket or ask in the main Slack channel._
