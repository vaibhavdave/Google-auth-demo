import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetch('/api/dashboard/stats', { credentials: 'include' })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});

    fetch('/api/dashboard/messages', { credentials: 'include' })
      .then((r) => r.json())
      .then(setMessages)
      .catch(() => {});
  }, []);

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.navBrand}>Google Auth Demo</span>
        <div style={styles.navUser}>
          {user?.picture && (
            <img src={user.picture} alt="avatar" style={styles.avatar} referrerPolicy="no-referrer" />
          )}
          <span style={styles.userName}>{user?.name}</span>
          <button style={styles.logoutBtn} onClick={logout}>
            Sign out
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.welcome}>
          <h1 style={styles.welcomeTitle}>Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p style={styles.welcomeSub}>You're signed in via Google OAuth2</p>
        </div>

        <div style={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div style={styles.tabContent}>
            <div style={styles.profileCard}>
              <h2 style={styles.sectionTitle}>Your Google Profile</h2>
              <div style={styles.profileRow}>
                {user?.picture && (
                  <img src={user.picture} alt="profile" style={styles.profileImg} referrerPolicy="no-referrer" />
                )}
                <div style={styles.profileDetails}>
                  <ProfileField label="Name" value={user?.name} />
                  <ProfileField label="Email" value={user?.email} />
                  <ProfileField label="Google ID" value={user?.googleId} mono />
                </div>
              </div>
            </div>

            {stats && (
              <div style={styles.statsCard}>
                <h2 style={styles.sectionTitle}>Session Info</h2>
                <div style={styles.statGrid}>
                  <StatItem label="Auth Method" value={stats.stats?.loginMethod} />
                  <StatItem label="Session" value={stats.stats?.sessionActive ? 'Active' : 'Inactive'} green />
                  {stats.stats?.features?.map((f) => (
                    <StatItem key={f} label="Feature" value={f} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div style={styles.tabContent}>
            <h2 style={styles.sectionTitle}>Messages</h2>
            <div style={styles.messageList}>
              {messages.map((msg) => (
                <div key={msg.id} style={styles.messageItem}>
                  <span style={styles.messageIcon}>💬</span>
                  <p style={styles.messageText}>{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div style={styles.tabContent}>
            <h2 style={styles.sectionTitle}>Available API Endpoints</h2>
            <div style={styles.endpointList}>
              {ENDPOINTS.map((ep) => (
                <div key={ep.path} style={styles.endpoint}>
                  <span style={{ ...styles.method, background: METHOD_COLORS[ep.method] }}>{ep.method}</span>
                  <code style={styles.path}>{ep.path}</code>
                  <span style={styles.epDesc}>{ep.desc}</span>
                  <span style={styles.authBadge}>{ep.auth ? '🔒 Auth' : '🌐 Public'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ProfileField({ label, value, mono }) {
  return (
    <div style={styles.field}>
      <span style={styles.fieldLabel}>{label}</span>
      <span style={{ ...styles.fieldValue, ...(mono ? { fontFamily: 'monospace', fontSize: '12px' } : {}) }}>
        {value || '—'}
      </span>
    </div>
  );
}

function StatItem({ label, value, green }) {
  return (
    <div style={styles.statItem}>
      <span style={styles.statLabel}>{label}</span>
      <span style={{ ...styles.statValue, ...(green ? { color: '#1e8e3e' } : {}) }}>{value}</span>
    </div>
  );
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'messages', label: 'Messages' },
  { id: 'api', label: 'API Endpoints' },
];

const ENDPOINTS = [
  { method: 'GET', path: '/api/public/health', desc: 'Health check', auth: false },
  { method: 'GET', path: '/api/public/info', desc: 'App info', auth: false },
  { method: 'GET', path: '/api/auth/me', desc: 'Current user info', auth: true },
  { method: 'POST', path: '/api/auth/logout', desc: 'Sign out', auth: true },
  { method: 'GET', path: '/api/dashboard/stats', desc: 'Session statistics', auth: true },
  { method: 'GET', path: '/api/dashboard/messages', desc: 'User messages', auth: true },
];

const METHOD_COLORS = { GET: '#34a853', POST: '#4285f4', PUT: '#fbbc04', DELETE: '#ea4335' };

const styles = {
  page: { minHeight: '100vh', background: '#f8f9fa' },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: '64px',
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navBrand: { fontSize: '18px', fontWeight: '700', color: '#202124', fontFamily: "'Google Sans', sans-serif" },
  navUser: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' },
  userName: { fontSize: '14px', color: '#202124', fontWeight: '500' },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #dadce0',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#3c4043',
  },
  main: { maxWidth: '900px', margin: '0 auto', padding: '32px 24px' },
  welcome: { marginBottom: '28px' },
  welcomeTitle: { fontSize: '28px', fontWeight: '700', color: '#202124', fontFamily: "'Google Sans', sans-serif" },
  welcomeSub: { fontSize: '14px', color: '#5f6368', marginTop: '4px' },
  tabs: { display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '2px solid #e8eaed' },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5f6368',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    transition: 'color 0.2s',
  },
  tabActive: { color: '#4285f4', borderBottomColor: '#4285f4' },
  tabContent: { display: 'flex', flexDirection: 'column', gap: '20px' },
  profileCard: { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', color: '#202124', marginBottom: '16px' },
  profileRow: { display: 'flex', alignItems: 'flex-start', gap: '24px' },
  profileImg: { width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 },
  profileDetails: { flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' },
  field: { display: 'flex', flexDirection: 'column', gap: '2px' },
  fieldLabel: { fontSize: '11px', fontWeight: '600', color: '#80868b', textTransform: 'uppercase', letterSpacing: '0.5px' },
  fieldValue: { fontSize: '14px', color: '#202124' },
  statsCard: { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' },
  statItem: { background: '#f8f9fa', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' },
  statLabel: { fontSize: '11px', color: '#80868b', fontWeight: '600', textTransform: 'uppercase' },
  statValue: { fontSize: '13px', fontWeight: '600', color: '#202124' },
  messageList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  messageItem: {
    background: '#fff',
    borderRadius: '10px',
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  messageIcon: { fontSize: '20px', flexShrink: 0 },
  messageText: { fontSize: '14px', color: '#202124', lineHeight: '1.5' },
  endpointList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  endpoint: {
    background: '#fff',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    flexWrap: 'wrap',
  },
  method: {
    color: '#fff',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '700',
    flexShrink: 0,
  },
  path: { fontSize: '13px', color: '#202124', flex: 1, minWidth: '200px' },
  epDesc: { fontSize: '13px', color: '#5f6368', flex: 1 },
  authBadge: { fontSize: '12px', color: '#5f6368', flexShrink: 0 },
};
