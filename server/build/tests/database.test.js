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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../utils/database");
describe('Database Operations', () => {
    it('should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { name: 'Test User', email: 'test@example.com', password: 'password123' }; // Include password
        const result = yield (0, database_1.addUser)(user);
        expect(result).toHaveProperty('id');
        expect(typeof result.id).toBe('number');
    }));
    it('should remove a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = 1;
        const result = yield (0, database_1.removeUser)(userId);
        expect(result).toBe(true);
    }));
    it('should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = { name: 'Test Product', price: 100 };
        const result = yield (0, database_1.addProduct)(product);
        expect(result).toHaveProperty('id');
        expect(typeof result.id).toBe('number');
    }));
    it('should remove a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const productId = 1;
        const result = yield (0, database_1.removeProduct)(productId);
        expect(result).toBe(true);
    }));
});
