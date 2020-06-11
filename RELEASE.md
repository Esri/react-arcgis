# Release Steps

1. Update `CHANGELOG.md`
1. Update verion in package.json
1. `npm install`
1. `npm test`
1. `npm run build`
1. Commit, push to master
1. Create tag for version, push tags to master
1. `npm whoami` and/or `npm login`
1. `npm publish`
1. Update release notes on the [releases page](https://github.com/Esri/react-arcgis/releases) (link to changelog).