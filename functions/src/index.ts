import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { app } from "./expressController";

admin.initializeApp();

const main = express();
main.use('/func', app)
main.use(cors());


export const api = functions.region("europe-west2").https.onRequest(main);