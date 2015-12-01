/**
 * Created by test on 2015-11-28.
 */
var SharedMemory = (function () {
    function SharedMemory() {
        this.appErrors = [];
        this.userLogin = null;
        this.userLogin = sessionStorage.getItem("userLogin");
        this.userPrivileges = sessionStorage.getItem("userPrivileges") != null ?
            sessionStorage.getItem("userPrivileges") : '0000';
    }
    SharedMemory.prototype.clear = function () {
        this.userLogin = null;
        this.userPrivileges = '0000';
    };
    return SharedMemory;
})();
exports.SharedMemory = SharedMemory;
//# sourceMappingURL=SharedMemory.js.map