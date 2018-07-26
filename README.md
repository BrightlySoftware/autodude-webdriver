# AutoDude-Webdriver

**AutoDude-Webdriver** is a collection of convenience wrappers around Selenium WebDriver that establishes base classes and methods utilizing the Page Object Model.

## Prerequisites
Peer Dependency on Selenium-WebDriver

## Usage
The intended hierarchy is that Pages can contain Elements and Components, Components can also contain Elements and other Components.

Pages should not reference other pages - any action taking place between multiple pages should take place in a seperate helper to reduce the chances of circular references.

Inside of your test directory, create a base page for your application that extends Base Page.

Any interaction with elements that is unique to your application should be created in a class that extends BaseElement.

## Setup
npm install --save-dev @dudesolutions/autodude-webdriver
