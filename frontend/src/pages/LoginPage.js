import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoArea}>
          <GoogleColorIcon />
          <h1 style={styles.appName}>Google Auth Demo</h1>
          <p style={styles.subtitle}>
            Sign in to explore secure authentication powered by Google OAuth2
          </p>
        </div>

        <div style={styles.divider} />

        <div style={styles.loginArea}>
          <p style={styles.loginPrompt}>Sign in to your account</p>
          <button style={styles.googleBtn} onClick={login}>
            <GoogleWhiteIcon />
            <span style={styles.btnText}>Sign in with Google</span>
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            No password needed. We use Google's secure OAuth2 to authenticate you.
          </p>
        </div>
      </div>

      <div style={styles.features}>
        {FEATURES.map((f) => (
          <div key={f.title} style={styles.featureItem}>
            <span style={styles.featureIcon}>{f.icon}</span>
            <div>
              <p style={styles.featureTitle}>{f.title}</p>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: '🔒',
    title: 'No passwords to manage',
    desc: 'Google handles authentication — no user table required',
  },
  {
    icon: '✅',
    title: 'Verified identity',
    desc: "User's email is verified by Google automatically",
  },
  {
    icon: '⚡',
    title: 'One-click sign in',
    desc: 'Users with an existing Google account can sign in instantly',
  },
];

function GoogleColorIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
    </svg>
  );
}

function GoogleWhiteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" style={{ marginRight: '10px', flexShrink: 0 }}>
      <path fill="#fff" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#fff" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#fff" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
      <path fill="#fff" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
    </svg>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%)',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    padding: '48px',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
  },
  logoArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  appName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#202124',
    fontFamily: "'Google Sans', sans-serif",
  },
  subtitle: {
    fontSize: '14px',
    color: '#5f6368',
    lineHeight: '1.5',
  },
  divider: {
    height: '1px',
    background: '#e8eaed',
    marginBottom: '24px',
  },
  loginArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  loginPrompt: {
    fontSize: '16px',
    color: '#202124',
    fontWeight: '500',
  },
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#4285f4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.2s ease',
    fontFamily: "'Google Sans', sans-serif",
  },
  btnText: {
    fontSize: '15px',
  },
  footer: {
    marginTop: '24px',
    padding: '12px',
    background: '#f8f9fa',
    borderRadius: '8px',
  },
  footerText: {
    fontSize: '12px',
    color: '#5f6368',
    lineHeight: '1.5',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '32px',
    width: '100%',
    maxWidth: '420px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    background: '#fff',
    borderRadius: '10px',
    padding: '14px 18px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
  },
  featureIcon: {
    fontSize: '22px',
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#202124',
    marginBottom: '2px',
  },
  featureDesc: {
    fontSize: '13px',
    color: '#5f6368',
  },
};
