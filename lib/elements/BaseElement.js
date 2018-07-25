/** Class representing a BaseElement */

class BaseElement {

    /**
     * Create a BaseElement
     * @param {object}  locator - the Selenium Webdriver By locator (e.g. By.id("Login")
     */
    constructor(locator) {
        this.locator = locator;
        this.locatorString = `{Locator: ${locator}}`
    };

    /**
     * Finds all elements with the instance's locator
     * then invokes the Selenium Webdriver click method on the one with the corresponding index value.
     * @param {number} [index=0]  - The index value of the element with the appropriate locator to click (defaults to 0)
     * @returns {Promise}
     */
    click(index = 0) {
        return this.findElements()
            .then(elements => elements[index].click());
    };

    /**
     * Invokes the Selenium WebDriver findElement function with the object's locator.
     * @returns {Promise} - A Selenium WebDriver WebElementPromise
     */
    find() {
        return driver.findElement(this.locator);
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver findElement function for a descendant of that element.
     * @param {object} childElement - the SeleniumWebdriver ByLocator of the child to be found (e.g. By.id('Password')
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    findChild(childElement) {
        return this.find()
            .then(element => element.findElement(childElement.locator))
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver findElements function for descendants of that element.
     * @param {object} childElement - the SeleniumWebdriver ByLocator of the child to be found (e.g. By.id('Password')
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    findChildren(childElement) {
        return this.find()
            .then(element => element.findElements(childElement.locator))
    };

    /**
     * Invokes the Selenium WebDriver findElements function with the object's locator.
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    findElements() {
        return driver.findElements(this.locator)
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver getAttribute function with the attributeName parameter.
     * @param {string} attributeName - string representing the name of the html property to be retrieved from the element
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    getAttribute(attributeName) {
        return this.find()
            .then(element => element.getAttribute(attributeName))
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver getCssValue function with the attributeName parameter.
     * @param {string} propertyName - string representing the name of the CSS property to be retrieved from the element
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    getCssValue(propertyName) {
        return this.find()
            .then(element => element.getCssValue(propertyName))
    };

    /**
     * Creates a border around the result of the find function
     * - Should only be used for debug purposes -
     * @returns {Promise}
     */
    // NOTE: This doesn't actually test anything - it just creates a border around the element, giving you a better idea of what element your locator is actually selecting
    highlight() {
        return driver.executeScript('arguments[0].style.border="thick solid #0000FF";', this.find())
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver getText function
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    getText() {
        return this.find()
            .then(element => element.getText())
    };

    /**
     * Executes the native javascript function scrollIntoView inside of the browser using the found WebDriver Element
     * @returns {Promise}
     */
    scrollTo() {
        return driver.executeScript('arguments[0].scrollIntoView(true);', this.find())
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver sendKeys function passing in the keysToSend
     * @param {*} keysToSend - any valid string or key object recognized by Selenium WebDriver
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    sendKeys(keysToSend) {
        return this.find()
            .then(element => element.sendKeys(keysToSend))
    };

    /**
     * Finds the element with the instance locator, then invokes the Selenium Webdriver setAttribute function passing in the value attribute and the value input parameter
     * @param {string} value - the value to set the HTML 'value' attribute of the element to.
     * @returns {Promise} - A Selenium Webdriver WebElementPromise
     */
    setValue(value) {
        return this.find()
            .then(element => element.setAttribute('value', value))
    };


    /**
     * Calls the WebDriver wait function to wait for the result of the findElements function to return an array with more than 0 values in it.
     * @param {number} [timeout=20000] amount of time to pass into the selenium driver.wait function
     * @returns {Promise}
     */
    waitFor(timeout = 20000) {
        return driver.wait(() => this.findElements()
            .then(elements => elements.length > 0),
            timeout,
            `waitFor timed out after ${timeout} ms. ${this.locatorString}`
        )};

    /**
     * Calls the WebDriver wait function to wait for the result of the getAttribute function to return a non-null value.
     * @param {string} attribute - the string value representing the name of the HTML attribute to be waited for.
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForAttributeToExist(attribute, timeout = 20000) {
        return driver.wait(() => this.getAttribute(attribute) !== null,
            timeout,
            `waitForAttributeToExist timed out after ${timeout} ms. {Attribute: ${attribute} }, ${this.locatorString}`)
    };

    /**
     * Calls the WebDriver wait function to wait for the result of the findElements function to return an array with a number of elements equal to the count parameter.
     * @param {number} count - the count to wait for the result of the findElements function to return
     * @param {number} [timeout=20000] - number of milliseconds to pass into the selenium driver.wait function to wait for
     * @returns {Promise}
     */
    waitForElementCount(count, timeout = 20000) {
        return driver.wait(() => {
                return this.findElements().then(elements => {
                    return elements.length === count;
                })
            },
            timeout,
            `waitForElementCount timed out after ${timeout} ms. {Count: ${count}}, ${this.locatorString}`
    )};

    /**
     * Calls the WebDriver wait function to wait for the result of the getAttribute function to return a specific value.
     * @param {string} attribute - the name of the HTML attribute to be retrieved
     * @param {string} value - the value of the attribute which is being waited for
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForAttributeValue(attribute, value, timeout = 20000) {
        return driver.wait(() => {
            return this.getAttribute(attribute).then((result) => value === result)
        },
        timeout,
        `waitForAttributeValue timed out after ${timeout} ms. {Attribute: ${attribute} }, {Value: ${value} }, ${this.locatorString}`
    )};

    /**
     * Calls the WebDriver wait function to wait for the result of the getAttribute function to contain a specific value.
     * @param {string} attribute - the name of the HTML attribute to be retrieved
     * @param {string} value - the value of the attribute which is being waited for
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForAttributeValueToContain(attribute, value, timeout = 20000) {
        return driver.wait(() => {
                return this.getAttribute(attribute).then((result) => result.includes(value))
            },
            timeout,
            `waitForAttributeValueToContain timed out after ${timeout} ms. {Attribute: ${attribute} }, {Value: ${value} }, ${this.locatorString}`
        )};

    /**
     * Calls the WebDriver wait function to wait for the result of the getAttribute function to not contain a specific value.
     * @param {string} attribute - the name of the HTML attribute to be retrieved
     * @param {string} value - the value of the attribute which is being waited for
     * @param {number} [timeout=20000] amount of time to pass into the Selenium driver.wait function
     * @returns {Promise}
     */
    waitForAttributeValueToNotContain(attribute, value, timeout = 20000) {
        return driver.wait(() => {
                return this.getAttribute(attribute).then((result) => !result.includes(value))
            },
            timeout,
            `waitForAttributeValueToNotContain timed out after ${timeout} ms. {Attribute: ${attribute} }, {Value: ${value} }, ${this.locatorString}`
        )};

    /**
     * Performs an assertion that the result of the findElements function returns an array with a length of 0.
     * @returns {Promise}
     */
    assertIsNotPresent() {
        return this.findElements()
            .then(elements => expect(elements.length).toBe(0));
    };

    /**
     * Performs an assertion that the result of the findElements function returns an array with a length greater than 0.
     * @returns {Promise}
     */
    assertIsPresent() {
        return this.findElements()
            .then(elements => expect(elements.length).toBeGreaterThan(0));
    };

    /**
     * Performs an assertion that the result of the getText function equals the input parameter.
     * @param {string} textToAssert - the string that is being compared to the result of the getText function
     * @returns {Promise}
     */
    assertText(textToAssert) {
        return this.getText()
            .then(text => expect(text).toBe(textToAssert));
    };

    /**
     * Performs an assertion that the result of the getText function does not contain the input string
     * @param {string} textToAssert - the string that is being compared to the result of the getText function
     * @returns {Promise}
     */
    assertTextToContain(textToAssert) {
        return this.getText()
            .then(text => expect(text).toContain(textToAssert));
    };

    /**
     * Performs an assertion that the result of the WebElement isDisplayed function returns true.
     * @returns {Promise}
     */
    assertIsDisplayed() {
        return this.isDisplayed()
            .then(displayed => expect(displayed).toBe(true,
                `An element was expected to be displayed, but was not displayed or found on the DOM. ${this.locatorString}`));
    }

    /**
     * Performs an assertion that the result of the WebElement isDisplayed function returns false.
     * @returns {Promise}
     */
    assertIsNotDisplayed() {
        return this.isDisplayed()
            .then(displayed => expect(displayed).toBe(false,
                `An element was not expected to be displayed, but was displayed. ${this.locatorString}`));
    }

    /**
     * Finds all elements with the instance's locator, then evaluates the returned array. If there are
     * no elements present in the array, returns false. Otherwise, evaluates the element at the corresponding
     * index using WebDriver isDisplayed.
     * @param {number} [index=0]  - The index value of the element with the appropriate locator to evaluate (defaults to 0)
     * @returns {Promise}
     */
    isDisplayed(index = 0) {
        return this.findElements()
            .then(elements => {
                return (elements.length === 0) ? false : elements[index].isDisplayed();
            })
    }
}

module.exports = BaseElement;
