export const RANGE_OPTIONS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

export const KPIS_BY_RANGE = {
  '7d': {
    sales: { value: 2180000, delta: 4.8, trend: 'up' },
    orders: { value: 214, delta: 2.1, trend: 'up' },
    collections: { value: 1540000, delta: 6.2, trend: 'up' },
    outstanding: { value: 18900000, delta: -0.6, trend: 'down' },
  },
  '30d': {
    sales: { value: 12400000, delta: 12.5, trend: 'up' },
    orders: { value: 1284, delta: 8.2, trend: 'up' },
    collections: { value: 8200000, delta: 14.1, trend: 'up' },
    outstanding: { value: 18700000, delta: -3.2, trend: 'down' },
  },
  '90d': {
    sales: { value: 34600000, delta: 18.9, trend: 'up' },
    orders: { value: 3902, delta: 15.4, trend: 'up' },
    collections: { value: 24100000, delta: 21.3, trend: 'up' },
    outstanding: { value: 18150000, delta: -6.7, trend: 'down' },
  },
};

export const SALES_TREND_BY_RANGE = {
  '7d': [
    { label: 'Mon', value: 268000 },
    { label: 'Tue', value: 295000 },
    { label: 'Wed', value: 281000 },
    { label: 'Thu', value: 312000 },
    { label: 'Fri', value: 358000 },
    { label: 'Sat', value: 341000 },
    { label: 'Sun', value: 325000 },
  ],
  '30d': [
    { label: 'Wk 1', value: 2650000 },
    { label: 'Wk 2', value: 2810000 },
    { label: 'Wk 3', value: 3120000 },
    { label: 'Wk 4', value: 2980000 },
    { label: 'Wk 5', value: 3350000 },
  ],
  '90d': [
    { label: 'Apr', value: 9800000 },
    { label: 'May', value: 10600000 },
    { label: 'Jun', value: 10450000 },
    { label: 'Jul', value: 11200000 },
    { label: 'Aug', value: 12550000 },
  ],
};

export const TERRITORIES_BY_RANGE = {
  '7d': [
    { name: 'Lahore', value: 720000 },
    { name: 'Karachi', value: 610000 },
    { name: 'Islamabad', value: 380000 },
    { name: 'Faisalabad', value: 290000 },
    { name: 'Multan', value: 180000 },
  ],
  '30d': [
    { name: 'Lahore', value: 4120000 },
    { name: 'Karachi', value: 3480000 },
    { name: 'Islamabad', value: 2150000 },
    { name: 'Faisalabad', value: 1640000 },
    { name: 'Multan', value: 1010000 },
  ],
  '90d': [
    { name: 'Lahore', value: 11800000 },
    { name: 'Karachi', value: 9650000 },
    { name: 'Islamabad', value: 6100000 },
    { name: 'Faisalabad', value: 4550000 },
    { name: 'Multan', value: 2500000 },
  ],
};

export const TOP_DISTRIBUTORS_BY_RANGE = {
  '7d': [
    { name: 'ABC Distributors', city: 'Lahore', value: 412000, orders: 38, trend: 'up' },
    { name: 'XYZ Traders', city: 'Karachi', value: 356000, orders: 31, trend: 'up' },
    { name: 'Al-Noor Distribution', city: 'Islamabad', value: 248000, orders: 24, trend: 'down' },
    { name: 'City Traders', city: 'Faisalabad', value: 195000, orders: 19, trend: 'up' },
    { name: 'Punjab Wholesale Co.', city: 'Multan', value: 142000, orders: 15, trend: 'up' },
  ],
  '30d': [
    { name: 'ABC Distributors', city: 'Lahore', value: 2400000, orders: 168, trend: 'up' },
    { name: 'XYZ Traders', city: 'Karachi', value: 1900000, orders: 142, trend: 'up' },
    { name: 'Al-Noor Distribution', city: 'Islamabad', value: 1380000, orders: 103, trend: 'down' },
    { name: 'City Traders', city: 'Faisalabad', value: 1050000, orders: 88, trend: 'up' },
    { name: 'Punjab Wholesale Co.', city: 'Multan', value: 780000, orders: 61, trend: 'up' },
  ],
  '90d': [
    { name: 'ABC Distributors', city: 'Lahore', value: 6900000, orders: 481, trend: 'up' },
    { name: 'XYZ Traders', city: 'Karachi', value: 5450000, orders: 402, trend: 'up' },
    { name: 'Al-Noor Distribution', city: 'Islamabad', value: 3920000, orders: 294, trend: 'down' },
    { name: 'City Traders', city: 'Faisalabad', value: 2980000, orders: 251, trend: 'up' },
    { name: 'Punjab Wholesale Co.', city: 'Multan', value: 2210000, orders: 176, trend: 'up' },
  ],
};

