import React, { Component } from 'react';
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import Dimensions from 'react-dimensions';
import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import moment from 'moment';

import KarmaDisplay from '../components/KarmaDisplay';
import { actions as karmaActions } from '../redux/modules/karma';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

import { generateQueryString } from '../redux/middleware/trelloist-filter-url';
import { NAMED_FILTERS } from '../redux/modules/lists';

const MIN_SCREEN_SIZE = 740; // pixels

ReactChartkick.addAdapter(Chart);

class Karma extends Component {
    render() {
        const {
            karma,
            karma_trend,
            karma_vacation,
            karma_graph_data,
            karma_disabled,
            weekly_goal,
            daily_goal,
            containerWidth,
        } = this.props;

        const karmaDisplay = (
            <KarmaDisplay
                karma={karma}
                karma_trend={karma_trend}
                karma_vacation={karma_vacation}
                karma_disabled={karma_disabled}
                weekly_goal={weekly_goal}
                daily_goal={daily_goal}
            />
        );

        const karmaChart = (
            <div className="Karma-chart">
                <LineChart
                    id="karma-chart"
                    data={karma_graph_data}
                    ytitle="Karma"
                    xtitle="Date"
                    curve={false}
                    messages={{ empty: 'No data' }}
                    min={null}
                    library={{
                        scales: {
                            xAxes: [{ gridLines: { color: '#8A9BA8' } }],
                            yAxes: [{ gridLines: { color: '#8A9BA8' } }],
                        },
                    }}
                />
            </div>
        );

        return (
            <div className="Karma">
                {karmaChart}
                {karmaDisplay}
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
