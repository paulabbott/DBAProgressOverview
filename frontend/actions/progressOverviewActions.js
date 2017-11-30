import axios from 'axios';
import Bluebird from 'bluebird';
export const SYNC_ALERTS = 'SYNC_ALERTS';

export function markAllProgressAlertsAsViewed() {
    return dispatch => {
        //call the api route that will set the alerts as hadbennViewed to true on the user model
        //Q: on the client, and then send SYNC_ALERTS which will update it on the server (or is this the other way round?)
        return axios.put(`api/progressOverview/markAllProgressAlertsAsViewed`)
        .then((response) => {
            dispatch({
                type: SYNC_ALERTS,
                payload: response.data
            })
        })
    }
}