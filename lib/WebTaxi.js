/**
 * Created by daniel.irwin on 3/1/17.
 */

import { WebTaxiUtil } from './WebTaxiUtil';

class WebTaxi {

    browser = null;
    xmlJS = null;
    platform = null;

    constructor(manualSetBrowser, platform) {
        this.browser = manualSetBrowser || global.browser;
        this.xmlJS = require('xml-js');
        this.platform = platform;

        if (typeof this.browser === 'undefined') {
            throw new Error('You did not include a browser and there is no global browser installed');
        }
    }

    find(locatorData) {
        return this.findMultiple(locatorData)[0];
    }

    findMultiple(locatorData) {
        var xml = JSON.parse(this.xmlJS.xml2json(this.browser.getSource()));

        return WebTaxiUtil.calculateXpath(locatorData, xml, this.platform);
    }

    dom(){
        var dom = {};
        Object.keys(WebTaxiUtil.locators(this.platform)).forEach( key => {
            dom[key] = this.findMultiple({ platformTag : key });
        });
        return dom;
    }

}

export { WebTaxi, WebTaxi as default };