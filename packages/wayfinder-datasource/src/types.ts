// a chain type
export type Chain = {
	id: string
	name: string
}

// a token type
export type Token = {
	id: string
	name: string
	symbol: string
}

// an input param type for a pallet
export type Param = {
	key: string     			// user friendly name
	name: string       		// input param name used to construct the extrinsic
	type: string     			// input type <-- can we define a type as a type??
}

// a pallet type
export type Pallet = {
	id: string       			// pallet id
	name: string     			// pallet name <-- keep this key name the same as what others are using
	method: string   			// pallet method <-- keep this key name the same as what others are using
	params: { [key: string]: Param }  	// input params
}

// a channel
export type Channel = {
	id: string    				// the channel ID - muist be unique
	source: Chain         // the source chain
	destination: Chain    // the destination chain
	pallet: Pallet        // the pallet to use
	tokens: Token[]       // the tokens to transfer
}

// a channel object, used for indexing channels
export type ChannelObject = {
  [key: string]: Channel
}

// query params
export type QueryParams = {
  source?: string
	destination?: string
	token?: string
}