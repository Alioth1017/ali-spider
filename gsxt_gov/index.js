const puppeteer = require('puppeteer');
const path = require('path');
const file = require('./file');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: path.resolve(__dirname, '../chrome-win32/chrome.exe'),
    headless: false
  });
  const page = await browser.newPage();
  let res = await page.goto(
    'https://www.baidu.com/s?ie=utf-8&wd=%E5%A3%81%E7%BA%B8', {
      waitUntil: 'networkidle0'
    });
  // let cookies = await page.cookies();
  // console.log(cookies)
  // await page.setCookie(cookies);
  // if (res._status == 521) {
  //   res = await page.reload({
  //     waitUntil: 'networkidle0'
  //   });
  //   console.log(res._status)
  // }

  // try {
  //   file.write('./tmp/page.txt', await page.content());
  //   file.write('./tmp/res.txt', res);
  // } catch (error) {
  //   file.write('./tmp/err.txt', error);
  // }
  // await page.goto('http://www.gsxt.gov.cn/corp-query-entprise-info-hot-search-list.html?province=100000');
  // await page.screenshot({
  //   path: 'example.png'
  // });
  setTimeout(browser.close, 10000);
})();