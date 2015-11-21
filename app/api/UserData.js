/**
 * Created by test on 2015-11-18.
 */
var UserData = (function () {
    function UserData() {
    }
    Object.defineProperty(UserData.prototype, "login", {
        get: function () {
            return this.authenticationData.login;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "privileges", {
        get: function () {
            var privileges = new String[this.roles.length];
            var i = 0;
            this.roles.forEach(function (role) {
                privileges.push(role.name);
            });
            return privileges;
        },
        enumerable: true,
        configurable: true
    });
    return UserData;
})();
exports.UserData = UserData;
var AuthenticationData = (function () {
    function AuthenticationData() {
    }
    return AuthenticationData;
})();
var RoleDTO = (function () {
    function RoleDTO() {
    }
    return RoleDTO;
})();
//# sourceMappingURL=UserData.js.map