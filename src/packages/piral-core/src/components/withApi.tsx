import * as React from 'react';
import { wrapComponent } from 'react-arbiter';
import { ComponentError, ComponentLoader } from './helpers';
import { AnyComponent } from '../types';

export interface ApiForward<TApi> {
  piral: TApi;
}

export function withApi<TApi, TProps>(component: AnyComponent<TProps & ApiForward<TApi>>, piral: TApi) {
  return wrapComponent<TProps, ApiForward<TApi>>(component, {
    forwardProps: { piral },
    onError(error) {
      console.error(piral, error);
    },
    renderChild(child) {
      return <React.Suspense fallback={<ComponentLoader />}>{child}</React.Suspense>;
    },
    renderError(error) {
      return <ComponentError type="feed" error={error} />;
    },
  });
}
