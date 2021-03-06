import * as React from 'react';
import { useGlobalState } from 'piral-core';
import { rehydrate } from './rehydrate';
import { vitalize } from './vitalize';

export function getLayout(customComponents: Record<string, React.ComponentType> = {}): React.FC {
  const elements = rehydrate(document.querySelector('template[for=layout]'));

  return ({ children }) => {
    const standardComponents = useGlobalState(m => m.app.components);
    const layout = vitalize(elements, children, id => {
      return customComponents[id] || standardComponents[id];
    });
    return <>{layout}</>;
  };
}
