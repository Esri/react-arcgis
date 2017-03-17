import { esriPromise } from 'esri-promise';
import { Promise } from 'es6-promise';
import { ItemHelperInterface } from '../interfaces';

interface Item {
  data?: __esri.PortalItem | Error;
  json?: {
    itemData: any,
    item: any
  }
}

export default (): Promise<ItemHelperInterface> => esriPromise([
  'dojo/Deferred', 'dojo/promise/Promise',
  'esri/WebMap', 'esri/WebScene',
  'esri/portal/PortalItem'
]).then(([
  Deferred, DojoPromise,
  WebMap, WebScene, PortalItem
]) => {
  
  class ItemHelper implements ItemHelperInterface {
    public createWebMap(item: Item): dojo.promise.Promise<__esri.WebMap> {
      const deferred = new Deferred();
      if (!item) {
        deferred.reject(new Error("ItemHelper:: WebMap data does not exist."));
      }
      else if (item.data instanceof Error) {
        deferred.reject(item.data);
      }
      else {
        let wm;
        if (item.data) {
          wm = new WebMap({
            portalItem: item.data
          });
        }
        if (!wm) {
          deferred.reject(new Error("ItemHelper:: WebMap does not have usable data."));
        }
        else {
          deferred.resolve(wm);
        }
      }
      return deferred.promise;
    }

    public createWebScene(item: Item): dojo.promise.Promise<__esri.WebScene> {
      const deferred = new Deferred();
      if (!item) {
        deferred.reject(new Error("ItemHelper:: WebScene data does not exist."));
      }
      else if (item.data instanceof Error) {
        deferred.reject(item.data);
      }
      else {
        let ws;
        if (item.data) {
          ws = new WebScene({
            portalItem: item.data
          });
        }
        else if (item.json) {
          ws = WebScene.fromJSON(item.json.itemData);
          ws.portalItem = item.json.item;
        }
        if (!ws) {
          deferred.reject(new Error("ItemHelper:: WebScene does not have usable data."));
        }
        else {
          deferred.resolve(ws);
        }
      }
      return deferred.promise;
    }
  }

  return Promise.resolve(new ItemHelper());

}).catch((err) => {
  throw new Error(err)
})
