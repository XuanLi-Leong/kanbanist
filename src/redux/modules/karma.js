import Raven from 'raven-js';
import Todoist from '../../todoist-client/Todoist';

export const types = {
    UPDATE_PRODUCTIVITY_STATS: 'UPDATE_PRODUCTIVITY_STATS',
    UPDATE_VACATION_MODE: 'UPDATE_VACATION_MODE',
};

const initialState = {
    goals: {
        karma_disabled: 0,
        weekly_goal: 0,
        daily_goal: 0,
    },
    karma: 0,
    karma_vacation: 0,
    karma_trend: 'up',
    karma_graph_data: [],
};

export const actions = {
    updateVacationMode: mode => ({ type: types.UPDATE_VACATION_MODE, payload: { vacationMode: mode } }),
    fetchProductivityStats: () => (dispatch, getState) => {
        const state = getState();
        Todoist.getStats(state.user.user.token)
            .then(response => {
                console.log(response);
                const { karma_trend, karma_graph_data, goals, karma } = response;
                dispatch(actions.fetchSuccess(karma_trend, karma_graph_data, goals, karma));
            })
            .catch(err => {
                Raven.captureException(err);
                console.error('Could not fetch Todoist productivity stats: ', err);
                // dispatch(actions.fetchFailure(err.message || 'Could not fetch Todoist productivity stats'));
            });
    },
    fetchSuccess: (karma_trend, karma_graph_data, goals, karma) => ({
        type: types.UPDATE_PRODUCTIVITY_STATS,
        payload: { karma_trend, karma_graph_data, goals, karma },
    }),
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_PRODUCTIVITY_STATS:
            return {
                ...state,
                goals: {
                    karma_disabled: action.payload.goals.karma_disabled,
                    weekly_goal: action.payload.goals.weekly_goal,
                    daily_goal: action.payload.goals.daily_goal,
                },
                karma: action.payload.karma,
                karma_trend: action.payload.karma_trend,
                karma_graph_data: action.payload.karma_graph_data,
            };
        case types.UPDATE_VACATION_MODE:
            return { ...state, karma_vacation: action.payload.vacationMode };
        default:
            return state;
    }
};
