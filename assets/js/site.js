/* ==========================================================================
   site.js — Sunil Kumar Agasti portfolio. Vanilla JS, no dependencies.
   ========================================================================== */

/* --------------------------------------------------------------------------
   PROJECT_GALLERIES — the one place to wire screenshots.
   Key = project id (see assets/js/projects.js).
   Each item is either
     { src: 'path.png', cap: 'Caption' }                       (one image), or
     { light: 'x-light.png', dark: 'x-dark.png', cap: '…' }    (theme-aware: swaps with the site theme)
   An empty list renders a "Screens coming soon" UI mock.
   New shots are expected in assets/shots/<id>/.
   -------------------------------------------------------------------------- */
const PROJECT_GALLERIES = {
  itd: {
    title: 'it-portal.local',
    items: [
      { src: 'assets/itd/landing-admin-tiles.png', cap: 'Sign in once: one portal with a tile for every tool' },
      { src: 'assets/itd/self-service-admin.png', cap: 'Self Service: install, update or remove apps, plus one-click troubleshooting fixes' },
      { src: 'assets/itd/device-management.png', cap: 'Device Management: temporary admin and GitHub access, hostnames, cleanup, reports' },
      { src: 'assets/itd/device-admin-access.png', cap: 'Temporary admin access: time-limited and removed automatically, or tied to an approved change request' },
      { src: 'assets/itd/device-github-access.png', cap: 'Temporary GitHub access request, with a full access log' },
      { src: 'assets/itd/device-reports.png', cap: 'Leadership reports: requests, active grants, success rate and a 12-month trend' },
      { src: 'assets/itd/compliance-dashboard.png', cap: 'Compliance dashboard: fleet posture, risk score and trend' },
      { src: 'assets/itd/compliance-actuals.png', cap: 'Per-device security posture from MDM data: endpoint agent, disk encryption, firewall and more' },
      { src: 'assets/itd/compliance-associates.png', cap: 'Employee compliance: outstanding onboarding items by obligation and SLA' },
      { src: 'assets/itd/asset-checkin.png', cap: 'Asset check-in, with camera OCR and barcode scanning that runs in the browser' },
      { src: 'assets/itd/landing-audit.png', cap: 'User audit: sign-in sessions and activity across all apps, with Excel export' },
      { src: 'assets/art/it-dashboard-infographic.png', cap: 'Concept art: one portal, complete control' }
    ]
  },
  dc: {
    title: 'diagnostics-console.local',
    items: [
      { light: 'assets/shots/dc/home-light.png', dark: 'assets/shots/dc/home-dark.png', cap: 'Device lookup with the active-sessions sidebar' },
      { light: 'assets/shots/dc/suites-light.png', dark: 'assets/shots/dc/suites-dark.png', cap: 'Test-suite picker, grouped into complete and component tests' },
      { light: 'assets/shots/dc/running-light.png', dark: 'assets/shots/dc/running-dark.png', cap: 'A suite running, with live per-test progress' },
      { light: 'assets/dc/dc-results.png', dark: 'assets/dc/dc-results-dark.png', cap: 'Results summary with semantic, grouped lists' }
    ]
  },
  getsupport: {
    title: 'support-flow.local',
    items: [
      { light: 'assets/shots/getsupport/diag-welcome-light.png', dark: 'assets/shots/getsupport/diag-welcome-dark.png', cap: 'Self Service Diagnostics: welcome and eligibility notice' },
      { light: 'assets/shots/getsupport/diag-choose-device-light.png', dark: 'assets/shots/getsupport/diag-choose-device-dark.png', cap: 'Choose a device to diagnose' },
      { light: 'assets/shots/getsupport/diag-device-filled-light.png', dark: 'assets/shots/getsupport/diag-device-filled-dark.png', cap: 'Device page: put the device in diagnostics mode, enter the serial, start a session' },
      { light: 'assets/shots/getsupport/diag-device-invalid-light.png', dark: 'assets/shots/getsupport/diag-device-invalid-dark.png', cap: 'Inline validation for an invalid or ineligible serial number' },
      { light: 'assets/shots/getsupport/diag-session-waiting-light.png', dark: 'assets/shots/getsupport/diag-session-waiting-dark.png', cap: 'Session started: waiting for the customer to accept terms on the device' },
      { light: 'assets/shots/getsupport/diag-suites-light.png', dark: 'assets/shots/getsupport/diag-suites-dark.png', cap: 'Choose a diagnostic suite, with suggested use and time estimates' },
      { light: 'assets/shots/getsupport/diag-running-light.png', dark: 'assets/shots/getsupport/diag-running-dark.png', cap: 'Suite running, with live progress mirrored from the device' },
      { light: 'assets/shots/getsupport/diag-prompt-light.png', dark: 'assets/shots/getsupport/diag-prompt-dark.png', cap: 'Interactive step: the suite asks the customer to act on the device' },
      { light: 'assets/shots/getsupport/diag-results-issues-light.png', dark: 'assets/shots/getsupport/diag-results-issues-dark.png', cap: 'Results: issues found, grouped by component with expandable details' },
      { light: 'assets/shots/getsupport/diag-results-passed-light.png', dark: 'assets/shots/getsupport/diag-results-passed-dark.png', cap: 'Results: all components passed' },
      { src: 'assets/shots/getsupport/diag-results-passed-mobile-light.png', cap: 'Responsive results on a phone-sized viewport' },
    ],
  },
  provisioning: {
    title: 'provisioning.local',
    items: [
      { src: 'assets/shots/provisioning/stations-expiry-health.png', cap: 'Account list and station cards with expiry health: active, expiring soon, expired' },
      { src: 'assets/shots/provisioning/add-station-modal.png', cap: 'Add a station — single entry or bulk CSV upload' },
      { src: 'assets/shots/provisioning/edit-station-modal.png', cap: 'Edit station: type and ID are editable, device identifiers are not' },
      { src: 'assets/shots/provisioning/users-provisioning.png', cap: 'Provisioning users with roles and account scoping' },
      { src: 'assets/shots/provisioning/users-ast2.png', cap: 'Toolkit users: roles and the latest bulk-upload status' },
      { src: 'assets/shots/provisioning/bulk-user-add.png', cap: 'Bulk user add with validation and a downloadable report' }
    ]
  },
  webadmin: {
    title: 'web-admin.local',
    items: [
      { src: 'assets/shots/webadmin/home.png', cap: 'Current state: the React + TypeScript scaffold the console is being built on' },
    ],
  },
  diagflow: {
    title: 'diag-flow — nightly',
    items: [
      { light: 'assets/shots/diagflow/terminal-run-all-light.png', dark: 'assets/shots/diagflow/terminal-run-all-dark.png', cap: 'run.py --scenario all: pass, unreachable and three parallel devices — exit 1 because of expected failures' },
      { src: 'assets/shots/diagflow/nightly-report-top.png', cap: 'Nightly HTML report: KPI tiles, environment × scenario matrix and per-run cards' },
      { src: 'assets/shots/diagflow/nightly-report-matrix.png', cap: 'Environment × scenario matrix — every cell links to its run' },
      { light: 'assets/shots/diagflow/terminal-unittest-light.png', dark: 'assets/shots/diagflow/terminal-unittest-dark.png', cap: 'The whole unittest suite runs in under a second' },
      { light: 'assets/shots/diagflow/terminal-jsonl-logs-light.png', dark: 'assets/shots/diagflow/terminal-jsonl-logs-dark.png', cap: 'JSON-lines logs: every event carries run, environment and backend versions' },
      { src: 'assets/shots/diagflow/nightly-report-full.png', cap: 'The full nightly report (fake backend, demo data)' }
    ]
  }
};

