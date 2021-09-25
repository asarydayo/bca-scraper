export default function currencyWithExchange(data: any) {
  return {
    id: data.id,
    currency_symbol: data.currency_symbol,
    currency_code: data.currency_code,
  };
}
