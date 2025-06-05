export type SKU = { code: string; size: string; qty: number; price: number };

export type Catalog = { [sku: string]: SKU }; // key = "code|size"

export type OrderLine = { code: string; size: string; qty: number };

export type CustomerOrder = { items: OrderLine[] };
