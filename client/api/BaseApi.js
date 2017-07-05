import * as request from 'superagent';

/**
 * ApiCall - The base for all API call
 * @param {object} data
 * @param {string} type
 * @param {string} url
 * @returns {object}
 */
export default function ApiCall(data, type, url) {
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
