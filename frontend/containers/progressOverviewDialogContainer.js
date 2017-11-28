import React from 'react';
import {connect} from 'react-redux';
import ProgressOverviewDialog from '../components/progressOverviewDialog';
import {fetchUserAchievements} from 'modules/achievements/actions/achievementsActions';

var ProgressOverviewDialogContainer = React.createClass({

    getInitialState: function() {
        return {
            hasDataLoaded: false,
            isSyncing: true,
            hasErrored: false
        }
    },

    componentDidMount: function() {
        this.fetchData();
    },

    fetchData: function() {
        this.props.fetchUserAchievements()
        .then((response) => {
            this.setState({
                hasDataLoaded: true,
                isSyncing: false
            }, function() {
                this.setState({
                    _hasAnimatedPoints: true
                }, function() {
                    this.setState({
                        _hasAnimatedStars: true
                    })
                })
            });
        })
        .catch((response) => {
            this.setState({
                hasErrored: true
            })
        });
    },

    render: function() {
        return (
            <ProgressOverviewDialog
                {...this.props}
                {...this.state}
            />
        );
    }
})

export default connect(function(state, props) {
    return {
        achievements: state.achievements,
        alerts: state.alerts
    }
}, {fetchUserAchievements})(ProgressOverviewDialogContainer);