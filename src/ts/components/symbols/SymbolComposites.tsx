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
    <Symbol {...props} scriptUri="esri/symbols/Font" />
);

export const PictureFillSymbol = (props: PictureFillSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/PictureFillSymbol" />
);

export const PictureMarkerSymbol = (props: PictureMarkerSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/PictureMarkerSymbol" />
);

export const SimpleFillSymbol = (props: SimpleFillSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleFillSymbol" />
);

export const SimpleLineSymbol = (props: SimpleLineSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleLineSymbol" />
);

export const SimpleMarkerSymbol = (props: SimpleMarkerSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleMarkerSymbol" />
);