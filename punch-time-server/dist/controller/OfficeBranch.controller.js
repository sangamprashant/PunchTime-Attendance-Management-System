"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranchByPincode = exports.getBranchById = exports.getAllBranches = exports.createBranch = void 0;
const OfficeBranchService = __importStar(require("../services/OfficeBranch.service"));
const errorMessage_1 = __importDefault(require("../utils/errorMessage"));
const createBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branch = yield OfficeBranchService.createBranch(req.body);
        res.status(201).json(branch);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorMessage_1.default)(error) });
    }
});
exports.createBranch = createBranch;
const getAllBranches = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branches = yield OfficeBranchService.getBranches();
        res.json(branches);
    }
    catch (error) {
        res.status(500).json({ message: (0, errorMessage_1.default)(error) });
    }
});
exports.getAllBranches = getAllBranches;
const getBranchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branch = yield OfficeBranchService.getBranchById(req.params.id);
        if (!branch)
            return res.status(404).json({ message: "Branch not found" });
        res.json(branch);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorMessage_1.default)(error) });
    }
});
exports.getBranchById = getBranchById;
const getBranchByPincode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branches = yield OfficeBranchService.getBranchByPincode(Number(req.params.pincode));
        res.json(branches);
    }
    catch (error) {
        res.status(400).json({ message: (0, errorMessage_1.default)(error) });
    }
});
exports.getBranchByPincode = getBranchByPincode;
