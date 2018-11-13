export const types = {
    UPDATE_VACATION_MODE: 'UPDATE_VACATION_MODE',
};

const initialState = {
    karma_vacation: 0,
};

export const actions = {
    updateVacationMode: mode => ({ type: types.UPDATE_VACATION_MODE, payload: { vacationMode: mode } }),
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_VACATION_MODE:
            return { ...state, karma_vacation: action.payload.vacationMode };
        default:
            return state;
    }
};
