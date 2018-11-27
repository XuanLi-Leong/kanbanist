// Karma component in the header
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnchorButton, Icon, Intent, Tag } from '@blueprintjs/core';
import { actions as karmaActions } from '../redux/modules/karma';

class KarmaDisplay extends Component {
    changeVacationMode = () => {
        const vacationMode = this.props.karma_vacation === 0 ? 1 : 0;
        this.props.updateVacationMode(vacationMode);
    };

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

    render() {
        return (
            <div className="Karma">
                <AnchorButton
                    className="light-text header-right"
                    iconName={this.getVacation()}
                    onClick={this.changeVacationMode}
                    intent={Intent.WARNING}
                    title={this.getVacationTitle()}
                />
                <Tag iconName={this.getTrend()} className="pt-large pt-minimal header-right">
                    <Icon className="header-right" iconName={this.getTrend()} title={this.getTrendTitle()} />
                    Karma: {this.props.karma}
                </Tag>
                <span>{this.props.karma_disabled === 0 ? 'Karma is active' : 'Karma is disabled'}</span>
                <span>Daily goal: {this.props.daily_goal}</span>
                <span>Weekly goal: {this.props.weekly_goal}</span>
                <span className="pt-navbar-divider" />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateVacationMode: karmaActions.updateVacationMode,
        updateDailyGoal: karmaActions.updateDailyGoal,
        updateWeeklyGoal: karmaActions.updateWeeklyGoal,
        updateIgnoreDays: karmaActions.updateIgnoreDays,
        updateKarmaDisabled: karmaActions.updateKarmaDisabled,
    };
};

export default connect(mapDispatchToProps)(KarmaDisplay);
