import React from 'react';
import moment from 'moment';

const DISPLAY_TYPE = {
    DATE: 'DATE',
    RELATIVE: 'RELATIVE',
};

export default class ListItemDueDate extends React.Component {
    constructor(props) {
        super(props);
        const { dueDate } = props;
        this.state = {
            dueMoment: dueDate ? moment(dueDate) : null,
            displayType: DISPLAY_TYPE.DATE,
        };
    }

    handleToggleDisplayType = () => {
        const displayType =
            this.state.displayType === DISPLAY_TYPE.RELATIVE ? DISPLAY_TYPE.DATE : DISPLAY_TYPE.RELATIVE;
        this.setState({ displayType });
    };

    render() {
        const { timeFormat } = this.props;
        const { dueMoment, displayType } = this.state;

        if (dueMoment === null) {
            return null;
        }

        let text = '';
        switch (displayType) {
            case DISPLAY_TYPE.DATE:
                if (dueMoment.second() === 59) {
                    // For all day task, the time part will be set as xx:xx:59
                    text = dueMoment.format('Do MMM');
                } else {
                    if (timeFormat === 0) {
                        text = dueMoment.format('Do MMM HH:mm');
                    } else {
                        text = dueMoment.format('Do MMM h:mm A');
                    }
                }
                break;
            case DISPLAY_TYPE.RELATIVE:
                text = dueMoment.fromNow();
                break;
            default:
                console.error('Unknown displayType for ListItemDueDate: ', displayType);
        }

        const classes = ['ListItem-project-duedate', dueMoment.isBefore(moment()) ? 'overdue' : ''].join(' ');

        return (
            <span className={classes} onClick={this.handleToggleDisplayType}>
                {text}
            </span>
        );
    }
}
