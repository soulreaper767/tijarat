const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

// Sends form submissions straight to an inbox with no backend of our own —
// see .env.example for how to get an access key. Used by Contact, the
// "Request a demo" modal, and the footer newsletter signup.
export async function sendFormSubmission({ subject, ...fields }) {
  if (!ACCESS_KEY) {
    throw new Error('Email delivery is not configured yet — set VITE_WEB3FORMS_ACCESS_KEY.');
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject,
      from_name: 'Tijarat website',
      ...fields,
    }),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'Could not send your message. Please try again.');
  }
  return data;
}
