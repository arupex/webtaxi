/**
 * Created by daniel.irwin on 3/1/17.
 */


class WebTaxiLocator {
    internalQuery = {};

    // {
    //     tag : ‘button’,
    //     text : ‘Welcome’,
    //     attributes : {
    //         color : ‘red'
    //     }
    // }

    constructor(query) {
        this.internalQuery = query;
    }

    get tag(){
        return this.internalQuery.tag;
    }

    set tag(data){
        this.internalQuery.tag = data;
    }

    get text(){
        return this.internalQuery.text;
    }

    set text(data){
        this.internalQuery.text = data;
    }

    get attributes(){
        return this.internalQuery.attributes;
    }

    set attributes(data){
        this.internalQuery.attributes = data;
    }

    get query() {
        return this.internalQuery;
    }

    set query(data) {
        this.internalQuery = data;
    }

    set option(keyValue) {
        switch (keyValue.key) {

            //these are root level attributes
            case 'text':
            case 'tag':
                this.internalQuery[keyValue.key] = keyValue.value;

            default:
                if (this.internalQuery.attributes) {
                    this.internalQuery.attributes[keyValue.key] = keyValue.value;
                }
        }
    }
}

export { WebTaxiLocator, WebTaxiLocator as default };