export interface ApplicationInterface {
  init(boilerplateResponse: BoilerplateResponse): void,
  [propName: string]: any
}

export interface BoilerplateInterface {
  init(): dojo.Deferred<BoilerplateResponse>,
  [propName: string]: any
}

export interface ItemHelperInterface {
  [propName: string]: any
}

export interface UrlParamHelperInterface {
  [propName: string]: any
}

export interface Config {
  title?: string,
  webmap?: string,
  webscene?: string,
  application_extent?: string,
  portalUrl?: string,
  proxyUrl?: string,
  group?: string,
  appid?: string,
  components?: string,
  viewpoint?: string,
  center?: string,
  level?: string,
  extent?: string,
  oauthappid?: string,
  helperServices?: {
    geometry?: {
      url: string
    },
    printTask?: {
      url: string
    },
    elevationSync?: {
      url: string
    },
    geocode?: {
      url: string
    }[],
    [propName: string]: any
  }
};

export interface Settings {
  webscene?: {
    containerId?: string,
    fetch?: boolean,
    useLocal?: boolean
  },
  webmap?: {
    containerId?: string,
    fetch?: boolean,
    useLocal?: boolean
  },
  group?: {
    itemParams: {
      [propname: string]: any
    },
    fetchItems?: boolean,
    fetchInfo?: boolean
  },
  portal?: {
    fetch: boolean
  },
  urlItems?: string[],
  localConfig?: {
    fetch: boolean
  },
  webTierSecurity?: boolean,
  esriEnvironment?: boolean,
  defaultWebmap?: string,
  defaultWebscene?: string,
  defaultGroup?: string
}

export interface GroupData {
    itemsData?: any,
    infoData?: any
}

export interface BoilerplateResults {
    group?: GroupData,
    urlParams?: {
        config: any
    },
    localStorageConfig?: {
        [propName: string]: any
    },
    webMapItem?: {
        data?: any,
        [propName: string]: any
    },
    webSceneItem?: {
        data?: any,
        [propName: string]: any
    },
    applicationItem?: {
        data: any,
        config: any
    },
    portal?: {
        data: any
    }
}

export interface BoilerplateResponse {
  config: Config,
  settings: Settings,
  direction: any,
  results: BoilerplateResults,
  groupData: GroupData,
  locale: any
}