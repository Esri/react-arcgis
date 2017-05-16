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
  <Widget {...props} scriptUri="esri/widgets/Attribution" boundProperties={{...props.boundProperties}} />
);

export const BasemapGallery = (props: BasemapGalleryProps) => (
  <Widget {...props} scriptUri="esri/widgets/BasemapGallery" boundProperties={{...props.boundProperties}} />
);

export const BasemapToggle = (props: BasemapToggleProps) => (
  <Widget {...props} scriptUri="esri/widgets/BasemapToggle" boundProperties={{...props.boundProperties}} />
);

export const ColorSlider = (props: ColorSliderProps) => (
  <Widget {...props} scriptUri="esri/widgets/ColorSlider" boundProperties={{...props.boundProperties}} />
);

export const Compass = (props: CompassProps) => (
  <Widget {...props} scriptUri="esri/widgets/Compass" boundProperties={{...props.boundProperties}} />
);

export const Expand = (props: ExpandProps) => (
  <Widget {...props} scriptUri="esri/widgets/Expand" boundProperties={{...props.boundProperties}} />
);

export const Home = (props: HomeProps) => (
  <Widget {...props} scriptUri="esri/widgets/Home" boundProperties={{...props.boundProperties}} />
);

export const LayerList = (props: LayerListProps) => (
  <Widget {...props} scriptUri="esri/widgets/LayerList" boundProperties={{...props.boundProperties}} />
);

export const Legend = (props: LegendProps) => (
  <Widget {...props} scriptUri="esri/widgets/Legend" boundProperties={{...props.boundProperties}} />
);

export const Locate = (props: LocateProps) => (
  <Widget {...props} scriptUri="esri/widgets/Locate" boundProperties={{...props.boundProperties}} />
);

export const NavigationToggle = (props: NavigationToggleProps) => (
  <Widget {...props} scriptUri="esri/widgets/NavigationToggle" boundProperties={{...props.boundProperties}} />
);

export const Popup = (props: PopupProps) => (
  <Widget {...props} scriptUri="esri/widgets/Popup" boundProperties={{...props.boundProperties}} />
);

export const Print = (props: PrintProps) => (
  <Widget {...props} scriptUri="esri/widgets/Print" boundProperties={{...props.boundProperties}} />
);

export const ScaleBar = (props: ScaleBarProps) => (
  <Widget {...props} scriptUri="esri/widgets/ScaleBar" boundProperties={{...props.boundProperties}} />
);

export const Search = (props: SearchProps) => (
  <Widget {...props} scriptUri="esri/widgets/Search" boundProperties={{...props.boundProperties}} />
);

export const SizeSlider = (props: SizeSliderProps) => (
  <Widget {...props} scriptUri="esri/widgets/SizeSlider" boundProperties={{...props.boundProperties}} />
);

export const Track = (props: TrackProps) => (
  <Widget {...props} scriptUri="esri/widgets/Track" boundProperties={{...props.boundProperties}} />
);

export const UnivariateColorSizeSlider = (props: UnivariateColorSizeSliderProps) => (
  <Widget {...props} scriptUri="esri/widgets/UnvariateColorSizeSlider" boundProperties={{...props.boundProperties}} />
);

export const Zoom = (props: ZoomProps) => (
  <Widget {...props} scriptUri="esri/widgets/Zoom" boundProperties={{...props.boundProperties}} />
);
