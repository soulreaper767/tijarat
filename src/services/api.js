import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
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

export async function login({ email, password }) {
  const { data } = await apiClient.post('/method/login', { usr: email, pwd: password });
  return data;
}

export async function logout() {
  const { data } = await apiClient.post('/method/logout');
  return data;
}

// Maps to the whitelisted `register_trade_party` Frappe method (see the
// architecture doc, Section 3.4) — creates the Customer, Supplier, Party
// Link, Contact and portal User in one call.
export async function registerTradeParty(payload) {
  const { data } = await apiClient.post('/method/tijarat.api.register_trade_party', payload);
  return data;
}

export default apiClient;
