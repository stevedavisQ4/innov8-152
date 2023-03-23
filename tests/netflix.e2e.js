module.exports = {
  'Netflix IR Website Test': function (browser) {
    browser
      .url('https://ir.netflix.net/')
      .waitForElementVisible('body', 1000)
      .assert.title('Netflix Investor Relations')
      .assert.containsText('div.container > h1', 'Investor Relations')
      .click('a[href="/investors"]')
      .waitForElementVisible('div.container > h2', 1000)
      .assert.containsText('div.container > h2', 'Investor Relations')
      .click('a[href="/sec-filings"]')
      .waitForElementVisible('div.container > h2', 1000)
      .assert.containsText('div.container > h2', 'SEC Filings')
      .click('a[href="/sec-filings/Form-10K-for-the-year-ended-December-31-2020"]')
      .waitForElementVisible('div.container > h2', 1000)
      .assert.containsText('div.container > h2', 'Form 10-K for the year ended December 31, 2020')
      .click('a[href="/stock-information"]')
      .waitForElementVisible('div.container > h2', 1000)
      .assert.containsText('div.container > h2', 'Stock Information')
      .click('a[href="/about"]')
      .waitForElementVisible('div.container > h2', 1000)
      .assert.containsText('div.container > h2', 'About Netflix')
      .click('a[href="/login"]')
      .setValue('input[name=email]', 'test@example.com')
      .setValue('input[name=password]', 'testpassword')
      .click('input[type="submit"]')
      .waitForElementVisible('div.container > h2', 1000)
      .assert.containsText('div.container > h2', 'My Profile')
      .end();
  }
};