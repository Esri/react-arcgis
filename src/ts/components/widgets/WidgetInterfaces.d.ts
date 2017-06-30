interface WidgetCompositeProps {
    dataFlow?: 'oneWay' | 'oneTime'; 
    view?: __esri.SceneView | __esri.MapView;
    position?: string;
    onLoad?: (instance: __esri.Widget) => any;
    onFail?: (e: any) => any;
}

export interface AttributionProps extends WidgetCompositeProps {
    widgetProperties?: __esri.AttributionProperties;
}

export interface BasemapGalleryProps extends WidgetCompositeProps {
    widgetProperties?: __esri.BasemapGalleryProperties;
}

export interface BasemapToggleProps extends WidgetCompositeProps {
    widgetProperties?: __esri.BasemapToggleProperties;
    onToggle?: (e: any) => any;
}

export interface ColorSliderProps extends WidgetCompositeProps {
    widgetProperties?: __esri.ColorSliderProperties;
    onDataChange?: (e: any) => any;
    onDataValueChange?: (e: any) => any;
    onHandleValueChange?: (e: any) => any;
}

export interface CompassProps extends WidgetCompositeProps {
    widgetProperties?: __esri.CompassProperties;
}

export interface ExpandProps extends WidgetCompositeProps {
    widgetProperties?: __esri.ExpandProperties;
}

export interface HomeProps extends WidgetCompositeProps {
    widgetProperties?: __esri.HomeProperties;
}

export interface LayerListProps extends WidgetCompositeProps {
    widgetProperties?: __esri.LayerListProperties;
    onTriggerAction?: (e: any) => any;
}

export interface LegendProps extends WidgetCompositeProps {
    widgetProperties?: __esri.LegendProperties;
}

export interface LocateProps extends WidgetCompositeProps {
    widgetProperties?: __esri.LocateProperties;
    onLocate?: (e: any) => any;
    onLocateError?: (e: any) => any;
}

export interface NavigationToggleProps extends WidgetCompositeProps {
    widgetProperties?: __esri.NavigationToggleProperties;
}

export interface PopupProps extends WidgetCompositeProps {
    widgetProperties?: __esri.PopupProperties;
    onTriggerAction?: (e: any) => any;
}

export interface PrintProps extends WidgetCompositeProps {
    widgetProperties?: __esri.PrintProperties;
}

export interface ScaleBarProps extends WidgetCompositeProps {
    widgetProperties?: __esri.ScaleBarProperties;
}

export interface SearchProps extends WidgetCompositeProps {
    widgetProperties?: __esri.SearchProperties;
    onSearchClear?: (e: any) => any;
    onSearchComplete?: (e: any) => any;
    onSearchStart?: (e: any) => any;
    onSelectResult?: (e: any) => any;
    onSuggestComplete?: (e: any) => any;
    onSuggestStart?: (e: any) => any;
}

export interface SizeSliderProps extends WidgetCompositeProps {
    widgetProperties?: __esri.SizeSliderProperties;
    onDataChange?: (e: any) => any;
    onDataValueChange?: (e: any) => any;
    onHandleValueChange?: (e: any) => any;
}

export interface TrackProps extends WidgetCompositeProps {
    widgetProperties?: __esri.TrackProperties;
    onTrack?: (e: any) => any;
    onTrackError?: (e: any) => any;
}

export interface UnivariateColorSizeSliderProps extends WidgetCompositeProps {
    widgetProperties?: __esri.UnivariateColorSizeSliderProperties;
    onDataChange?: (e: any) => any;
    onDataValueChange?: (e: any) => any;
    onHandleValueChange?: (e: any) => any;
}

export interface ZoomProps extends WidgetCompositeProps {
    widgetProperties?: __esri.ZoomProperties;
}