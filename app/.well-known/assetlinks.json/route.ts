export function GET() {
  const fingerprints = (process.env.ANDROID_SHA256_CERT_FINGERPRINTS ?? '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
  return Response.json(
    fingerprints.length === 0
      ? []
      : [{
          relation: ['delegate_permission/common.handle_all_urls'],
          target: {
            namespace: 'android_app',
            package_name: 'com.beorchid.thrivo',
            sha256_cert_fingerprints: fingerprints,
          },
        }],
    { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=3600' } }
  );
}
