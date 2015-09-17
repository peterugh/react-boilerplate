01. `npm update`
02. due to using a beta version of react, delete following packages from packages.json: react, react-addons-css-transition-group, react-addons-transition-group, react-dom
03. `npm prune`
04. `npm prune` again
05. `npm install --save react@0.14.0-rc1`
06. `npm install --save react-addons-css-transition-group@0.14.0-rc1`
07. `npm install --save react-addons-transition-group@0.14.0-rc1`
08. `npm install --save react-dom@0.14.0-rc1`
09. `cd raw/scss`
10. `bourbon install`
11. `cd ../../`

12. for build and dev: `gulp`
13. to minify for deployment: `gulp minify`
