import express,{NextFunction} from 'express';
import cors from 'cors';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { Middleware, callback } from './middleware';
import bodyparser from "body-parser";


export class AppSetupMiddleware extends Middleware{
    app:express.Application;
    constructor(app: express.Application){
        super(app);
        this.app = app;
    }
    handle() {
        this.app.use(this.responseMiddleware);
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended:false}));
        this.app.use(cors());
    }

    responseMiddleware(req:express.Request , res:express.Response , next:NextFunction){
        res.Success = (message: string ,data?:any , resCode?: number) => {
            resCode= resCode ? resCode: 200;
            res.status(resCode)
            .json({
                success: true,
                message,
                data
            })
        };


        res.Error = (message: string ,data?:any , resCode?: number) => {
            resCode= resCode ? resCode: 200;
            res.status(resCode)
            .json({
                success: true,
                message,
                data
            })
        };

        next();
    }

    httpLogs() {
        // here we are configuring the expressWinston logging middleware,
        // which will automatically log all HTTP requests handled by Express.js
        this.app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            )
        }));

        // here we are configuring the expressWinston error-logging middleware,
        // which doesn't *handle* errors per se, but does *log* them
        this.app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            )
        }));
    }
    
}