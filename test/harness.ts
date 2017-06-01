import * as mock from 'mock-require';

mock('../src/ts/Test', './doubles/doubleTrouble');
import SampleTests from './ts/test';
SampleTests();
mock.stop('../src/ts/Test');

import ArcBaseTests from './ts/components/ArcBase.spec';
ArcBaseTests();

import { MapBaseTests, WebBaseTests } from './ts/components/ArcComposites.spec';
MapBaseTests();
WebBaseTests();

import { MapTests, SceneTests } from './ts/components/MapComposites.spec';
MapTests();
SceneTests();

import { WebMapTests, WebSceneTests } from './ts/components/WebComposites.spec';
WebMapTests();
WebSceneTests();

import WidgetBaseTests from './ts/components/widgets/WidgetBase.spec';
WidgetBaseTests();

import WidgetCompositeTests from './ts/components/widgets/WidgetComposites.spec';
WidgetCompositeTests();

import SymbolBaseTests from './ts/components/symbols/SymbolBase.spec';
SymbolBaseTests();

import SymbolCompositeTests from './ts/components/symbols/SymbolComposites.spec';
SymbolCompositeTests();

import LayerBaseTests from './ts/components/layers/LayerBase.spec';
LayerBaseTests();

import LayerCompositeTests from './ts/components/layers/LayerComposites.spec';
LayerCompositeTests();

import GraphicTests from './ts/components/graphics/Graphic.spec';
GraphicTests();

import GeometryBaseTests from './ts/components/geometry/GeometryBase.spec';
GeometryBaseTests();

import GeometryCompositeTests from './ts/components/geometry/GeometryComposites.spec';
GeometryCompositeTests();
