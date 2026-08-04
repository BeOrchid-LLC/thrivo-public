'use client';

import { useEffect, useState } from 'react';
import { apiUrl } from '@/lib/config/env';

type State = { enabled: boolean; recipient: string };

export function UnsubscribeClient({ token }: { token: string }) {
  const [state, setState] = useState<State | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('This email preference link is invalid.');
      return;
    }
    fetch(`${apiUrl}/api/v1/email-preferences/weekly-review?token=${encodeURIComponent(token)}`)
      .then(async response => {
        if (!response.ok) throw new Error('invalid');
        const body = (await response.json()) as { data: State };
        setState(body.data);
      })
      .catch(() => setError('This email preference link is invalid or no longer available.'));
  }, [token]);

  const disable = async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/api/v1/email-preferences/weekly-review`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) throw new Error('failed');
      const body = (await response.json()) as { data: State };
      setState(body.data);
    } catch {
      setError('We could not update this preference. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (error) return <p className="mt-5 text-sm text-destructive">{error}</p>;
  if (!state)
    return <p className="mt-5 text-sm text-muted-foreground">Checking your preference…</p>;
  if (!state.enabled) {
    return (
      <p className="mt-5 text-base text-foreground">
        Weekly review emails are off for {state.recipient}. You can turn them back on in the Thrivo
        app.
      </p>
    );
  }
  return (
    <div className="mt-6">
      <p className="text-base text-muted-foreground">
        Stop weekly food-logging reviews for {state.recipient}. Security and billing emails are
        unaffected.
      </p>
      <button
        type="button"
        disabled={saving}
        onClick={disable}
        className="mt-6 h-12 rounded-xl bg-primary px-6 font-semibold text-primary-foreground disabled:opacity-60">
        {saving ? 'Updating…' : 'Turn off weekly reviews'}
      </button>
    </div>
  );
}