export const TOP_PRODUCTS_BY_RANGE = {
  '7d': [
    { name: 'Cola 500ml Crate', sku: 'BEV-CL-500', units: 1120, revenue: 336000 },
    { name: 'Juice Pack 250ml', sku: 'BEV-JC-250', units: 940, revenue: 258500 },
    { name: 'Water 1.5L Bottle', sku: 'BEV-WT-1500', units: 812, revenue: 178640 },
    { name: 'Energy Drink 250ml Can', sku: 'BEV-EN-250', units: 605, revenue: 211750 },
    { name: 'Biscuit Pack 12x', sku: 'SNK-BS-012', units: 470, revenue: 141000 },
  ],
  '30d': [
    { name: 'Cola 500ml Crate', sku: 'BEV-CL-500', units: 4820, revenue: 1446000 },
    { name: 'Juice Pack 250ml', sku: 'BEV-JC-250', units: 3920, revenue: 1078000 },
    { name: 'Water 1.5L Bottle', sku: 'BEV-WT-1500', units: 3410, revenue: 750200 },
    { name: 'Energy Drink 250ml Can', sku: 'BEV-EN-250', units: 2405, revenue: 841750 },
    { name: 'Biscuit Pack 12x', sku: 'SNK-BS-012', units: 1980, revenue: 594000 },
  ],
  '90d': [
    { name: 'Cola 500ml Crate', sku: 'BEV-CL-500', units: 13600, revenue: 4080000 },
    { name: 'Juice Pack 250ml', sku: 'BEV-JC-250', units: 11250, revenue: 3093750 },
    { name: 'Water 1.5L Bottle', sku: 'BEV-WT-1500', units: 9840, revenue: 2164800 },
    { name: 'Energy Drink 250ml Can', sku: 'BEV-EN-250', units: 6980, revenue: 2443000 },
    { name: 'Biscuit Pack 12x', sku: 'SNK-BS-012', units: 5710, revenue: 1713000 },
  ],
};

const STATUS_VARIANT = {
  Paid: 'success',
  Processing: 'info',
  Pending: 'warning',
  Overdue: 'danger',
  Cancelled: 'neutral',
};

export function statusVariant(status) {
  return STATUS_VARIANT[status] || 'neutral';
}

export const RECENT_ORDERS = [
  { id: 'ORD-4821', distributor: 'ABC Distributors', city: 'Lahore', date: '2026-08-09', items: 12, amount: 284500, status: 'Paid' },
  { id: 'ORD-4820', distributor: 'XYZ Traders', city: 'Karachi', date: '2026-08-09', items: 8, amount: 156200, status: 'Processing' },
  { id: 'ORD-4819', distributor: 'Al-Noor Distribution', city: 'Islamabad', date: '2026-08-08', items: 15, amount: 398000, status: 'Pending' },
  { id: 'ORD-4818', distributor: 'City Traders', city: 'Faisalabad', date: '2026-08-08', items: 6, amount: 92400, status: 'Paid' },
  { id: 'ORD-4817', distributor: 'Punjab Wholesale Co.', city: 'Multan', date: '2026-08-08', items: 20, amount: 512000, status: 'Overdue' },
  { id: 'ORD-4816', distributor: 'ABC Distributors', city: 'Lahore', date: '2026-08-07', items: 9, amount: 214300, status: 'Paid' },
  { id: 'ORD-4815', distributor: 'Sindh Traders', city: 'Karachi', date: '2026-08-07', items: 5, amount: 68000, status: 'Cancelled' },
  { id: 'ORD-4814', distributor: 'XYZ Traders', city: 'Karachi', date: '2026-08-07', items: 11, amount: 187600, status: 'Processing' },
  { id: 'ORD-4813', distributor: 'Al-Noor Distribution', city: 'Islamabad', date: '2026-08-06', items: 18, amount: 447200, status: 'Paid' },
  { id: 'ORD-4812', distributor: 'Faisalabad Mart', city: 'Faisalabad', date: '2026-08-06', items: 7, amount: 103500, status: 'Pending' },
  { id: 'ORD-4811', distributor: 'City Traders', city: 'Faisalabad', date: '2026-08-06', items: 14, amount: 296000, status: 'Paid' },
  { id: 'ORD-4810', distributor: 'Punjab Wholesale Co.', city: 'Multan', date: '2026-08-05', items: 10, amount: 178900, status: 'Overdue' },
  { id: 'ORD-4809', distributor: 'ABC Distributors', city: 'Lahore', date: '2026-08-05', items: 16, amount: 362800, status: 'Paid' },
  { id: 'ORD-4808', distributor: 'Peshawar Traders', city: 'Peshawar', date: '2026-08-05', items: 4, amount: 54200, status: 'Processing' },
  { id: 'ORD-4807', distributor: 'XYZ Traders', city: 'Karachi', date: '2026-08-04', items: 13, amount: 241000, status: 'Paid' },
  { id: 'ORD-4806', distributor: 'Al-Noor Distribution', city: 'Islamabad', date: '2026-08-04', items: 9, amount: 165400, status: 'Pending' },
  { id: 'ORD-4805', distributor: 'Sindh Traders', city: 'Karachi', date: '2026-08-04', items: 6, amount: 88700, status: 'Paid' },
  { id: 'ORD-4804', distributor: 'City Traders', city: 'Faisalabad', date: '2026-08-03', items: 21, amount: 528600, status: 'Paid' },
  { id: 'ORD-4803', distributor: 'Punjab Wholesale Co.', city: 'Multan', date: '2026-08-03', items: 8, amount: 132000, status: 'Overdue' },
  { id: 'ORD-4802', distributor: 'ABC Distributors', city: 'Lahore', date: '2026-08-03', items: 17, amount: 384500, status: 'Processing' },
  { id: 'ORD-4801', distributor: 'Faisalabad Mart', city: 'Faisalabad', date: '2026-08-02', items: 5, amount: 71300, status: 'Paid' },
  { id: 'ORD-4800', distributor: 'XYZ Traders', city: 'Karachi', date: '2026-08-02', items: 12, amount: 219800, status: 'Paid' },
];
