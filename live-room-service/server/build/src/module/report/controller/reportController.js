"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var reportService_1 = __importDefault(require("../service/reportService"));
var baseController_1 = __importDefault(require("../../base/controller/baseController"));
var ReportController = /** @class */ (function (_super) {
    __extends(ReportController, _super);
    function ReportController(entityService, prefix, option) {
        return _super.call(this, entityService, prefix, option) || this;
    }
    /**
     * getCustomRouter
     * 自定义扩展路由
     */
    ReportController.prototype.getCustomRouter = function () {
        var _this = this;
        return [
            // 自定义扩展
            {
                url: this.profix + "/resolveStatus",
                method: "post",
                function: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    var obj, ret;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                obj = ctx.request.body;
                                return [4 /*yield*/, this.entityService.resolveStatus(obj)];
                            case 1:
                                ret = _a.sent();
                                if (ret) {
                                    ctx.response.body = {
                                        code: 200,
                                        data: ret
                                    };
                                }
                                else {
                                    ctx.response.body = {
                                        code: 503,
                                        data: null,
                                        errMsg: "保存失败，请稍后再试"
                                    };
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }
            },
            {
                url: this.profix + "/createList",
                method: "post",
                function: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    var obj, ret;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                obj = ctx.request.body;
                                return [4 /*yield*/, this.entityService.createList(obj)];
                            case 1:
                                ret = _a.sent();
                                if (ret) {
                                    ctx.response.body = {
                                        code: 200,
                                        data: ret
                                    };
                                }
                                else {
                                    ctx.response.body = {
                                        code: 503,
                                        data: null,
                                        errMsg: "保存失败，请稍后再试"
                                    };
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }
            },
            {
                url: this.profix + "/resolveList",
                method: "post",
                function: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, pageNum, _c, pageSize, where, obj, key, ret;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _a = ctx.request.body, _b = _a.pageNum, pageNum = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c, where = __rest(_a, ["pageNum", "pageSize"]);
                                // console.log(ctx.request.body);
                                //获取搜索参数
                                where = where || {};
                                obj = {};
                                for (key in where) {
                                    if (where[key] && where[key] !== '') {
                                        obj[key] = where[key];
                                    }
                                }
                                where = obj;
                                return [4 /*yield*/, this.entityService.resolveList(pageNum, pageSize, where)];
                            case 1:
                                ret = _d.sent();
                                if (ret) {
                                    ctx.response.body = {
                                        code: 200,
                                        data: ret
                                    };
                                }
                                else {
                                    ctx.response.body = {
                                        code: 503,
                                        data: null,
                                        errMsg: "查询失败"
                                    };
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }
            }
        ];
    };
    return ReportController;
}(baseController_1.default));
var projectController = new ReportController(reportService_1.default, "/api/report", {
    infoCacheable: false
});
var projectRouter = projectController
    .getBaseRouter()
    .concat(projectController.getCustomRouter());
exports.default = projectRouter;
