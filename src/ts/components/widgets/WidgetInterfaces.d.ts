interface WidgetCompositeProps {
    view?: __esri.SceneView | __esri.MapView,
    position?: string,
    onLoad?: (instance: __esri.Widget) => any,
    onFail?: (e: any) => any
}

export interface AttributionProps extends WidgetCompositeProps {
    widgetProperties?: __esri.AttributionProperties
}

export interface BasemapGalleryProps extends WidgetCompositeProps {
    widgetProperties?: __esri.BasemapGalleryProperties
}

export interface BasemapToggleProps extends WidgetCompositeProps {
    widgetProperties?: __esri.BasemapToggleProperties
}

export interface ColorSliderProps extends WidgetCompositeProps {
    widgetProperties?: __esri.ColorSliderProperties
}

export interface CompassProps extends WidgetCompositeProps {
    widgetProperties?: __esri.CompassProperties
}

export interface ExpandProps extends WidgetCompositeProps {
    widgetProperties?: __esri.ExpandProperties
}

export interface HomeProps extends WidgetCompositeProps {
    widgetProperties?: __esri.HomeProperties
}

export interface LayerListProps extends WidgetCompositeProps {
    widgetProperties?: __esri.LayerListProperties
}

export interface LegendProps extends WidgetCompositeProps {
    widgetProperties?: __esri.LegendProperties
}

export interface LocateProps extends WidgetCompositeProps {
    widgetProperties?: __esri.LocateProperties
}

export interface NavigationToggleProps extends WidgetCompositeProps {
    widgetProperties?: __esri.NavigationToggleProperties
}

export interface PopupProps extends WidgetCompositeProps {
    widgetProperties?: __esri.PopupProperties
}

export interface PrintProps extends WidgetCompositeProps {
    widgetProperties?: __esri.PrintProperties
}

export interface ScaleBarProps extends WidgetCompositeProps {
    widgetProperties?: __esri.ScaleBarProperties
}

export interface SearchProps extends WidgetCompositeProps {
    widgetProperties?: __esri.SearchProperties
}

export interface SizeSliderProps extends WidgetCompositeProps {
    widgetProperties?: __esri.SizeSliderProperties
}

export interface TrackProps extends WidgetCompositeProps {
    widgetProperties?: __esri.TrackProperties
}

export interface UnivariateColorSizeSliderProps extends WidgetCompositeProps {
    widgetProperties?: __esri.UnivariateColorSizeSliderProperties
}

export interface ZoomProps extends WidgetCompositeProps {
    widgetProperties?: __esri.ZoomProperties
}