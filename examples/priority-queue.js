const HCCrawler = require('headless-chrome-crawler');
const path = require('path');

(async () => {
  const crawler = await HCCrawler.launch({
    executablePath: path.resolve(__dirname, '../chrome-win32/chrome.exe'),
    maxConcurrency: 1,
    onSuccess: result => {
      console.log(`Requested ${result.options.url}.`);
    },
  });
  await crawler.queue({ url: 'https://example.com/', priority: 1 });
  await crawler.queue({ url: 'https://example.net/', priority: 2 }); // This queue is requested before the previous queue
  await crawler.onIdle();
  await crawler.close();
})();
