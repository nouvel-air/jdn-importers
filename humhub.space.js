const { HumHubImporterMixin } = require('@semapps/importer');
const CONFIG = require("../config/config");

module.exports = {
  name: 'importer.humhub.space',
  mixins: [HumHubImporterMixin],
  settings: {
    source: {
      humhub: {
        baseUrl: 'https://grandjardin.jardiniersdunous.org',
        jwtToken: process.env.SEMAPPS_HUMHUB_TOKEN,
        type: 'space',
      }
    }
  }
};
