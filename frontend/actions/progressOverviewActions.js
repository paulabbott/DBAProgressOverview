import axios from 'axios';
import Bluebird from 'bluebird';
export const SYNC_ALERTS = 'SYNC_ALERTS';

export function markAllProgressAlertsAsViewed() {
    return dispatch => {
        return axios.put(`api/progressOverview/markAllProgressAlertsAsViewed`)
        .then((response) => {
            dispatch({
                type: SYNC_ALERTS,
                payload: response.data
            })
        })
    }
}