import 'mocha';
import * as admin from "firebase-admin";
import * as express from "express";
import * as supertest from "supertest";
import { expect } from 'chai';
import { api } from "../src/index";
import { firebaseTest } from './config/firebase.config';

admin.initializeApp();
const expressTester = express();

describe("CRUD Operations", () => {
  let request: supertest.SuperTest<supertest.Test>

  before(() => {
    expressTester.use('/func', api);
    request = supertest(expressTester);
  })

  after(() => {
    firebaseTest.cleanup();
  });

  it("creates a user record in firestore", async () => {
    const response = await request.post("/createUser");

    expect(response.status).to.equal(200);
    expect(response.text).to.equal("Hello, world!");
  });
});
