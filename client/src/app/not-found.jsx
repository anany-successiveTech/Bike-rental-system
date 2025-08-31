'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ marginBottom: '2rem' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <button style={{
          padding: '0.6rem 1.2rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
}
