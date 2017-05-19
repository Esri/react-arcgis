import * as React from 'react';
import Widget from './WidgetBase';

import {
  AttributionProps,
  BasemapGalleryProps,
  BasemapToggleProps,
  ColorSliderProps,
  CompassProps,
  ExpandProps,
  HomeProps,
  LayerListProps,
  LegendProps,
  LocateProps,
  NavigationToggleProps,
  PopupProps,
  PrintProps,
  ScaleBarProps,
  SearchProps,
  SizeSliderProps,
  TrackProps,
  UnivariateColorSizeSliderProps,
  ZoomProps,
} from './WidgetInterfaces';

export const Attribution = (props: AttributionProps) => (
  <Widget {...props} scriptUri="esri/widgets/Attribution" widgetProperties={{...props.widgetProperties}} />
);

export const BasemapGallery = (props: BasemapGalleryProps) => (
  <Widget {...props} scriptUri="esri/widgets/BasemapGallery" widgetProperties={{...props.widgetProperties}} />
);

export const BasemapToggle = (props: BasemapToggleProps) => (
  <Widget {...props} scriptUri="esri/widgets/BasemapToggle" widgetProperties={{...props.widgetProperties}} />
);

export const ColorSlider = (props: ColorSliderProps) => (
  <Widget {...props} scriptUri="esri/widgets/ColorSlider" widgetProperties={{...props.widgetProperties}} />
);

export const Compass = (props: CompassProps) => (
  <Widget {...props} scriptUri="esri/widgets/Compass" widgetProperties={{...props.widgetProperties}} />
);

export const Expand = (props: ExpandProps) => (
  <Widget {...props} scriptUri="esri/widgets/Expand" widgetProperties={{...props.widgetProperties}} />
);

export const Home = (props: HomeProps) => (
  <Widget {...props} scriptUri="esri/widgets/Home" widgetProperties={{...props.widgetProperties}} />
);

export const LayerList = (props: LayerListProps) => (
  <Widget {...props} scriptUri="esri/widgets/LayerList" widgetProperties={{...props.widgetProperties}} />
);

export const Legend = (props: LegendProps) => (
  <Widget {...props} scriptUri="esri/widgets/Legend" widgetProperties={{...props.widgetProperties}} />
);

export const Locate = (props: LocateProps) => (
  <Widget {...props} scriptUri="esri/widgets/Locate" widgetProperties={{...props.widgetProperties}} />
);

export const NavigationToggle = (props: NavigationToggleProps) => (
  <Widget {...props} scriptUri="esri/widgets/NavigationToggle" widgetProperties={{...props.widgetProperties}} />
);

export const Popup = (props: PopupProps) => (
  <Widget {...props} scriptUri="esri/widgets/Popup" widgetProperties={{...props.widgetProperties}} />
);

export const Print = (props: PrintProps) => (
  <Widget {...props} scriptUri="esri/widgets/Print" widgetProperties={{...props.widgetProperties}} />
);

export const ScaleBar = (props: ScaleBarProps) => (
  <Widget {...props} scriptUri="esri/widgets/ScaleBar" widgetProperties={{...props.widgetProperties}} />
);

export const Search = (props: SearchProps) => (
  <Widget {...props} scriptUri="esri/widgets/Search" widgetProperties={{...props.widgetProperties}} />
);

export const SizeSlider = (props: SizeSliderProps) => (
  <Widget {...props} scriptUri="esri/widgets/SizeSlider" widgetProperties={{...props.widgetProperties}} />
);

export const Track = (props: TrackProps) => (
  <Widget {...props} scriptUri="esri/widgets/Track" widgetProperties={{...props.widgetProperties}} />
);

export const UnivariateColorSizeSlider = (props: UnivariateColorSizeSliderProps) => (
  <Widget {...props} scriptUri="esri/widgets/UnvariateColorSizeSlider" widgetProperties={{...props.widgetProperties}} />
);

export const Zoom = (props: ZoomProps) => (
  <Widget {...props} scriptUri="esri/widgets/Zoom" widgetProperties={{...props.widgetProperties}} />
);
