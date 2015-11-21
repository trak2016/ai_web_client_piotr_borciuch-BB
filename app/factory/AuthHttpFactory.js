var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
var AuthHttpFactory = (function () {
    function AuthHttpFactory() {
    }
    AuthHttpFactory.prototype.create = function () {
        if (this.http == null) {
            this.http = new angular2_jwt_1.AuthHttp({
                headerName: "Restaurant-Auth-Token",
                headerPrefix: "",
                tokenName: "userToken",
                noJwtError: true
            });
        }
        return this.http;
    };
    return AuthHttpFactory;
})();
exports.AuthHttpFactory = AuthHttpFactory;
//# sourceMappingURL=AuthHttpFactory.js.map