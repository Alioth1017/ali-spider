const HCCrawler = require('headless-chrome-crawler');
const path = require('path');
const file = require('./file');

const PATH = path.resolve(__dirname, './tmp/');

// let cookies = undefined;
(async () => {
  const crawler = await HCCrawler.launch({
    // Set chrome drive path
    executablePath: path.resolve(__dirname, '../chrome-win32/chrome.exe'),
    // Open chrome
    headless: false,
    customCrawl: async (page, crawl) => {
      // if (cookies) {
      //   await page.setCookie(...cookies);
      // }
      // The result contains options, links, cookies and etc.
      const result = await crawl();
      // You can access the page object after requests
      result.content = await page.content();
      if (result.response.status != 200) {
        // cookies = await page.cookies();
        throw new Error('cookie expired!');
      }

      // file.write(`./tmp/linka${new Date().getTime()}`, await page.select('a'));
      // You need to extend and return the crawled result
      return result;
    },
    preRequest: options => {
      // if (!options.saveAs) return false; // Skip the request by returning false
      // file.write('./tmp/options' + new Date().getTime(), options);
      if (options.saveAs) {
        options.screenshot = {
          path: path.resolve(PATH, encodeURIComponent(options.url) + options.saveAs),
          fullPage: true
        };
      }
      return true;
    },
    onSuccess: result => {
      // console.log(result.response.status, `Got ${result.content} for ${result.options.url}.`);
      file.write(`./tmp/links_${encodeURIComponent(result.options.url)}`, result.links);
      file.write(`./tmp/content_${encodeURIComponent(result.options.url)}`, result.content);
    },
    onError: error => {
      file.write(`./tmp/error_${encodeURIComponent(error.options.url)}`, error);
    },
    // 关闭机器人访问限制
    obeyRobotsTxt: false,
    waitUntil: 'networkidle0',
    retryCount: 1,
    retryDelay: 1000,
    maxConcurrency: 1,
    delay: 5000
  });
  await crawler.queue({
    // url: 'http://www.gsxt.gov.cn/corp-query-entprise-info-hot-search-list.html?province=100000',
    url: 'https://www.baidu.com/s?ie=utf-8&wd=%E5%A3%81%E7%BA%B8',
    saveAs: '.png',
    maxDepth: 1
  });
  // await crawler.queue('http://www.gsxt.gov.cn/corp-query-entprise-info-hot-search-list.html?province=100000');
  await crawler.onIdle();
  setTimeout(async () => {
    await crawler.close();
  }, 5000);
})();