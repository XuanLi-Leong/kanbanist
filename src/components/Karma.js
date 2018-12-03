import React, { Component } from 'react';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import Dimensions from 'react-dimensions';

import KarmaSettings from '../components/KarmaSettings';
import KarmaStreaks from '../components/KarmaStreaks';
import KarmaCharts from '../components/KarmaCharts';

class Karma extends Component {
    render() {
        const {
            karma,
            karma_trend,
            karma_vacation,
            karma_graph_data,
            karma_disabled,
            days_items,
            week_items,
            ignore_days,
            weekly_goal,
            daily_goal,
            current_daily_streak,
            max_daily_streak,
            current_weekly_streak,
            max_weekly_streak,
        } = this.props;

        const karmaSettings = (
            <KarmaSettings
                karma={karma}
                karma_trend={karma_trend}
                karma_vacation={karma_vacation}
                karma_disabled={karma_disabled}
                weekly_goal={weekly_goal}
                daily_goal={daily_goal}
                ignore_days={ignore_days}
            />
        );

        const karmaStreaks = (
            <KarmaStreaks
                current_daily_streak={current_daily_streak}
                max_daily_streak={max_daily_streak}
                current_weekly_streak={current_weekly_streak}
                max_weekly_streak={max_weekly_streak}
            />
        );

        const karmaCharts = (
            <KarmaCharts karma_graph_data={karma_graph_data} days_items={days_items} week_items={week_items} />
        );

        return (
            <div className="Karma">
                <div className="Karma-card">
                    {karmaSettings}
                    <hr />
                    {karmaStreaks}
                </div>
                {karmaCharts}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        karma: state.karma.karma,
        karma_trend: state.karma.karma_trend,
        karma_graph_data:
            state.karma.karma_graph_data &&
            state.karma.karma_graph_data.map(dataPoint => {
                return [dataPoint.date, dataPoint.karma_avg];
            }),
        days_items:
            state.karma.days_items &&
            state.karma.days_items.map(dataPoint => {
                return [dataPoint.date, dataPoint.total_completed];
            }),
        week_items:
            state.karma.week_items &&
            state.karma.week_items.map(dataPoint => {
                return [dataPoint.date, dataPoint.total_completed];
            }),
        karma_disabled: state.karma.goals.karma_disabled,
        karma_vacation: state.karma.karma_vacation,
        weekly_goal: state.karma.goals.weekly_goal,
        daily_goal: state.karma.goals.daily_goal,
        // TODO: Render ignore days
        ignore_days: state.karma.goals.ignore_days,
        // TODO: Render this info and put an encouragement text
        current_daily_streak: state.karma.goals.current_daily_streak,
        max_daily_streak: state.karma.goals.max_daily_streak,
        current_weekly_streak: state.karma.goals.current_weekly_streak,
        max_weekly_streak: state.karma.goals.max_weekly_streak,
        // magic_num_reached: state.user.user.magic_num_reached, // bool -- goal number ? idk what this is
        // start_day: state.user.user.start_day, // first day of the week?
    };
};

export default flow(
    Dimensions({ className: 'Karma-Wrapper' }),
    connect(mapStateToProps)
)(Karma);
