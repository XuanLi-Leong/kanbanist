// Karma component in the header
import React, { Component } from 'react';
import { Intent, ProgressBar } from '@blueprintjs/core';

class KarmaStreaks extends Component {
    getValue = (current, max) => {
        if (current === 0) {
            return max / 1000;
        } else {
            return current / max;
        }
    };

    getIntent = (current, max) => {
        if (current === 0) {
            return Intent.DANGER;
        }
        if (current === max) {
            return Intent.SUCCESS;
        }
        return Intent.WARNING;
    };

    makeStreakComponent = (current, max) => {
        return (
            <ProgressBar
                className="Karma-streak-bar pt-no-stripes pt-no-animation"
                value={this.getValue(current, max)}
                intent={this.getIntent(current, max)}
                stripes={false}
                animate={false}
            />
        );
    };

    render() {
        const dailyStreakComponent = this.makeStreakComponent(
            this.props.current_daily_streak.count,
            this.props.max_daily_streak.count
        );
        const weeklyStreakComponent = this.makeStreakComponent(
            this.props.current_weekly_streak.count,
            this.props.max_weekly_streak.count
        );
        return (
            <div className="Karma-streaks Karma-card">
                <h6>Daily Streak</h6>
                {dailyStreakComponent}
                <h6>Weekly Streak</h6>
                {weeklyStreakComponent}
            </div>
        );
    }
}

export default KarmaStreaks;
