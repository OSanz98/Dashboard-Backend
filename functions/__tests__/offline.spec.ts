import 'mocha';
import * as express from "express";
import * as supertest from "supertest";
import {expect} from 'chai';
import { api } from "../src/index";
import { app } from '../src/expressController';
import { firebaseTest } from './config/firebase.config';


const tester = express();

describe('APP', () => {

    let request: supertest.SuperTest<supertest.Test>

    before(() => {
        tester.use(app);
        request = supertest(tester);
    });

    after(() => {
        firebaseTest.cleanup();
    })

    it("should return a greeting message via original function", async () => {
        const response = await request.get("/hello");
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("Hello World!");
    });
});


describe('API', () =>{
    let request: supertest.SuperTest<supertest.Test>

    before(() => {
        tester.use('/func', api);
        request = supertest(tester);
    });

    after(() => {
        firebaseTest.cleanup();
    })

    it("should return a greeting message via api", async () => {
    
        const response = await request.get("/hello");
    
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("Hello World!");
    });

    it("should throw error to link not created", async () => {
        const response = await request.get("/err");
        expect(response).to.throw
    })
})