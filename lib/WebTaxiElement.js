/**
 * Created by daniel.irwin on 3/1/17.
 */

import { WebTaxiUtil } from './WebTaxiUtil';

var xmlJS = require('xml-js');


class WebTaxiElement {

    constructor(xpath, query) {
        this.query = query;
        console.log('this.query', this.query);
        this.xpath = xpath;
        console.log('this.xpath', this.xpath);
    }

    get text() {
        return browser.getText(this.xpath);
    }

    get value() {
        return browser.getValue(this.xpath);
    }

    set value(data) {
        browser.setValue(this.xpath, data);
    }

    click() {
        browser.click(this.xpath);
    }

    get source() {
        var xml = JSON.parse(xmlJS.xml2json(browser.getSource()));
        return WebTaxiUtil.findByXpath(this.xpath, xml);
    }

    attributes(optionalAttributeName) {

    }

    get json() {
        return {
            text: this.text,
            value: this.value,
            click: this.click,
            source: this.source
        };
    }
}

export { WebTaxiElement, WebTaxiElement as default };