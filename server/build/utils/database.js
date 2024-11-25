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
exports.removeOrder = exports.addOrder = exports.updateOrder = exports.removeProduct = exports.addProduct = exports.removeUser = exports.addUser = exports.orderDB = exports.userDB = exports.productDB = void 0;
const nedb_1 = __importDefault(require("nedb"));
const path_1 = __importDefault(require("path"));
// Define the path to the data directory
const dataDir = path_1.default.join(__dirname, '../../data');
// Initialize NeDB for products
exports.productDB = new nedb_1.default({
    filename: path_1.default.join(dataDir, 'products.db'),
    autoload: true,
});
// Initialize NeDB for users
exports.userDB = new nedb_1.default({
    filename: path_1.default.join(dataDir, 'users.db'),
    autoload: true,
});
// Initialize NeDB for orders
exports.orderDB = new nedb_1.default({
    filename: path_1.default.join(dataDir, 'orders.db'),
    autoload: true,
});
// Function to get the next unique ID
const getNextId = (db) => {
    return new Promise((resolve, reject) => {
        db.find({}).sort({ id: -1 }).limit(1).exec((err, docs) => {
            if (err)
                return reject(err);
            const maxId = docs.length > 0 ? docs[0].id : 0;
            resolve(maxId + 1);
        });
    });
};
// Add a user
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield getNextId(exports.userDB);
    const newUser = Object.assign({ id }, user);
    return new Promise((resolve, reject) => {
        exports.userDB.insert(newUser, (err, insertedUser) => {
            if (err)
                return reject(err);
            resolve({ id: insertedUser.id });
        });
    });
});
exports.addUser = addUser;
// Remove a user
const removeUser = (id) => {
    return new Promise((resolve, reject) => {
        exports.userDB.remove({ id }, {}, (err, numRemoved) => {
            if (err)
                return reject(err);
            resolve(numRemoved > 0);
        });
    });
};
exports.removeUser = removeUser;
// Add a product
const addProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield getNextId(exports.productDB);
    const newProduct = Object.assign({ id }, product);
    return new Promise((resolve, reject) => {
        exports.productDB.insert(newProduct, (err, insertedProduct) => {
            if (err)
                return reject(err);
            resolve({ id: insertedProduct.id });
        });
    });
});
exports.addProduct = addProduct;
// Remove a product
const removeProduct = (id) => {
    return new Promise((resolve, reject) => {
        exports.productDB.remove({ id }, {}, (err, numRemoved) => {
            if (err)
                return reject(err);
            resolve(numRemoved > 0);
        });
    });
};
exports.removeProduct = removeProduct;
// Update an order
const updateOrder = (id, updates) => {
    return new Promise((resolve, reject) => {
        exports.orderDB.update({ id }, { $set: updates }, {}, (err, numReplaced) => {
            if (err)
                return reject(err);
            resolve(numReplaced > 0);
        });
    });
};
exports.updateOrder = updateOrder;
// Add an order
const addOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield getNextId(exports.orderDB);
    const newOrder = Object.assign(Object.assign({ id }, order), { createdAt: new Date(), updatedAt: new Date() });
    return new Promise((resolve, reject) => {
        exports.orderDB.insert(newOrder, (err, insertedOrder) => {
            if (err)
                return reject(err);
            resolve({ id: insertedOrder.id });
        });
    });
});
exports.addOrder = addOrder;
// Remove an order
const removeOrder = (id) => {
    return new Promise((resolve, reject) => {
        exports.orderDB.remove({ id }, {}, (err, numRemoved) => {
            if (err)
                return reject(err);
            resolve(numRemoved > 0);
        });
    });
};
exports.removeOrder = removeOrder;
