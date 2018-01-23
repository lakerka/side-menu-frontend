# side-menu-frontend
Frontend application that renders menu tree items. Menu styles were taken from [bootsnipp](https://bootsnipp.com/snippets/yplrV).

## Technologies
Application uses React library with Typescript language. Package bundling handles Webpack. During development node v7.8.0 and npm 4.2.0 were used.

## Development
Build application: 
```sh
webpack --watch 
```

### Note
* In production environment files should be minimised to save up space.
* Since styles worked from first time I did not need to use css sourcemaps so I don't know if they work.
* Files in `dist` directory should not be pushed to git.
* Static files should be served using NGINX or even CDN.
* There is not command to run webserver. It is easier to develop using UI webserver because you need less moving parts but for simplicity sake I used real backend webserver to serve static files.
