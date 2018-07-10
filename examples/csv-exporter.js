const HCCrawler = require('headless-chrome-crawler');
const CSVExporter = require('headless-chrome-crawler/exporter/csv');
const path = require('path');

const FILE = './tmp/result.csv';

const exporter = new CSVExporter({
  file: FILE,
  fields: ['response.url', 'response.status', 'links.length'],
});

(async () => {
  const crawler = await HCCrawler.launch({
    executablePath: path.resolve(__dirname, '../chrome-win32/chrome.exe'),
    maxDepth: 2,
    exporter,
  });
  await crawler.queue('https://example.com/');
  await crawler.onIdle();
  await crawler.close();
})();
