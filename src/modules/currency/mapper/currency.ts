export default function currency(data: any) {
  return {
    id: data.id,
    currency_symbol: data.currency_symbol,
    currency_code: data.currency_code,
  };
}
