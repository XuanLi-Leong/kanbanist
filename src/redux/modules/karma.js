import Raven from 'raven-js';
import Todoist from '../../todoist-client/Todoist';

export const types = {
    UPDATE_PRODUCTIVITY_STATS: 'UPDATE_PRODUCTIVITY_STATS',
    UPDATE_VACATION_MODE: 'UPDATE_VACATION_MODE',
    UPDATE_DAILY_GOAL: 'UPDATE_DAILY_GOAL',
    UPDATE_WEEKLY_GOAL: 'UPDATE_WEEKLY_GOAL',
    UPDATE_IGNORE_DAYS: 'UPDATE_IGNORE_DAYS',
    UPDATE_KARMA_DISABLED: 'UPDATE_KARMA_DISABLED',
};

const initialState = {
    goals: {
        karma_disabled: 0,
        weekly_goal: 0,
        daily_goal: 0,
        ignore_days: [],
    },
    karma: 0,
    karma_vacation: 0,
    karma_trend: 'up',
    karma_graph_data: [],
};

export const actions = {
    updateVacationMode: mode => ({ type: types.UPDATE_VACATION_MODE, payload: { vacationMode: mode } }),
    updateDailyGoal: goal => ({ type: types.UPDATE_DAILY_GOAL, payload: { dailyGoal: goal } }),
    updateWeeklyGoal: goal => ({ type: types.UPDATE_WEEKLY_GOAL, payload: { weeklyGoal: goal } }),
    updateIgnoreDays: ignoreDays => ({ type: types.UPDATE_IGNORE_DAYS, payload: { ignoreDays: ignoreDays } }),
    updateKarmaDisabled: karmaDisabled => ({
        type: types.UPDATE_KARMA_DISABLED,
        payload: { karmaDisabled: karmaDisabled },
    }),
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
                    ignore_days: action.payload.goals.ignore_days,
                },
                karma: action.payload.karma,
                karma_trend: action.payload.karma_trend,
                karma_graph_data: action.payload.karma_graph_data,
            };
        case types.UPDATE_DAILY_GOAL:
            return {
                ...state,
                goals: {
                    ...state.goals,
                    daily_goal: action.payload.dailyGoal,
                },
            };
        case types.UPDATE_WEEKLY_GOAL:
            return {
                ...state,
                goals: {
                    ...state.goals,
                    weekly_goal: action.payload.weeklyGoal,
                },
            };
        case types.UPDATE_IGNORE_DAYS:
            return {
                ...state,
                goals: {
                    ...state.goals,
                    ignore_days: action.payload.ignoreDays,
                },
            };
        case types.UPDATE_KARMA_DISABLED:
            return {
                ...state,
                goals: {
                    ...state.goals,
                    karma_disabled: action.payload.karmaDisabled,
                },
            };
        case types.UPDATE_VACATION_MODE:
            return { ...state, karma_vacation: action.payload.vacationMode };
        default:
            return state;
    }
};
