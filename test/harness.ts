import * as mock from 'mock-require';

import SampleTests from './ts/test';
SampleTests();

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
