/**
 * Created by rodrigc on 21/04/2016.
 */

var assert = require('assert');
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();

describe('Test GameTwist App', function () {
    before(function () {
        driver.get('https://www.gametwist.com/en/');
        this.timeout(500000);
    });

    it('should login user successfully', function (done) {
        this.timeout(500000);

        driver.findElement(By.name('login-nickname')).sendKeys('user198686');
        driver.findElement(By.name('login-nickname')).click();
        driver.findElement(By.id('login-password')).sendKeys('teste1986');
        driver.findElement(By.id('login-password')).click();
        driver.findElement(By.css('.widget-login button')).click();

        driver.wait(until.stalenessOf(driver.findElement(By.css('.nickname'))), 500000);
        driver.wait(until.elementTextIs(driver.findElement(By.css('.nickname')), 'user198686'), 500000);

        driver.call(function () {
            done();
        });
    });

    it('should navigate between pages', function (done) {
        this.timeout(500000);

        driver.findElement(By.css('[href="/en/games/slots/"]')).click();
        driver.wait(until.titleIs('Slots'), 500000);

        driver.findElement(By.css('[href="/en/games/bingo/"]')).click();
        driver.wait(until.titleIs('Bingo'), 500000);

        driver.findElement(By.css('[href="/en/games/casino/"]')).click();
        driver.wait(until.titleIs('Casino'), 500000);

        driver.findElement(By.css('[href="/en/games/poker/"]')).click();
        driver.wait(until.titleIs('Poker'), 500000);

        driver.call(function () {
            done();
        });
    });

    it('should search for slot on the search games section', function (done) {
        this.timeout(500000);

        driver.findElement(By.id('ctl00_cphNavAndSearch_ctl01_gameSearch')).sendKeys('Slot');
        driver.wait(until.elementsLocated(By.css('.game-search__paging button')), 50000);
        driver.findElement(By.css('.btn--search')).click();

        driver.wait(until.titleIs('Crazy Slots'), 500000);
        driver.wait(until.elementsLocated(By.css('.similar-games')), 50000);

        driver.call(function () {
            done();
        });
    });

    it('should count a number of shown games and select one of them', function (done) {
        this.timeout(500000);

        driver.findElements(By.css('.similar-games li a.font--brand')).then(function (elems) {
            var length = elems.length;

            elems[2].getText().then(function (gameTitle) {

                driver.actions().mouseMove(elems[2]).perform();
                elems[2].click();

                driver.wait(until.titleIs(gameTitle), 50000);
            })
        });

        driver.call(function () {
            done();
        });
    });

    it('change the language from English to German', function (done) {
        this.timeout(500000);

        driver.get('https://www.gametwist.com/');
        driver.findElement(By.css('.authenticated .select-language')).click();
        driver.findElement(By.css('.authenticated [data-lang=de]')).click();

        driver.wait(until.titleIs('Online Casino kostenlos spielen | Gametwist'), 50000);

        driver.call(function () {
            done();
        });
    });

    it('should logout user successfully', function (done) {
        this.timeout(500000);

        driver.findElement(By.css('.nickname')).click();
        driver.findElement(By.css('.js-logout')).click();

        driver.wait(until.elementsLocated(By.css('.widget-login button')), 50000);

        driver.call(function () {
            done();
        });
    });
});