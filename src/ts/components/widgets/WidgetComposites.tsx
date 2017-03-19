import * as React from 'react';
import Widget from './WidgetBase';

export interface WidgetCompositeProps {
    view?: __esri.SceneView | __esri.MapView,
    position?: string,
    widgetProperties?: {
      [propName: string]: any;
    }

    onLoad?: (instance: __esri.Widget) => any,
    onFail?: (e: any) => any
}

export const Attribution = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Attribution' />
);

export const BasemapGallery = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/BasemapGallery' />
);

export const BasemapToggle = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/BasemapToggle' />
);

export const ColorSlider = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/ColorSlider' />
);

export const Compass = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Compass' />
);

export const Expand = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Expand' />
);

export const Home = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Home' />
);

export const LayerList = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/LayerList' />
);

export const Legend = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Legend' />
);

export const Locate = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Locate' />
);

export const NavigationToggle = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/NavigationToggle' />
);

export const Popup = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Popup' />
);

export const Print = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Print' />
);

export const ScaleBar = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/ScaleBar' />
);

export const Search = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Search' />
);

export const SizeSlider = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/SizeSlider' />
);

export const Track = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Track' />
);

export const UnvariateColorSizeSlider = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/UnvariateColorSizeSlider' />
);

export const Zoom = (props: WidgetCompositeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Zoom' />
);