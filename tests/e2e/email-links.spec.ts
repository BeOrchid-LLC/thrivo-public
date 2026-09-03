import { expect, test } from '@playwright/test';

const publicRoutes = [
  { path: '/dashboard', heading: 'Your Thrivo dashboard', appHref: 'thrivo://dashboard' },
  { path: '/log', heading: 'Log food in Thrivo', appHref: 'thrivo://log' },
  { path: '/metrics', heading: 'Your Thrivo progress', appHref: 'thrivo://metrics' },
  {
    path: '/settings/subscription',
    heading: 'Manage your Thrivo subscription',
    appHref: 'thrivo://settings/subscription',
  },
] as const;

test.describe('email-link destinations @smoke', () => {
  for (const route of publicRoutes) {
    test(`${route.path} resolves to a working public handoff page`, async ({ page }) => {
      const response = await page.goto(route.path);

      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(new RegExp(`${route.path.replaceAll('/', '\\/')}$`));
      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
      await expect(page.getByRole('heading', { level: 1, name: '404', exact: true })).toHaveCount(
        0
      );
      await expect(page.getByRole('link', { name: 'Open Thrivo' })).toHaveAttribute(
        'href',
        route.appHref
      );
    });
  }

  test('/unsubscribe resolves with the weekly-review preference page', async ({ page }) => {
    const response = await page.goto('/unsubscribe?token=invalid-token-for-e2e');

    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/unsubscribe\?token=invalid-token-for-e2e$/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Weekly review emails' })
    ).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: '404', exact: true })).toHaveCount(0);
  });

  test('/delete-account exposes the public deletion request path', async ({ page }) => {
    const response = await page.goto('/delete-account');

    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole('heading', { level: 2, name: 'Delete your Thrivo account' })
    ).toBeVisible();
    await expect(page.getByLabel('Account email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send confirmation email' })).toBeVisible();
    await expect(page.getByText('subscriptions@beorchid.com')).toBeVisible();
  });

  test('/delete-account token load does not mutate without confirmation', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/v1/account-deletion-requests'))
        requests.push(request.method());
    });

    const response = await page.goto('/delete-account?token=test-token-without-confirmation');

    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole('heading', { level: 2, name: 'Confirm permanent deletion' })
    ).toBeVisible();
    expect(requests).toEqual([]);
  });
});
