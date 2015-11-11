/// <reference path="../../../../typings/tsd.d.ts" />
require('zone.js');
require('reflect-metadata');
require('zone.js');
require('reflect-metadata');
var http_1 = require('angular2/http');
var angular2_1 = require('angular2/angular2');
var RestApi_1 = require('../../../app/api/RestApi');
describe("RestApi", function () {
    var connection;
    var injector;
    var backend;
    var http;
    beforeEach(function () {
        injector = angular2_1.Injector.resolveAndCreate([
            http_1.BaseRequestOptions,
            http_1.MockBackend,
            angular2_1.bind(http_1.Http).toFactory(function (backend, options) {
                return new http_1.Http(backend, options);
            }, [http_1.MockBackend, http_1.BaseRequestOptions]),
            angular2_1.bind(RestApi_1.RestApi).toFactory(function (http) {
                return new RestApi_1.RestApi(http);
            }, [http_1.Http])
        ]);
        backend = injector.get(http_1.MockBackend);
        backend.connections.subscribe(function (c) { return connection = c; });
    });
    it('Should connect and return status 201', function () {
        var options = new http_1.ResponseOptions({ body: '{}', status: 201, headers: new http_1.Headers() });
        var restApi = injector.get(RestApi_1.RestApi);
        restApi.registerHandler(new TestHandler(201, '{}'));
        restApi.postRequest("/testowy/url/bez/znaczenia", new TestDTO());
        connection.mockRespond(new http_1.Response(options));
    });
    it('Put should connect and return status 200', function () {
        var options = new http_1.ResponseOptions({ body: '{}', status: 200, headers: new http_1.Headers() });
        var restApi = injector.get(RestApi_1.RestApi);
        restApi.registerHandler(new TestHandler(200, '{}'));
        restApi.putRequest("/testowy/url/bez/znaczenia", new TestDTO());
        connection.mockRespond(new http_1.Response(options));
    });
    it('Get should connect and return status 200', function () {
        var options = new http_1.ResponseOptions({ body: '{"id":1, "name": "some name"}', status: 200, headers: new http_1.Headers() });
        var restApi = injector.get(RestApi_1.RestApi);
        restApi.registerHandler(new TestHandler(200, '{"id":1, "name": "some name"}'));
        restApi.getRequest("/testowy/url/bez/znaczenia", new TestDTO());
        connection.mockRespond(new http_1.Response(options));
    });
});
var TestHandler = (function () {
    function TestHandler(status, content) {
        this.expectedContent = content;
        this.expectedStatus = status;
    }
    TestHandler.prototype.handleResponse = function (response) {
        expect(response.status).toBe(this.expectedStatus);
        expect(response.text()).toBe(this.expectedContent);
    };
    return TestHandler;
})();
var TestDTO = (function () {
    function TestDTO() {
    }
    TestDTO.prototype.toJson = function () {
        return '{"id": 1, "name": "nazwa"}';
    };
    return TestDTO;
})();
//# sourceMappingURL=RestApiTest.js.map