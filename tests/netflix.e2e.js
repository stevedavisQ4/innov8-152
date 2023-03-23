module.exports = {
  'Netflix IR Website': function (browser) {
    browser
      .url('https://ir.netflix.net/')  //Navigate to the Netflix IR website
      .assert.urlEquals('https://ir.netflix.net/') //Verify that the website's homepage is displayed
      .assert.visible('a[href="/events"]') //Verify that you can select the news and events in the navigation bar
      .click('a[href="/events"]') //Click on the news and events tab
      .waitForElementVisible('input[name="username"]') //Verify that the login page is displayed
      .setValue('input[name="username"]', '<test_user_name>') //Enter the test username
      .setValue('input[name="password"]', '<test_password>') //Enter the test password
      .click('input[type="submit"]') //Click the submit button
      .waitForElementVisible('div[class="profile-name"]') //Verify that you have successfully logged in
      .assert.containsText('div[class="profile-name"]', '<test_user_name>') //Verify that the page displays your profile name
      .assert.visible('a[href="/financials"]') //Verify that you can access financials
      .click('a[href="/financials"]') //Click on the financials tab
      .waitForElementVisible('div[class="financials-data"]') //Verify that the financials information is displayed
      .click('a[href="/financials/download-data"]') //Verify that the financials information can be downloaded
      .waitForElementVisible('div[class="logout"]') //Verify that you have successfully logged out
      .end();
  }
};