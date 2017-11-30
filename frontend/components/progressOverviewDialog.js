import React from 'react';
import {DialogTitle, DialogBody, DialogActions} from 'modules/notifications/components/dialogComponents';
import {Loading} from 'aptr-uikit';
import ProgressOverview from './progressOverview';
import {getComponents} from 'bloom';

var ProgressOverviewDialog = React.createClass({
    handleDialogAction: function(action) {
		this.props.commitAction({
			action: action,
			payload: null
		});
	},

	getValue: function(type, currentDisplay, achievementsAttribute) {
		
		//from all the alert passed to us in props, find the one that matches the passed in type
		var currentAlert = _.find(this.props.alerts, function(alert) {
			return (alert._type === type);
		})
		
		var numberToDeduct = 0;
		
		//don't understand the second half of this statment
		if (currentAlert && !this.props[currentDisplay]) {
			numberToDeduct = parseInt(currentAlert._alertValue);
		}

		//so return the number that we are counting up from. (ie not including the points just awarded)
		return this.props.achievements[achievementsAttribute] - numberToDeduct;
	},

	getProgressOverviewLocations: function() {

		//get all components that have registered themselves to the 'progressOverview' location
		var locationComponents = getComponents('progressOverview');
        
        return _.map(locationComponents, function(locationComponent) {
			//for each component that has been registered get the actual react component
			var ComponentItem = locationComponent.component;
			//and render it
			return (
				<ComponentItem location="progressOverview" key={locationComponent.name}/>
			);
		});
		
	},

	renderDialog: function() {
		//show loading screen if data hasen't been loaded
		if (!this.props.hasDataLoaded) return <Loading/>

		return (
			<div>
				<DialogTitle title={this.props.title} className="dialog-title default-dialog-title"/>
				<DialogBody body={this.props.body} className="dialog-body default-dialog-body"/>
				<ProgressOverview
					totalPoints={this.getValue('POINTS_GAINED', '_hasAnimatedPoints', '_totalPoints')}
					totalStars={this.getValue('STARS_GAINED', '_hasAnimatedStars', '_totalStars')}
				/>
				{this.getProgressOverviewLocations()}
				<DialogActions
					onDialogAction={this.handleDialogAction}
					actions={this.props.actions} 
					className="default-dialog-actions"/>
			</div>
		)
	},

	//remember Daryl saying something about how they only ever render one companent but can't remember exsactly what.
	render: function() {
		console.log(this.props);
		return (
			<div className="dialog default-dialog progress-overview-dialog">
				{this.renderDialog()}
			</div>
		);
	}
})

export default ProgressOverviewDialog;