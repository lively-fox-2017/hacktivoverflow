# hacktiv-overflow

> stack overflow be like project at hacktiv8

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Routes
#### list of questions routes :

|Routes                                             |HTTP      |Description                                                                     |
|---------------------------------------------------|:--------:|-------------------------------------------------------------------------------:|
|<div style="color:cyan">/questions</div>           |**GET**   |Show All questions                                                              |
|<div style="color:cyan">/questions/:userid</div>   |**GET**   |Show all question based on userID (Added feature and not complete)              |
|<div style="color:cyan">/questions/insert</div>    |**POST**  |Insert data question into Collection (authenticate user only)                   |
|<div style="color:cyan">/questions/vote/:id</div>  |**PUT**   |Push user ID to question document based on question id (authenticate user only) |
|<div style="color:cyan">/questions/update/:id</div>|**PUT**   |Update data question based on ID (limited to that user question only)           |
|<div style="color:cyan">/questions/delete/:id</div>|**DELETE**|Delete data question based on ID (limited to that user question only)           |

#### list of users routes :

|Routes                                         |HTTP    |Description                                            |
|-----------------------------------------------|:------:|------------------------------------------------------:|
|<div style="color:cyan">/users</div>           |**GET** |Show All users (not used, just for development)        |
|<div style="color:cyan">/users/register</div>  |**POST**|Insert user data to Collection (auto Login after regis)|
|<div style="color:cyan">/users/login</div>     |**POST**|User login authentications                             |

#### list of transactions routes :

|Routes                                                   |HTTP      |Description                                                                     |
|---------------------------------------------------------|:--------:|-------------------------------------------------------------------------------:|
|<div style="color:cyan">/answers/:questionId</div>       |**GET**   |Show All answers on 1 question, based on question ID                            |
|<div style="color:cyan">/answers/insert/:questionId</div>|**POST**  |Insert data answer into Collection based on question ID (authenticate user only)|
|<div style="color:cyan">/answers/vote/:id</div>          |**PUT**   |Push user ID to answer document based on answer id (authenticate user only)     |
|<div style="color:cyan">/answers/update/:id</div>        |**PUT**   |Update data answer based on ID  (limited to that user question only)            |
|<div style="color:cyan">/answers/delete/:id</div>        |**DELETE**|Delete data answer based on ID  (limited to that user question only)            |
