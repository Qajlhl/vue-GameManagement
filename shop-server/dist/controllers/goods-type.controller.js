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
exports.GoodsTypeController = void 0;
const common_1 = require("@nestjs/common");
const goods_type_service_1 = require("../services/goods-type.service");
const ResultData_1 = require("../utils/ResultData");
const passport_1 = require("@nestjs/passport");
const goods_type_entity_1 = require("../entity/goods-type.entity");
const swagger_1 = require("@nestjs/swagger");
let GoodsTypeController = class GoodsTypeController {
    constructor(goodsTypeService) {
        this.goodsTypeService = goodsTypeService;
    }
    findAll() {
        return this.goodsTypeService.findAll('goods-type');
    }
    findForPage(pno = 1, psize = 10, name, remark) {
        return this.goodsTypeService.findForPageByExample(pno, psize, name, remark, 'goods-type');
    }
    deleteById(id) {
        return this.goodsTypeService.deleteById(id, 'goods-type');
    }
    insert(goodsType) {
        goodsType.insertTime = new Date().getTime();
        return this.goodsTypeService.insertOne(goodsType, 'goods-type');
    }
    update(goodsType) {
        return this.goodsTypeService.updateOne(goodsType, 'goods-type');
    }
    findById(id) {
        return this.goodsTypeService.findById(id, 'goods-type');
    }
};
__decorate([
    common_1.Get('/list/all'),
    swagger_1.ApiOperation({ summary: '???????????????????????????' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", ResultData_1.ResultData)
], GoodsTypeController.prototype, "findAll", null);
__decorate([
    common_1.Get('/list/page'),
    swagger_1.ApiOperation({ summary: '?????????????????????????????????' }),
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
    swagger_1.ApiQuery({
        name: 'remark',
        description: '????????????????????????',
        example: '??????',
        required: false
    }),
    __param(0, common_1.Query('pno')),
    __param(1, common_1.Query('psize')),
    __param(2, common_1.Query('name')),
    __param(3, common_1.Query('remark')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", ResultData_1.ResultData)
], GoodsTypeController.prototype, "findForPage", null);
__decorate([
    common_1.Delete('/delete/id/:id'),
    swagger_1.ApiOperation({ summary: '??????id??????????????????' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", ResultData_1.ResultData)
], GoodsTypeController.prototype, "deleteById", null);
__decorate([
    common_1.Put('/insert'),
    swagger_1.ApiOperation({ summary: '??????????????????' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goods_type_entity_1.GoodsType]),
    __metadata("design:returntype", ResultData_1.ResultData)
], GoodsTypeController.prototype, "insert", null);
__decorate([
    common_1.Put('/update'),
    swagger_1.ApiOperation({ summary: '??????????????????' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goods_type_entity_1.GoodsType]),
    __metadata("design:returntype", ResultData_1.ResultData)
], GoodsTypeController.prototype, "update", null);
__decorate([
    common_1.Get('/find/id/:id'),
    swagger_1.ApiOperation({ summary: '??????id??????????????????' }),
    swagger_1.ApiParam({
        name: 'id',
        description: '?????????id'
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", ResultData_1.ResultData)
], GoodsTypeController.prototype, "findById", null);
GoodsTypeController = __decorate([
    swagger_1.ApiTags("??????????????????"),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Controller("/goods-type"),
    __metadata("design:paramtypes", [goods_type_service_1.GoodsTypeService])
], GoodsTypeController);
exports.GoodsTypeController = GoodsTypeController;
//# sourceMappingURL=goods-type.controller.js.map