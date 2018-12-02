// Karma component in the header
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

    componentDidUpdate(prevProps) {
        let stateUpdater = {};
        if (this.props.dailyGoal !== prevProps.dailyGoal) {
            stateUpdater = { ...stateUpdater, dailyGoal: this.props.daily_goal };
        }
        if (this.props.weeklyGoal !== prevProps.weeklyGoal) {
            stateUpdater = { ...stateUpdater, weeklyGoal: this.props.weekly_goal };
        }
        return stateUpdater;
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

    render() {
        const disableKarmaSwitch = (
            <div className="Karma-settings-item ">
                {this.props.karma_disabled === 0 ? 'Karma is enabled' : 'Karma is disabled'}
                <Switch
                    className="Karma-settings-switch pt-large pt-align-right"
                    checked={this.props.karma_disabled === 0}
                    onChange={this.handleKarmaDisabledChange}
                />
            </div>
        );
        const vacationModeSwitch = (
            <div className="Karma-settings-item">
                Vacation mode is {this.props.karma_vacation === 0 ? 'off' : 'on'}
                <Switch
                    className="Karma-settings-switch pt-large pt-align-right"
                    checked={this.props.karma_vacation === 1}
                    onChange={this.handleVacationModeChange}
                />
            </div>
        );
        const dailyGoalComponent = (
            <div className="Karma-settings-item">
                Daily goal:
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
                Weekly goal:
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
        const ignoreDaysComponent = this.props.ignore_days.map(num => <div key={num}>{num}</div>);

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
