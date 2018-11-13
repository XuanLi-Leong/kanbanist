import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnchorButton, Icon, Intent } from '@blueprintjs/core';

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
        return this.props.karma_vacation === 1 ? 'briefcase' : 'circle';
    };

    getVacationTitle = () => {
        return this.props.karma_vacation === 1 ? 'Karma vacation mode on' : 'Karma vacation mode off';
    };

    render() {
        return (
            <div className="Karma">
                <AnchorButton
                    className="light-text"
                    iconName={this.getTrend()}
                    onClick={() => console.log('Pressed karma')}
                    intent={Intent.WARNING}
                    title={this.getTrendTitle()}
                />
                <AnchorButton
                    className="light-text"
                    iconName={this.getVacation()}
                    onClick={this.changeVacationMode}
                    intent={Intent.WARNING}
                    title={this.getVacationTitle()}
                />
                Karma: {this.props.karma}
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
        karma_trend: state.user.user.karma_trend,
        weekly_goal: state.user.user.weekly_goal,
        daily_goal: state.user.user.daily_goal,
        magic_num_reached: state.user.user.magic_num_reached, // bool -- goal number ? idk what this is
        start_day: state.user.user.start_day, // first day of the week?
    };
};

export default connect(mapStateToProps)(KarmaDisplay);
