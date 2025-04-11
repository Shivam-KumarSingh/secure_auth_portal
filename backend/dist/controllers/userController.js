"use strict";
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
exports.getProfile = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: { email, password: hashedPassword }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({
            status: 'success',
            data: { user: { id: user.id, email: user.email }, token }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            status: 'success',
            data: { user: { id: user.id, email: user.email }, token }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }
        const profile = yield prisma.user.findUnique({
            where: { id: user.id },
            select: { id: true, email: true, createdAt: true, updatedAt: true }
        });
        res.status(200).json({
            status: 'success',
            data: { user: profile }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProfile = getProfile;
