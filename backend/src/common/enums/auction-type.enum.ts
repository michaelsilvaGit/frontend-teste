export const AUCTION_TYPE_ENUM = {
  FREIGHT_MARKET: 'freightMarket',
  FREIGHT_TARGET: 'freightTarget',
  FREIGHT_REVERSE: 'freightReverse',
} as const

export const AUCTION_TYPES_BY_VALUE = {
  freightMarket: 'BUSCA DE FRETE MERCADO',
  freightTarget: 'FRETE ESTABELECIDO',
  freightReverse: 'LEILÃO DECRESCENTE',
}
