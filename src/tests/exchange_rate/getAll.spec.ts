import chai, { expect } from "chai";
import chaittp from "chai-http";

import createServer from "server";
const app = createServer();

const query = {
  search: "",
  page: 1,
  per_page: 10,
  paginated: true,
  startdate: "2021-01-01",
  enddate: "2021-12-30",
};

chai.use(chaittp);

describe("Exchange rate Index", () => {
  it("Get list of Exchange Rate", async () => {
    return chai
      .request(app)
      .get(
        `/api/exchange_rate?search=${query.search}&paginated=${query.paginated}&page=${query.page}&per_page=${query.per_page}&startdate=${query.startdate}&enddate=${query.enddate}`
      )
      .then((response: any) => {
        expect(response.status).to.eql(200);
        expect(response.body).to.be.an("object");
        expect(response.body.data).to.be.an("object");
        expect(response.body.data.data).to.be.an("array");
        expect(response.body.data.meta).to.be.an("object");
        expect(response.body.data.meta.page).to.eql(1); // DEFAULT VALUE
        expect(response.body.data.meta.per_page).to.eql(10); // DEFAULT VALUE
      });
  });
});
