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
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Attribution"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);

export const BasemapGallery = (props: BasemapGalleryProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/BasemapGallery"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);

export const BasemapToggle = (props: BasemapToggleProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/BasemapToggle"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
        onToggle: 'toggle'
    }}
  />
);

export const ColorSlider = (props: ColorSliderProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/ColorSlider"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
        onDataChange: 'data-change',
        onDataValueChange: 'data-value-change',
        onHandleValueChange: 'handle-value-change'
    }}
  />
);

export const Compass = (props: CompassProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Compass"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);

export const Expand = (props: ExpandProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Expand"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);

export const Home = (props: HomeProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Home"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);

export const LayerList = (props: LayerListProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/LayerList"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
      onTriggerAction: 'trigger-action'
    }}
  />
);

export const Legend = (props: LegendProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Legend"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);

export const Locate = (props: LocateProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Locate"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
      onLocate: 'locate',
      onLocateError: 'locate-error'
    }}
  />
);

export const NavigationToggle = (props: NavigationToggleProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/NavigationToggle"
    widgetProperties={{...props.widgetProperties}}
  />
);

export const Popup = (props: PopupProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Popup"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
      onTriggerAction: 'trigger-action'
    }}
  />
);

export const Print = (props: PrintProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Print"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);

export const ScaleBar = (props: ScaleBarProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/ScaleBar"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);

export const Search = (props: SearchProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Search"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
        onSearchClear: 'search-clear',
        onSearchComplete: 'search-complete',
        onSearchStart: 'search-start',
        onSelectResult: 'select-result',
        onSuggestComplete: 'suggest-complete',
        onSuggestStart: 'suggest-start'
    }}
  />
);

export const SizeSlider = (props: SizeSliderProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/SizeSlider"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
      onDataChange: 'data-change',
      onDataValueChange: 'data-value-change',
      onHandleValueChange: 'handle-value-change'
    }}
  />
);

export const Track = (props: TrackProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Track"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
      onTrack: 'track',
      onTrackError: 'track-error'
    }}
  />
);

export const UnivariateColorSizeSlider = (props: UnivariateColorSizeSliderProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/UnvariateColorSizeSlider"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{
      onDataChange: 'data-change',
      onDataValueChange: 'data-value-change',
      onHandleValueChange: 'handle-value-change'
    }}
  />
);

export const Zoom = (props: ZoomProps) => (
  <Widget
    {...props}
    dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
    scriptUri="esri/widgets/Zoom"
    widgetProperties={{...props.widgetProperties}}
    eventMap={{}}
  />
);
