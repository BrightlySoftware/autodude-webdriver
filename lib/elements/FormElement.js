const BaseElement = require('./BaseElement');


class FormElement extends BaseElement {

    /**
     * Perform the instance find function, then the SeleniumWebdriver clear function
     * @returns {Promise}
     */
    clear() {
        return this.find()
            .then(element => element.clear())
    }
}

module.exports = FormElement;