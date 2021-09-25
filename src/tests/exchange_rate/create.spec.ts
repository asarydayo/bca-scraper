import chai, { expect } from "chai";
import chaittp from "chai-http";

import createServer from "server";

const app = createServer();
chai.use(chaittp);

var exchange_rate_data = [
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
      jual: 1803.55,
      beli: 177355,
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
    date: "2021-09-24",
  },
  {
    symbol: "AWESOMECURRENCY",
    e_rate: {
      jual: 1803.55,
      beli: 177355,
    },
    tt_counter: {
      jual: 1803.55,
      beli: 177355,
    },
    date: "2018-05-19",
  },
  {
    symbol: "NICECURRENCY",
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
    date: "2018-05-12",
  },
];

describe("Create an exchange rate", () => {
  it("Sucessfully created exchange rate along with a new currency", async () => {
    return chai
      .request(app)
      .post(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[0])
      .then((response: any) => {
        expect(response.status).to.eql(200);
        // expect(response.body).to.be.an("object");
        // expect(response.body.data).to.be.an("object");
        // expect(response.body.data.data).to.be.an("array");
        // expect(response.body.data.meta).to.be.an("object");
        // expect(response.body.data.meta.page).to.eql(1); // DEFAULT VALUE
        // expect(response.body.data.meta.per_page).to.eql(10); // DEFAULT VALUE
      });
  });
  it("Sucessfully created USD Exchange another one with existing currency", async () => {
    return chai
      .request(app)
      .post(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[1])
      .then((response: any) => {
        expect(response.status).to.eql(200);
      });
  });
  it("Fails on USD because it already exist on the same date", async () => {
    return chai
      .request(app)
      .post(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[1])
      .then((response: any) => {
        expect(response.status).to.eql(400);
      });
  });
  it("Success on USD with different date", async () => {
    return chai
      .request(app)
      .post(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[2])
      .then((response: any) => {
        expect(response.status).to.eql(200);
      });
  });
  it("Fails because it has missing value", async () => {
    return chai
      .request(app)
      .post(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[3])
      .then((response: any) => {
        expect(response.status).to.eql(422);
      });
  });
  it("Fails because one the value is not correctly formatted (decimal)", async () => {
    return chai
      .request(app)
      .post(`/api/exchange_rate`)
      .set("content-type", "application/json")
      .send(exchange_rate_data[4])
      .then((response: any) => {
        expect(response.status).to.eql(422);
      });
  });
});
