/*

 Card that shows karma data in the form of charts.

 Currently includes:
 - Karma Over Time
 - Completed items per day
 - Completed items per week

 */
import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

class KarmaCharts extends Component {
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
                }}
            />
        );
        const itemsPerDay = (
            <LineChart
                data={this.props.days_items}
                ytitle="Completed Items"
                xtitle="Date"
                curve={false}
                messages={{ empty: 'No data' }}
                min={null}
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
                min={null}
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
