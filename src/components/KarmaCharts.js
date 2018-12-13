/*

 Card that shows karma data in the form of charts.

 Currently includes:
 - Karma Over Time
 - Completed items per day
 - Completed items per week

 */
import React, { Component } from 'react';
import ReactChartkick, { LineChart, ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import { colorMapping, karmaUpdateReasons } from '../redux/modules/karma';

ReactChartkick.addAdapter(Chart);
const moment = require('moment');

class KarmaCharts extends Component {
    getReasonsFooter = targetMoment => {
        const { karma_update_reasons, gmt_string } = this.props;
        let positiveReasons = [];
        let negativeReasons = [];
        karma_update_reasons
            .filter(el => {
                const updateMoment = moment(el.time).utcOffset(gmt_string);
                return updateMoment.isSame(targetMoment, 'day');
            })
            .forEach(updateObject => {
                const { positive_karma, negative_karma, positive_karma_reasons, negative_karma_reasons } = updateObject;

                if (positive_karma_reasons.length > 0) {
                    // Update positive
                    const positiveReasonsString = positive_karma_reasons.map(num => karmaUpdateReasons[num]).join(); // default is ', '. consider using '\n'
                    positiveReasons.push(`${positiveReasonsString} ( +${positive_karma} )`);
                }

                if (negative_karma_reasons.length > 0) {
                    // Update negative
                    const negativeReasonsString = negative_karma_reasons.map(num => karmaUpdateReasons[num]).join(); // default is ', '. consider using '\n'
                    negativeReasons.push(`${negativeReasonsString} ( -${negative_karma} )`);
                }
            });
        return positiveReasons.concat(negativeReasons).join('\n');
    };

    getDatasetForProject = (dataset, projectId, color_code, name) => {
        const singleProjectDataPoints = dataset.reduce((acc, singleDayDataPoint) => {
            const idx = singleDayDataPoint.items.findIndex(item => item.id === projectId);
            if (idx !== -1) {
                return [...acc, [singleDayDataPoint.date, singleDayDataPoint.items[idx].completed]];
            }
            return acc;
        }, []);
        return {
            name: name,
            color: colorMapping[color_code],
            data: singleProjectDataPoints,
        };
    };

    transformDaysItems = () => {
        const data = this.props.projects.map(({ color: color_code, id: projectId, name }) =>
            this.getDatasetForProject(this.props.days_items, projectId, color_code, name)
        );
        return data.filter(dataset => dataset.data.length > 0).toArray();
    };

    transformWeeksItems = () => {
        const data = this.props.projects.map(({ color: color_code, id: projectId, name }) =>
            this.getDatasetForProject(this.props.week_items, projectId, color_code, name)
        );
        return data.filter(dataset => dataset.data.length > 0).toArray();
    };

    render() {
        const karmaOverTime = (
            <LineChart
                data={this.props.karma_graph_data}
                ytitle="Karma"
                xtitle="Date"
                curve={false}
                messages={{ empty: 'No data' }}
                min={null}
                library={{
                    scales: {
                        xAxes: [{ gridLines: { color: '#8A9BA8' } }],
                        yAxes: [{ gridLines: { color: '#8A9BA8' } }],
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            footer: (tooltipItems, data) => {
                                let footer = '';

                                tooltipItems.forEach(tooltipItem => {
                                    let targetMoment = moment(data.labels[tooltipItem.index]);
                                    footer += this.getReasonsFooter(targetMoment);
                                });
                                return footer;
                            },
                        },
                    },
                }}
            />
        );
        const itemsPerDay = (
            <ColumnChart
                data={this.transformDaysItems()}
                ytitle="Completed Items"
                xtitle="Date"
                messages={{ empty: 'No data' }}
                // stacked={true}
                library={{
                    scales: {
                        xAxes: [{ gridLines: { color: '#8A9BA8' }, stacked: true }],
                        yAxes: [{ gridLines: { color: '#8A9BA8' }, stacked: true }],
                    },
                    onClick: (event, element) => {
                        if (element.length > 0) {
                            var series = element[0]._model.datasetLabel;
                            var label = element[0]._model.label;
                            var value = this.transformDaysItems()[element[0]._datasetIndex].data[element[0]._index];
                            console.log(series, label, value);
                        }
                    },
                }}
            />
        );
        const itemsPerWeek = (
            <ColumnChart
                data={this.transformWeeksItems()}
                ytitle="Completed Items"
                xtitle="Week"
                messages={{ empty: 'No data' }}
                // stacked={true}
                library={{
                    scales: {
                        xAxes: [{ gridLines: { color: '#8A9BA8' }, stacked: true }],
                        yAxes: [{ gridLines: { color: '#8A9BA8' }, stacked: true }],
                    },
                }}
            />
        );

        return (
            <div>
                <h6>Karma Over Time</h6>
                {karmaOverTime}
                <hr />
                <h6>Completed Items per Day</h6>
                {itemsPerDay}
                <hr />
                <h6>Completed Items per Week</h6>
                {itemsPerWeek}
            </div>
        );
    }
}

export default KarmaCharts;
