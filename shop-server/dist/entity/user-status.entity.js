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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UserStatus {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty({
        description: '员工状态id（增加时不需要传）',
        example: '1',
    }),
    __metadata("design:type", Number)
], UserStatus.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty({
        description: '员工状态名称',
        example: '科技',
    }),
    __metadata("design:type", String)
], UserStatus.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty({
        description: '员工状态备注',
        example: '备注',
    }),
    __metadata("design:type", String)
], UserStatus.prototype, "remark", void 0);
exports.UserStatus = UserStatus;
//# sourceMappingURL=user-status.entity.js.map