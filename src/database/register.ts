import Users from "database/models/users";
import Currency from "database/models/currency";
import ExchangeRate from "database/models/exchange_rate";

export default function Register() {
  ExchangeRate.belongsTo(Currency, {
    as: "currency",
    foreignKey: "currency_id",
  });

  Currency.hasMany(ExchangeRate, {
    as: "exchange_rate",
    foreignKey: "currency_id",
  });

  Users;
}
