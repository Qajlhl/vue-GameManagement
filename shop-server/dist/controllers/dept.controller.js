"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeptController = void 0;
const common_1 = require("@nestjs/common");
const dept_service_1 = require("../services/dept.service");
const ResultData_1 = require("../utils/ResultData");
const passport_1 = require("@nestjs/passport");
const dept_entity_1 = require("../entity/dept.entity");
const swagger_1 = require("@nestjs/swagger");
let DeptController = class DeptController {
    constructor(deptService) {
        this.deptService = deptService;
    }
    findAll() {
        return this.deptService.findAll('dept');
    }
    findForPage(pno = 1, psize = 10, name) {
        return this.deptService.
            findForPageByExample(pno, psize, name, 'dept');
    }
    deleteById(id) {
        return this.deptService.deleteById(id, 'dept');
    }
    insert(dept) {
        return this.deptService.insertOne(dept, 'dept');
    }
    update(dept) {
        return this.deptService.updateOne(dept, 'dept');
    }
    findById(id) {
        return this.deptService.findById(id, 'dept');
    }
    findDeptAndUser() {
        return this.deptService.findDeptAndUser();
    }
    deleteDeptUser(id) {
        return this.deptService.deleteDeptUser(id, 'dept');
    }
    addUser(ids, id) {
        return this.deptService.addUser(ids, id, 'dept');
    }
};
__decorate([
    common_1.Get('/list/all'),
    swagger_1.ApiOperation({ summary: '?????????????????????' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", ResultData_1.ResultData)
], DeptController.prototype, "findAll", null);
__decorate([
    common_1.Get('/list/page'),
    swagger_1.ApiOperation({ summary: '???????????????????????????' }),
    swagger_1.ApiQuery({
        name: 'pno',
        description: '??????',
        example: 1
    }),
    swagger_1.ApiQuery({
        name: 'psize',
        description: '???????????????',
        example: 10
    }),
    swagger_1.ApiQuery({
        name: 'name',
        description: '??????????????????????????????',
        example: '??????',
        required: false
    }),
    __param(0, common_1.Query('pno')),
    __param(1, common_1.Query('psize')),
    __param(2, common_1.Query('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", ResultData_1.ResultData)
], DeptController.prototype, "findForPage", null);
__decorate([
    common_1.Delete('/delete/id/:id'),
    swagger_1.ApiOperation({ summary: '??????id????????????' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", ResultData_1.ResultData)
], DeptController.prototype, "deleteById", null);
__decorate([
    common_1.Put('/insert'),
    swagger_1.ApiOperation({ summary: '????????????' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_entity_1.Dept]),
    __metadata("design:returntype", ResultData_1.ResultData)
], DeptController.prototype, "insert", null);
__decorate([
    common_1.Put('/update'),
    swagger_1.ApiOperation({ summary: '????????????' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dept_entity_1.Dept]),
    __metadata("design:returntype", ResultData_1.ResultData)
], DeptController.prototype, "update", null);
__decorate([
    common_1.Get('/find/id/:id'),
    swagger_1.ApiOperation({ summary: '??????id????????????' }),
    swagger_1.ApiParam({
        name: 'id',
        description: '???id'
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", ResultData_1.ResultData)
], DeptController.prototype, "findById", null);
__decorate([
    common_1.Get('/list/user'),
    swagger_1.ApiOperation({ summary: '????????????????????????' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeptController.prototype, "findDeptAndUser", null);
__decorate([
    common_1.Delete('/delete/user'),
    swagger_1.ApiOperation({ summary: '??????????????????' }),
    swagger_1.ApiQuery({
        name: 'id',
        description: '???id'
    }),
    __param(0, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", ResultData_1.ResultData)
], DeptController.prototype, "deleteDeptUser", null);
__decorate([
    common_1.Put('/add/user'),
    swagger_1.ApiQuery({
        name: 'ids',
        description: '??????id?????????'
    }),
    swagger_1.ApiQuery({
        name: 'id',
        description: '?????????id'
    }),
    __param(0, common_1.Query('ids')), __param(1, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", ResultData_1.ResultData)
], DeptController.prototype, "addUser", null);
DeptController = __decorate([
    swagger_1.ApiTags("????????????"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller("/dept"),
    __metadata("design:paramtypes", [dept_service_1.DeptService])
], DeptController);
exports.DeptController = DeptController;
//# sourceMappingURL=dept.controller.js.map