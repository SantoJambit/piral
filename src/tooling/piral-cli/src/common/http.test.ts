import { postFile, downloadFile } from './http';

const apiUrl = 'http://sample.fooo.com/api/v1/pilet';

let errorRequest = false;
let errorOther = false;
let errorResponse = false;
let errorResponse2 = false;

jest.mock('axios', () => ({
  default: {
    post(url, _, options) {
      const found = url === apiUrl;
      const auth = options.headers.authorization === 'Basic 123';

      if (errorRequest) {
        return Promise.reject({
          request: {},
        });
      } else if (errorOther) {
        return Promise.reject({
          message: 'error',
        });
      } else if (errorResponse) {
        return Promise.reject({
          response: {
            status: 410,
            statusText: 'Not Gone',
            data: '{ "message": "This component is not available anymore." }',
          },
        });
      } else if (errorResponse2) {
        return Promise.reject({
          response: {
            status: 410,
            statusText: 'Not Gone',
            data: { message: 'This component is not available anymore.' },
          },
        });
      } else if (!found) {
        return Promise.reject({
          response: {
            status: 404,
            statusText: 'Not found',
          },
        });
      } else if (!auth) {
        return Promise.reject({
          response: {
            status: 401,
            statusText: 'Not authorized',
          },
        });
      } else {
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
        });
      }
    },
    get(url, options) {
      if (errorOther) {
        return Promise.reject({
          message: 'error',
        });
      }
      return Promise.resolve({ data: 'test' });
    },
  },
}));

describe('HTTP Module', () => {
  it('postFile form posts a file successfully should be ok', async () => {
    const result = await postFile(apiUrl, '123', Buffer.from('example'));
    expect(result).toBeTruthy();
  });

  it('postFile form fails to post file should be false', async () => {
    const result = await postFile(apiUrl, '124', Buffer.from('example'));
    expect(result).toBeFalsy();
  });

  it('postFile form not found to post file should be false', async () => {
    const result = await postFile('http://sample.com/', '', Buffer.from('example'));
    expect(result).toBeFalsy();
  });

  it('postFile call results in error request', async () => {
    errorRequest = true;
    const result = await postFile('http://sample.com/', '', Buffer.from('example'));
    expect(result).toBeFalsy();
    errorRequest = false;
  });

  it('postFile call results in error other', async () => {
    errorOther = true;
    const result = await postFile('http://sample.com/', '', Buffer.from('example'));
    expect(result).toBeFalsy();
    errorOther = false;
  });

  it('postFile call results in error response', async () => {
    errorResponse = true;
    let result = await postFile('http://sample.com/', '', Buffer.from('example'));
    expect(result).toBeFalsy();
    errorResponse = false;
    errorResponse2 = true;
    result = await postFile('http://sample.com/', '', Buffer.from('example'));
    expect(result).toBeFalsy();
    errorResponse2 = false;
  });

  it('downloadFile calls results in error', async () => {
    errorOther = true;
    let result = await downloadFile('http://sample.com/', Buffer.from('example'));
    expect(result.length).toBe(0);
    errorOther = false;
    result = await downloadFile('http://sample.com/', Buffer.from('example'));
    expect(result.length).toBe(0);
  });
});
