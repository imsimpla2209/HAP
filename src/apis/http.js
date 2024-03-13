import axios, { AxiosError } from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://haanphat.somee.com/api/',
});

export class HttpError {
  message;
  code;
  responseBody;

  constructor(src) {
    this.message = src.message;
    this.code = src.code;
    this.responseBody = src.response?.data;
  }
}

instance.interceptors.request.use(
  async function (config) {
    //   config.headers['Content-Type'] =
    //     config?.data?.headerContentType || 'application/json';
    //   config.headers.Authorization = `Device ${phoneNumber} ${session}`;
    // handle some header etc
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (error.response?.status === ResponseStatus.UNAUTHORIZED) {

    // }
    return Promise.reject(new HttpError(error));
  },
);

export const LOCALSTORAGE = {
  USER: 'user',
  CREDENTIALS: 'credentials',
}
export class Http {
  // constructor() { }

  static _getHeader() {
    // const credentails = JSON.parse(localStorage.getItem(LOCALSTORAGE.CREDENTIALS));

    return {
      // Authorization: `Bearer ${credentails?.token || ''}`,
    }
  }
  static get = (endPoint, params) => {
    const options = {
      headers: this._getHeader(),
      params: {},
    }
    if (params && Object.keys(params).length) {
      options.params = params
    }
    return instance.get(endPoint, options)
  }
  static post = (endPoint, payload, params) => {
    const options = {
      params: {},
    }
    if (params && Object.keys(params).length) {
      options.params = params
    }
    return instance.post(endPoint, payload, options)
  }

  static put = (endPoint, payload) => {
    return instance.put(endPoint, payload, {
      headers: this._getHeader(),
    })
  }

  static patch = (endPoint, payload) => {
    return instance.patch(endPoint, payload, {
      headers: this._getHeader(),
    })
  }

  static delete = (endPoint, id) => {
    return instance.delete(endPoint + '/' + id, {
      headers: this._getHeader(),
    })
  }
}