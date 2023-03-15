import express,{NextFunction, Request , Response} from "express";
import http from "http";
import fs from "fs";
import { Middleware } from '../middlewares/middleware';
import { AppSetupMiddleware } from '../middlewares/app-setup-middleware';
const ngrok = require('ngrok');

require("dotenv").config();


export class App{
    app: express.Application;
    // token: string ;
    constructor(app: express.Application){
        this.app = app;
        // this.token = "2N2cX0EZsH5UGSsE1vav6qO7x3C_7r1qmHnTqp9ig6hCgPbcR";
        // (async function() {
        //     const url = await ngrok.connect({authtoken: this.token});
        //     console.log(url)
        //   })();

        //test route 
        this.app.get('/' , (req:Request,res:Response, next:NextFunction)=>{
            res.end("kharidlo is up and running");
        });

        this.app.get('/test' , (req:Request,res:Response, next:NextFunction)=>{
            res.end("kharidlo texst");
        });
        const server: http.Server = http.createServer(this.app);

        //start the server 
        this.startServer(server);
        this.registerMiddlewares();
    }

    registerMiddlewares(){
        const middlewares = new AppSetupMiddleware(this.app);
        middlewares.handle();
    }

    //start server func
     startServer(server: http.Server){
        const PORT:number = 80;


        server.listen(PORT , ()=>{
            console.log(`App is up and running on port ${PORT}`)
        })
     }
     
}
