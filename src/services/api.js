import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  // Session-cookie auth against a separate-origin Frappe site: withCredentials
  // sends/receives the `sid` cookie cross-origin (requires the site's CORS
  // config to allow this exact origin with credentials, not "*"). The
  // xsrf* pair auto-echoes Frappe's csrf_token cookie back as the header
  // name Frappe checks on state-changing requests, if/once the site issues
  // one for this session — harmless no-op until then.
  withCredentials: true,
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'X-Frappe-CSRF-Token',
});

function readErrorMessage(error) {
  const data = error.response?.data;
  if (typeof data?.message === 'string') return data.message;
  if (Array.isArray(data?._server_messages)) {
    try {
      const first = JSON.parse(data._server_messages[0]);
      if (first?.message) return first.message;
    } catch {
      // fall through to generic messages below
    }
  }
  if (error.code === 'ERR_NETWORK') return 'Could not reach the server. Please try again shortly.';
  return error.message || 'Something went wrong. Please try again.';
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(readErrorMessage(error)))
);

// Registration and login are handled by native pages served directly by the
// backend (tijarat_app/www/register.html, login.html) — same-origin with
// its own API, so they don't go through this cross-origin axios client at
// all. See src/utils/portal.js.

export async function logout() {
  const { data } = await apiClient.post('/method/logout');
  return data;
}

// Who's logged in, what roles they hold, and which Customer/Supplier record
// (if any) is attached to them — one round trip instead of three.
export async function getMyContext() {
  const { data } = await apiClient.get('/method/tijarat_app.api.portal.get_my_context');
  return data.message;
}

// KPI totals, trend, and breakdowns for the Dashboard page — scoped
// server-side to whatever the logged-in user is allowed to see.
export async function getDashboardSummary(range = '30d') {
  const { data } = await apiClient.get('/method/tijarat_app.api.portal.get_dashboard_summary', {
    params: { range },
  });
  return data.message;
}

// --- Generic Frappe REST resource list/get helpers -------------------------
// Thin wrappers around GET /api/resource/<DocType> — permissions (including
// the per-user User Permission scoping set up at registration) are enforced
// server-side, so these never need a customer/supplier id passed in.

async function listResource(doctype, { fields, filters, orderBy = 'modified desc', limit = 100, start = 0 } = {}) {
  const { data } = await apiClient.get(`/resource/${encodeURIComponent(doctype)}`, {
    params: {
      fields: fields ? JSON.stringify(fields) : undefined,
      filters: filters ? JSON.stringify(filters) : undefined,
      order_by: orderBy,
      limit_page_length: limit,
      limit_start: start,
    },
  });
  return data.data;
}

export function listSalesOrders(options) {
  return listResource('Sales Order', {
    fields: ['name', 'customer', 'transaction_date', 'delivery_date', 'grand_total', 'status', 'docstatus', 'booking_channel'],
    orderBy: 'transaction_date desc',
    ...options,
  });
}

export function listSalesInvoices(options) {
  return listResource('Sales Invoice', {
    fields: ['name', 'customer', 'posting_date', 'due_date', 'grand_total', 'outstanding_amount', 'status', 'docstatus'],
    orderBy: 'posting_date desc',
    ...options,
  });
}

export function listCustomers(options) {
  return listResource('Customer', {
    fields: ['name', 'customer_name', 'customer_group', 'territory', 'lifecycle_status', 'tijarat_score', 'payment_overdue_days'],
    orderBy: 'modified desc',
    ...options,
  });
}

export function listSuppliers(options) {
  return listResource('Supplier', {
    fields: ['name', 'supplier_name', 'supplier_group', 'lifecycle_status', 'tijarat_score', 'is_brand_owner'],
    orderBy: 'modified desc',
    ...options,
  });
}

export function listItems(options) {
  return listResource('Item', {
    fields: ['name', 'item_name', 'item_group', 'stock_uom', 'is_marketplace_item', 'mrp_ceiling', 'disabled'],
    orderBy: 'modified desc',
    ...options,
  });
}

export function listItemListings(options) {
  return listResource('Item Listing', {
    fields: ['name', 'item', 'supplier', 'territory', 'rate', 'currency', 'uom', 'stock_status', 'is_active', 'valid_upto'],
    orderBy: 'rate asc',
    ...options,
  });
}

export function listBins(options) {
  return listResource('Bin', {
    fields: ['name', 'item_code', 'warehouse', 'actual_qty', 'reserved_qty', 'projected_qty'],
    orderBy: 'modified desc',
    ...options,
  });
}

export function listPaymentEntries(options) {
  return listResource('Payment Entry', {
    fields: ['name', 'party', 'party_type', 'posting_date', 'paid_amount', 'payment_type', 'mode_of_payment', 'status', 'docstatus'],
    orderBy: 'posting_date desc',
    ...options,
  });
}

// Runs one of the Script Reports registered by the backend (report/ folder)
// via Frappe's native report-runner endpoint.
export async function runReport(reportName, filters = {}) {
  const { data } = await apiClient.get('/method/frappe.desk.query_report.run', {
    params: { report_name: reportName, filters: JSON.stringify(filters) },
  });
  return data.message;
}

export default apiClient;
