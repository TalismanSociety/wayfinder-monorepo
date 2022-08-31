"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channels_1 = __importDefault(require("./database/channels"));
const query = (params) => {
    let allChannels = channels_1.default;
    // filter based on source chain, if set
    const filteredBySource = !!params.source
        ? Object.fromEntries(Object.entries(channels_1.default).filter(([key, { source }]) => source.id === params.source))
        : channels_1.default;
    // filter based on destination chain, if set
    const filteredByDestination = !!params.destination
        ? Object.fromEntries(Object.entries(filteredBySource).filter(([key, { destination }]) => destination.id === params.destination))
        : filteredBySource;
    // filter based on token, if set
    const filteredByToken = !!params.token
        ? Object.fromEntries(Object.entries(filteredByDestination).filter(([key, { tokens }]) => {
            const tokenIds = tokens.map(({ id }) => id);
            return !!params.token
                ? tokenIds.includes(params.token)
                : false;
        }))
        : filteredByDestination;
    return filteredByDestination;
};
exports.default = query;
//# sourceMappingURL=query.js.map