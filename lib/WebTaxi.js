/**
 * Created by daniel.irwin on 3/1/17.
 */

import { WebTaxiUtil } from './WebTaxiUtil';

class WebTaxi {

    browser = null;
    xmlJS = null;

    constructor(manualSetBrowser) {
        this.browser = manualSetBrowser || global.browser;
        this.xmlJS = require('xml-js');

        if (typeof this.browser === 'undefined') {
            throw new Error('You did not include a browser and there is no global browser installed');
        }
    }

    find(locatorData) {
        return this.findMultiple(locatorData)[0];
    }

    findMultiple(locatorData) {
        var xml = JSON.parse(this.xmlJS.xml2json(this.browser.getSource()));

        return WebTaxiUtil.calculateXpath(locatorData, xml);
    }

}

export { WebTaxi, WebTaxi as default };