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
    <Symbol {...props} scriptUri="esri/symbols/Font" boundProperties={{ ...props.boundProperties }} />
);

export const PictureFillSymbol = (props: PictureFillSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/PictureFillSymbol" boundProperties={{ ...props.boundProperties }} />
);

export const PictureMarkerSymbol = (props: PictureMarkerSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/PictureMarkerSymbol" boundProperties={{ ...props.boundProperties }} />
);

export const SimpleFillSymbol = (props: SimpleFillSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleFillSymbol" boundProperties={{ ...props.boundProperties }} />
);

export const SimpleLineSymbol = (props: SimpleLineSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleLineSymbol" boundProperties={{ ...props.boundProperties }} />
);

export const SimpleMarkerSymbol = (props: SimpleMarkerSymbolProps) => (
    <Symbol {...props} scriptUri="esri/symbols/SimpleMarkerSymbol" boundProperties={{ ...props.boundProperties }} />
);
