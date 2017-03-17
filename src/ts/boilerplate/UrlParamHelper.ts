import { esriPromise } from 'esri-promise';
import { Promise } from 'es6-promise';
import { Config, UrlParamHelperInterface } from '../interfaces';

interface ViewProperties {
  ui?: {
    [propName: string]: any
  }
  camera?: __esri.Camera,
  center?: __esri.Point,
  zoom?: number,
  extent?: __esri.Extent
}

const DEFAULT_MARKER_SYMBOL = {
  url: "./symbols/mapPin.png",
  width: "36px",
  height: "19px",
  xoffset: "9px",
  yoffset: "18px"
};

export default (): Promise<UrlParamHelperInterface> => esriPromise([
  'esri/Camera', 'esri/geometry/Extent', 'esri/geometry/Point',
  'esri/widgets/Search', 'esri/Basemap', 'esri/layers/Layer',
  'esri/core/promiseUtils', 'esri/Graphic', 'esri/PopupTemplate', 'esri/symbols/PictureMarkerSymbol',
  'esri/views/MapView', 'esri/views/SceneView'
]).then(([
  Camera, Extent, Point,
  Search, Basemap, Layer,
  promiseList, Graphic, PopupTemplate, PictureMarkerSymbol,
  MapView, SceneView
]) => {

  class UrlParamHelper {
    public getViewProperties(config: Config): ViewProperties {
      const viewProperties: ViewProperties = {};

      if (config.components) {
        viewProperties.ui = {
          components: config.components.split(",")
        };
      }

      const camera = this.viewPointStringToCamera(config.viewpoint);
      if (camera) {
        viewProperties.camera = camera;
      }

      const center = this.centerStringToPoint(config.center);
      if (center) {
        viewProperties.center = center;
      }

      const level = this.levelStringToLevel(config.level);
      if (level) {
        viewProperties.zoom = level;
      }

      const extent = this.extentStringToExtent(config.extent);
      if (extent) {
        viewProperties.extent = extent;
      }

      return viewProperties;
    }

    public addToView(view: __esri.MapView | __esri.SceneView, config, searchWidget?: __esri.Search) {
      this.addMarkerToView(view, config.marker);
      this.find(view, config.find, searchWidget);
      this.setBasemapOnView(view, config.basemapUrl, config.basemapReferenceUrl);
    }

    public find(view: __esri.MapView | __esri.SceneView, findString, searchWidget?: __esri.Search) {
      if (findString) {
        if (searchWidget) {
          searchWidget.search(findString);
        }
        else {
          searchWidget = new Search({
            view: view
          });
          searchWidget.search(findString);
        }
        return searchWidget;
      }
    }

    public setBasemapOnView (view: __esri.MapView | __esri.SceneView, basemapUrl, basemapReferenceUrl) {
      if (basemapUrl && view) {
        const pl = promiseList.eachAlways({
          baseLayer: Layer.fromArcGISServerUrl({
            url: basemapUrl
          }),
          referenceLayer: Layer.fromArcGISServerUrl({
            url: basemapReferenceUrl
          })
        });
        pl.then((response) => {
          if (response.baseLayer) {
            const basemapOptions = {
              baseLayers: response.baseLayer,
              referenceLayers: null
            };
            if (response.referenceLayer) {
              basemapOptions.referenceLayers = response.referenceLayer;
            }
            view.map.basemap = new Basemap(basemapOptions);
          }
        });
      }
    }

    public viewPointStringToCamera(viewpointParamString: string): __esri.Camera {
      const viewpointArray = viewpointParamString && viewpointParamString.split(";");
      if (!viewpointArray || !viewpointArray.length) {
        return;
      }
      else {
        let cameraString = "";
        let tiltHeading = "";
        for (let i = 0; i < viewpointArray.length; i++) {
          if (viewpointArray[i].indexOf("cam:") !== -1) {
            cameraString = viewpointArray[i];
          }
          else {
            tiltHeading = viewpointArray[i];
          }
        }
        if (cameraString !== "") {
          cameraString = cameraString.substr(4, cameraString.length - 4);
          const positionArray = cameraString.split(",");
          if (positionArray.length >= 3) {
            let x = 0,
              y = 0,
              z = 0;
            x = parseFloat(positionArray[0]);
            y = parseFloat(positionArray[1]);
            z = parseFloat(positionArray[2]);
            let wkid = 4326;
            if (positionArray.length === 4) {
              wkid = parseInt(positionArray[3], 10);
            }

            const cameraPosition = new Point({
              x: x,
              y: y,
              z: z,
              spatialReference: {
                wkid: wkid
              }
            });

            let heading = 0,
              tilt = 0;
            if (tiltHeading !== "") {
              const tiltHeadingArray = tiltHeading.split(",");
              if (tiltHeadingArray.length >= 0) {
                heading = parseFloat(tiltHeadingArray[0]);
                if (tiltHeadingArray.length > 1) {
                  tilt = parseFloat(tiltHeadingArray[1]);
                }
              }
            }

            const camera = new Camera({
              position: cameraPosition,
              heading: heading,
              tilt: tilt
            });
            return camera;
          }
        }
      }
    }

    public extentStringToExtent(extentString: string): __esri.Extent {
      if (extentString) {
        //?extent=-13054125.21,4029134.71,-13032684.63,4041785.04,102100 or ?extent=-13054125.21;4029134.71;-13032684.63;4041785.04;102100
        //?extent=-117.2672,33.9927,-117.0746,34.1064 or ?extent=-117.2672;33.9927;-117.0746;34.1064
        const extentArray = this._splitArray(extentString);
        if (extentArray.length === 4 || extentArray.length === 5) {
          const xmin = parseFloat(extentArray[0]),
            ymin = parseFloat(extentArray[1]),
            xmax = parseFloat(extentArray[2]),
            ymax = parseFloat(extentArray[3]);
          if (!isNaN(xmin) && !isNaN(ymin) && !isNaN(xmax) && !isNaN(ymax)) {
            let wkid = 4326;
            if (extentArray.length === 5 && !isNaN(extentArray[4])) {
              wkid = parseInt(extentArray[4], 10);
            }
            const ext = new Extent({
              xmin: xmin,
              ymin: ymin,
              xmax: xmax,
              ymax: ymax,
              spatialReference: {
                wkid: wkid
              }
            });
            return ext;
          }
        }
      }
    }

    public centerStringToPoint(centerString: string): __esri.Point {
      //?center=-13044705.25,4036227.41,102113&level=12 or ?center=-13044705.25;4036227.41;102113&level=12
      //?center=-117.1825,34.0552&level=12 or ?center=-117.1825;34.0552&level=12
      if (centerString) {
        const centerArray = this._splitArray(centerString);
        if (centerArray.length === 2 || centerArray.length === 3) {
          let x = parseFloat(centerArray[0]);
          let y = parseFloat(centerArray[1]);
          if (isNaN(x) || isNaN(y)) {
            x = parseFloat(centerArray[0]);
            y = parseFloat(centerArray[1]);
          }
          if (!isNaN(x) && !isNaN(y)) {
            let wkid = 4326;
            if (centerArray.length === 3 && !isNaN(centerArray[2])) {
              wkid = parseInt(centerArray[2], 10);
            }

            const point = new Point({
              x: x,
              y: y,
              spatialReference: {
                wkid: wkid
              }
            });

            return point;
          }
        }
      }
    }

    public levelStringToLevel(levelString: string): number {
      return levelString && parseInt(levelString, 10);
    }

    public addMarkerToView(view: __esri.MapView | __esri.SceneView, markerString: string): void {
      // ?marker=-117;34;4326;My%20Title;http%3A//www.daisysacres.com/images/daisy_icon.gif;My%20location&level=10
      // ?marker=-117,34,4326,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
      // ?marker=-13044705.25,4036227.41,102100,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
      // ?marker=-117,34,,My%20Title,http%3A//www.daisysacres.com/images/daisy_icon.gif,My%20location&level=10
      // ?marker=-117,34,,,,My%20location&level=10
      // ?marker=-117,34&level=10
      // ?marker=10406557.402,6590748.134,2526
      if (markerString) {
        const markerArray = this._splitArray(markerString);
        if (markerArray.length >= 2 &&
          !isNaN(markerArray[0]) &&
          !isNaN(markerArray[1])) {
          const x = parseFloat(markerArray[0]),
            y = parseFloat(markerArray[1]),
            content = markerArray[3],
            icon_url = markerArray[4],
            label = markerArray[5];

          let wkid = 4326;
          if (!isNaN(markerArray[2])) {
            wkid = parseInt(markerArray[2], 10);
          }

          let symbolOptions;

          if (icon_url) {
            symbolOptions = {
              url: icon_url,
              height: "32px",
              width: "32px"
            };
          }
          else {
            symbolOptions = DEFAULT_MARKER_SYMBOL;
          }

          const markerSymbol = new PictureMarkerSymbol(symbolOptions);

          const point = new Point({
            "x": x,
            "y": y,
            "spatialReference": {
              "wkid": wkid
            }
          });

          let popupTemplate = null;
          if (content || label) {
            popupTemplate = new PopupTemplate({
              "title": label || null,
              "content": content || null
            });
          }

          const graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            popupTemplate: popupTemplate
          });

          if (graphic) {
            view.graphics.add(graphic);
            // view.goTo(graphic);
          }
        }
      }
    }

    private _splitArray(value: string) {
      let splitValues;
      if (value) {
        splitValues = value.split(";");
        if (splitValues.length === 1) {
          splitValues = value.split(",");
        }
      }
      return splitValues;
    }
  }

  return Promise.resolve(new UrlParamHelper());

}).catch((err) => {
  throw new Error(err);
})
