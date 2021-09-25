import dayjs from "dayjs";

export default function currency(data: any) {
  return {
    // id: data.id,
    symbol: data.currency.currency_code,
    e_rate: { jual: data.e_rate_sell, beli: data.e_rate_buy },
    tt_counter: { jual: data.tt_counter_sell, beli: data.tt_counter_buy },
    bank_notes: { jual: data.bank_notes_sell, beli: data.bank_notes_buy },
    date: dayjs(data.date).format("YYYY-MM-DD"),
  };
}
