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
const dataDir = path_1.default.join(__dirname, '../../data');
/**
 * Datastore for products, with each product having an ID, name, price, and optional image.
 * Products are stored in a NeDB database.
 *
 * @type {Datastore<{ id: number; name: string; price: number; description: string; image?: string }>}
 */
exports.productDB = new nedb_1.default({
    filename: path_1.default.join(dataDir, 'products.db'),
    autoload: true,
});
/**
 * Datastore for users, with each user having an ID, name, email, and password.
 * Users are stored in a NeDB database.
 *
 * @type {Datastore<{ id: number; name: string; email: string; password: string }>}
 */
exports.userDB = new nedb_1.default({
    filename: path_1.default.join(dataDir, 'users.db'),
    autoload: true,
});
/**
 * Datastore for orders, with each order having an ID, a user ID, a list of products with quantities,
 * a status, and timestamps for creation and optional updates.
 * Orders are stored in a NeDB database.
 *
 * @type {Datastore<{ id: number; userId: number; products: { id: number; name: string; price: number; image?: string; quantity: number }[]; status: string; createdAt: Date; updatedAt?: Date }>}
 */
exports.orderDB = new nedb_1.default({
    filename: path_1.default.join(dataDir, 'orders.db'),
    autoload: true,
});
/**
 * Generates the next unique ID for a new entry in the database.
 *
 * @param {Datastore<any>} db - The NeDB datastore instance.
 * @returns {Promise<number>} A promise that resolves to the next unique ID.
 */
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
/**
 * Adds a new user to the database.
 *
 * @param {Object} user - An object containing the name, email, and password of the user.
 * @returns {Promise<{id: number}>} A promise that resolves to an object containing the ID of the added user.
 */
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
/**
 * Removes a user from the database by their ID.
 *
 * @param {number} id - The ID of the user to remove.
 * @returns {Promise<boolean>} A promise that resolves to true if the removal was successful, otherwise false.
 */
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
/**
 * Adds a new product to the database.
 *
 * @param {Object} product - An object containing the name, price, and optional image of the product.
 * @returns {Promise<{id: number}>} A promise that resolves to an object containing the ID of the added product.
 */
const addProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield getNextId(exports.productDB);
    const newProduct = Object.assign({ id }, product);
    return new Promise((resolve, reject) => {
        exports.productDB.insert(newProduct, (err, insertedProduct) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ id: insertedProduct.id });
            }
        });
    });
});
exports.addProduct = addProduct;
/**
 * Removes a product from the database by its ID.
 *
 * @param {number} id - The ID of the product to remove.
 * @returns {Promise<boolean>} A promise that resolves to true if the removal was successful, otherwise false.
 */
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
/**
 * Updates an existing order with the specified ID and updates.
 *
 * @param id - The ID of the order to update.
 * @param updates - An object containing the fields to update.
 * @returns A promise that resolves to true if the update was successful, otherwise false.
 */
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
/**
 * Adds a new order to the database.
 *
 * @param order - The order details to add.
 * @returns {Promise<{ id: number }>} A promise that resolves to an object containing the new order's ID.
 */
const addOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield getNextId(exports.orderDB);
    const newOrder = Object.assign({ id }, order);
    return new Promise((resolve, reject) => {
        exports.orderDB.insert(newOrder, (err, doc) => {
            if (err)
                return reject(err);
            resolve({ id: doc.id });
        });
    });
});
exports.addOrder = addOrder;
/**
 * Removes an order from the database by its ID.
 *
 * @param id - The ID of the order to remove.
 * @returns A promise that resolves to true if the removal was successful, otherwise false.
 */
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
