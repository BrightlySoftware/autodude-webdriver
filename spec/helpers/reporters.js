const jasmineReporters = require('jasmine-reporters');

// Adds a TeamCity reporter only if there is a TeamCity version detected.
if (process.env.TEAMCITY_VERSION) {
    jasmine.getEnv().addReporter(new jasmineReporters.TeamCityReporter());
}