(function () {
  'use strict';

  /* ------------------------------------------------------------ helpers */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const t = (k, v) => (window.i18n ? window.i18n.t(k, v) : k);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  let reduce = mqReduce.matches;
  mqReduce.addEventListener && mqReduce.addEventListener('change', (e) => { reduce = e.matches; root.classList.toggle('reduce-motion', reduce); });
  const theme = () => root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const isRTL = () => root.dir === 'rtl';

  /* ---------------------------------------------------- render projects */
  const PROJECTS = window.PROJECTS || [];
  const TABS = ['overview', 'fr', 'nfr', 'hld', 'lld', 'ui', 'stack', 'role'];
  const STACK_KEYS = ['frontend', 'backend', 'build', 'testing', 'cicd'];

  const lockSvg = '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 10V7.5a5 5 0 0 1 10 0V10h1.2c.7 0 1.3.6 1.3 1.3v8.4c0 .7-.6 1.3-1.3 1.3H5.8c-.7 0-1.3-.6-1.3-1.3v-8.4c0-.7.6-1.3 1.3-1.3H7Zm2 0h6V7.5a3 3 0 0 0-6 0V10Z"/></svg>';
  const infoSvg = '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M11 10.5h2V17h-2zM11 7h2v2h-2z"/></svg>';

  function renderIndex() {
    const ol = $('#project-index');
    if (!ol) return;
    ol.innerHTML = PROJECTS.map((p, i) => `
      <li class="reveal" style="--i:${i}">
        <a class="idx-card spot" href="#case-${p.id}">
          <span class="idx-top"><span class="idx-num" aria-hidden="true">${p.num}</span>${p.confidential
            ? `<span class="idx-lock" title="${esc(t('case.confidential'))}">${lockSvg}<span class="sr-only" data-i18n="case.confidential">${esc(t('case.confidential'))}</span></span>`
            : `<span class="idx-lock idx-open">${infoSvg}<span class="sr-only" data-i18n="case.internal">${esc(t('case.internal'))}</span></span>`}</span>
          <span class="idx-title">${esc(p.title)}</span>
          <span class="idx-tag" data-i18n="${p.tagKey}">${esc(t(p.tagKey))}</span>
          <span class="idx-tags" aria-hidden="true">${p.tags.slice(0, 3).map((x) => `<span>${esc(x)}</span>`).join('')}</span>
          <span class="idx-arrow" aria-hidden="true">→</span>
        </a>
      </li>`).join('');
  }

  const chips = (arr) => `<ul class="chips">${arr.map((x, i) => `<li class="chip" style="--i:${i}">${x}</li>`).join('')}</ul>`;

  function renderDiagram(d) {
    const parts = d.tiers.map((tier, i) => {
      if (typeof tier === 'string') {
        return `<li class="edge" style="--i:${i}"><svg class="edge-svg" aria-hidden="true" viewBox="0 0 20 46" focusable="false"><path class="edge-line" pathLength="1" d="M10 2 V40"/><path class="edge-head" pathLength="1" d="M4.5 34 L10 41 L15.5 34"/></svg><span class="edge-label">${esc(tier)}</span></li>`;
      }
      return `<li class="tier tier-${tier.k || 'core'}${tier.mine ? ' is-mine' : ''}" style="--i:${i}">
          <p class="tier-name">${esc(tier.n)}${tier.mine ? ` <span class="mine-star" aria-hidden="true">★</span><span class="sr-only" data-i18n="legend.mine">${esc(t('legend.mine'))}</span>` : ''}</p>
          <ul class="nodes">${tier.nodes.map((n, j) => `<li class="node" style="--j:${j}">${esc(n)}</li>`).join('')}</ul>
        </li>`;
    }).join('');
    return `<figure class="arch" lang="en"><figcaption>${esc(d.title)}</figcaption><ol class="arch-flow">${parts}</ol></figure>`;
  }

  function panelBody(p, key) {
    switch (key) {
      case 'overview':
        return `<div lang="en">${p.overview.map((x) => `<p>${x}</p>`).join('')}
          <h5 class="h5">Goals</h5><ul class="ticks">${p.goals.map((g) => `<li>${g}</li>`).join('')}</ul></div>`;
      case 'fr':
        return `<ul class="feature-list" lang="en">${p.fr.map(([a, b], i) => `<li style="--i:${i}"><b>${a}</b><span>${b}</span></li>`).join('')}</ul>`;
      case 'nfr':
        return `<ul class="mini-grid" lang="en">${p.nfr.map(([a, b]) => `<li class="mini"><p class="mini-k">${a}</p><p>${b}</p></li>`).join('')}</ul>`;
      case 'hld':
        return `<p class="legend"><span class="mine-star" aria-hidden="true">★</span> <span data-i18n="legend.mine">${esc(t('legend.mine'))}</span></p>
          <div class="arch-grid${p.hld.diagrams.length > 1 ? ' two' : ''}">${p.hld.diagrams.map(renderDiagram).join('')}</div>
          <h5 class="h5" data-i18n="hld.decisions">${esc(t('hld.decisions'))}</h5>
          <ul class="mini-grid" lang="en">${p.hld.decisions.map(([a, b]) => `<li class="mini"><p class="mini-k">${a}</p><p>${b}</p></li>`).join('')}</ul>`;
      case 'lld':
        return `<ul class="mini-grid" lang="en">${p.lld.modules.map(([a, b]) => `<li class="mini"><p class="mini-k mono">${a}</p><p>${b}</p></li>`).join('')}</ul>
          <h5 class="h5"><span data-i18n="lld.flow">${esc(t('lld.flow'))}</span> · <span lang="en">${esc(p.lld.flow.title)}</span></h5>
          <ol class="steps" lang="en">${p.lld.flow.steps.map((s) => `<li>${s}</li>`).join('')}</ol>`;
      case 'ui':
        return `<ul class="mini-grid" lang="en">${p.ui.map(([a, b]) => `<li class="mini"><p class="mini-k">${a}</p><p>${b}</p></li>`).join('')}</ul>`;
      case 'stack':
        return `<div class="stack-grid">${STACK_KEYS.map((k) => `<div class="stack-col"><h5 class="h5" data-i18n="stack.${k}">${esc(t('stack.' + k))}</h5><div lang="en">${chips(p.stack[k].map(esc))}</div></div>`).join('')}</div>`;
      case 'role':
        return `<ul class="ticks big" lang="en">${p.contrib.map((r) => `<li>${r}</li>`).join('')}</ul>`;
      default:
        return '';
    }
  }

  function renderCompare(p) {
    if (!p.compare) return '';
    return `<div class="compare reveal" role="region" aria-labelledby="${p.id}-cmp" tabindex="0">
      <table>
        <caption id="${p.id}-cmp"><span data-i18n="compare.title">${esc(t('compare.title'))}</span></caption>
        <thead><tr>
          <th scope="col" data-i18n="compare.aspect">${esc(t('compare.aspect'))}</th>
          <th scope="col"><span class="cmp-pill old" data-i18n="compare.old">${esc(t('compare.old'))}</span></th>
          <th scope="col"><span class="cmp-pill new" data-i18n="compare.new">${esc(t('compare.new'))}</span></th>
        </tr></thead>
        <tbody lang="en">${p.compare.rows.map(([a, o, n]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(o)}</td><td>${esc(n)}</td></tr>`).join('')}</tbody>
      </table></div>`;
  }

  function renderCases() {
    const host = $('#cases');
    if (!host) return;
    host.innerHTML = PROJECTS.map((p) => {
      const tid = (k) => `${p.id}-tab-${k}`;
      const pid = (k) => `${p.id}-panel-${k}`;
      const meta = [
        ['case.role', p.role],
        ['case.org', p.org],
        p.period ? ['case.period', p.period] : null
      ].filter(Boolean);
      return `
      <article class="case reveal" id="case-${p.id}" aria-labelledby="${p.id}-title">
        <header class="case-head">
          <p class="case-num" aria-hidden="true">${p.num}</p>
          <div class="case-titles">
            <h3 class="case-title" id="${p.id}-title">${esc(p.title)}</h3>
            <p class="case-tag" data-i18n="${p.tagKey}">${esc(t(p.tagKey))}</p>
          </div>
          <dl class="case-meta">${meta.map(([k, v]) => `<div><dt data-i18n="${k}">${esc(t(k))}</dt><dd lang="en">${esc(v)}</dd></div>`).join('')}</dl>
        </header>
        ${p.confidential
          ? `<p class="banner banner-conf"><span class="banner-ico">${lockSvg}</span><span data-i18n="case.confidential">${esc(t('case.confidential'))}</span></p>`
          : `<p class="banner banner-internal"><span class="banner-ico">${infoSvg}</span><span data-i18n="case.internal">${esc(t('case.internal'))}</span></p>`}
        <div class="case-grid">
          <div class="gallery" data-gallery="${p.id}"></div>
          <div class="case-summary">
            <p class="case-lede" lang="en">${p.summary}</p>
            <ul class="impact">${p.impact.map((m) => `<li><b>${m.prefix ? esc(m.prefix) : ''}<span data-count="${m.n}">${m.n}</span>${esc(m.suffix || '')}</b><span lang="en">${esc(m.label)}</span></li>`).join('')}</ul>
            <div lang="en">${chips(p.tags.map(esc))}</div>
          </div>
        </div>
        ${renderCompare(p)}
        <div class="case-tabs" data-tabs>
          <div class="tabs tabs-case" role="tablist" aria-labelledby="${p.id}-title">
            ${TABS.map((k, i) => `<button type="button" role="tab" id="${tid(k)}" aria-controls="${pid(k)}" aria-selected="${i === 0}" ${i ? 'tabindex="-1"' : ''} data-i18n="tab.${k}">${esc(t('tab.' + k))}</button>`).join('')}
          </div>
          ${TABS.map((k, i) => `<section class="tpanel case-panel" role="tabpanel" id="${pid(k)}" aria-labelledby="${tid(k)}" tabindex="0" ${i ? 'hidden' : ''}>
              <h4 class="panel-h" data-i18n="tab.${k}">${esc(t('tab.' + k))}</h4>
              ${panelBody(p, k)}
            </section>`).join('')}
        </div>
      </article>`;
    }).join('');
  }

  renderIndex();
  renderCases();

  /* ------------------------------------------------------------ galleries */
  const galleries = [];

  const srcFor = (it, th) => it.src || (th === 'dark' ? (it.dark || it.light) : (it.light || it.dark));

  function mountGallery(el) {
    const key = el.getAttribute('data-gallery');
    const conf = PROJECT_GALLERIES[key] || { items: [] };
    const items = conf.items || [];
    const state = { el, key, items, index: 0, title: conf.title || '' };

    if (!items.length) {
      el.innerHTML = `
        <div class="device-stage tilt">
          <div class="device is-placeholder">
            <span class="device-screen"><span class="device-cam" aria-hidden="true"></span>
              <span class="device-viewport">
                <span class="mock" aria-hidden="true">
                  <span class="mock-top"><i></i><i></i><i></i></span>
                  <span class="mock-body"><span class="mock-side"><i></i><i></i><i></i><i></i></span>
                    <span class="mock-main"><i class="w60"></i><span class="mock-cards"><i></i><i></i><i></i></span><i class="w90"></i><i class="w75"></i><i class="w40"></i></span></span>
                </span>
                <span class="soon"><span data-i18n="gallery.soon">${esc(t('gallery.soon'))}</span></span>
              </span>
            </span>
            <span class="device-base" aria-hidden="true"></span>
          </div>
        </div>`;
      return;
    }

    el.innerHTML = `
      <div class="device-stage tilt">
        <button class="device" type="button">
          <span class="device-screen"><span class="device-cam" aria-hidden="true"></span>
            <span class="device-viewport"><img alt="" decoding="async" loading="lazy"></span>
          </span>
          <span class="device-base" aria-hidden="true"></span>
          <span class="device-zoom" aria-hidden="true">⤢</span>
        </button>
      </div>
      <p class="g-caption" aria-live="polite"><span class="g-count"></span> <span class="g-text" lang="en"></span></p>
      ${items.length > 1 ? `<div class="thumbs" role="group" data-i18n-attr="aria-label:gallery.thumbs" aria-label="${esc(t('gallery.thumbs'))}">
        ${items.map((it, i) => `<button type="button" class="thumb" aria-pressed="${i === 0}" data-i="${i}"><img alt="" loading="lazy" decoding="async" src="${esc(srcFor(it, theme()))}"></button>`).join('')}
      </div>` : ''}`;

    state.main = $('.device img', el);
    state.device = $('.device', el);
    state.count = $('.g-count', el);
    state.text = $('.g-text', el);
    state.thumbs = $$('.thumb', el);

    state.device.addEventListener('click', () => Lightbox.open(state, state.index, state.device));
    state.thumbs.forEach((b) => {
      b.addEventListener('click', () => show(state, +b.dataset.i, true));
      b.addEventListener('keydown', (e) => {
        const n = state.thumbs.length;
        let i = +b.dataset.i;
        const fwd = isRTL() ? 'ArrowLeft' : 'ArrowRight';
        const back = isRTL() ? 'ArrowRight' : 'ArrowLeft';
        if (e.key === fwd) i = (i + 1) % n; else if (e.key === back) i = (i - 1 + n) % n;
        else if (e.key === 'Home') i = 0; else if (e.key === 'End') i = n - 1; else return;
        e.preventDefault();
        show(state, i, true);
        state.thumbs[i].focus();
      });
    });
    show(state, 0, false);
    galleries.push(state);
  }

  function labelFor(state, i) {
    return t('gallery.of', { n: i + 1, t: state.items.length });
  }

  function show(state, i, animate) {
    state.index = i;
    const it = state.items[i];
    const apply = () => {
      state.main.src = srcFor(it, theme());
      state.main.alt = it.cap;
      state.count.textContent = labelFor(state, i) + ' —';
      state.text.textContent = it.cap;
      state.device.setAttribute('aria-label', `${t('gallery.open')}: ${it.cap}`);
      state.main.classList.remove('swap');
    };
    state.thumbs.forEach((b, j) => {
      b.setAttribute('aria-pressed', String(j === i));
      b.setAttribute('aria-label', `${labelFor(state, j)}: ${state.items[j].cap}`);
    });
    if (animate && !reduce) {
      state.main.classList.add('swap');
      setTimeout(apply, 160);
    } else apply();
  }

  function refreshGalleries() {
    galleries.forEach((g) => {
      g.thumbs.forEach((b, j) => { $('img', b).src = srcFor(g.items[j], theme()); });
      show(g, g.index, false);
    });
    Lightbox.refresh();
  }

  $$('.gallery[data-gallery]').forEach(mountGallery);

  /* ------------------------------------------------------------ lightbox */
  const Lightbox = (function () {
    const dlg = $('#lightbox');
    if (!dlg || typeof dlg.showModal !== 'function') {
      return { open: (s, i) => window.open(srcFor(s.items[i], theme()), '_blank', 'noopener'), refresh() {} };
    }
    const img = $('#lb-img');
    const cap = $('#lb-caption');
    const count = $('#lb-count');
    const prev = $('.lb-prev', dlg);
    const next = $('.lb-next', dlg);
    const close = $('.lb-close', dlg);
    let st = null; let idx = 0; let opener = null;

    function render() {
      const it = st.items[idx];
      img.src = srcFor(it, theme());
      img.alt = it.cap;
      cap.textContent = it.cap;
      cap.setAttribute('lang', 'en');
      count.textContent = t('gallery.of', { n: idx + 1, t: st.items.length });
      const multi = st.items.length > 1;
      prev.hidden = next.hidden = !multi;
    }
    function go(d) { idx = (idx + d + st.items.length) % st.items.length; render(); }

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    close.addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lb-inner')) dlg.close(); });
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(isRTL() ? -1 : 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(isRTL() ? 1 : -1); }
      else if (e.key === 'Tab') {
        // explicit focus trap across the dialog's visible buttons
        const f = $$('button', dlg).filter((b) => !b.hidden);
        const first = f[0]; const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    dlg.addEventListener('close', () => {
      root.classList.remove('lb-open');
      if (st) show(st, idx, false); // keep the inline gallery in sync with where the user ended up
      if (opener) opener.focus({ preventScroll: true });
    });

    return {
      open(state, i, from) {
        st = state; idx = i; opener = from || document.activeElement;
        render();
        root.classList.add('lb-open');
        dlg.showModal();
        close.focus();
      },
      refresh() { if (st && dlg.open) render(); }
    };
  })();

  /* ---------------------------------------------------------------- tabs */
  function initTabs(container) {
    const tabs = $$('[role="tab"]', container).filter((x) => x.closest('[data-tabs]') === container);
    const select = (i, focus) => {
      tabs.forEach((tab, j) => {
        const on = i === j;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) {
          panel.hidden = !on;
          if (on) { drawIn(panel); revealChips(panel); }
        }
      });
      if (focus) tabs[i].focus();
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i, false));
      tab.addEventListener('keydown', (e) => {
        const n = tabs.length;
        const fwd = isRTL() ? 'ArrowLeft' : 'ArrowRight';
        const back = isRTL() ? 'ArrowRight' : 'ArrowLeft';
        let j = null;
        if (e.key === fwd) j = (i + 1) % n;
        else if (e.key === back) j = (i - 1 + n) % n;
        else if (e.key === 'Home') j = 0;
        else if (e.key === 'End') j = n - 1;
        if (j !== null) { e.preventDefault(); select(j, true); }
      });
    });
  }
  $$('[data-tabs]').forEach(initTabs);

  /* ------------------------------------------- reveal / counters / draw */
  function revealChips(scope) {
    $$('.chips', scope).forEach((ul) => $$('.chip', ul).forEach((c, i) => c.style.setProperty('--i', i)));
  }
  revealChips(document);

  function drawIn(scope) {
    $$('.arch', scope).forEach((fig) => {
      fig.classList.remove('drawn');
      if (reduce) { fig.classList.add('drawn'); return; }
      void fig.offsetWidth; // restart the line-draw transition
      requestAnimationFrame(() => fig.classList.add('drawn'));
    });
  }

  function countUp(el) {
    const n = +el.dataset.count;
    if (reduce || !n) { el.textContent = n; return; }
    const dur = Math.min(1600, 700 + n * 2);
    let t0;
    const step = (ts) => {
      t0 = t0 || ts;
      const p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add('in');
        if (el.matches('[data-count]')) countUp(el);
        if (el.matches('.arch')) drawIn(el.parentElement);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal, .tilt, [data-count], .arch').forEach((el) => io.observe(el));
  } else {
    $$('.reveal, .tilt, .arch').forEach((el) => el.classList.add('in', 'drawn'));
  }

  /* --------------------------------------------------------------- theme */
  const themeBtn = $('#theme-toggle');
  const metaTheme = $('#meta-theme');
  function syncThemeUI() {
    const dark = theme() === 'dark';
    themeBtn && themeBtn.setAttribute('aria-pressed', String(dark));
    if (metaTheme) metaTheme.content = dark ? '#000000' : '#fbfbfd';
  }
  function setTheme(next, origin) {
    const apply = () => {
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
      syncThemeUI();
      refreshGalleries();
    };
    if (!reduce && document.startViewTransition && origin) {
      const r = origin.getBoundingClientRect();
      root.style.setProperty('--vt-x', `${r.left + r.width / 2}px`);
      root.style.setProperty('--vt-y', `${r.top + r.height / 2}px`);
      document.startViewTransition(apply);
    } else {
      if (!reduce) { root.classList.add('theme-fade'); setTimeout(() => root.classList.remove('theme-fade'), 450); }
      apply();
    }
  }
  themeBtn && themeBtn.addEventListener('click', () => setTheme(theme() === 'dark' ? 'light' : 'dark', themeBtn));
  syncThemeUI();

  /* ------------------------------------------------------------ language */
  const langSel = $('#lang-select');
  if (langSel && window.i18n) {
    langSel.value = window.i18n.lang;
    langSel.addEventListener('change', () => window.i18n.setLang(langSel.value));
    window.i18n.setLang(window.i18n.lang, { updateUrl: !!new URLSearchParams(location.search).get('lang') });
  }
  document.addEventListener('langchange', () => {
    if (langSel) langSel.value = window.i18n.lang;
    galleries.forEach((g) => show(g, g.index, false));
    Lightbox.refresh();
    syncMarqueeLabel();
  });

  /* ------------------------------------------------------------ mobile nav */
  const menuBtn = $('#menu-toggle');
  const menu = $('#nav-menu');
  function setMenu(open, focusBack) {
    root.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) { const a = $('a', menu); a && a.focus(); }
    else if (focusBack) menuBtn.focus();
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) setMenu(false, true);
    });
    document.addEventListener('click', (e) => {
      if (root.classList.contains('nav-open') && !e.target.closest('.nav')) setMenu(false);
    });
    matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ------------------------------------------------------------ scroll spy */
  const navLinks = $$('.nav-links a[href^="#"]');
  const linkFor = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.removeAttribute('aria-current'));
        const a = linkFor.get(e.target.id);
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'about', ...linkFor.keys()].forEach((id) => { const s = document.getElementById(id); s && spy.observe(s); });
  }

  /* ---------------------------------------------- scroll-linked effects */
  const header = $('#site-header');
  const toTop = $('#to-top');
  const hero = $('.hero');
  const bar = $('.progress span');
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    header && header.classList.toggle('scrolled', y > 8);
    toTop && toTop.classList.toggle('show', y > vh * 1.2);
    if (bar) {
      const max = document.documentElement.scrollHeight - vh;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }
    if (hero && !reduce) {
      const p = Math.max(0, Math.min(1, y / (vh * 0.85)));
      hero.style.setProperty('--hp', p.toFixed(4));
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  toTop && toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    const target = $('#top');
    target && target.focus({ preventScroll: true });
  });

  /* ------------------------------------------- spotlight + magnetic */
  if (mqFine.matches) {
    $$('.spot').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        if (reduce) return;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.setProperty('--tx', `${(dx * 6).toFixed(2)}px`);
        el.style.setProperty('--ty', `${(dy * 5).toFixed(2)}px`);
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); });
    });
  }

  /* ------------------------------------------------------------ marquee */
  const marquee = $('#marquee');
  const mToggle = $('#marquee-toggle');
  if (marquee) {
    const track = $('.marquee-track', marquee);
    const inner = document.createElement('div');
    inner.className = 'marquee-inner';
    track.parentNode.insertBefore(inner, track);
    inner.appendChild(track);
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('inert', '');
    inner.appendChild(clone);
  }
  function syncMarqueeLabel() {
    if (!mToggle) return;
    const paused = root.classList.contains('marquee-paused');
    mToggle.setAttribute('aria-pressed', String(paused));
    mToggle.setAttribute('aria-label', t(paused ? 'marquee.play' : 'marquee.pause'));
    mToggle.setAttribute('data-i18n-attr', `aria-label:${paused ? 'marquee.play' : 'marquee.pause'}`);
  }
  mToggle && mToggle.addEventListener('click', () => { root.classList.toggle('marquee-paused'); syncMarqueeLabel(); });

  /* --------------------------------------------------------------- misc */
  const yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Expand everything for printing, restore afterwards.
  let printState = [];
  window.addEventListener('beforeprint', () => {
    printState = $$('.tpanel[hidden]');
    printState.forEach((p) => { p.hidden = false; });
    $$('details.disclosure').forEach((d) => { d.dataset.wasOpen = d.open; d.open = true; });
    $$('.arch').forEach((f) => f.classList.add('drawn'));
  });
  window.addEventListener('afterprint', () => {
    printState.forEach((p) => { p.hidden = true; });
    $$('details.disclosure').forEach((d) => { d.open = d.dataset.wasOpen === 'true'; });
  });
})();
