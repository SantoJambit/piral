import * as React from 'react';
import {
  TiNode,
  TiKind,
  InlineInterfaceRenderer,
  InterfaceRenderer,
  ModuleRenderer,
  EnumerationRenderer,
  TypeAliasRenderer,
  ObjectLiteralRenderer,
  VariableRenderer,
  FunctionRenderer,
} from './typeRenderers';

export interface TiProps {
  children: TiNode;
}

function render(node: TiNode) {
  switch (node.kind) {
    case TiKind.Root:
    case TiKind.ExternalModule:
      return <ModuleRenderer node={node} render={render} />;
    case TiKind.Class:
    case TiKind.Interface:
      return <InterfaceRenderer node={node} render={render} />;
    case TiKind.Function:
      return node.signatures && node.signatures[0].comment && <FunctionRenderer node={node} render={render} />;
    case TiKind.ObjectLiteral:
      return <ObjectLiteralRenderer node={node} render={render} />;
    case TiKind.Variable:
      return <VariableRenderer node={node} render={render} />;
    case TiKind.TypeLiteral:
      return <InlineInterfaceRenderer node={node} render={render} />;
    case TiKind.TypeAlias:
      return <TypeAliasRenderer node={node} render={render} />;
    case TiKind.Enumeration:
      return <EnumerationRenderer node={node} render={render} />;
    default:
      return <span>{node.name}</span>;
  }
}

export const Ti: React.FC<TiProps> = ({ children }) => render(children);
