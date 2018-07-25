const BaseElement = require('../lib/elements/BaseElement');

describe('Base Element', () => {
    let testElement;
    let childElement;
    let mockWebElementPromise;
    const testLocator = 'testLocator';
    const childLocator = 'childLocator';
    const getTextTest = 'getTextTest';

    beforeEach(() => {

        testElement = new BaseElement(testLocator);
        childElement = new BaseElement(childLocator);

        // Mocked version of selenium's WebDriver class set to the global driver
        // See: http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html
        driver = {
            findElement: () => Promise.resolve(mockWebElementPromise),
            findElements: () => Promise.resolve([mockWebElementPromise, mockWebElementPromise]),
            executeScript: () => Promise.resolve(),
            wait: () => Promise.resolve()
        };

        // Mock version of selenium's WebElementPromise
        // See: http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElementPromise.html
        mockWebElementPromise = {
            click: () => Promise.resolve(),
            findElement: () => Promise.resolve(mockWebElementPromise),
            findElements: () => Promise.resolve([mockWebElementPromise]),
            getAttribute: () => Promise.resolve(),
            getText: () => Promise.resolve(getTextTest),
            sendKeys: () => Promise.resolve(),
            setAttribute: () => Promise.resolve(),
            isDisplayed: () => Promise.resolve()
        };

        spyOn(mockWebElementPromise, 'click').and.callThrough();
        spyOn(mockWebElementPromise, 'findElement').and.callThrough();
        spyOn(mockWebElementPromise, 'findElements').and.callThrough();
        spyOn(mockWebElementPromise, 'getAttribute').and.callThrough();
        spyOn(mockWebElementPromise, 'getText').and.callThrough();
        spyOn(mockWebElementPromise, 'sendKeys').and.callThrough();
        spyOn(mockWebElementPromise, 'setAttribute').and.callThrough();
        spyOn(mockWebElementPromise, 'isDisplayed').and.callThrough();

        spyOn(driver, 'executeScript').and.callThrough();
        spyOn(driver, 'findElement').and.callThrough();
        spyOn(driver, 'findElements').and.callThrough();
        spyOn(driver, 'wait').and.callThrough();
    });

    it('should have a locator attribute that matches was passed in the constructor', () => {
        expect(testElement.locator).toBe(testLocator);
    });

    describe('find method', () => {
        beforeEach(() => expect(driver.findElement).not.toHaveBeenCalledWith(testLocator));

        it('should call the driver findElement method', () => {
            testElement.find()
                .then(() => expect(driver.findElement).toHaveBeenCalledWith(testLocator));
        });
    });

    describe('findChild method', () => {
        beforeEach(() => {
            spyOn(testElement, 'find').and.returnValue(Promise.resolve(mockWebElementPromise));
            expect(mockWebElementPromise.findElement).not.toHaveBeenCalled();
        });

        it('should call the WebElementPromise findElement method for the child object', () => {
            testElement.findChild(childElement)
                .then(() => {
                    expect(mockWebElementPromise.findElement).toHaveBeenCalledWith(childLocator);
                    expect(testElement.find).toHaveBeenCalled();
                });
        });
    });

    describe('findChildren method', () => {
        beforeEach(() => {
            spyOn(testElement, 'find').and.returnValue(Promise.resolve(mockWebElementPromise));
            expect(mockWebElementPromise.findElements).not.toHaveBeenCalled();
        });

        it('should call the WebElementPromise findElements method for the child object', () => {
            testElement.findChildren(childElement)
                .then(() => {
                    expect(mockWebElementPromise.findElements).toHaveBeenCalledWith(childLocator);
                    expect(testElement.find).toHaveBeenCalled();
                });
        });
    });

    describe('findElements method', () => {
        beforeEach(() => {
            expect(driver.findElements).not.toHaveBeenCalledWith(testLocator);
        });

        it('should call the driver findElements method', () => {
            testElement.findElements()
                .then(() => expect(driver.findElements).toHaveBeenCalledWith(testLocator));
        });
    });

    describe('click method', () => {
        let mockWebElementPromise2;

        beforeEach(() => {
            mockWebElementPromise2 = {
                click: () => Promise.resolve()
            };

            spyOn(mockWebElementPromise2, 'click').and.callThrough();
            expect(mockWebElementPromise.click).not.toHaveBeenCalled();
            expect(mockWebElementPromise2.click).not.toHaveBeenCalled();

            testElement.findElements = () => Promise.resolve([mockWebElementPromise, mockWebElementPromise2]);
            spyOn(testElement, 'findElements').and.callThrough();
        });

        it('should call the WebElementPromise click method for the 0th element by default', (done) => {
            testElement.click()
                .then(() => {
                    expect(mockWebElementPromise.click).toHaveBeenCalled();
                    expect(mockWebElementPromise2.click).not.toHaveBeenCalled();
                    expect(testElement.findElements).toHaveBeenCalled();
                })
                .then(done, done.fail);
        });

        it('should call the WebElementPromise click method for the element in the argument', (done) => {
            testElement.click(1)
                .then(() => {
                    expect(mockWebElementPromise.click).not.toHaveBeenCalled();
                    expect(mockWebElementPromise2.click).toHaveBeenCalled();
                })
                .then(done, done.fail);
        });
    });

    describe('getAttribute method', () => {
        beforeEach(() => {
            spyOn(testElement, 'find').and.returnValue(Promise.resolve(mockWebElementPromise));
            expect(mockWebElementPromise.getAttribute).not.toHaveBeenCalled();
            expect(testElement.find).not.toHaveBeenCalled();
        });

        it('should call the WebElementPromise getAttribute method', (done) => {
            let attributeName = 'testAttribute';
            testElement.getAttribute(attributeName)
                .then(() => {
                    expect(mockWebElementPromise.getAttribute).toHaveBeenCalledWith(attributeName);
                    expect(testElement.find).toHaveBeenCalled();
                })
                .then(done, done.fail);
        });
    });

    describe('getText method', () => {
        beforeEach(() => {
            spyOn(testElement, 'find').and.returnValue(Promise.resolve(mockWebElementPromise));
            expect(mockWebElementPromise.getText).not.toHaveBeenCalled();
            expect(testElement.find).not.toHaveBeenCalled();
        });

        it('should call the WebElementPromise getText method', (done) => {
            testElement.getText()
                .then(() => {
                    expect(mockWebElementPromise.getText).toHaveBeenCalled();
                    expect(testElement.find).toHaveBeenCalled();
                })
                .then(done, done.fail);
        });
    });

    describe('scrollTo method', () => {
        beforeEach(() => {
            expect(driver.executeScript).not.toHaveBeenCalled();
        });

        it('should call the driver executeScript method and pass in the object', (done) => {
            testElement.scrollTo()
                .then(() => expect(driver.executeScript).toHaveBeenCalledWith('arguments[0].scrollIntoView(true);'))
                .then(done, done.fail);
        });
    });

    describe('sendKeys method', () => {
        beforeEach(() => {
            spyOn(testElement, 'find').and.returnValue(Promise.resolve(mockWebElementPromise));
            expect(mockWebElementPromise.sendKeys).not.toHaveBeenCalled();
            expect(testElement.find).not.toHaveBeenCalled();
        });

        it('should call the WebElementPromise sendKeys method', (done) => {
            const testString = 'testString';

            testElement.sendKeys(testString)
                .then(() => {
                    expect(mockWebElementPromise.sendKeys).toHaveBeenCalledWith(testString);
                    expect(testElement.find).toHaveBeenCalled();
                })
                .then(done, done.fail);
        });
    });

    describe('setValue method', () => {
        beforeEach(() => {
            spyOn(testElement, 'find').and.returnValue(Promise.resolve(mockWebElementPromise));
            expect(mockWebElementPromise.setAttribute).not.toHaveBeenCalled();
            expect(testElement.find).not.toHaveBeenCalled();
        });

        it('should call the WebElementPromise setAttribute method for the value attribute', (done) => {
            const testString = 'testString';

            testElement.setValue(testString)
                .then(() => {
                    expect(mockWebElementPromise.setAttribute).toHaveBeenCalledWith('value', testString);
                    expect(testElement.find).toHaveBeenCalled();
                })
                .then(done, done.fail);
        });
    });

    describe('waitFor method', () => {
        beforeEach(() => expect(driver.wait).not.toHaveBeenCalled());

        it('should call the driver waitFor method', (done) => {
            testElement.waitFor()
                .then(() => expect(driver.wait).toHaveBeenCalled())
                .then(done, done.fail);
        });
    });

    describe('waitForAttributeToExist method', () => {
        beforeEach(() => expect(driver.wait).not.toHaveBeenCalled());

        it('should call the driver waitForAttributeToExist method', (done) => {
            testElement.waitForAttributeToExist()
                .then(() => expect(driver.wait).toHaveBeenCalled())
                .then(done, done.fail);
        });
    });

    describe('waitForElementCount method', () => {
        beforeEach(() => expect(driver.wait).not.toHaveBeenCalled());

        it('should call the waitForElementCount method', (done) => {
            testElement.waitForElementCount()
                .then(() => expect(driver.wait).toHaveBeenCalled())
                .then(done, done.fail);
        });
    });

    describe('waitForAttributeValue method', () => {
        beforeEach(() => expect(driver.wait).not.toHaveBeenCalled());

        it('should call the waitForAttributeValue method', (done) => {
            testElement.waitForAttributeValue()
                .then(() => expect(driver.wait).toHaveBeenCalled())
                .then(done, done.fail);
        });
    });

    describe('waitForAttributeValueToContain method', () => {
        beforeEach(() => expect(driver.wait).not.toHaveBeenCalled());

        it('should call the waitForAttributeValueToContain method', (done) => {
            testElement.waitForAttributeValueToContain()
                .then(() => expect(driver.wait).toHaveBeenCalled())
                .then(done, done.fail);
        });
    });

    describe('waitForAttributeValueToNotContain method', () => {
        beforeEach(() => expect(driver.wait).not.toHaveBeenCalled());

        it('should call the waitForAttributeValueToNotContain method', (done) => {
            testElement.waitForAttributeValueToNotContain()
                .then(() => expect(driver.wait).toHaveBeenCalled())
                .then(done, done.fail);
        });
    });

    describe('isDisplayed method', () => {
        let mockWebElementPromise2;

        beforeEach(() => {
            mockWebElementPromise2 = {
                isDisplayed: () => Promise.resolve()
            };

            spyOn(mockWebElementPromise2, 'isDisplayed').and.callThrough();
            expect(mockWebElementPromise.isDisplayed).not.toHaveBeenCalled();
            expect(mockWebElementPromise2.isDisplayed).not.toHaveBeenCalled();

            testElement.findElements = () => Promise.resolve([mockWebElementPromise, mockWebElementPromise2]);
            spyOn(testElement, 'findElements').and.callThrough();
        });

        it('should call the WebElementPromise isDisplayed method for the 0th element by default', (done) => {
            testElement.isDisplayed()
                .then(() => {
                    expect(mockWebElementPromise.isDisplayed).toHaveBeenCalled();
                    expect(mockWebElementPromise2.isDisplayed).not.toHaveBeenCalled();
                    expect(testElement.findElements).toHaveBeenCalled();
                })
                .then(done, done.fail);
        });

        it('should call the WebElementPromise isDisplayed method for the element in the argument', (done) => {
            testElement.isDisplayed(1)
                .then(() => {
                    expect(mockWebElementPromise.isDisplayed).not.toHaveBeenCalled();
                    expect(mockWebElementPromise2.isDisplayed).toHaveBeenCalled();
                })
                .then(done, done.fail);
        });
    });
});