/*
import { Injector, bind } from 'angular2/angular2';
import { Http, MockBackend, MockConnection, BaseRequestOptions, Response,ResponseOptions, Headers }
    from 'angular2/http';
import {RestApi} from '../../app/api/RestApi';
import {ResponseHandler} from '../../app/api/ResponseHandler';
import {IDto} from '../../app/DTO/IDto';


    describe("RestApi", function() {
        let connection;
        let injector;
        let backend;
        let testHeaders: Headers;

        beforeEach(() => {
            testHeaders = new Headers();
            testHeaders.append("Restaurant-Auth-Token", "token");
            injector = Injector.resolveAndCreate([
                BaseRequestOptions,
                MockBackend,
                bind(Http).toFactory((backend, options) => {
                    return new Http(backend, options)
                }, [MockBackend, BaseRequestOptions]),
                bind(RestApi).toFactory((http) => {
                    return new RestApi(http);
                }, [Http])
            ]);
            backend = injector.get(MockBackend);
            backend.connections.subscribe(c => connection = c);
        });

        it('Should connect and return status 201', () => {
            var options = new ResponseOptions({body: '{}', status: 201, headers: testHeaders});
            var restApi = injector.get(RestApi);
            restApi.registerHandler(new TestHandler(201, '{}'));
            restApi.postRequest("/testowy/url/bez/znaczenia", new TestDTO());
            connection.mockRespond(new Response(options));

        });

        it('Put should connect and return status 200', () => {
            var options = new ResponseOptions({body: '{}', status: 200, headers: testHeaders});
            var restApi = injector.get(RestApi);
            restApi.registerHandler(new TestHandler(200, '{}'));
            restApi.putRequest("/testowy/url/bez/znaczenia", new TestDTO());
            connection.mockRespond(new Response(options));
        });

        it('Get should connect and return status 200', () => {
            var options = new ResponseOptions({body: '{"id":1, "name": "some name"}', status: 200, headers: testHeaders});
            var restApi = injector.get(RestApi);
            restApi.registerHandler(new TestHandler(200, '{"id":1, "name": "some name"}'));
            restApi.getRequest("/testowy/url/bez/znaczenia", new TestDTO());
            connection.mockRespond(new Response(options));
        });

    });

    class TestHandler implements ResponseHandler{
        private expectedStatus: number;
        private expectedContent: string;

        constructor(status: number, content: string){
            this.expectedContent = content;
            this.expectedStatus = status;
        }

        handleResponse(response: Response) {
            expect(localStorage.getItem("authToken")).toBe("token");
            expect(response.status).toBe(this.expectedStatus);
            expect(response.text()).toBe(this.expectedContent);
        }
    }

    class TestDTO implements IDto {

        toJson():string {
            return '{"id": 1, "name": "nazwa"}';
        }
    }
*/ /*
import { Injector, bind } from 'angular2/angular2';
import { Http, MockBackend, MockConnection, BaseRequestOptions, Response,ResponseOptions, Headers }
    from 'angular2/http';
import {RestApi} from '../../app/api/RestApi';
import {IDto} from '../../app/DTO/IDto';


describe("RestApi", function() {
    let connection;
    let injector;
    let backend;
    let testHeaders: Headers;

    beforeEach(() => {
        testHeaders = new Headers();
        testHeaders.append("Restaurant-Auth-Token", "token");
        injector = Injector.resolveAndCreate([
            BaseRequestOptions,
            MockBackend,
            bind(Http).toFactory((backend, options) => {
                return new Http(backend, options)
            }, [MockBackend, BaseRequestOptions]),
            bind(RestApi).toFactory((http) => {
                return new RestApi(http);
            }, [Http])
        ]);
        backend = injector.get(MockBackend);
        backend.connections.subscribe(c => connection = c);
    });

    it('Should connect and return status 201', () => {
        var options = new ResponseOptions({body: '{}', status: 201, headers: testHeaders});
        var restApi = injector.get(RestApi);
        restApi.registerHandler(new TestHandler(201, '{}'));
        restApi.postRequest("/testowy/url/bez/znaczenia", new TestDTO());
        connection.mockRespond(new Response(options));

    });

    it('Put should connect and return status 200', () => {
        var options = new ResponseOptions({body: '{}', status: 200, headers: testHeaders});
        var restApi = injector.get(RestApi);
        restApi.registerHandler(new TestHandler(200, '{}'));
        restApi.putRequest("/testowy/url/bez/znaczenia", new TestDTO());
        connection.mockRespond(new Response(options));
    });

    it('Get should connect and return status 200', () => {
        var options = new ResponseOptions({body: '{"id":1, "name": "some name"}', status: 200, headers: testHeaders});
        var restApi = injector.get(RestApi);
        restApi.registerHandler(new TestHandler(200, '{"id":1, "name": "some name"}'));
        restApi.getRequest("/testowy/url/bez/znaczenia", new TestDTO());
        connection.mockRespond(new Response(options));
    });

});

class TestHandler implements ResponseHandler{
    private expectedStatus: number;
    private expectedContent: string;

    constructor(status: number, content: string){
        this.expectedContent = content;
        this.expectedStatus = status;
    }

    handleResponse(response: Response) {
        expect(localStorage.getItem("authToken")).toBe("token");
        expect(response.status).toBe(this.expectedStatus);
        expect(response.text()).toBe(this.expectedContent);
    }
}

class TestDTO implements IDto {

    toJson():string {
        return '{"id": 1, "name": "nazwa"}';
    }
}*/ 
//# sourceMappingURL=RestApiTest.js.map