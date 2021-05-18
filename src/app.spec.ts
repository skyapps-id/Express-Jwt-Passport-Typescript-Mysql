import { app } from "./app";
import chai from "chai";
import chaiHttp from "chai-http";

import "mocha";

chai.use(chaiHttp);
chai.should();

describe("API Request", () => {
  describe("Ping", () => {
    it("should return hello on call", async () => {
      return chai
        .request(app)
        .get("/api/ping")
        .then(res => {
          chai.expect(res.body).to.eql({
            message: "pong"
          });
        });
    });
  });
  describe("Ping2", () => {
    it("should return hello on call", (done) => {
      chai.request(app)
          .get("/api/ping")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });
  });
});