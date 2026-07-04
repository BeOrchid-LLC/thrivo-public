import { ImageResponse } from 'next/og';

export const alt = 'Thrivo — Weight loss without the nonsense';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 96,
        position: 'relative',
        fontFamily: 'sans-serif',
      }}>
      <div
        style={{
          position: 'absolute',
          top: -160,
          right: -160,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background: 'radial-gradient(circle, rgba(39,174,96,0.35) 0%, rgba(39,174,96,0) 70%)',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 48,
        }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            backgroundColor: '#27AE60',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: 36,
            fontWeight: 800,
          }}>
          t
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: '#1A1A2E' }}>thrivo</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.06,
          letterSpacing: '-2px',
          color: '#1A1A2E',
        }}>
        <span>Weight loss</span>
        <span>
          <span style={{ color: '#27AE60' }}>without</span> the
        </span>
        <span>nonsense.</span>
      </div>
      <div style={{ marginTop: 40, fontSize: 30, color: '#737373' }}>
        Honest pricing. Real food logging. A cancel button that works.
      </div>
    </div>,
    size
  );
}
