import { message } from 'antd';
import { history } from 'umi';
export const root = 'http://127.0.0.1:8000'; 
// export const root = 'http://127.0.0.1:8080'; #url to the fastapi database

// Encapsulation fetch
const formatParam = (param: any) => {
  if (typeof param === 'string') {
    return param
      .replace('%', '%25')
      .replace('+', '%2B')
      .replace('/', '%2F')
      .replace('?', '%3F')
      .replace('#', '%23')
      .replace('&', '%26')
      .replace('=', '%3D');
  } else {
    return param;
  }
};

const joinParam = (url: string, payload: any) => {
  let paramsArray: any = [];
  if (typeof payload === 'string') {
    return `${url}?${payload}`;
  }
  Object.keys(payload).forEach((key) => {
    if (payload[key] === 0) {
      payload[key] = '0';
    }
    if (payload[key]) {
      paramsArray.push(key + '=' + formatParam(payload[key]));
    }
  });
  if (url.search(/\?/) === -1) {
    if (paramsArray.length) {
      url += '?' + paramsArray.join('&');
    }
  } else {
    url += '&' + paramsArray.join('&');
  }
  return url;
};

const request = (url: string, config: RequestInit) => {
  return fetch(`${root}${url}`, config)
    .then((res: Response) => {
      if (!res.ok) {
        if (res.status == 401) {
          localStorage.removeItem('prol-c-token');
          // history.push('/user?type=login');
          throw Error('no message');
          // throw Error(
          //   `You haven't log on yet or your session has time out, please log on again.`,
          // );
        }
      }
      return res.json();
    })
    .then((resJson: any) => {
      if (!!resJson.error) {
        throw Error(resJson.error);
      }
      return resJson;
    })
    .catch((error: Error) => {
      if (error.message == 'no message') {
        return { error: error.message };
      }
      const msg = error.message || 'Network error.';
      message.error(msg);
      return { error: msg };
    });
};

// ------------------ GET -------------------
const get = (url: string, data?: any) => {
  return request(data ? joinParam(url, data) : url, {
    method: 'GET',
    headers: {
      token: localStorage.getItem('prol-c-token') as any,
    },
  });
};

// ------------------ POST --------------------
const post = (url: string, data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((item) => {
    formData.append(item, data[item]);
  });
  const headers = { token: localStorage.getItem('prol-c-token') as any };

  return request(url, {
    method: 'POST',
    body: formData,
    headers: headers,
  });
};


export { get, post };
