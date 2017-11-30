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
        //this is calling a action that already exsists to fetch the users achivment model
        this.props.fetchUserAchievements()
        .then((response) => {
            this.setState({
                hasDataLoaded: true,
                isSyncing: false
            }, function() {
                this.setState({
                    //set animation true here
                    _hasAnimatedPoints: true
                }, function() {
                    this.setState({
                        //and here, not sure we still need to chain these?
                        //also is this really a good discription of whats happening?
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
            //spread props and pass to the compenent, I don't understand what this equates too.
            <ProgressOverviewDialog
                {...this.props}
                {...this.state}
            />
        );
    }
})

//HOC takes all out components and iterates threw them, again can't quite say exsactly what is happening here
export default connect(function(state, props) {
    return {
        achievements: state.achievements,
        alerts: state.alerts
    }
}, {fetchUserAchievements})(ProgressOverviewDialogContainer);