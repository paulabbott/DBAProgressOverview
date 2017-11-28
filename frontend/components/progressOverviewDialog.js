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
		
		var currentAlert = _.find(this.props.alerts, function(alert) {
			return (alert._type === type);
		})
		
		var numberToDeduct = 0;
		
		if (currentAlert && !this.props[currentDisplay]) {
			numberToDeduct = parseInt(currentAlert._alertValue);
		}

		return this.props.achievements[achievementsAttribute] - numberToDeduct;

	},

	getProgressOverviewLocations: function() {

		var locationComponents = getComponents('progressOverview');
        
        return _.map(locationComponents, function(locationComponent) {
			var ComponentItem = locationComponent.component;
			return (
				<ComponentItem location="progressOverview" key={locationComponent.name}/>
			);
		});
		
	},

	renderDialog: function() {
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