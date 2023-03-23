module.exports = {
    'Netflix IR Website': function (browser) {
        browser 
            .url('https://ir.netflix.net/') //1. Open the web browser and navigate to the Netflix IR website: https://ir.netflix.net/.
            .waitForElementVisible('body', 1000) //Verify that the website's homepage is displayed with the latest news and events related to Netflix.
            .click('#navbar-investor-relations') //3. Click on the ‘Investor Relations’ tab.
            .waitForElementVisible('#financials', 1000) //Verify that the page is displaying the financials, corporate governance, and other relevant information.
            .click('#navbar-events-and-presentations') //5. Click on the ‘Events & Presentations’ tab.
            .waitForElementVisible('#upcoming-events', 1000) //Verify that the page is displaying all the upcoming and past events related to Netflix.
            .click('#navbar-stock-information') //7. Click on the ‘Stock Information’ tab.
            .waitForElementVisible('#stock-price-summary', 1000) //Verify that the page is displaying the stock prices, performance, and other related information.
            .click('#navbar-sec-filings') //9. Click on the ‘SEC Filings’ tab.
            .waitForElementVisible('#all-sec-filings', 1000) //Verify that the page is displaying all the SEC filings by Netflix.
            .setValue('#user_login', 'testUserName') //11. Log in to the website with the provided test account credentials.
            .setValue('#user_password', 'testPassword')
            .click('#user_submit')
            .waitForElementVisible('#user_menu', 1000) //Verify that the user is logged in successfully.
            .click('#user_menu')
            .click('#user_logout') //13. Log out from the website.
            .waitForElementVisible('#user_login', 1000) //Verify that the user is logged out successfully.
            .end();
    }
};