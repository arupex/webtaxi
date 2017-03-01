# 🚖 webtaxi 🚖
Wrapper for WebdriverIO to handle IOS/Android/Chrome all the same way

[![npm version](https://badge.fury.io/js/webtaxi.svg)](https://badge.fury.io/js/webtaxi)
[![dependencies](https://david-dm.org/arupex/webtaxi.svg)](http://github.com/arupex/webtaxi)
![Build Status](https://api.travis-ci.org/arupex/webtaxi.svg?branch=master) 
![lifetimeDownloadCount](https://img.shields.io/npm/dt/webtaxi.svg?maxAge=2592000)
<a href='https://pledgie.com/campaigns/31873'><img alt='Pledge To Arupex!' src='https://pledgie.com/campaigns/31873.png?skin_name=chrome' border='0' ></a>


This is a WIP, and should be used with caution!

#Hows it work?
WebTaxi finds elements based on element type / text / attributes
This internally finds the element in the XML and generates the appropriate Xpath (so it works on all platforms)
The Xpath is completely handled internally! and exposes nice getters/setters for text/value/click as well as raw source object based on xml turned into json via xml-js
    
#Install

    npm install webtaxi --save
    
#Usage

    import { WebTaxi } from 'webtaxi'
    
    let browser = new WebTaxi();
    
    let testButton = browser.find({
        tag : 'button',
        text : 'test'
    });
    
    console.log('testButton Text', testButton.text);
    
    testButton.click();
    
    
#WebTaxi
   
    constructor(optionalBrowser)
   
    findMultiple(WebTaxiLocator || Object)
   
    find(WebTaxiLocator || Object)

#WebTaxiLocator
    locationData =  {
                        tag : ‘button’,
                        text : ‘Welcome’,
                        attributes : {
                            color : ‘red'
                        }
                    }
                    
    constructor(locationData)

    tag : str
    text : ( str / regexp )
    attributes : object
    option(keyValue)
    query : object 
     
#WebTaxiElement

         text : string
         value : string
         click : void
         source : json representation of xml