"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterChannelDataByAssets = exports.defaultResultGroup = void 0;
exports.defaultResultGroup = {
    channels: [],
    sources: [],
    destinations: [],
    tokens: []
};
// given a set of routes (QueryResultGroupType), 
// filter all values based on a set of assets (AvailableAsset)
// we should return a route list relevant to the user
const filterChannelDataByAssets = (result, assets) => {
    /*
      1. --> init a return object
    */
    let filtered = exports.defaultResultGroup;
    /*
      2. --> if there's not assets return default result, or the empty filtered set
    */
    if (!assets)
        return result || filtered;
    /*
      3. --> we need to use channels from the route set
    */
    const { channels } = result;
    /*
      4. --> create a list of chain_tokens the user has
    */
    const userTokensSet = new Set(assets.map(({ chain, token }) => `${chain}_${token}`));
    /*
      5. --> filter query channels based on user tokens
    */
    filtered.channels = channels.filter(({ source, tokens }) => {
        // create a set of chain_tokens the channel has
        const channelTokenSet = tokens.map((token => `${source.id}_${token.id}`));
        // the the union between the userTokens and channelTokenSet
        // if we have a hit, the user is able to use this channel
        return channelTokenSet.filter(v => userTokensSet.has(v)).length > 0;
    });
    /*
      6. --> filter all unwanted tokens from filtered channels
    */
    filtered.channels = filtered.channels.map(channel => {
        const filteredTokens = channel.tokens.filter(({ id }) => userTokensSet.has(`${channel.source.id}_${id}`));
        return {
            ...channel,
            tokens: filteredTokens
        };
    });
    // note: at this stage we should have a channel list where the channels are only the 
    // ones which a user can use based on the tokens in their wallet. Now it's time for
    // plucking out the pieces and building a result set
    /*
      7. --> create new Map sets for the
    */
    const sources = new Map();
    const destinations = new Map();
    const tokens = new Map();
    /*
      8. --> itterate all filtered channels and build up the pieces
    */
    filtered.channels.forEach(channel => {
        sources.set(channel.source.id, channel.source);
        destinations.set(channel.destination.id, channel.destination);
        channel.tokens.forEach(token => tokens.set(token.id, token));
    });
    /*
      9. --> create array types of all the elements
    */
    filtered.sources = [...sources.values()];
    filtered.destinations = [...destinations.values()];
    filtered.tokens = [...tokens.values()];
    /*
      10. --> send it
    */
    return filtered;
};
exports.filterChannelDataByAssets = filterChannelDataByAssets;
