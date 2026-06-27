'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xqevqryo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <div className="page">
        <svg className="bg-route" viewBox="0 0 1200 700" fill="none" aria-hidden="true">
          <path
            className="route-path"
            d="M 80 620 C 200 540 320 480 460 400 C 580 330 660 280 780 240 C 880 210 960 200 1120 160"
            stroke="#F5A623" strokeWidth="1.5" strokeDasharray="6 5" fill="none"
          />
          <g className="pin pin-a"><circle cx="80" cy="620" r="4" fill="#F5A623"/><circle cx="80" cy="620" r="9" fill="#F5A623" fillOpacity=".15"/></g>
          <g className="pin pin-b"><circle cx="780" cy="240" r="4" fill="#F5A623"/><circle cx="780" cy="240" r="9" fill="#F5A623" fillOpacity=".15"/></g>
          <g className="pin pin-c"><circle cx="1120" cy="160" r="5" fill="#F5A623"/><circle cx="1120" cy="160" r="11" fill="#F5A623" fillOpacity=".2"/></g>
        </svg>

        <div className="content">
          <div className="wordmark">Route<span>Genie</span></div>
          <h1 className="headline">Something smart<br /><em>is on its way.</em></h1>
          <p className="sub">
            An AI travel planner that turns YouTube videos, Instagram Reels,
            and blogs into personalized itineraries — powered by LangChain,
            LangGraph, and Google Maps.
          </p>

          {status === 'success' ? (
            <div className="success-msg">
              ✓ You&apos;re on the list! We&apos;ll let you know when we launch.
            </div>
          ) : (
            <form className="notify-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                className="email-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {status === 'error' && (
                <p className="field-error">Something went wrong — please try again.</p>
              )}
              <button type="submit" className="notify-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Notify me'}
              </button>
            </form>
          )}

          <div className="stack">
            {['Python', 'LangChain', 'LangGraph', 'RAG', 'Google Maps'].map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
