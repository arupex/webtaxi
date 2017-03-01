/**
 * Created by daniel.irwin on 2/28/17.
 */
import { WebTaxi } from '../../../webtaxi';

module.exports = function(){

    this.Given(/^I load a page$/, function () {

        this.browser = new WebTaxi();
        browser.url('file://' + process.cwd() + '/test.html');
    });

    this.When(/^I pause for (\d+) seconds$/, function (seconds) {
        browser.pause(seconds * 1000);
    });




    this.When(/^I find an element:$/, function (table) {
        table.hashes();


        console.log('Result', (this.browser.find({
            tag : 'button',
            text : 'test'
        }).json));

    });

    this.Then(/^Its the element I want:$/, function (table) {
        table.hashes();
    });

};