import { createLocaleApi, setupLocalizer } from './create';

describe('Create Localize API', () => {
  it('createApi can translate from global translations using the current language', () => {
    const config = {
      language: 'fr',
      messages: {
        fr: {
          foo: 'bár',
          bar: 'bár',
        },
      },
    };
    const api = createLocaleApi(setupLocalizer(config));
    const result = api.translate('foo');
    expect(result).toEqual('bár');
  });

  it('createApi can translate from local translations using the current language', () => {
    const config = {
      language: 'fr',
      messages: {
        fr: {
          foo: 'bár',
          bar: 'bár',
        },
      },
    };
    const api = createLocaleApi(setupLocalizer(config));
    api.setTranslations({
      fr: {
        foo: 'boo',
      },
    });
    const result = api.translate('foo');
    expect(result).toEqual('boo');
  });

  it('createApi can translate from local-global translations using the current language', () => {
    const config = {
      language: 'fr',
      messages: {
        fr: {
          foo: 'bár',
          bar: 'bár',
        },
      },
    };
    const api = createLocaleApi(setupLocalizer(config));
    api.setTranslations({
      fr: {
        foo: 'boo',
      },
    });
    const result = api.translate('bar');
    expect(result).toEqual('bár');
  });

  it('createApi falls back to standard string if language is not found', () => {
    const config = {
      language: 'en',
      messages: {
        fr: {
          foo: 'bár',
          bar: 'bár',
        },
      },
    };
    const api = createLocaleApi(setupLocalizer(config));
    const result = api.translate('bar');
    expect(result).toEqual('__en_bar__');
  });

  it('createApi falls back to standard string if key is not found', () => {
    const config = {
      language: 'fr',
      messages: {
        fr: {
          foo: 'bár',
          bar: 'bár',
        },
      },
    };
    const api = createLocaleApi(setupLocalizer(config));
    const result = api.translate('qxz');
    expect(result).toEqual('__fr_qxz__');
  });
});
