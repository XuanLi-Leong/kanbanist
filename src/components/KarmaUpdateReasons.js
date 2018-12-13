/*

 Card that shows karma update reasons as a log.

 */

import React, { Component } from 'react';
import { Intent, Tag } from '@blueprintjs/core';
import { karmaUpdateReasons } from '../redux/modules/karma';

const moment = require('moment');

class KarmaUpdateReasons extends Component {
    renderUpdateReasons = () => {
        const { karma_update_reasons, gmt_string, time_format } = this.props;
        const reasons = karma_update_reasons.map(updateObject => {
            const {
                time,
                new_karma,
                positive_karma,
                negative_karma,
                positive_karma_reasons,
                negative_karma_reasons,
            } = updateObject;
            const timeText = moment(time)
                .utcOffset(gmt_string)
                .format('Do MMM ' + (time_format === 0 ? 'HH:mm' : 'h:mm A'));
            const reasonString = positive_karma_reasons
                .concat(negative_karma_reasons)
                .map(num => karmaUpdateReasons[num])
                .join(); // default is ', '. consider using '\n'
            return (
                <div className="Karma-update-item" key={new_karma}>
                    <Tag className="Karma-update-tag" minimal={true}>
                        {timeText}
                    </Tag>
                    {positive_karma !== 0 && (
                        <Tag className="Karma-update-tag" intent={Intent.SUCCESS}>
                            + {positive_karma}
                        </Tag>
                    )}
                    {negative_karma !== 0 && (
                        <Tag className="Karma-update-tag" intent={Intent.DANGER}>
                            - {negative_karma}
                        </Tag>
                    )}
                    {reasonString}
                </div>
            );
        });
        reasons.reverse(); // we want oldest data to be on top
        return reasons;
    };

    render() {
        return (
            <div>
                <h6>Karma Update Reasons</h6>
                {this.renderUpdateReasons()}
            </div>
        );
    }
}

export default KarmaUpdateReasons;
