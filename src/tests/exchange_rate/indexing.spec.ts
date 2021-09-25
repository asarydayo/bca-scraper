import chai, { expect } from "chai";
import chaittp from "chai-http";

import createServer from "server";

const app = createServer();
chai.use(chaittp);

describe("Web scrapping", () => {
  it("Successfully Scrapped bca.co.id/id/informasi/kurs", async () => {
    return chai
      .request(app)
      .get(`/api/exchange_rate/indexing`)
      .then((response: any) => {
        expect(response.status).to.eql(200);
        expect(response.body).to.be.an("object");
        expect(response.body.data).to.be.an("array");
        expect(response.body.data.length).to.greaterThan(0);
        expect(response.body.message).to.eql("Update Success.");
      });
  });
  it("Successfully Scrapped bca.co.id/id/informasi/kurs, but no update initiated", async () => {
    return chai
      .request(app)
      .get(`/api/exchange_rate/indexing`)
      .then((response: any) => {
        expect(response.status).to.eql(200);
        expect(response.body).to.be.an("object");
        expect(response.body.data).to.be.an("array");
        expect(response.body.data.length).to.eql(0);
        expect(response.body.message).to.eql("No updates available.");
      });
  });
});
