/*

 Card segment that shows and allows users to modify karma settings

 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, EditableText, AnchorButton, Icon, Intent } from '@blueprintjs/core';
import { actions as karmaActions } from '../redux/modules/karma';

class KarmaSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyGoal: props.daily_goal,
            weeklyGoal: props.weekly_goal,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // Including this for the case where Todoist API does cleanup or reformatting of the goal number
        let stateUpdater = {};
        let update = false;
        if (this.props.dailyGoal !== prevProps.dailyGoal && prevState.dailyGoal !== this.props.dailyGoal) {
            stateUpdater = { ...stateUpdater, dailyGoal: this.props.daily_goal };
            update = true;
        }
        if (this.props.weeklyGoal !== prevProps.weeklyGoal && prevState.weeklyGoal !== this.props.weeklyGoal) {
            stateUpdater = { ...stateUpdater, weeklyGoal: this.props.weekly_goal };
            update = true;
        }
        if (update) {
            this.setState(stateUpdater);
        }
    }

    getTrend = () => {
        return this.props.karma_trend === 'up' ? 'arrow-up' : 'arrow-down';
    };

    getTrendTitle = () => {
        return this.props.karma_trend === 'up' ? 'Karma trend up' : 'Karma trend down';
    };

    getVacation = () => {
        return this.props.karma_vacation === 1 ? 'home' : 'office';
    };

    getVacationTitle = () => {
        return this.props.karma_vacation === 1 ? 'Karma vacation mode on' : 'Karma vacation mode off';
    };

    handleVacationModeChange = () => {
        const vacationMode = this.props.karma_vacation === 0 ? 1 : 0;
        this.props.updateVacationMode(vacationMode);
    };

    handleKarmaDisabledChange = event => {
        const karmaDisabled = event.currentTarget.checked ? 0 : 1;
        this.props.updateKarmaDisabled(karmaDisabled);
    };

    handleDailyGoalChange = () => {
        const goal = parseInt(this.state.dailyGoal, 10);
        if (isNaN(goal)) {
            return;
        }

        this.props.updateDailyGoal(goal);
    };

    handleWeeklyGoalChange = () => {
        const goal = parseInt(this.state.weeklyGoal, 10);
        if (isNaN(goal)) {
            return;
        }

        this.props.updateWeeklyGoal(goal);
    };

    handleIgnoreDayClick = day => {
        const idx = this.props.ignore_days.indexOf(day);
        if (idx === -1) {
            this.props.updateIgnoreDays([...this.props.ignore_days, day]);
        } else {
            this.props.updateIgnoreDays([
                ...this.props.ignore_days.slice(0, idx),
                ...this.props.ignore_days.slice(idx + 1),
            ]);
        }
    };

    render() {
        const disableKarmaSwitch = (
            <div className="Karma-settings-item ">
                <span>{this.props.karma_disabled === 0 ? 'Karma is enabled' : 'Karma is disabled'}</span>
                <Switch
                    className="Karma-settings-switch pt-large pt-align-right"
                    checked={this.props.karma_disabled === 0}
                    onChange={this.handleKarmaDisabledChange}
                />
            </div>
        );
        const vacationModeSwitch = (
            <div className="Karma-settings-item">
                <span>Vacation mode is {this.props.karma_vacation === 0 ? 'off' : 'on'}</span>
                <Switch
                    className="Karma-settings-switch pt-large pt-align-right"
                    checked={this.props.karma_vacation === 1}
                    onChange={this.handleVacationModeChange}
                />
            </div>
        );
        const dailyGoalComponent = (
            <div className="Karma-settings-item">
                <span>Daily goal: </span>
                <EditableText
                    className="Karma-settings-numeric"
                    value={this.state.dailyGoal}
                    onChange={newValue => {
                        const dailyGoal = parseInt(newValue, 10);
                        if (isNaN(dailyGoal)) {
                            this.setState({ dailyGoal: newValue });
                        } else {
                            this.setState({ dailyGoal });
                        }
                    }}
                    onConfirm={this.handleDailyGoalChange}
                />
            </div>
        );
        const weeklyGoalComponent = (
            <div className="Karma-settings-item">
                <span>Weekly goal: </span>
                <EditableText
                    className="Karma-settings-numeric"
                    value={this.state.weeklyGoal}
                    onChange={newValue => {
                        const weeklyGoal = parseInt(newValue, 10);
                        if (isNaN(weeklyGoal)) {
                            this.setState({ weeklyGoal: newValue });
                        } else {
                            this.setState({ weeklyGoal });
                        }
                    }}
                    onConfirm={this.handleWeeklyGoalChange}
                />
            </div>
        );
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const ignoreDaysComponent = (
            <div className="Karma-settings-item">
                <span>Ignore days: </span>
                <div className="Karma-settings-ignore-days">
                    {days.map((day, idx) => {
                        return (
                            <div
                                key={day}
                                className={
                                    // -active sets the div to be colored
                                    'Karma-settings-ignore-days-item' +
                                    (this.props.ignore_days.indexOf(idx + 1) === -1 ? '' : '-active')
                                }
                                onClick={() => this.handleIgnoreDayClick(idx + 1)}>
                                <div className="Karma-settings-ignore-days-item-content">{day}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );

        return (
            <div className="Karma-settings">
                <h6>
                    <Icon className="header-right" iconName={this.getTrend()} title={this.getTrendTitle()} />
                    Karma: {this.props.karma}
                    <AnchorButton
                        className="light-text header-right"
                        iconName={this.getVacation()}
                        onClick={this.handleVacationModeChange}
                        intent={Intent.WARNING}
                        title={this.getVacationTitle()}
                    />
                </h6>
                {disableKarmaSwitch}
                {vacationModeSwitch}
                {dailyGoalComponent}
                {weeklyGoalComponent}
                {ignoreDaysComponent}
            </div>
        );
    }
}

const mapDispatchToProps = {
    updateVacationMode: karmaActions.updateVacationMode,
    updateDailyGoal: karmaActions.updateDailyGoal,
    updateWeeklyGoal: karmaActions.updateWeeklyGoal,
    updateIgnoreDays: karmaActions.updateIgnoreDays,
    updateKarmaDisabled: karmaActions.updateKarmaDisabled,
};

export default connect(
    null,
    mapDispatchToProps
)(KarmaSettings);
