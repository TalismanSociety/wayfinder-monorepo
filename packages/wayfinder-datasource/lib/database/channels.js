"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chains_1 = __importDefault(require("./chains"));
const tokens_1 = __importDefault(require("./tokens"));
const pallets_1 = __importDefault(require("./pallets"));
const channels = {
    'chain1.chain2': {
        id: 'chain1.chain2',
        source: chains_1.default.chain1,
        destination: chains_1.default.chain2,
        pallet: pallets_1.default.pallet1,
        tokens: [tokens_1.default.token1, tokens_1.default.token2]
    },
    'chain2.chain3': {
        id: 'chain2.chain3',
        source: chains_1.default.chain2,
        destination: chains_1.default.chain3,
        pallet: pallets_1.default.pallet1,
        tokens: [tokens_1.default.token2, tokens_1.default.token3]
    },
    'chain1.chain3': {
        id: 'chain1.chain3',
        source: chains_1.default.chain1,
        destination: chains_1.default.chain3,
        pallet: pallets_1.default.pallet1,
        tokens: [tokens_1.default.token1, tokens_1.default.token3]
    },
    'chain3.chain1': {
        id: 'chain3.chain1',
        source: chains_1.default.chain3,
        destination: chains_1.default.chain1,
        pallet: pallets_1.default.pallet1,
        tokens: [tokens_1.default.token3]
    },
    'chain2.chain1': {
        id: 'chain2.chain1',
        source: chains_1.default.chain2,
        destination: chains_1.default.chain1,
        pallet: pallets_1.default.pallet2,
        tokens: [tokens_1.default.token2, tokens_1.default.token3]
    }
};
exports.default = channels;
//# sourceMappingURL=channels.js.map