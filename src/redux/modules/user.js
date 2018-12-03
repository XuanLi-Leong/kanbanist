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
            console.log('User store is handling update vacation mode action');
            console.log(newState);
            console.log(state);
            return newState;
        default:
            return state;
    }
};
