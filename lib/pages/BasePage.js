class BasePage {

    /**
     * Create a BasePage
     * @param {object} expectedValues - an object containing sets of key value pair of expected values that can be referenced
     * @param {object} options
     * @param {string} options.baseUrl - the baseUrl of a web page (e.g. https://www.google.com)
     * @param {string} options.path - the remaining portion of the path of the page (e.g. /maps)
     */
    constructor(expectedValues = {}, options = {}) {
        this.expectedValues = expectedValues;
        this.baseUrl = options.baseUrl || '';
        this.path = options.path || '';
        this.url = this.baseUrl + this.path;
    }

    /**
     * Invokes Selenium WebDriver getCurrentUrl to get the current browser's URL
     * If it's different than instance's current URL, invokes the Selenium WebDriver get function to navigate to the instance's URL.
     * @returns {Promise}
     */
    navigateTo() {
        return driver.getCurrentUrl()
            .then((url) => {
                if (url !== this.url) {
                    return driver.get(this.url);
                }
                return Promise.resolve();
            });
    }

    /**
     * Convenience wrapper for the validateUrl and validateTitle functions
     * @returns {Promise}
     */
    validateNavigationSuccess() {
        return this.validateUrl()
            .then(() => this.validateTitle());
    }

    /**
     * Calls the Selenium WebDriver getTitle function and asserts that its equal to the instance's expectedValues.title
     * @returns {Promise}
     */
    validateTitle() {
        return driver.getTitle()
            .then(currentTitle => expect(currentTitle).toBe(this.expectedValues.title));
    }

    /**
     * Invokes the Selenium WebDriver getCurrentUrl function then asserts that the  current URL matches the instance url
     * @returns {Promise}
     */
    validateUrl() {
        return driver.getCurrentUrl()
            .then(currentUrl => expect(currentUrl).toBe(this.url));
    }
}

module.exports = BasePage;
