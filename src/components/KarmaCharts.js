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

ReactChartkick.addAdapter(Chart);

const color_mapping = {
    0: '#95ef63',
    1: '#ff8581',
    2: '#ffc471',
    3: '#f9ec75',
    4: '#a8c8e4',
    5: '#d2b8a3',
    6: '#e2a8e4',
    7: '#cccccc',
    8: '#fb886e',
    9: '#ffcc00',
    10: '#74e8d3',
    11: '#3bd5fb',
    12: '#dc4fad',
    13: '#ac193d',
    14: '#d24726',
    15: '#82ba00',
    16: '#03b3b2',
    17: '#008299',
    18: '#5db2ff',
    19: '#0072c6',
    20: '#000000',
    21: '#777777',
};

const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
}; // https://stackoverflow.com/a/51564734

class KarmaCharts extends Component {
    getDatasetForProject = (projectId, color_code, name) => {
        const singleProjectDataPoints = this.props.days_items.reduce((acc, singleDayDataPoint) => {
            const idx = singleDayDataPoint.items.findIndex(item => item.id === projectId);
            if (idx !== -1) {
                return [...acc, [singleDayDataPoint.date, singleDayDataPoint.items[idx].completed]];
            }
            return acc;
        }, []);
        return {
            name: name,
            color: hex2rgba(color_mapping[color_code], 0.5),
            data: singleProjectDataPoints,
        };
    };

    transformDaysItems = () => {
        const data = this.props.projects.map(({ color: color_code, id: projectId, name }) =>
            this.getDatasetForProject(projectId, color_code, name)
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
                stacked={true}
                library={{
                    scales: {
                        xAxes: [{ gridLines: { color: '#8A9BA8' } }],
                        yAxes: [{ gridLines: { color: '#8A9BA8' } }],
                    },
                }}
            />
        );
        const itemsPerWeek = (
            <LineChart
                data={this.props.week_items}
                ytitle="Completed Items"
                xtitle="Date"
                curve={false}
                messages={{ empty: 'No data' }}
                library={{
                    scales: {
                        xAxes: [{ gridLines: { color: '#8A9BA8' } }],
                        yAxes: [{ gridLines: { color: '#8A9BA8' } }],
                    },
                }}
            />
        );

        return (
            <div className="Karma-chart Karma-card">
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
