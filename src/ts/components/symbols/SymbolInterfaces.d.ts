export interface SymbolCompositeProps {
    dataFlow?: 'oneWay' | 'oneTime';
    graphic?: __esri.Graphic;
    symbolProperties?: {
      [propName: string]: any;
    };
    registerSymbol?: (intance: __esri.Symbol) => any;
    onLoad?: (instance: __esri.Symbol) => any;
    onFail?: (e: any) => any;
}

export interface FontProps extends SymbolCompositeProps {
  // symbolProperties: __esri.FontProperties;
}

export interface PictureFillSymbolProps extends SymbolCompositeProps {
  // symbolProperties: __esri.PictureFillSymbolProperties;
}

export interface PictureMarkerSymbolProps extends SymbolCompositeProps {
  // symbolProperties: __esri.PictureMarkerSymbolProperties;
}

export interface SimpleFillSymbolProps extends SymbolCompositeProps {
  // symbolProperties: __esri.SimpleFillSymbolProperties;
}

export interface SimpleLineSymbolProps extends SymbolCompositeProps {
  // symbolProperties: __esri.SimpleLineSymbolProperties;
}

export interface SimpleMarkerSymbolProps extends SymbolCompositeProps {
  // symbolProperties: __esri.SimpleMarkerSymbolProperties;
}