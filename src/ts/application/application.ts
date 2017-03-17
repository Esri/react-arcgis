import '../../css/index.scss';

import { esriPromise } from 'esri-promise';
import { Promise } from 'es6-promise';
import ItemHelperFactory from "../boilerplate/ItemHelper";
import UrlParamHelperFactory from "../boilerplate/UrlParamHelper";
import { BoilerplateResults, BoilerplateResponse, Settings, GroupData, Config, UrlParamHelperInterface, ItemHelperInterface, ApplicationInterface } from '../interfaces';

const CSS = {
  loading: "boilerplate--loading",
  error: "boilerplate--error",
  errorIcon: "esri-icon-notice-round"
};

export default (): Promise<ApplicationInterface> => esriPromise([
  'dojo/_base/lang', 'dojo/dom', 'dojo/dom-attr', 'dojo/domReady!',
  'esri/views/MapView', 'esri/views/SceneView', 'esri/widgets/Search',
  'esri/WebMap', 'esri/WebScene', 'dojo/i18n!config/nls/resources'
]).then(([
  lang, dom, domAttr, domClass,
  MapView, SceneView, Search,
  WebMap, WebScene, i18n
]) => {

  class Application implements ApplicationInterface {
    config: Config = null;
    direction: any = null;
    settings: Settings = null;
    urlParamHelper = null;
    itemHelper = null;

    public init(boilerplateResponse: BoilerplateResponse): void {
      if (boilerplateResponse) {
        this.direction = boilerplateResponse.direction;
        this.config = boilerplateResponse.config;
        this.settings = boilerplateResponse.settings;
        const boilerplateResults = boilerplateResponse.results;
        const webMapItem = boilerplateResults.webMapItem;
        const webSceneItem = boilerplateResults.webSceneItem;
        const groupData = boilerplateResults.group;

        document.documentElement.lang = boilerplateResponse.locale;

        ItemHelperFactory().then((instance) => {
          this.itemHelper = instance;
        })
        .catch((err) => {
          throw err;
        }).then(UrlParamHelperFactory).then((instance) => {
          this.urlParamHelper = instance;
        }).catch((err) => {
          throw err;
        }).then(() => {

          this._setDirection();

          if (webMapItem) {
            this._createWebMap(webMapItem);
          }
          else if (webSceneItem) {
            this._createWebScene(webSceneItem);
          }
          else if (groupData) {
            this._createGroupGallery(groupData);
          }
          else {
            this.reportError(new Error("app:: Could not load an item to display"));
          }
        }).catch((err) => {
          throw(err);
        });
      }
      else {
        this.reportError(new Error("app:: Boilerplate is not defined"));
      }
    }

    public reportError(error) {
      // remove loading class from body
      document.body.removeAttribute('class');
      document.body.className = CSS.error;
      // an error occurred - notify the user. In this example we pull the string from the
      // resource.js file located in the nls folder because we've set the application up
      // for localization. If you don't need to support multiple languages you can hardcode the
      // strings here and comment out the call in index.html to get the localization strings.
      // set message
      const node = dom.byId("loading_message");
      if (node) {
        node.innerHTML = "<h1><span class=\"" + CSS.errorIcon + "\"></span> " + i18n.error + "</h1><p>" + error.message + "</p>";
      }
      return error;
    }

    private _setDirection() {
      const direction = this.direction;
      const dirNode = document.getElementsByTagName("html")[0];
      domAttr.set(dirNode, "dir", direction);
    }

    private _ready() {
      document.body.removeAttribute('class');
      document.title = this.config.title;
    }

    private _createWebMap(webMapItem) {
      this.itemHelper.createWebMap(webMapItem).then((map: __esri.WebMap) => {

        const viewProperties = {
          map,
          container: this.settings.webmap.containerId
        };

        if (!this.config.title && map.portalItem && map.portalItem.title) {
          this.config.title = map.portalItem.title;
        }

        lang.mixin(viewProperties, this.urlParamHelper.getViewProperties(this.config));

        const view = new MapView(viewProperties);

        view.then((response) => {
          this.urlParamHelper.addToView(view, this.config);

          this._ready();

        }, this.reportError);

      }, this.reportError);
    }

    private _createWebScene(webSceneItem) {
      this.itemHelper.createWebScene(webSceneItem).then((map: __esri.WebScene) => {

        const viewProperties = {
          map,
          container: this.settings.webscene.containerId
        };

        if (!this.config.title && map.portalItem && map.portalItem.title) {
          this.config.title = map.portalItem.title;
        }

        lang.mixin(viewProperties, this.urlParamHelper.getViewProperties(this.config));

          const view = new SceneView(viewProperties);

          view.then((response) => {
            this.urlParamHelper.addToView(view, this.config);

            this._ready();

          }, this.reportError);

      }, this.reportError);
    }

    private _createGroupGallery(groupData: GroupData) {
      const groupInfoData = groupData.infoData;
      const groupItemsData = groupData.itemsData;

      if (!groupInfoData || !groupItemsData || groupInfoData.total === 0 || groupInfoData instanceof Error) {
        this.reportError(new Error("app:: group data does not exist."));
        return;
      }

      const info = groupInfoData.results[0];
      const items = groupItemsData.results;

      this._ready();

      if (info && items) {
        let html = "";

        html += "<h1>" + info.title + "</h1>";

        html += "<ol>";

        items.forEach((item) => {
          html += "<li>" + item.title + "</li>";
        });

        html += "</ol>";

        document.body.innerHTML = html;
      }
    }
  }

  return Promise.resolve(new Application());

});
