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
        const { dueMoment, displayType } = this.state;

        if (dueMoment === null) {
            return null;
        }

        let text = '';
        switch (displayType) {
            case DISPLAY_TYPE.DATE:
                if (dueMoment.second() === 59) {
                    text = dueMoment.format('Do MMM');
                } else {
                    // TODO: Use user's preferred time format
                    // let val = user.time_format;
                    let val = 0;
                    if (val === 0) {
                        text = dueMoment.format('Do MMM HH:mm');
                    } else if (val === 1) {
                        text = dueMoment.format('Do MMM h:mm A');
                    } else {
                        console.log("That's weird, Todoist, you promised it'd be 0 or 1");
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
