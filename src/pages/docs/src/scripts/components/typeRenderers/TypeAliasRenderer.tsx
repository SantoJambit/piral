import * as React from 'react';
import { TypeRenderer } from './TypeRenderer';
import { gid } from './utils';
import { TiNode } from './types';
import { Details } from './Details';

export interface TypeAliasRendererProps {
  node: TiNode;
  render(child: TiNode): JSX.Element;
}

export const TypeAliasRenderer: React.FC<TypeAliasRendererProps> = ({ node, render }) => (
  <Details color="pink" id={gid(node)} kind={node.kindString} title={node.name} description={node.comment}>
    <span className="block">
      <code>
        <TypeRenderer node={node.type} render={render} />
      </code>
    </span>
  </Details>
);
