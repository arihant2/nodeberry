import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import favicon from 'serve-favicon';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerDocument from './swagger.json';
// const api_postman_json = require('./apis.postman_collection.json');

import routes from './backend/routes/index.js';
import { errLogsUtility } from './backend/utils/errHandling/errLogs.js';

if(config().error) errLogsUtility.error(config().error.message);

const app = express();

app.use(express.json({ limit: "1mb" }));        // parse json data coming from frontend
app.use(express.urlencoded({ extended: "false" }));     // parse data sent thru html form
// var x  = express.urlencoded({ extended: "false" });     // parse data sent thru html form
// console.log(x());

app.use(favicon('backend/favicon.ico'));   // serve req: '/favicon.ico' & set favicon for all pgs

// for generating api documentation
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: '',
            // contact: {
            //     name: "arihant2"
            // },
            server: '/'
            // server: ['https://www.nodeberry.herokuapp.com/']
        }
    },
    apis: ['./backend/routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use(/^(\/home)*\/api-docs(\/)*$/,swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(/^(\/home)*\/api-docs/,swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// frontend
app.set('view engine','ejs');
app.set('views','frontend/views');   // set default views directory
app.use(express.static('frontend/assets'));    // for creating link for external style and script files to link in ejs files

app.use('/',routes);
// app.use(/^\/(home)*$/,routes);

const { HOST:host='localhost', PORT:port=6000, DB_CON:dbUrl } = process.env;

mongoose.connect(
    dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }
).then(() => {
    app.listen(port);
    console.log(`Connection is established at \nhttp://${host}:${port} OR \nhttps://xyz.herokuapp.com\n`);
}).catch(err => errLogsUtility.error(err.message));

// mongoose.set('useFindAndModify',false);

