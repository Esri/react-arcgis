require("es6-promise");
require("ts-node").register({
    project: "test/tsconfig.json"
});

global.IS_REACT_ACT_ENVIRONMENT = true;
