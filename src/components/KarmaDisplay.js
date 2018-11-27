// Karma component in the header
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditableText, AnchorButton, Icon, Intent, Tag } from '@blueprintjs/core';
import { actions as karmaActions } from '../redux/modules/karma';

class KarmaDisplay extends Component {
    getTrend = () => {
        return this.props.karma_trend === 'up' ? 'arrow-up' : 'arrow-down';
    };

    getTrendTitle = () => {
        return this.props.karma_trend === 'up' ? 'Karma trend up' : 'Karma trend down';
    };

    getVacation = () => {
        return this.props.karma_vacation === 1 ? 'mountain' : 'office';
    };

    getVacationTitle = () => {
        return this.props.karma_vacation === 1 ? 'Karma vacation mode on' : 'Karma vacation mode off';
    };

    changeVacationMode = () => {
        const vacationMode = this.props.karma_vacation === 0 ? 1 : 0;
        this.props.updateVacationMode(vacationMode);
    };

    render() {
        // const editableDailyGoal = isEditing ? (
        //     <input className="ListItem-text" type="number" onSubmit={this.handleChange} disabled={checked} />
        // ) : (
        //     <div className="ListItem-text ListItem-text-formatted" onClick={this.handleOnEdit}>
        //         my goal
        //     </div>
        // );
        const vacationMode = (
            <div className="Karma-settings-item">Vacation mode {this.props.karma_vacation === 0 ? 'OFF' : 'ON'}</div>
        );
        const dailyGoal = <div className="Karma-settings-item">Daily goal: {this.props.daily_goal}</div>;
        const weeklyGoal = <div className="Karma-settings-item">Weekly goal: {this.props.weekly_goal}</div>;
        const disableKarmaSwitch = (
            <div className="Karma-settings-item">
                {this.props.karma_disabled === 0 ? 'Karma is active' : 'Karma is disabled'}
            </div>
        );
        return (
            <div className="Karma-settings Karma-card">
                <Icon className="header-right" iconName={this.getTrend()} title={this.getTrendTitle()} />
                Karma: {this.props.karma}
                <AnchorButton
                    className="light-text header-right"
                    iconName={this.getVacation()}
                    onClick={this.changeVacationMode}
                    intent={Intent.WARNING}
                    title={this.getVacationTitle()}
                />
                {vacationMode}
                {dailyGoal}
                {weeklyGoal}
                {disableKarmaSwitch}
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
)(KarmaDisplay);
