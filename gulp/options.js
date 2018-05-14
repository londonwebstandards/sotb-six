const options = {
  cachebust: null,
  production: false
};

function setProduction(status) {
  options.production = status;
}

function getProduction() {
  return options.production;
}

function setCachebust(newCachebust) {
  options.cachebust = newCachebust;
}

function getCachebust() {
  return options.cachebust;
}

module.exports = {
  getCachebust,
  getProduction,
  setProduction,
  setCachebust
};
