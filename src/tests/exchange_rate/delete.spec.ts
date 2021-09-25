import chai, { expect } from "chai";
import chaittp from "chai-http";

import createServer from "server";

const app = createServer();
chai.use(chaittp);

describe("View and Delete Exchange Rate by date", () => {
  it("Fetched 2 data from previous Create test from 2018-05-19", async () => {
    return chai
      .request(app)
      .get(`/api/exchange_rate?startdate=2018-05-19&enddate=2018-05-19`)
      .then((response: any) => {
        expect(response.status).to.eql(200);
        expect(response.body).to.be.an("object");
        expect(response.body.data).to.be.an("object");
        expect(response.body.data.data).to.be.an("array");
        expect(response.body.data.data.length).to.eql(2);
      });
  });
  it("Sucessfully delete the exhchange rates from 2018-05-19 ", async () => {
    return chai
      .request(app)
      .delete(`/api/exchange_rate/2018-05-19`)
      .then((response: any) => {
        expect(response.status).to.eql(200);
      });
  });
  it("Fetched 0 data since any exhcange rate from 2018-05-19 has been deleted", async () => {
    return chai
      .request(app)
      .get(`/api/exchange_rate?startdate=2018-05-19&enddate=2018-05-19`)
      .then((response: any) => {
        expect(response.status).to.eql(200);
        expect(response.body).to.be.an("object");
        expect(response.body.data).to.be.an("object");
        expect(response.body.data.data).to.be.an("array");
        expect(response.body.data.data.length).to.eql(0);
      });
  });
  it("Fails to delete data since no more data within 2018-05-19 to be deleted", async () => {
    return chai
      .request(app)
      .delete(`/api/exchange_rate/2018-05-19`)
      .then((response: any) => {
        expect(response.status).to.eql(404);
      });
  });
});
