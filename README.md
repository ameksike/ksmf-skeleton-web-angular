# ksmf-skeleton-web-angular
Template to create Web application based on Angular easily. 

## Run demo
- npm run client:watch
- npm start 

## Project skeleton 
```
- client 
|	+ build
|	+ public
|	+ src
|	- package.json
|	- README.md
- server	
|	+ bin/
|	|    - server.js
|	+ cfg/
|	|    - config.json
|	|    - core.json
|	+ src/
|	|    + app/
|	|    |    - index.js
|	|    + commnet/
| 	|    |    + controller/
|	|    |    |    - DefaultController.js
|	|    + user/
| 	|    |    + controller/
|	|    |    |    - DefaultController.js
- package.json
- .env
- .gitignore
- README.md
```

## Client Development Steps
- npm install -g @angular/cli
- ng new client
- cd client/
- ng serve --open 
- ng generate component components/toolbar

- ng generate module components/flight
- ng generate component components/flight/components/list
- ng generate service components/flight/services/flight

- ng generate module components/comment
- ng generate component components/comment/components/list
- ng generate component components/comment/components/edit
- ng generate component components/comment/components/show
- ng generate component components/comment/components/layout
- ng generate service components/comment/services/comment