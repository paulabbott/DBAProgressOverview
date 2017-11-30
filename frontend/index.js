import Store from 'store';
import Promise from 'bluebird';
import getAvailableAlerts from './helpers/getAvailableAlerts';
import {registerComponent} from 'bloom';
import ProgressOverviewCounter from './components/progressOverviewCounter';

//because getAvailableAlerts needs the user to be authed can't run stright away so delay
_.delay(function() {
    
    if (Store.getState().auth) {
        //then subscribe to the store so whenever it changes we call getAvailableAlerts
        Store.subscribe(function() {
            getAvailableAlerts(Store.getState().alerts);
        });
        //but also call now because it wont get called the first time.
        getAvailableAlerts(Store.getState().alerts);
    }
    
}, 1000);

// this is just demonstrating registering a component it would for exsample be using a rewards or
// progressive profiling component in a seperate plugin.
registerComponent('rewards', 'Rewards', ProgressOverviewCounter, 'progressOverview');