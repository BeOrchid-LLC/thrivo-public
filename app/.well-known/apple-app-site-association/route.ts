const paths = ['/dashboard*', '/log*', '/metrics*', '/settings/subscription*'];

export function GET() {
  const teamId = process.env.APPLE_TEAM_ID;
  return Response.json(
    {
      applinks: {
        apps: [],
        details: teamId ? [{ appID: `${teamId}.com.beorchid.thrivo`, paths }] : [],
      },
    },
    { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=3600' } }
  );
}
