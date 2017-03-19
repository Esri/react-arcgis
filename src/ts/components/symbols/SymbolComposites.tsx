import * as React from 'react';
import Symbol from './SymbolBase';

export interface SymbolCompositeProps {
    graphic?: __esri.Graphic,
    symbolProperties?: {
      [propName: string]: any;
    }

    registerSymbol?: (intance: __esri.Symbol) => any,
    onLoad?: (instance: __esri.Symbol) => any,
    onFail?: (e: any) => any
}

export const Font = (props: SymbolCompositeProps) => (
    <Symbol {...props} scriptUri='esri/symbols/Font' />
);

export const PictureFillSymbol = (props: SymbolCompositeProps) => (
    <Symbol {...props} scriptUri='esri/symbols/PictureFillSymbol' />
);

export const PictureMarkerSymbol = (props: SymbolCompositeProps) => (
    <Symbol {...props} scriptUri='esri/symbols/PictureMarkerSymbol' />
);

export const SimpleFillSymbol = (props: SymbolCompositeProps) => (
    <Symbol {...props} scriptUri='esri/symbols/SimpleFillSymbol' />
);

export const SimpleLineSymbol = (props: SymbolCompositeProps) => (
    <Symbol {...props} scriptUri='esri/symbols/SimpleLineSymbol' />
);

export const SimpleMarkerSymbol = (props: SymbolCompositeProps) => (
    <Symbol {...props} scriptUri='esri/symbols/SimpleMarkerSymbol' />
);