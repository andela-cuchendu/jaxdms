import * as request from 'superagent';

/**
 * This function us used in making API calls to backend
 * @param {any} ApiData -Data supplied to the API
 * @param {any} ApiType -Api request type
 * @param {any} Url -URL of the reqquest
 * @param {any} CallBack - The callback function
 * @return {object}
 */
export function ApiRequest(ApiData, ApiType, Url, CallBack) {
  request[ApiType](Url)
    .send(ApiData)
    .set('token', localStorage.getItem('token'))
    .set('Accept', 'application/json')
    .end(function (res, result) {
      if (result) {
        return CallBack(result.body);
      }
      return CallBack(result);
    });
}
