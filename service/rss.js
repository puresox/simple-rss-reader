const request = require('request-promise');
const articleModel = require('../service/article');
const { parseString } = require('xml2js');
const moment = require('moment');

module.exports = {
  getXml2js: async function getXml2js(uri) {
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
    const rssLink = rssObj['atom:link'][0].$.href;
    const link = rssObj.link[0];
    return {
      name,
      description,
      rssLink,
      link,
    };
  },

  updateArticlesForOneSource: async function updateArticlesForOneSource(sourceid, rss) {
    const updateArticlesPromises = [];
    const { item: articles } = await this.getXml2js(rss);
    const article = await articleModel.findLatestBySource(sourceid);
    let latestPubDate;
    if (article) {
      latestPubDate = moment(article.pubDate);
    } else {
      latestPubDate = moment(0);
    }
    for (let index = 0; index < articles.length; index += 1) {
      const thePubDate = moment(articles[index].pubDate[0]);
      if (thePubDate <= latestPubDate) {
        break;
      }
      const { title: [title], description: [description], link: [link] } = articles[index];
      updateArticlesPromises.push(articleModel.create(sourceid, title, thePubDate.format(), description, link));
    }
    await Promise.all(updateArticlesPromises);
  },

  updateArticlesForAllSource: async function updateArticlesForAllSource(sources) {
    const updateArticlesPromises = [];
    sources.forEach(({ id, rss }) => {
      updateArticlesPromises.push(this.updateArticlesForOneSource(id, rss));
    });
    await Promise.all(updateArticlesPromises);
  },
};
