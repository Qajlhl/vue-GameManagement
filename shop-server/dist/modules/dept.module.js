"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeptModule = void 0;
const common_1 = require("@nestjs/common");
const dept_controller_1 = require("../controllers/dept.controller");
const dept_service_1 = require("../services/dept.service");
let DeptModule = class DeptModule {
};
DeptModule = __decorate([
    common_1.Module({
        controllers: [dept_controller_1.DeptController],
        providers: [dept_service_1.DeptService],
    })
], DeptModule);
exports.DeptModule = DeptModule;
//# sourceMappingURL=dept.module.js.map