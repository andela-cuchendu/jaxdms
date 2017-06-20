import * as request from 'superagent';

export function BaseApi(data, type, url) {
  let token = null;
  if (window.localStorage !== undefined) {
    token = window.localStorage.getItem('token');
  }
  return new Promise((resolve, reject) => {
    request[type](url)
      .send(data)
      .set('x-access-token', token)
      .end((err, res) => {
        if (res) {
          return resolve(res.body);
        }
        return reject(err);
      });
  });
}
