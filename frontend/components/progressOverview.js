import React from 'react';
import ProgressOverviewCounter from './progressOverviewCounter';

var ProgressOverview = React.createClass({
    render: function() {
        return (
            <div className="progress-overview">
                <ProgressOverviewCounter
                    value={this.props.totalPoints}
                    label={'Points'}
                />
                <ProgressOverviewCounter
                    value={this.props.totalStars}
                    label={'Stars'}
                />
            </div>
        );
    }
})

export default ProgressOverview;