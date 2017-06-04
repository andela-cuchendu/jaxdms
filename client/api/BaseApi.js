import * as request from 'superagent';
export function BaseApi(data, type, url, callBack) {
  request[type](url)
    .send(data)
    .set('x-access-token', localStorage.getItem('token'))
    .end(function (res, result) {
      if (result) {
        return callBack(result.body);
      }

      return callBack(result);
    });
}
