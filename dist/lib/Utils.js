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
exports.Utils = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Utils {
    constructor() {
        this.findNested = (dir, pattern) => {
            let results = [];
            fs_1.default.readdirSync(dir).forEach(inner_dir => {
                inner_dir = path_1.default.resolve(dir, inner_dir);
                const stat = fs_1.default.statSync(inner_dir);
                if (stat.isDirectory()) {
                    results = results.concat(this.findNested(inner_dir, pattern));
                }
                if (stat.isFile() && inner_dir.endsWith(pattern)) {
                    results.push(inner_dir);
                }
            });
            return results;
        };
        this.loadModules = (dir) => __awaiter(this, void 0, void 0, function* () {
            const jsFiles = this.findNested(path_1.default.join(__dirname, `${path_1.default.sep}${dir}${path_1.default.sep}`), '.js');
            const folderName = dir.split(`.${path_1.default.sep}`)[dir.split(`.${path_1.default.sep}`).length - 1];
            if (jsFiles.length <= 0)
                return console.log(`There are no ${folderName} to load.`);
            console.log(`Loading ${jsFiles.length} ${folderName.substring(0, folderName.length - 1)}${jsFiles.length <= 1 ? '' : 's'}...`);
            jsFiles.forEach(file => {
                require(file);
            });
        });
        this.formatSeconds = (seconds) => {
            return new Date(seconds * 1000).toISOString().substr(11, 8);
        };
        this.replaceStrChar = (str, index, replacement) => {
            return str.substr(0, index) + replacement + str.substr(index + replacement.length);
        };
        this.truncateStr = (str, length) => {
            return (str.length > length) ? str.substr(0, length - 1) + '...' : str;
        };
    }
}
exports.Utils = Utils;
