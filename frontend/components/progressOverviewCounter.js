import React from 'react';
import Odometer from 'react-odometerjs';

var ProgressOverviewCounter = React.createClass({
    render: function() {
        return (
            <div className="progress-overview-counter">
                <div className="progress-overview-counter-odometer">
                    <Odometer 
                        className='odometer' 
                        value={this.props.value} 
                        format="d" />
                </div>
                <div className="progress-overview-counter-label">
                    {this.props.label}
                </div>
            </div>
        );
    }
})

export default ProgressOverviewCounter;