const QueueMixin = require("moleculer-bull");
const { HumHubImporterMixin } = require('@semapps/importer');
const SpaceManagerMixin = require('./mixins/space-manager');
const urlJoin = require("url-join");
const CONFIG = require("../config/config");
const { getSlugByUrl, replaceEmojisByUnicode } = require("./utils/utils");

module.exports = {
  name: 'importer.humhub.post',
  mixins: [SpaceManagerMixin, HumHubImporterMixin, CONFIG.QUEUE_SERVICE_URL ? QueueMixin(CONFIG.QUEUE_SERVICE_URL) : {}],
  settings: {
    source: {
      humhub: {
        baseUrl: 'https://jardiniersdunous.org',
        jwtToken: process.env.SEMAPPS_HUMHUB_TOKEN,
        type: 'post',
      }
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'documents'),
    },
    cronJob: CONFIG.QUEUE_SERVICE_URL ? {
      time: '0 0 4 * * *', // Every night at 4am
      timeZone: 'Europe/Paris'
    } : undefined
  },
  methods: {
    async transform(data) {
      const humhubSpace = this.getSpaceByContainerId(data.content.metadata.contentcontainer_id);
      if (!humhubSpace) return false;

      // Do not import the post if it is not linked to a circle
      const circleExist = await this.broker.call('ldp.resource.exist', {
        resourceUri: humhubSpace.circleUri,
        webId: 'system'
      });
      if (!circleExist) return false;

      const matches = data.message.match(/^## ([^\r]*)\r\n\r\n([\S\s]*)/)
      if (!matches) {
        this.logger.warn(`RegExp failed on string ${data.message}`);
        return false;
      }

      return({
        type: 'pair:Document',
        'pair:label': matches[1],
        'pair:description': replaceEmojisByUnicode(matches[2]).replace(/(\\\r\n|\r\n|\r|\n)/g, '\r\n'),
        'pair:documents': humhubSpace.circleUri,
        'pair:webPage': urlJoin(this.settings.source.humhub.baseUrl, data.content.metadata.url),
        'dc:creator': urlJoin(CONFIG.HOME_URL, 'users', getSlugByUrl(data.content.metadata.created_by.url))
      })
    }
  }
};
