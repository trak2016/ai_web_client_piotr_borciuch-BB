var Error = (function () {
    function Error(json) {
        if (json != null) {
            this.message = json["message"];
        }
    }
    Error.prototype.toJson = function () {
        return null;
    };
    return Error;
})();
exports.Error = Error;
var AuthDTO = (function () {
    function AuthDTO(login, password) {
        this.login = login;
        this.password = password;
    }
    AuthDTO.prototype.getLogin = function () {
        return this.login;
    };
    AuthDTO.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return AuthDTO;
})();
exports.AuthDTO = AuthDTO;
var EmployeeDTO = (function () {
    function EmployeeDTO(json) {
        this.id = 0;
        this.name = "";
        this.surname = "";
        this.status = "";
        this.activeOrders = [];
        this.inactiveOrders = [];
        if (json != null) {
            this.id = json["id"];
            this.authenticationData = new AuthDTO(json['authenticationData']['login'], "");
            this.createRoles(json['roles']);
            this.name = json['name'];
            this.surname = json['surname'];
            this.position = new PositionDTO(json['position']);
            this.status = json["status"];
        }
        else {
            this.roles = [];
            this.status = "FIRED";
            this.position = new PositionDTO(null);
        }
    }
    EmployeeDTO.prototype.createRoles = function (rolesJson) {
        this.roles = new Array();
        for (var i = 0; i < rolesJson.length; i++) {
            this.roles.push(new RoleDTO(rolesJson[i]));
        }
    };
    EmployeeDTO.prototype.getPosition = function () {
        return this.position.name;
    };
    EmployeeDTO.prototype.getLogin = function () {
        return this.authenticationData.getLogin();
    };
    EmployeeDTO.prototype.setAuthenticationData = function (login, password) {
        this.authenticationData = new AuthDTO(login, password);
    };
    EmployeeDTO.prototype.getPrivileges = function () {
        var privileges = new Array(this.roles.length);
        for (var i = 0; i < this.roles.length; i++) {
            privileges.push(this.roles[i].name);
        }
        return privileges;
    };
    EmployeeDTO.prototype.createRoleFromPrivileges = function (privileges) {
        this.roles = new Array();
        console.log(privileges);
        for (var i = 0; i < privileges.length; i++) {
            var role = new RoleDTO(null);
            role.name = privileges[i];
            this.roles.push(role);
        }
    };
    EmployeeDTO.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return EmployeeDTO;
})();
exports.EmployeeDTO = EmployeeDTO;
var PositionDTO = (function () {
    function PositionDTO(json) {
        this.id = 0;
        this.name = "";
        this.employees = new Array();
        if (json != null) {
            this.id = json["id"];
            this.name = json["name"];
            this.prepareEmployees(json["employees"]);
        }
    }
    PositionDTO.prototype.prepareEmployees = function (json) {
        for (var i = 0; i < json.length; i++) {
            this.employees.push(new EmployeeDTO(json[i]));
        }
    };
    PositionDTO.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return PositionDTO;
})();
exports.PositionDTO = PositionDTO;
var RoleDTO = (function () {
    function RoleDTO(json) {
        if (json != null) {
            this.name = json["name"];
            this.id = json["id"];
            this.employeeId = json["employeeId"];
        }
    }
    RoleDTO.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return RoleDTO;
})();
var RestaurantTable = (function () {
    function RestaurantTable(json) {
        this.id = 0;
        this.tableNumber = 0;
        this.seatsNumber = 0;
        this.status = "UNOCCUPIED";
        if (json != null) {
            this.id = json["id"];
            this.tableNumber = json["tableNumber"];
            this.seatsNumber = json["seatsNumber"];
            this.status = json["status"];
        }
    }
    RestaurantTable.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    return RestaurantTable;
})();
exports.RestaurantTable = RestaurantTable;
//# sourceMappingURL=IDto.js.map