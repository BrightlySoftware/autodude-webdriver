class BaseComponent {
    /**
     * Create a BaseComponent
     * @param {object}  expectedValues - an object containing sets of key value pair of expected values that can be referenced
     */
    constructor(expectedValues = {}) {
        this.expectedValues = expectedValues;
    }
}

module.exports = BaseComponent;