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
            return {
                ...state,
                user: {
                    ...state.user,
                    features: { ...state.user.features, karma_vacation: action.payload.vacationMode },
                },
            };
        case karmaTypes.UPDATE_WEEKLY_GOAL:
            return { ...state, user: { ...state.user, weekly_goal: action.payload.weeklyGoal } };
        case karmaTypes.UPDATE_DAILY_GOAL:
            return { ...state, user: { ...state.user, daily_goal: action.payload.dailyGoal } };
        case karmaTypes.UPDATE_KARMA_DISABLED:
            return {
                ...state,
                user: {
                    ...state.user,
                    features: { ...state.user.features, karma_disabled: action.payload.karmaDisabled },
                },
            };
        default:
            return state;
    }
};
