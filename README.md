# stateofthebrowser.com

Static site for State of the Browser website.

The website is viewable at <https://stateofthebrowser.com>.

This repository is currently licensed under the [MIT license](https://mit-license.org/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/09cefd52-4ac4-4339-8f89-a7ab8a612aa8/deploy-status)](https://app.netlify.com/sites/stateofthebrowser/deploys)

## Development

If you're interested in understanding how we build and deploy our website, please read below and ask if you find anything is out of place or want to know more, and why not? join us! either by [raising an issue on our GitHub account](https://github.com/londonwebstandards/sotb-website/issues/new) or [contact us directly on Twitter](https://twitter.com/webstandards).

### Branching Strategy

To simplify development, reduce the amount of maintenance, and allow the flexibility for experimentation and radical changes, the current branching strategy is the following:

- `main` branch: this is used purely for administrative purposes. Contains mostly licenses, redirects and base scripts. Push restriction is set at GitHub level, and a PR needs to be created for any changes in this branch. I would also reccomend to run an `npm version patch` command to tag the branch correctly (see the manual or ask if you don't know how to use it).
- `YYYY` branch: (e.g. `2019`, `2021`, ...) this is the year-related and contains the actual source files for the yearly release of the website. This might be a full rewrite or just a copy change.
- `some-other-name` branch: this is a short-lived branch that is useful just to introduce new things into the intended branch.

### Build pipeline

The project uses [Netlify](https://netlify.com) services, which will build and deploy at every push to the branch into production.

### Build script

The following command is the only command that needs to be availabe in any branch if you want them to be albe to be built and published:

    $ npm run build

This script will be invoked by Netlify at push time, filling in the `dist/` directory with production ready files.

If you need to change this behaviour please raise a ticket and possibly start a discussion with any developer available.

> **Changing this setting will break things.**


## Local development

Every branch might have different requirements, and these should be up-to-date on a per-branch basis (if that's not the case, feel free to raise this as an issue).
