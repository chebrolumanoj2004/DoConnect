const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;

const app = require("../server"); 

describe("Auth API Test", () => {

  it("should login user successfully", (done) => {

    request(app)
      .post("/api/auth/login")
      .send({
        email: "manojkumar@gmail.com",
        password: "Krsnaradha@1"
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property("token");
        done();
      });

  });

});