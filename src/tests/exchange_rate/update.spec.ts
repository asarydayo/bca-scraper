import chai, { expect } from "chai";
import chaittp from "chai-http";

import createServer from "server";

const app = createServer();
chai.use(chaittp);

var exchange_rate_data = [
  {
    symbol: "SAMPLECURRENCY",
    e_rate: {
      jual: 5000000.01,
      beli: 142.2,
    },
    tt_counter: {
      jual: 231.55,
      beli: 177513.55,
    },
    bank_notes: {
      jual: 41.12,
      beli: 2.3,
    },
    date: "2018-05-19",
  },
  {
    symbol: "USD",
    e_rate: {
      jual: 14254.0,
      beli: 14269.0,
    },
    tt_counter: {
      jual: 14112.0,
      beli: 14112.0,
    },
    bank_notes: {
      jual: 14094.0,
      beli: 14394,
    },
    date: "2018-05-14",
  },
  {
    symbol: "SAMPLECURRENCY",
    e_rate: {
      jual: 14254.0,
      beli: 14269.0,
    },
    tt_counter: {
      jual: 14112.0,
      beli: 14112.0,
    },
    date: "2018-05-19",
  },
  {
    symbol: "SAMPLECURRENCY",
    e_rate: {
      jual: 1803.55,
      beli: 177355,
    },
    tt_counter: {
      jual: 1803.55,
      beli: 177355,
    },
    bank_notes: {
      jual: 14094.0,
      beli: "David Bowie",
    },
    date: "2018-05-19",
  },
];

describe("Update Existing Exchange Rate", () => {
  it("Sucessfully updated previously inserted data", async () => {
    return chai
      .request(app)
      .put(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[0])
      .then((response: any) => {
        expect(response.status).to.eql(200);
      });
  });
  it("Failed to update because exchange rate does not exist", async () => {
    return chai
      .request(app)
      .put(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[1])
      .then((response: any) => {
        expect(response.status).to.eql(404);
      });
  });
  it("Fails to update despite exhcange do exist, reason: body has missing value", async () => {
    return chai
      .request(app)
      .put(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[2])
      .then((response: any) => {
        expect(response.status).to.eql(422);
      });
  });
  it("Fails because one the value is not correctly formatted (decimal)", async () => {
    return chai
      .request(app)
      .put(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[3])
      .then((response: any) => {
        expect(response.status).to.eql(422);
      });
  });
});
