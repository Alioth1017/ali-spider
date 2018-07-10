const HCCrawler = require('headless-chrome-crawler');
const path = require('path');

(async () => {
  const crawler = await HCCrawler.launch({
    executablePath: path.resolve(__dirname, '../chrome-win32/chrome.exe'),
    evaluatePage: () => {
      throw new Error("Global functions won't be called");
    },
    onSuccess: result => {
      console.log(`Got ${result.result.title} for ${result.options.url}.`);
    },
  });
  await crawler.queue({
    url: 'https://example.com/',
    evaluatePage: () => ({
      title: $('title').text(),
    }),
  });
  await crawler.onIdle();
  await crawler.close();
})();
