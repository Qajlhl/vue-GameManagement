import { ResultData } from '../utils/ResultData';
import { BaseService } from './base.service';
export declare class CouponTypeService extends BaseService {
    findForPageByExample(pno: number, psize: number, name: string, remark: string, tableName: string): ResultData;
}