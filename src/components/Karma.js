import React, { Component } from 'react';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import Dimensions from 'react-dimensions';

import KarmaSettings from '../components/KarmaSettings';
import KarmaCharts from '../components/KarmaCharts';

class Karma extends Component {
    render() {
        const {
            ignore_days,
            karma,
            karma_trend,
            karma_vacation,
            karma_graph_data,
            karma_disabled,
            weekly_goal,
            daily_goal,
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

        const karmaCharts = <KarmaCharts karma_graph_data={karma_graph_data} />;

        return (
            <div className="Karma">
                {karmaSettings}
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
        karma_disabled: state.karma.goals.karma_disabled,
        karma_vacation: state.karma.karma_vacation,
        weekly_goal: state.karma.goals.weekly_goal,
        daily_goal: state.karma.goals.daily_goal,
        ignore_days: state.karma.goals.ignore_days,
        // magic_num_reached: state.user.user.magic_num_reached, // bool -- goal number ? idk what this is
        // start_day: state.user.user.start_day, // first day of the week?
    };
};

export default flow(
    Dimensions({ className: 'Karma-Wrapper' }),
    connect(mapStateToProps)
)(Karma);
