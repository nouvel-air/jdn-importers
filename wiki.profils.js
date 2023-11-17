const { YesWikiImporterMixin } = require('@semapps/importer');

module.exports = {
  name: 'importer.wiki.profils',
  mixins: [YesWikiImporterMixin],
  settings: {
    source: {
      yeswiki: {
        baseUrl: 'https://wiki.jardiniersdunous.org',
        oldApi: true,
        formId: 1000
      }
    }
  }
};
