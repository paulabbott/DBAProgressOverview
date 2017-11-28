import Store from 'store';
import Promise from 'bluebird';
import getAvailableAlerts from './helpers/getAvailableAlerts';
import {registerComponent} from 'bloom';
import ProgressOverviewCounter from './components/progressOverviewCounter';

_.delay(function() {
    
    if (Store.getState().auth) {
        Store.subscribe(function() {
            getAvailableAlerts(Store.getState().alerts);
        });
        getAvailableAlerts(Store.getState().alerts);
    }
    
}, 1000);

registerComponent('rewards', 'Rewards', ProgressOverviewCounter, 'progressOverview');