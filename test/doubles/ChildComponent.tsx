import * as React from 'react';

export interface ChildComponentProps {
  map?: __esri.Map;
  view?: __esri.View;
}

export default (props: ChildComponentProps) => (
  <h3 id="child">{props.map}{props.view}</h3>
);
