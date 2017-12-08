const request = require('request-promise');
const { parseString } = require('xml2js');

module.exports = {
  getXml2js: async (uri) => {
    const options = {
      uri,
      simple: false,
      resolveWithFullResponse: true,
    };
    const { body } = await request(options);
    const obj = await new Promise((resolve, reject) => {
      parseString(body, (err, { rss: { channel: [result] } }) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return obj;
  },

  getSourceInfo: async (rssObj) => {
    const name = rssObj.title[0];
    const description = rssObj.description[0];
    const rss = rssObj['atom:link'][0].$.href;
    const link = rssObj.link[0];
    return {
      name,
      description,
      rss,
      link,
    };
  },

  getArticles: async ({ item }) => {
    const articles = item;
    return articles;
  },
};
