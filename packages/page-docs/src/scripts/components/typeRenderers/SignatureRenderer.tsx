import * as React from 'react';
import { TiNode } from './types';
import { TypeParameterRenderer, TypeRenderer } from './TypeRenderer';
import { withSep } from './utils';

export interface SignatureRendererProps {
  node: TiNode;
  render(child: TiNode): JSX.Element;
  brackets?: string;
}

export const SignatureRenderer: React.SFC<SignatureRendererProps> = ({ node, render, brackets = '()' }) => (
  <>
    <TypeParameterRenderer args={node.typeParameter} render={render} />
    {brackets[0]}
    {withSep(
      (node.parameters || []).map(p => (
        <span key={p.id}>
          {p.name}: <TypeRenderer node={p.type} render={render} />
        </span>
      )),
      ', ',
    )}
    {brackets[1]}: <TypeRenderer node={node.type} render={render} />
  </>
);
