exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./src/tests/app/**/*.js'],
    capabilities: {
        browserName: 'firefox'
    }
}