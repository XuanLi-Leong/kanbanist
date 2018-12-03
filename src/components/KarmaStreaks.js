/*

 Card segment that shows karma streaks

 */
import React, { Component } from 'react';
import { Intent, ProgressBar } from '@blueprintjs/core';

class KarmaStreaks extends Component {
    getValue = (current, max) => {
        if (current === 0) {
            // When current streak is 0, still show a tiny percentage
            return max / 1000;
        } else {
            return current / max;
        }
    };

    // Shows different color based on how well the user is doing
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
            <div>
                <ProgressBar
                    className="Karma-streak-bar pt-no-stripes pt-no-animation"
                    value={this.getValue(current, max)}
                    intent={this.getIntent(current, max)}
                    stripes={false}
                    animate={false}
                />
                <p>Current streak: {current}</p>
                <p>Maximum streak: {max}</p>
            </div>
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
                <div className="Karma-streak-section">
                    <h6>Daily Streak</h6>
                    {dailyStreakComponent}
                </div>
                <div className="Karma-streak-section">
                    <h6>Weekly Streak</h6>
                    {weeklyStreakComponent}
                </div>
            </div>
        );
    }
}

export default KarmaStreaks;
