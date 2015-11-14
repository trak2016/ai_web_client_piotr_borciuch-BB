var Token = (function () {
    function Token() {
        this._value = "Restaurant-Auth-Token";
    }
    Token.getInstance = function () {
        if (this.instance == null) {
            this.instance = new Token();
        }
        return this.instance;
    };
    Object.defineProperty(Token.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Token.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    return Token;
})();
exports.Token = Token;
//# sourceMappingURL=Token.js.map