const HCCrawler = require('headless-chrome-crawler');
const path = require('path');

(async () => {
  const crawler = await HCCrawler.launch({
    executablePath: path.resolve(__dirname, '../chrome-win32/chrome.exe'),
    evaluatePage: () => ({
      title: $('title').text(),
    }),
    onSuccess: result => {
      console.log(`Got ${result.result.title} for ${result.options.url}.`);
    },
  });
  await crawler.queue('https://example.com/'); // Queue a request
  await crawler.queue(['https://example.net/', { url: 'https://example.org/' }]); // Queue multiple requests in different styles
  await crawler.onIdle();
  await crawler.close();
})();
