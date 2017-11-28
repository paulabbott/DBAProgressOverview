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
        
        Store.dispatch(addDialog(defaultDialog)).then(function(result) {
            hasBeenOpened = false;
            Store.dispatch(markAllProgressAlertsAsViewed());
        });

    }

}