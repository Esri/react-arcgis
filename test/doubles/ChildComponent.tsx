export interface ChildComponentProps {
  map?: __esri.Map;
  view?: __esri.View;
}

export default (props: ChildComponentProps) => (
  <h3 id="child">{props.map as any}{props.view as any}</h3>
);
