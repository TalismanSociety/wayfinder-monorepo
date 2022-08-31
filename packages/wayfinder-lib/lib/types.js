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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("wayfinder-datasource"), exports);
// question: should i break states into categories?
// I think I want a main state, like ERROR, plus sub states about the main state
// The main state should be indicitave of the flow maybe? or the main/broad categories of the flow?
// The sub-states should represent the sub-flow state?
// I want to make sure I know what part of the proces I'm up to (like step 1, 2 3 etc)
// but then within that, have states for each part of the flow? maybe STEP_STATUS
// with states, is it better to tell the user the problem, or the action to solve it?
// Like: MISSING_INPUT vs INPUT_REQUIRED
// MISSING_INPUT | Please select a destination chain 
// INPUT_REQUIRED | Destination chain is missing
const progress = {
    'ROUTING': {
        'MISSING_INPUT': 'Please select a destination chain',
        'NO_ROUTES_FOUND': '...'
    },
    'TOKENS': {
        'NO_TOKEN': '...',
        'INSUFICIENT_BALANCE': '...'
    },
    'FEES': {
        'BLAH': 'bleh'
    }
};
//# sourceMappingURL=types.js.map