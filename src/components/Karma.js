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
        const { karma, karma_trend, karma_vacation, updateVacationMode, karma_graph_data, containerWidth } = this.props;

        // if coming from small screen, show a reminder button.
        const isSmallScreen = containerWidth < MIN_SCREEN_SIZE;
        if (isSmallScreen) {
            return (
                <div className="Karma">
                    <div className="Karma-inner">
                        <p>It looks like you are visiting from a phone (or a computer with a screen for ants).</p>
                        <p>
                            Kanbanist is built for bigger screens but if you hit the button below, you'll be prompted to
                            create a reminder in Todoist to checkout Kanbanist when you get back to your computer.
                        </p>
                        <div className="margin-25px-auto text-align-center">
                            <a href="todoist://addtask?content=Check%20out%20%5BKanbanist%5D(https://kanban.ist)!&date=today">
                                <Button
                                    text="Remind me about Kanbanist"
                                    intent={Intent.DANGER}
                                    className="pt-icon-time"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        const karmaDisplay = (
            <KarmaDisplay
                updateVacationMode={updateVacationMode}
                karma={karma}
                karma_trend={karma_trend}
                karma_vacation={karma_vacation}
            />
        );

        const karmaChart = (
            <div className="Karma-chart">
                <LineChart
                    data={karma_graph_data}
                    ytitle="Karma"
                    xtitle="Date"
                    curve={false}
                    messages={{ empty: 'No data' }}
                    min={null}
                />
            </div>
        );

        return (
            <div className="Karma">
                {karmaDisplay}
                {karmaChart}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        karma_disabled: state.user.user.features.karma_disabled,
        karma: state.user.user.karma,
        karma_vacation: state.karma.karma_vacation,
        karma_trend: state.karma.karma_trend,
        karma_graph_data:
            state.karma.karma_graph_data &&
            state.karma.karma_graph_data.map(dataPoint => {
                return [dataPoint.date, dataPoint.karma_avg];
            }),
        weekly_goal: state.user.user.weekly_goal,
        daily_goal: state.user.user.daily_goal,
        // magic_num_reached: state.user.user.magic_num_reached, // bool -- goal number ? idk what this is
        // start_day: state.user.user.start_day, // first day of the week?
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateVacationMode: mode => {
            dispatch(karmaActions.updateVacationMode(mode));
        },
    };
};

export default flow(
    Dimensions({ className: 'Karma-Wrapper' }),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Karma);
