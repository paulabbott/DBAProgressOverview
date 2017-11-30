import {addDialog} from 'modules/notifications/actions/notifications';
import Store from 'store';
import {markAllProgressAlertsAsViewed} from '../actions/progressOverviewActions';
import ProgressOverviewDialogContainer from '../containers/progressOverviewDialogContainer';
var hasBeenOpened = false;

export default function(alerts) {

    if (hasBeenOpened === true) return;

    var availableAlerts = _.filter(alerts, {_hasBeenViewed: false});

    console.log(availableAlerts);

    if (availableAlerts.length > 0) {

        //this keep track of if we have showen the popup already
        //do we still need to do this if we are marking the events as viewed?
        hasBeenOpened = true;
        
        const defaultDialog = {
            customDialog: ProgressOverviewDialogContainer,
            title: 'Progress Overview',
            body: '',
            actions: [
                {
                    action: 'close',
                    buttonText: 'OK',
                    buttonType: 'primary'
                }
            ]
        };
        
        //have to use Store.dispatch because there is no contained to dispatch from.
        Store.dispatch(addDialog(defaultDialog)).then(function(result) {
            hasBeenOpened = false;
            Store.dispatch(markAllProgressAlertsAsViewed());
        });

    }

}