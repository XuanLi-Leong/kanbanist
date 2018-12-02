// Karma component in the header
import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

class KarmaCharts extends Component {
    render() {
        return (
            <div className="Karma-chart Karma-card">
                <h6>Karma Over Time</h6>
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
                <hr />
                <h6>Completed Items per Day</h6>
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
                <hr />
                <h6>Completed Items per Week</h6>
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
            </div>
        );
    }
}

export default KarmaCharts;
