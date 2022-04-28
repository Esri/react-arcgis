import { JSDOM } from "jsdom";
import * as mock from "mock-require";

const dom = new JSDOM("<html><body></body></html>");
global["window"] = dom.window;
global["navigator"] = dom.window.navigator;
global["document"] = dom.window.document;
global["asyncSuccess"] = true;

mock("esri-loader", "./doubles/esriLoader");

import SampleTests from "./ts/test";
SampleTests();

import ArcBaseTests from "./ts/components/ArcBase.spec";
ArcBaseTests();

import { MapBaseTests, WebBaseTests } from "./ts/components/ArcComposites.spec";
MapBaseTests();
WebBaseTests();

import { MapTests, SceneTests } from "./ts/components/MapComposites.spec";
MapTests();
SceneTests();

import { WebMapTests, WebSceneTests } from "./ts/components/WebComposites.spec";
WebMapTests();
WebSceneTests();
