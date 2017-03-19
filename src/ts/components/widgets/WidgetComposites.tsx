import * as React from 'react';
import Widget from './WidgetBase';

import { 
  WidgetCompositeProps, 
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
  ZoomProps
} from './WidgetInterfaces';

export const Attribution = (props: AttributionProps) => (
  <Widget {...props} scriptUri='esri/widgets/Attribution' />
);

export const BasemapGallery = (props: BasemapGalleryProps) => (
  <Widget {...props} scriptUri='esri/widgets/BasemapGallery' />
);

export const BasemapToggle = (props: BasemapToggleProps) => (
  <Widget {...props} scriptUri='esri/widgets/BasemapToggle' />
);

export const ColorSlider = (props: ColorSliderProps) => (
  <Widget {...props} scriptUri='esri/widgets/ColorSlider' />
);

export const Compass = (props: CompassProps) => (
  <Widget {...props} scriptUri='esri/widgets/Compass' />
);

export const Expand = (props: ExpandProps) => (
  <Widget {...props} scriptUri='esri/widgets/Expand' />
);

export const Home = (props: HomeProps) => (
  <Widget {...props} scriptUri='esri/widgets/Home' />
);

export const LayerList = (props: LayerListProps) => (
  <Widget {...props} scriptUri='esri/widgets/LayerList' />
);

export const Legend = (props: LegendProps) => (
  <Widget {...props} scriptUri='esri/widgets/Legend' />
);

export const Locate = (props: LocateProps) => (
  <Widget {...props} scriptUri='esri/widgets/Locate' />
);

export const NavigationToggle = (props: NavigationToggleProps) => (
  <Widget {...props} scriptUri='esri/widgets/NavigationToggle' />
);

export const Popup = (props: PopupProps) => (
  <Widget {...props} scriptUri='esri/widgets/Popup' />
);

export const Print = (props: PrintProps) => (
  <Widget {...props} scriptUri='esri/widgets/Print' />
);

export const ScaleBar = (props: ScaleBarProps) => (
  <Widget {...props} scriptUri='esri/widgets/ScaleBar' />
);

export const Search = (props: SearchProps) => (
  <Widget {...props} scriptUri='esri/widgets/Search' />
);

export const SizeSlider = (props: SizeSliderProps) => (
  <Widget {...props} scriptUri='esri/widgets/SizeSlider' />
);

export const Track = (props: TrackProps) => (
  <Widget {...props} scriptUri='esri/widgets/Track' />
);

export const UnivariateColorSizeSlider = (props: UnivariateColorSizeSliderProps) => (
  <Widget {...props} scriptUri='esri/widgets/UnvariateColorSizeSlider' />
);

export const Zoom = (props: ZoomProps) => (
  <Widget {...props} scriptUri='esri/widgets/Zoom' />
);