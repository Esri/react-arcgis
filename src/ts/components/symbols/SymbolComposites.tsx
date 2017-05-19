import * as React from 'react';
import Symbol from './SymbolBase';

import {
    FontProps,
    PictureFillSymbolProps,
    PictureMarkerSymbolProps,
    SimpleFillSymbolProps,
    SimpleLineSymbolProps,
    SimpleMarkerSymbolProps
} from './SymbolInterfaces';

export const Font = (props: FontProps) => (
    <Symbol {...props} scriptUri="esri/symbols/Font" symbolProperties={{...props.symbolProperties}} />
);

export const PictureFillSymbol = (props: PictureFillSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/PictureFillSymbol" symbolProperties={{...props.symbolProperties}} />
);

export const PictureMarkerSymbol = (props: PictureMarkerSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/PictureMarkerSymbol" symbolProperties={{...props.symbolProperties}} />
);

export const SimpleFillSymbol = (props: SimpleFillSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleFillSymbol" symbolProperties={{...props.symbolProperties}} />
);

export const SimpleLineSymbol = (props: SimpleLineSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleLineSymbol" symbolProperties={{...props.symbolProperties}} />
);

export const SimpleMarkerSymbol = (props: SimpleMarkerSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleMarkerSymbol" symbolProperties={{...props.symbolProperties}} />
);
