import { types as karmaTypes } from './karma';

export const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

const initialState = {
    loggedIn: false,
    user: {},
};

export const actions = {
    login: user => ({ type: types.LOGIN, payload: user }),
    logout: () => ({ type: types.LOGOUT }),
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, user: action.payload, loggedIn: true };
        case types.LOGOUT:
            return { ...state, user: {}, loggedIn: false };
        case karmaTypes.UPDATE_VACATION_MODE:
            const newState = { ...state, user: { ...state.user, karma_vacation: action.payload.vacationMode } };
            return newState;
        case karmaTypes.UPDATE_WEEKLY_GOAL:
            return state;
        case karmaTypes.UPDATE_DAILY_GOAL:
            return state;
        case karmaTypes.UPDATE_KARMA_DISABLED:
            return state;
        default:
            return state;
    }
};
