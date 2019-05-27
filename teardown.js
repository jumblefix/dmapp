module.exports = async function(config) {
  if (!(config.watch || config.watchAll)) {
    process.exit();
  }
};
