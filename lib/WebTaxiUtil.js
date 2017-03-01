/**
 * Created by daniel.irwin on 3/1/17.
 */
import { WebTaxiElement } from './WebTaxiElement';

class WebTaxiUtil {


     static platformLocators = {
        ios: {
            label: 'XCUIElementTypeStaticText',
            textbox: 'XCUIElementTypeTextField',
            password : 'XCUIElementTypeSecureTextField',
            button: 'XCUIElementTypeButton'
        },
        android : {
            label : 'android.widget.TextView',
            textbox : 'android.widget.EditText',
            password : 'android.widget.EditText',
            button : 'android.widget.Button'
        },
        web : {
            label : 'span',
            textbox : 'textarea',
            password : 'input',
            button : 'button'
        }
    };

     static locators(platform){
         return platform?WebTaxiUtil.platformLocators[platform]:WebTaxiUtil.platformLocators.web;
     }

    static isMatch(locatorData, json) {

        if (locatorData.tag && locatorData.tag !== json.name) {
            return false;
        }

        if (locatorData.text) {


            var textEl;
            if (json.elements && Array.isArray(json.elements)) {
                textEl = json.elements.find((el) => el.type === 'text');
            }

            if(!textEl){
                //android
                if (json.attributes && json.attributes.text) {
                    textEl = json.attributes.text;
                }
                //IOS
                else if (json.attributes && json.attributes.label) {
                    textEl = json.attributes.label;
                }
            }
            else {//web
                textEl = textEl.text;
            }


            if(!textEl){
                return false;
            }

            if (typeof locatorData.text.test === 'function') {
                if(!locatorData.text.test(textEl)) {
                    return false;
                }
            }
            else if (locatorData.text !== textEl) {
                return false;
            }
        }

        if (locatorData.attributes) {
            return Object.keys(locatorData.attributes).every(key => {
                return locatorData.attributes[key] === json.attributes[key];
            });
        }

        return true;
    }

    static findByXpath(xpath, jsonXML){
        var q = xpath.split('/');

        //ignore root html element
        jsonXML = jsonXML.elements.find((el) => {
            return el.name === 'html';
        });

        q.forEach(tagName => {
            if (jsonXML && Array.isArray(jsonXML.elements)) {
                var elementType = {};
                let xm = jsonXML.elements.find((el) => {
                    if(!elementType[el.name]){
                        elementType[el.name] = 0;
                    }
                    elementType[el.name]++;
                    return (el.name + '[' + elementType[el.name] + ']') === tagName;
                });
                if (xm) {
                    jsonXML = xm;
                }
            }
        });
        return jsonXML;
    }

    static calculateXpath(elementLocator, jsonXML, platform){

        var tag = elementLocator.tag;
        //if platform convert element name
        if(platform && elementLocator.platformTag){
            elementLocator.tag = WebTaxiUtil.platformLocators[platform][elementLocator.platformTag] || tag;
        }

        var elements = [];
        var matches = [];
        if (typeof jsonXML.elements === 'object') {
            jsonXML.elements.forEach((element) => {

                // console.log('xpath', tag);
                elements.push({
                    xpath: '/',
                    element: element
                });
            });
        }

        while (elements.length > 0) {
            var el = elements.pop();

            if (el && typeof el.element.elements === 'object') {
                var domTypes = {};

                el.element.elements.forEach((element) => {

                    if (element.name) {
                        if(!domTypes[element.name]){
                            domTypes[element.name] = 0;
                        }
                        domTypes[element.name]++;

                        let xpath = el.xpath + '/' + element.name + '[' + domTypes[element.name] + ']';
                        elements.push({
                            xpath: xpath,
                            element: element
                        });

                        if (WebTaxiUtil.isMatch(elementLocator, element)) {
                            matches.push(new WebTaxiElement(xpath, elementLocator));
                        }
                        else {
                            // console.log('element', element);
                        }
                    }
                });
            }
        }

        if (matches) {
            return matches;
        }
    }
}

export { WebTaxiUtil, WebTaxiUtil as default };