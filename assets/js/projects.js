/* ==========================================================================
   PROJECTS — case-study content, rendered by assets/js/site.js.
   Public-safe, résumé-level wording only. No internal hostnames, repo names,
   package names, class names, environment names or people.

   Shape:
     id, num, title, tagKey (i18n), confidential (bool), role, org, period,
     tags[], summary (html), impact[{n, suffix, label}],
     overview[html paragraphs], goals[], fr[[title, html]], nfr[[area, html]],
     hld { diagrams[{title, tiers[ {n, nodes[], k:'client'|'core'|'ext', mine} | 'edge label' ]}], decisions[[t, html]] },
     lld { modules[[name, html]], flow{title, steps[]} },
     ui[[aspect, html]], stack{frontend, backend, build, testing, cicd}, contrib[html],
     compare? { rows[[aspect, old, new]] }
   Content is static and authored here, so it is inserted as HTML.
   ========================================================================== */
window.PROJECTS = [
  /* ---------------------------------------------------------------- 01 */
  {
    id: 'itd',
    num: '01',
    title: 'IT-Dashboard',
    tagKey: 'p.itd.tag',
    confidential: false,
    role: 'Architect & sole developer',
    org: 'Internal IT portal',
    period: 'Ongoing',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Bash', 'SSH', 'Jamf', 'Swift'],
    summary:
      'A monorepo that puts five internal IT tools — asset tracking, device access, self-service software, compliance and an admin home — behind <b>one sign-on</b>. It also absorbed two standalone apps I had built earlier (a system-admin portal and an asset-closet app), with tooling to merge their live data.',
    impact: [
      { n: 5, suffix: '', label: 'tools behind one sign-on' },
      { n: 2, suffix: '', label: 'standalone apps consolidated' },
      { n: 30, suffix: '+', label: 'targeted test scripts' }
    ],
    overview: [
      'IT staff were juggling separate tools with separate logins. Employees needed to install approved software without admin rights, and access exceptions — temporary admin rights, temporary GitHub access — were handled by hand and easy to forget to revoke.',
      'IT-Dashboard turns that into one portal. Staff sign in once at <code>/admin</code> and see a tile for every tool they are granted. Any employee who opens the portal without signing in lands on a Self Service page for their own Mac, where every change is approved on the device itself.'
    ],
    goals: [
      'Log in once, reach every tool — without building an auth server.',
      'Reuse the existing apps with minimal rewrite; keep each one independently runnable.',
      'Make every privileged change time-limited, verified and audited.',
      'One-command setup, development and hosting.'
    ],
    fr: [
      ['Single sign-on', 'Employee ID + PIN at one portal (set / reset PIN, security question). The session is honoured by every tool; each login is written to an audit trail.'],
      ['Self Service', 'App catalogue with remote <b>install, update and uninstall</b> over SSH, plus one-click troubleshooting fixes. A no-sign-in fleet mode identifies the visitor by their own Mac and asks for approval on the device.'],
      ['Device Management', '<b>Time-limited admin rights</b> and <b>temporary GitHub access</b> that revoke automatically; longer grants tied to an approved change request; hostname changes, cleanup and leadership reports with a 12-month trend.'],
      ['Asset Management', 'Check-in / check-out with asset type first, handover and return emails, and <b>camera OCR + barcode scanning that runs in the browser</b>.'],
      ['Compliance', 'Imports MDM exports to report per-device posture (disk encryption, firewall, endpoint agent), employee onboarding obligations with SLAs, and regional roll-ups.'],
      ['Administration', 'Per-user module grants, a cross-app user audit (sessions and activity) and Excel export.'],
      ['Desktop companion', 'A small native macOS client that wraps the fleet page and updates itself from a signed release feed.']
    ],
    nfr: [
      ['Security', 'AES-256 encrypted, signed session cookie. Middleware verifies it at the edge; a server-side guard re-reads the allowlist on <b>every request</b> — hiding a tile is cosmetic, the guard is the real gate. CSRF protection, rate limiting and lockout on login.'],
      ['Supply chain', 'Everything installed is fetched and verified <b>by the portal</b> — pinned SHA-256, a valid code signature and the expected developer Team ID — before it is pushed. Endpoints never download links themselves. A scheduled check flags silently replaced release files.'],
      ['Secrets hygiene', 'Passwords and tokens travel through environment variables and stdin, never command-line arguments or logs. One shared env file; no app keeps its own secret.'],
      ['Reliability', 'An on-device daemon enforces and revokes each grant, so expiry still happens if the server is down or the VPN drops. A keep-alive supervisor restarts each app individually.'],
      ['Privacy', 'OCR and barcode decoding run entirely in the browser — images are never uploaded.'],
      ['Auditability', 'Every login, grant, removal and install is logged and exportable.'],
      ['Operability', '<code>make setup</code>, <code>make dev</code>, <code>make prod</code>. The portal resolves its own address from each request, so a changing network address never breaks links.'],
      ['Maintainability', 'Permanent module IDs, shared auth and UI packages consumed as TypeScript source, ~30 targeted test scripts plus <code>tsc --noEmit</code> per app.']
    ],
    hld: {
      diagrams: [
        {
          title: 'One cookie, five apps, verified everywhere',
          tiers: [
            { n: 'Clients', k: 'client', nodes: ['IT staff browser (/admin)', 'Employee Mac (fleet page)', 'macOS desktop companion'] },
            'HTTPS · host-scoped session cookie',
            { n: 'Portal', k: 'core', mine: true, nodes: ['Login · PIN keypad', 'Tile home', 'Session issue + audit'] },
            'Same cookie — every app only verifies',
            { n: 'Tools (Next.js apps)', k: 'core', mine: true, nodes: ['Asset Management', 'Device Management', 'Self Service', 'Compliance'] },
            'Shared packages',
            { n: 'Shared', k: 'core', mine: true, nodes: ['Auth library (edge + node)', 'UI kit: header, timeout, theme'] },
            'SSH (env-passed creds) · file I/O',
            { n: 'Infrastructure', k: 'ext', nodes: ['Managed Macs + launchd daemons', 'Flat-file stores (JSON / CSV / XLSX)', 'Versioned config: allowlist, catalogue, pinned hashes', 'Cloud storage · MDM exports'] }
          ]
        }
      ],
      decisions: [
        ['Monorepo of separate apps', 'npm workspaces keep each tool independently runnable — a minimal rewrite, versus merging everything into one app.'],
        ['Host-scoped cookie for SSO', 'Cookies are scoped by host, not port, so one signed cookie reaches every app. "Log in once" with zero auth infrastructure.'],
        ['Reconcile on the device, never suppress MDM', 'A daemon per grant re-applies a live grant if a recurring policy strips it and revokes at expiry — instead of disabling MDM check-ins.'],
        ['Remove what cannot work', 'An AI-assist feature was removed when no reachable model credential existed; the safety rules (reads run, writes only propose) are documented for a future rebuild.']
      ]
    },
    lld: {
      modules: [
        ['Auth package', 'Session crypto, user store, audit writer, a module guard used in each app layout, and an origin resolver. A separate edge entry point avoids Node crypto in middleware.'],
        ['UI package', 'Portal header, session manager, session-timeout bounce and a pre-paint theme initialiser shared by every app.'],
        ['Self Service server', 'A custom Node server wrapper that strips forged forwarding headers, enforces a Host allowlist and requires same-origin + a custom header on writes.'],
        ['Install pipeline', 'fetch → SHA-256 check → signature verify → Team ID check → push over SSH → Bash installer → on-device confirmation dialog. The SSH timeout exceeds the dialog window, and a failed dialog never flips a successful install to failed.'],
        ['Grant enforcement', 'A JSON grant marker on the Mac plus a LaunchDaemon that guards and revokes it — a shared contract with the original standalone portal.'],
        ['Data import', 'A merge tool imports records from the two still-live standalone apps instead of hand-copying.']
      ],
      flow: {
        title: 'Request lifecycle',
        steps: [
          'Staff log in at the portal; it issues the encrypted session cookie.',
          'They click a tile; the browser sends the same cookie to that app.',
          'Edge middleware verifies the cookie; the layout guard re-reads the allowlist.',
          'A server action runs the change — SSH to the Mac or a file update.',
          'The result, and who did it, is appended to the audit log.'
        ]
      }
    },
    ui: [
      ['Component architecture', 'App Router server components for data-heavy pages; client components only for interactive widgets (PIN keypad, scanners, grant forms). Shared chrome from one UI package makes five apps feel like one product.'],
      ['Design tokens & theming', 'Tailwind v4 CSS-first tokens; light and dark themes applied by a pre-paint script (no flash). Status colours — granted, expiring, revoked — mean the same thing in every app.'],
      ['State & data fetching', 'Reads are server-rendered from flat files and config re-read per request; client state stays local. Polling only while a remote action is in flight.'],
      ['Routing', 'One Next.js app per tool; portal tiles link across. The URL decides the door: <code>/admin</code> for staff, the root for the no-sign-in fleet page.'],
      ['Rendering strategy', 'SSR / RSC for dashboards and reports; client-only for camera OCR. Turbopack in development (webpack for the OCR app).'],
      ['Accessibility & i18n', 'Labelled forms, keyboard-operable PIN entry, visible focus and live status text for long SSH actions. English-only for now, with copy kept close to components.'],
      ['Performance & caching', 'No database round trips; OCR libraries load only on the scan screen; the home page no longer waits on SSH lookups.'],
      ['Error & loading states', 'Plain-language SSH failure reasons for staff; session expiry bounces to login with a safe return address.']
    ],
    stack: {
      frontend: ['Next.js 16 (App Router)', 'React 19', 'TypeScript 5', 'Tailwind CSS v4', 'Tesseract.js', 'ZXing'],
      backend: ['Next.js route handlers & server actions', 'Node.js ≥ 20 (custom server)', 'Bash', 'SSH', 'launchd', 'Swift + WKWebView (desktop client)'],
      build: ['npm workspaces', 'Turbopack', 'Webpack', 'Makefile', 'ESM'],
      testing: ['~30 targeted test scripts', 'tsc --noEmit per app'],
      cicd: ['Self-hosted on a managed Mac', 'Keep-alive supervisor', 'Ed25519-signed desktop release feed', 'Versioned config in git']
    },
    contrib: [
      'Designed the SSO model and the split between authentication (portal) and authorisation (per-app guard).',
      'Migrated two standalone apps into the monorepo and wrote the data-merge tooling.',
      'Built the Self Service install pipeline and its verification chain end to end.',
      'Designed on-device grant enforcement that survives MDM policy runs and server outages.',
      'Wrote the Bash operations tooling: bootstrap, secrets, supervised hosting and publishing.'
    ]
  },

  /* ---------------------------------------------------------------- 02 */
  {
    id: 'dc',
    num: '02',
    title: 'AST2 Diagnostics Console',
    tagKey: 'p.dc.tag',
    confidential: true,
    role: 'Senior Frontend Engineer',
    org: 'Apple',
    period: '2022 – present',
    tags: ['React 18', 'TypeScript', 'React Redux', 'Recharts', 'RxJS', 'GraphQL · Apollo', 'Emotion', 'Spring Boot WebFlux', 'Java'],
    summary:
      'The web console service technicians and support advisors use to run hardware diagnostics on customer devices: identify a device by serial number, start a session, run test suites, watch progress live, review grouped results and share a customer-friendly report. It exists in two phases — the <b>old DC</b> (a classic Java backend) and the <b>new DC</b> (a reactive rewrite) — both serving <b>one shared React SPA</b>.',
    impact: [
      { n: 530, suffix: '+', label: 'issues resolved' },
      { n: 140, suffix: '+', label: 'accessibility fixes' },
      { n: 2, suffix: '', label: 'backends · 1 shared SPA' }
    ],
    compare: {
      rows: [
        ['Architecture', 'JAX-RS (Jersey 1.x) WAR on Tomcat 9', 'Spring Boot WebFlux BFF on Netty'],
        ['Language & build', 'Java · Gradle', 'Java 25 · Maven'],
        ['I/O model', 'Blocking, thread-per-request', 'Non-blocking, reactive end to end'],
        ['Role', 'In production; the behavioural source of truth', 'Rewrite that must match old-DC behaviour exactly'],
        ['Frontend', 'Shared React SPA', 'Same shared React SPA'],
        ['Backend calls', 'Pooled WebSocket client to the diagnostics platform', 'Per-operation routing to the platform or new microservices'],
        ['Sessions', 'Stateless signed cookie — survives restarts', 'Per-instance in-memory sessions'],
        ['Testing & gates', 'JUnit 4, Mockito, Jest, Cypress', 'JUnit 5, GraphQL slice tests, Checkstyle, SpotBugs (zero bugs), JaCoCo']
      ]
    },
    overview: [
      'Technicians in stores, repair centres and partner shops depend on this console every day, across many device families — phones, tablets, laptops, watches, headphones, headsets and accessories. It has to be fast, reliable on slow networks, and usable with a keyboard and a screen reader.',
      'The <b>old DC</b> is a large synchronous Java application that still runs in production and defines expected behaviour: null handling, de-duplication, state priorities and result grouping. The <b>new DC</b> is a reactive BFF that routes each operation to the legacy platform or to new microservices, while the shared SPA must see exactly the same contract.'
    ],
    goals: [
      'Run a full diagnostic session — device, suite, progress, results, report — in one place.',
      'Keep the shared SPA working unchanged against both backends (behavioural parity).',
      'Move to non-blocking I/O and config-driven routing without a big-bang cutover.',
      'Meet WCAG 2.2 AA plus a stricter internal accessibility checklist.'
    ],
    fr: [
      ['Authentication', 'Corporate SSO (OIDC) for employees, a partner SSO for service providers, and password logins for partner client apps.'],
      ['Bootstrap', 'Identity, roles, client config and localized strings delivered with the app shell.'],
      ['Device lookup', 'Find and verify a device by serial number; show product details.'],
      ['Sessions', 'Start a session; a "my sessions" dashboard that polls; take over or archive a session.'],
      ['Test suites', 'List, check eligibility, select, run, cancel and queue suites.'],
      ['Live progress', 'Near-real-time suite status with interactive on-device prompts.'],
      ['Results', 'Summaries, history and detailed results grouped per device family; cellular data diagnostics.'],
      ['Multi-device', 'Connected devices and dongles: identify, link, liveness checks, device errors.'],
      ['Customer report', 'A customer-facing view and printable report.'],
      ['Extras', 'Symptom autocomplete, feedback, account settings showing component versions, a GraphQL surface mirroring the operations, and a privileged raw-execute tool for support engineers.']
    ],
    nfr: [
      ['Behavioural parity', 'Same JSON shapes, no JSON nulls, same state priorities. A stricter contract in the rewrite breaks the shared UI — e.g. a non-nullable GraphQL argument fails with HTTP 200.'],
      ['Performance', 'New DC never blocks an event-loop thread (virtual threads for the few blocking spots). Server-side operation caches; polling tuned per resource (~4–6 s) and configurable.'],
      ['Security', 'SSO, CSRF header tokens, a Content-Security-Policy with a per-request nonce, frame protection, role/group gating and path hardening.'],
      ['Reliability', 'Old DC: pooled connections with timeouts and an HTTP fallback. New DC: TTL-cached platform configuration that keeps the last good copy if a refresh fails.'],
      ['Configurability', 'Layered per-environment properties with hot reload (old) → remote config collections per environment plus env-var overrides (new).'],
      ['Observability', 'Structured logs correlated per request, Micrometer / Prometheus metrics, distributed trace IDs, and an opt-in request/response echo for support engineers.'],
      ['i18n', '~20 locales delivered as server-side bundles, with tag-filtered strings.'],
      ['Accessibility', 'WCAG 2.2 AA + a stricter internal checklist: VoiceOver, keyboard-only flows, 200–400% reflow, dark-mode contrast.'],
      ['Quality gates', '80% Jest coverage, Checkstyle, SpotBugs with zero bugs allowed, dependency-convergence enforcement and static analysis on every PR.']
    ],
    hld: {
      diagrams: [
        {
          title: 'Old DC — classic, blocking',
          tiers: [
            { n: 'Browser', k: 'client', mine: true, nodes: ['React SPA', 'Redux + epics', 'Apollo Client'] },
            'REST + GraphQL · CSRF token',
            { n: 'Tomcat 9 · WAR', k: 'core', nodes: ['Auth · CSRF · CSP filters', 'JAX-RS controllers', 'Business delegate', 'GraphQL proxy', 'Operation caches'] },
            'Pooled WebSocket · HTTP fallback',
            { n: 'Diagnostics platform', k: 'ext', nodes: ['Numbered RPC operations', 'Session · suites · results'] }
          ]
        },
        {
          title: 'New DC — reactive BFF',
          tiers: [
            { n: 'Browser', k: 'client', mine: true, nodes: ['Same React SPA', 'Per-feature GraphQL flags'] },
            'REST + GraphQL · CSRF · CSP nonce',
            { n: 'Spring Boot WebFlux', k: 'core', mine: true, nodes: ['SSO + CSRF security chain', 'WebFilters: user, metrics, timing', 'Functional router + handlers', 'GraphQL resolvers', 'Services + result mappers', 'Config loader (TTL) + Caffeine'] },
            'Per-operation routing · service-to-service auth',
            { n: 'Downstream', k: 'ext', nodes: ['Legacy diagnostics platform', 'Session service', 'History service', 'Helper & companion services'] }
          ]
        }
      ],
      decisions: [
        ['One SPA, two backends', 'The SPA is shared, so the rewrite is judged by one rule: the UI must not notice. Old-DC behaviour is the reference for every fix.'],
        ['Config-driven routing', 'Each operation is routed by configuration to the legacy platform or a microservice — migration one operation at a time.'],
        ['Platform-served grouping', 'Result-grouping rules are fetched per device family and cached with a TTL, so new devices need config, not code.'],
        ['SPA served by the backend', 'The SPA build is bundled into the server artifact and served with a CSP nonce for every deep link.']
      ]
    },
    lld: {
      modules: [
        ['Data provider (SPA)', 'One service owns API plumbing: REST via RxJS ajax plus Apollo, a shared CSRF-retry, and a reload on auth expiry.'],
        ['State', 'Redux reducers; redux-observable epics orchestrate side effects and polling streams; co-located real-time hooks.'],
        ['Pages', 'New device / pre-session, suites, technician view, results, customer view and report, account settings.'],
        ['Results pipeline', 'Raw results → grouped, ordered results per test using device-family config. Parity rules: reference-equality de-dup, hidden types dropped, audio state priority FAILED > ERRORED > WARNING, battery edge cases.'],
        ['Old DC backend', 'Servlet filter chain (auth → CSRF → source maps → encoding → SPA routing); controllers wrap handlers with metrics and a log line; hourly and five-minute caches.'],
        ['New DC backend', 'Ordered functional routes (API / data / SPA fallback); handlers return reactive responses; config holders warm up on start and refresh lazily with a TTL; per-feature flags allow a gradual REST → GraphQL cutover.']
      ],
      flow: {
        title: 'A diagnostic session',
        steps: [
          'Technician enters a serial number → verify device + product details.',
          'Start a session → list eligible suites.',
          'Select a suite → poll progress; answer on-device prompts.',
          'Raw results → mapped and grouped per device family.',
          'Review results → share the customer report → archive.'
        ]
      }
    },
    ui: [
      ['Component architecture', 'Route-level pages composed from shared device header, suite list, progress and result-group components; Storybook for isolated states.'],
      ['Design tokens & theming', 'Emotion CSS-in-JS with theme tokens; light and dark themes tuned for strict contrast.'],
      ['State & data fetching', 'A single Redux store; epics manage polling with cancellation (switch / take-until patterns); Apollo cache for operations behind GraphQL flags.'],
      ['Routing', 'React Router 6 data router; the server returns the SPA shell for dashboard, settings and report deep links.'],
      ['Rendering strategy', 'Client-rendered SPA bootstrapped with server-injected identity, config and strings to avoid a request waterfall.'],
      ['Accessibility & i18n', 'Dialog focus management, ARIA live status for running suites, list semantics, VoiceOver passes, keyboard-only flows, 200–400% reflow; ~20 locales.'],
      ['Performance & caching', 'Polling paused on terminal states; a service worker caches static assets; Vite 6 builds; server-side operation caches.'],
      ['Error & loading states', 'Automatic CSRF retry, reload to SSO on auth expiry, explicit "unavailable" suite states and offline device history.']
    ],
    stack: {
      frontend: ['React 18', 'TypeScript (strict)', 'Redux 4 + React Redux', 'Recharts (charts)', 'redux-observable + RxJS', 'Apollo Client 3', 'React Router 6', 'Emotion', 'Storybook'],
      backend: ['Old: Java · Jersey JAX-RS · Tomcat 9 · graphql-java · JAXB', 'New: Java 25 · Spring Boot WebFlux · Netty · virtual threads', 'Spring for GraphQL', 'Caffeine', 'Micrometer / Prometheus', 'Distributed tracing', 'Log4j2'],
      build: ['Vite 6', 'Gradle (old)', 'Maven (new)', 'Node 20', 'ESLint', 'Prettier'],
      testing: ['Jest + ts-jest (80% gate)', 'Cypress', 'JUnit 4 / 5', 'Mockito', 'GraphQL slice tests', 'Checkstyle', 'SpotBugs', 'JaCoCo', 'SonarQube'],
      cicd: ['Internal CI/CD pipelines', 'Multi-arch Docker images', 'Kubernetes', 'Per-environment Helm values']
    },
    contrib: [
      'Core frontend engineer on the shared SPA across both phases.',
      'Resolved <b>530+ issues</b> across suite flows, results pages, DFU / revive, QR-code scanning, offline device history and session takeover.',
      'Led the accessibility effort: <b>140+ fixes</b> — dialog focus and ARIA, VoiceOver and keyboard access, list semantics, active / disabled states, dark-mode contrast and 200–400% zoom reflow.',
      'Fixed security findings such as source disclosure on error pages, and added DOM-semantics tests so accessibility regressions fail in CI.',
      'Parity work against the new BFF: GraphQL variable-type checks before enabling flags, and side-by-side comparison with old-DC behaviour.'
    ]
  },

  /* ---------------------------------------------------------------- 03 */
  {
    id: 'getsupport',
    num: '03',
    title: 'GetSupport UI',
    tagKey: 'p.getsupport.tag',
    confidential: true,
    role: 'Frontend Engineer',
    org: 'Apple',
    period: '2021 – 2022',
    tags: ['React', 'TypeScript', 'Redux + thunk', 'immer', 'react-intl', 'SCSS', 'MapKit JS', 'jest-axe'],
    summary:
      'A large, customer-facing React SPA that guides people from choosing a product, to a topic or symptom, to a solution — booking a carry-in or onsite repair, chat, call, email or contacting a carrier — and on to a confirmation. It also covers case lookup, repair-location browsing and <b>self-service remote diagnostics</b>.',
    impact: [
      { n: 30, suffix: '+', label: 'code-split routes' },
      { n: 88, suffix: '%', label: 'statement coverage gate' },
      { n: 12, suffix: '', label: 'step self-service diagnostics' }
    ],
    overview: [
      'Customers arrive with a problem and want it solved quickly, in their own language and country. The flows are configured on the server — tiles, groups and sections come from the backend — so the UI must render whatever journey the business defines.',
      'The UI is purely a client of a backend-for-frontend. It has to be resilient (one retry, then a clear error page), measurable (analytics on every page, A/B testing), accessible and RTL-ready.'
    ],
    goals: [
      'Get a customer from "something is wrong" to a booked solution in as few steps as possible.',
      'Let the backend drive the journey without UI releases.',
      'Survive flaky networks and Back-button navigation without stale state.',
      'Ship in many locales, including right-to-left.'
    ],
    fr: [
      ['Session bootstrap', 'One page-init call returns the entire initial state — starting page, locale, feature flags — and can redirect to sign-in.'],
      ['Locale & country', 'Country/region selector, footer locale picker, RTL layouts.'],
      ['Lobby', 'Signed-in and signed-out variants, search, product lookup by serial number.'],
      ['Triage', 'Product selection and disambiguation, serial validation, topics, dynamic follow-up questions with conditional fields, suggestions.'],
      ['Solutions', 'Server-configured tiles, course-correction modals and split tests.'],
      ['Solution flows', 'Carry-in repair (store map, timeslots, prep steps, review), drop-off / mail-in, onsite repair, email / chat / call / callback forms, contact carrier, attachment upload.'],
      ['Confirmation', 'One shared confirmation page with print support and safe Back behaviour.'],
      ['Case & activity', 'Case lookup and details, activity history, reschedule and cancel.'],
      ['Identity extras', 'Government ID and two-factor verification steps.'],
      ['Self-service diagnostics', 'List devices → create session → poll until connected → run suites → progress with on-device prompts → results (audio, display, multi-touch renderers) → insights → feedback → archive.']
    ],
    nfr: [
      ['Performance', 'Route-level code splitting, vendor split chunks, PurgeCSS, no production source maps, gzip size report on every build.'],
      ['Resilience', 'One retry for bootstrap and key content calls; every API error normalised into one shape; a full-page error screen that shows support IDs.'],
      ['Security', 'Auth token rotated from every response; a signed-out header forces a reset; server HTML sanitised with DOMPurify.'],
      ['Session', 'Only contract-listed fields are mirrored to sessionStorage and re-sent on bootstrap; a session-expiry modal.'],
      ['Observability', 'Per-request correlation IDs (including retries), captured transaction IDs, feature-flagged UI error logging.'],
      ['Accessibility', 'Accessible modals, live regions for search, managed focus, jest-axe tests, RTL and dark mode.'],
      ['i18n', 'All copy through react-intl message keys with defaults; a script checks local keys against the content system.'],
      ['Quality gates', 'Coverage thresholds — statements 88, branches 79, functions 90, lines 87 — with lint and Prettier in the test run.']
    ],
    hld: {
      diagrams: [
        {
          title: 'Client of a backend-for-frontend',
          tiers: [
            { n: 'Browser', k: 'client', nodes: ['HTML shell with runtime config', 'Analytics · A/B testing', 'Maps (MapKit JS)'] },
            'Server-templated shell',
            { n: 'GetSupport SPA', k: 'core', mine: true, nodes: ['Bootstrap: page-init + A/B prefetch', 'Redux store + thunks', 'fetch service: token rotation, retry', 'Connected router + lazy pages'] },
            'REST · JSON · token header · correlation ID',
            { n: 'BFF facade', k: 'ext', nodes: ['Content & locales', 'Products · topics · solutions', 'Timeslots · locations · execute', 'Cases & activity', 'Diagnostics sessions & results'] },
            'Service calls',
            { n: 'Backend services', k: 'ext', nodes: ['Content system', 'Repair & scheduling', 'Diagnostics platform', 'Log pipeline'] }
          ]
        }
      ],
      decisions: [
        ['The server drives the first screen', 'The initial Redux state is the server response; a one-shot redirect sends the user to the server-chosen starting page.'],
        ['Back-button semantics in one place', 'A middleware handles browser Back: it clears downstream flow state, steers away from confirmation pages and resets the session at home.'],
        ['Contract-first', 'Request and response types come from a proto-generated contract package — no invented field names.'],
        ['Packaged, not hosted', 'The UI ships as an npm tarball and Docker image that the BFF serves.']
      ]
    },
    lld: {
      modules: [
        ['Bootstrap', 'Init split testing → show loader → page-init with correlation ID → hydrate store → render, or retry once and show the catastrophic-error page.'],
        ['Redux slice pattern', 'types / action / reducer per slice; thunks call the shared fetch service; immer reducers; registered in the root reducer.'],
        ['fetch service', 'Default headers (time zone, credentials), correlation IDs, token rotation, transaction capture, retry config and error normalisation.'],
        ['Diagnostics polling', 'Interval IDs in refs, cleared in effect cleanup, gated on terminal states and a max duration (seconds-level intervals, minutes-level caps).'],
        ['Analytics', 'A sibling analytics module per page exposes page-view and event tracking.'],
        ['Mock BFF', 'A json-server mock for local development, with a route per slice.']
      ],
      flow: {
        title: 'From problem to booking',
        steps: [
          'page-init → initial state and starting page.',
          'Product → topic → follow-up questions.',
          'Server-configured solutions → pick one.',
          'Solution flow (e.g. store, timeslot, review) → execute.',
          'Shared confirmation → print or manage the case.'
        ]
      }
    },
    ui: [
      ['Component architecture', 'Pages → layouts (main shell with analytics) → shared form components (text field, dropdown, phone number, time zone) and a maps HOC.'],
      ['Design tokens & theming', 'SCSS on an internal web design kit; dark theme via a class and prefers-color-scheme. Class names are always literal so PurgeCSS never removes live styles.'],
      ['State & data fetching', 'Redux + thunk + immer; router state lives in Redux; policy-filtered persistence to sessionStorage.'],
      ['Routing', 'react-router 5 + connected router; 30+ lazy routes in Suspense; centralised Back handling.'],
      ['Rendering strategy', 'Client-rendered SPA in a server-templated shell that injects runtime config and tokens.'],
      ['Accessibility & i18n', 'react-intl keys; RTL DOM set-up per locale; a locale/font mismatch triggers a refresh with the locale param; live regions; jest-axe.'],
      ['Performance & caching', 'Split chunks, CSS purge, maps script loaded on demand.'],
      ['Error & loading states', 'Backend error types map to full-page, inline or modal errors; loader during bootstrap; session-expiry modal.']
    ],
    stack: {
      frontend: ['React 16', 'TypeScript', 'Redux 4 + thunk + immer', 'redux-persist', 'react-router 5', 'react-intl', 'react-final-form', 'react-hook-form', 'SCSS', 'MapKit JS', 'DOMPurify'],
      backend: ['BFF facade (separate service)', 'Proto-generated API contract', 'json-server mock'],
      build: ['Create React App 5 + react-app-rewired', 'PurgeCSS', 'Node 14', 'ESLint', 'Prettier'],
      testing: ['Jest', 'React Testing Library', 'Enzyme (legacy)', 'jest-axe', 'redux-mock-store', 'fetch-mock'],
      cicd: ['Internal CI/CD', 'Docker image', 'Automated deploy chain', 'Private npm registry']
    },
    contrib: [
      'Frontend engineer on the support flow and its self-service diagnostics area.',
      'Built and maintained triage and solution-flow screens, plus diagnostics polling and result renderers.',
      'Accessibility fixes and jest-axe coverage on new UI; kept the project above its coverage gates.',
      'Bug fixes on Back-button and session-persistence edge cases.'
    ]
  },

  /* ---------------------------------------------------------------- 04 */
  {
    id: 'provisioning',
    num: '04',
    title: 'AST2 Provisioning UI',
    tagKey: 'p.provisioning.tag',
    confidential: true,
    role: 'Full-stack engineer',
    org: 'Apple',
    period: '2020 – 2021',
    tags: ['React 18', 'TypeScript', 'Redux Toolkit + React Redux', 'Tailwind', 'Spring Boot WebFlux', 'Java 21', 'Cypress'],
    summary:
      'An admin console for provisioning diagnostic hardware stations to customer and repair-centre accounts: add, bulk-upload, edit, renew and revoke stations, track expiry health, export reports and manage users. A <b>stateless Spring Boot WebFlux BFF</b> serves the SPA and proxies every call.',
    impact: [
      { n: 3, suffix: '', label: 'roles with scoped access' },
      { n: 30, suffix: '+', label: 'proxied API endpoints' },
      { n: 0, suffix: '', label: 'business rules in the BFF' }
    ],
    overview: [
      'Admins need to know which diagnostic stations are active, expiring or expired across many accounts, and act on them quickly — one at a time or in bulk from a CSV.',
      'The repo is a backend-for-frontend: a React SPA plus a reactive facade that handles SSO, passes user context downstream, proxies requests and does logging and metrics. Business logic and persistence live in the downstream provisioning service.'
    ],
    goals: [
      'Make expiry health visible at a glance, per account and per station.',
      'Support bulk operations safely, with validation and downloadable error logs.',
      'Keep the BFF thin, stateless and horizontally scalable.',
      'Scope what each role can see and do.'
    ],
    fr: [
      ['Roles & scoping', 'Global admins see every account; repair-centre admins see only their own. Unknown users are routed to a no-access page.'],
      ['Account list', 'Accounts in a side nav with per-account counts by health colour; infinite scroll.'],
      ['Station list', 'Sort by serial, created or expiry date; debounced full-text search.'],
      ['Expiry health', 'Active, expiring soon or expired — shown with colour <i>and</i> a text label.'],
      ['Add station', 'Device identifiers resolve automatically from the serial; access duration comes from allowed values.'],
      ['Bulk upload', 'CSV with a downloadable template, header and value validation, and an error-log download for partial failures.'],
      ['Edit · renew · revoke', 'With confirmation dialogs; lists and counts re-fetch after each change.'],
      ['Reports', 'CSV export of stations.'],
      ['User management', 'Provisioning users CRUD; toolkit users list; bulk user upload with status polling and a paged report.'],
      ['Ops', 'About dialog with UI and API versions; browser errors forwarded to logging; health endpoints for the load balancer.']
    ],
    nfr: [
      ['Authentication', 'Corporate SSO; the facade extracts the signed-in user into the request context.'],
      ['Authorisation', 'Every call authorises against the downstream service first; data-level scoping is enforced downstream.'],
      ['Service-to-service', 'Service-to-service auth tokens on a named WebClient; user context forwarded as headers.'],
      ['Web security', 'CSRF token refreshed every two minutes while the tab has focus; CSP, HSTS, frame options, nosniff and no-store headers.'],
      ['Privacy', 'PII masked in logs; raw user payloads are never logged.'],
      ['Scalability', 'Non-blocking end to end and stateless, so it scales horizontally; paging and infinite scroll on lists.'],
      ['Availability', 'Datacenter and node health checks that can be toggled to drain traffic; multi-arch containers.'],
      ['Observability', 'Structured logs with trace, span and transaction IDs; latency per downstream call; per-endpoint metrics.'],
      ['Error handling', 'Downstream status codes pass through; typed error codes with a response UUID.'],
      ['Quality gates', 'Checkstyle, SpotBugs, PMD, JaCoCo and SonarQube on PRs; ESLint + Prettier in pre-push; WCAG 2.1/2.2 AA target.']
    ],
    hld: {
      diagrams: [
        {
          title: 'A thin, stateless BFF',
          tiers: [
            { n: 'Browser', k: 'client', mine: true, nodes: ['React SPA (hash routing)', 'Redux Toolkit store', 'axios + CSRF interceptor'] },
            'HTTPS · SSO cookie · CSRF header',
            { n: 'BFF facade (WebFlux)', k: 'core', mine: true, nodes: ['Serves the SPA', 'SSO · CSRF · user filter', 'Router → handler', 'Service → connector'] },
            'Service-to-service token + user context',
            { n: 'Provisioning service', k: 'ext', nodes: ['Business rules', 'Persistence', 'Account scoping', 'Bulk jobs'] },
            'Platform services',
            { n: 'Shared platform', k: 'ext', nodes: ['Corporate SSO', 'Remote config', 'Log search', 'Metrics'] }
          ]
        }
      ],
      decisions: [
        ['BFF / facade', 'The UI never calls the provisioning service directly; the facade owns auth and hides the topology.'],
        ['Same-origin hosting', 'The SPA build is copied into the server jar — one artifact, no CORS in production.'],
        ['Hash routing', 'Deep links work without server routes.'],
        ['Pass-through contracts', 'The facade returns downstream responses as-is (except version info).']
      ]
    },
    lld: {
      modules: [
        ['Router & handlers', 'Functional routes map to one handler per API; each handler records metrics, wraps the result as JSON and maps errors.'],
        ['Services', 'Thin orchestration: read the signed-in user → authorise and build headers → call the connector.'],
        ['Connectors', 'A generic reactive GET/POST helper with latency logging, plus a typed method per downstream endpoint.'],
        ['Frontend slices', 'A hardware slice (accounts, stations, counts, user role, dialogs) and a users slice; one async thunk per endpoint.'],
        ['Startup', 'CSRF → user info → role → accounts (all, or own) → select first → stations + counts.'],
        ['Tech debt I documented', 'A duplicate authorisation round-trip per call (a caching candidate), an interceptor registration leak and misnamed metrics.']
      ],
      flow: {
        title: 'Request lifecycle',
        steps: [
          'Browser posts a search with the SSO cookie and CSRF header.',
          'Security chain validates the session and token; the user filter stores the identity.',
          'Router → handler → service authorises the user downstream and builds headers.',
          'Connector calls the provisioning service with a service token.',
          'Handler returns JSON; the thunk resolves and the slice re-renders the list.'
        ]
      }
    },
    ui: [
      ['Component architecture', 'Header bootstraps user and role; the hardware page is a side nav (accounts) + top bar (search, sort, add, report) + station cards; a family of dialogs for add / bulk / edit / renew / revoke / about.'],
      ['Design tokens & theming', 'Tailwind 3 with an internal React design system; the expiry palette (grey / yellow / red) is always paired with text so colour is never the only cue.'],
      ['State & data fetching', 'Redux Toolkit slices with async thunks; re-fetch after every mutation instead of optimistic updates.'],
      ['Routing', 'Hash router: hardware, users, no-access and signed-out pages.'],
      ['Rendering strategy', 'Client-rendered SPA served same-origin from the facade.'],
      ['Accessibility & i18n', 'Labelled controls, focus-visible rings and focus-scoped dialogs; all UI strings in one module, ready to externalise.'],
      ['Performance & caching', 'Debounced search, infinite scroll and offset/limit paging.'],
      ['Error & loading states', 'No-access route on 400/401/403, error alerts, a global error hook that logs to the server, and CSV error logs for partial bulk failures.']
    ],
    stack: {
      frontend: ['React 18', 'TypeScript 4.7', 'Redux Toolkit + React Redux', 'React Router 6 (hash)', 'axios', 'Tailwind CSS 3', 'Internal design system', 'Grid.js', 'Papa Parse', 'React Aria focus'],
      backend: ['Java 21', 'Spring Boot WebFlux (Reactor)', 'Spring Security headers', 'springdoc-openapi', 'Lombok', 'Jackson', 'Log4j2'],
      build: ['Maven wrapper', 'Create React App 5', 'Node 20', 'Make', 'ESLint (Airbnb) + Prettier'],
      testing: ['Jest + React Testing Library', 'Snapshot tests', 'JUnit 5', 'Mockito', 'reactor-test', 'Cypress (per role)', 'Checkstyle · SpotBugs · PMD · JaCoCo · SonarQube'],
      cicd: ['Internal CI/CD', 'Multi-arch Docker images', 'Jib', 'Automated environment deploys']
    },
    contrib: [
      'Worked across the React SPA and the WebFlux facade, following the end-to-end pattern for new APIs (route → handler → service → connector → thunk → component → tests).',
      'Station management screens, bulk upload validation and error-log download.',
      'Accessibility passes on dialogs and controls; Cypress coverage per role.',
      'Documented architecture, request lifecycle and known tech debt for the team.'
    ]
  },

  /* ---------------------------------------------------------------- 05 */
  {
    id: 'webadmin',
    num: '05',
    title: 'AST2 Web Admin',
    tagKey: 'p.webadmin.tag',
    confidential: true,
    role: 'Frontend Engineer',
    org: 'Apple',
    period: '2019 – 2020',
    tags: ['React 17', 'TypeScript', 'React Query', 'React Router', 'Emotion', 'Spring Boot (reactive)', 'Java 11', 'Jest + RTL', 'Cypress'],
    summary:
      'An internal support tool for looking up <b>device diagnostic events</b>. Support staff search by serial number or by diagnostic event / capture ID, scan the event history, and expand any event to see every test with its value and test information. One Spring Boot deployable serves both the API and the React SPA.',
    impact: [
      { n: 80, suffix: '%', label: 'enforced unit-coverage gate' },
      { n: 25, suffix: '+', label: 'Cypress end-to-end specs' },
      { n: 1, suffix: '', label: 'deployable: API + SPA' }
    ],
    overview: [
      'When a customer or technician reports a problem, support needs to see what the diagnostics actually said: which runs happened on a device, when, through which channel, and what each test returned. Before this tool that meant asking engineering to dig through backend systems.',
      'AST2 Web Admin puts that lookup behind a single search box. It is deliberately focused: one search, one results table, expandable per-test detail, and clear empty, loading, error and signed-out states.'
    ],
    goals: [
      'Answer "what did diagnostics say about this device?" in one search.',
      'Accept either a serial number or an event / capture ID without making the user choose.',
      'Show every test result for an event without leaving the page.',
      'Be safe by default: SSO-only access, validated input, no data cached in the browser.'
    ],
    fr: [
      ['Sign in / sign out', 'Access through corporate SSO; Sign Out ends the session and shows a signed-out page with a Sign In button.'],
      ['Smart search', 'One field for serial number or diagnostic event ID. Input is sanitised, upper-cased, length-limited and pattern-checked; long alphanumeric or numeric values are treated as event IDs, everything else as a serial.'],
      ['Results table', 'Serial, event / capture ID, date, account, ship-to, channel and result for every matching event.'],
      ['Friendly results', 'Raw result codes mapped to Passed, Warning, Failed or Canceled.'],
      ['Expandable detail', 'Click or keyboard-toggle a row to reveal a nested Test Name / Test Value / Test Information table; a single match auto-expands.'],
      ['Local time', 'Dates shown in the device’s own time zone when the profile provides one.'],
      ['Clear states', '"No Results" empty state, loading spinner, generic error message and field-level validation errors.'],
      ['Localisation', 'All UI strings come from a server-provided locale map loaded at startup.']
    ],
    nfr: [
      ['Security', 'Authentication delegated to corporate SSO; the server extracts a user context per request and re-validates all input. No search results are cached client-side.'],
      ['Accessibility', 'Labelled results table, aria-labels on icon buttons, Enter / Space on the clear control, auto-focus on the search field, and jsx-a11y linting in CI.'],
      ['Reliability', 'Health and data-centre status endpoints, a typed exception hierarchy, and a scheduled locale-cache refresh so a slow upstream doesn’t block start-up.'],
      ['Observability', 'Structured request and connector logging with a transaction filter for request correlation.'],
      ['Quality gates', '80% global coverage threshold (branches, functions, lines, statements) plus a Cypress end-to-end suite.'],
      ['Performance', 'Lazy-loaded routes behind Suspense; searches are explicit refetches, so nothing fires while the user is typing.'],
      ['i18n', 'Server-driven strings with about 20 locales defined (English enabled today).']
    ],
    hld: {
      diagrams: [
        {
          title: 'System overview',
          tiers: [
            { n: 'Browser SPA', k: 'client', mine: true, nodes: ['Search bar + validation', 'Results table', 'Expandable test detail', 'React Query (manual refetch)', 'Context: search · locale · auth'] },
            'HTTPS · JSON (REST) · SSO session',
            { n: 'Spring Boot service (reactive)', k: 'server', mine: true, nodes: ['Serves the SPA bundle', 'Search API (POST)', 'Locale API + scheduled cache', 'User-context extraction', 'Input validation · transaction filter'] },
            'Reactive HTTP connector · service-to-service',
            { n: 'Upstream', k: 'ext', nodes: ['Diagnostic results services', 'Corporate SSO'] }
          ]
        }
      ],
      decisions: [
        ['One deployable', 'The React build is copied into the service’s static resources, so API and UI ship and roll back together.'],
        ['Thin, reactive BFF', 'The service proxies and shapes upstream data with a non-blocking client; business rules stay upstream.'],
        ['Explicit search, no result cache', 'Searches only run on submit and results aren’t cached, so support always sees fresh data and nothing sensitive lingers in the browser.'],
        ['Server-driven strings', 'Copy changes and new locales ship without a UI release.']
      ]
    },
    lld: {
      modules: [
        ['App shell', 'Router with a main route and a signed-out route; lazy-loaded pages behind Suspense; a context provider for search state, locale strings and sign-out.'],
        ['Search module', 'Controlled text field with clear button; sanitise → upper-case → length check → pattern check → classify as serial or event ID → manual React Query refetch.'],
        ['Results module', 'Table component mapping result codes to labels; row component with expand / collapse state and a nested test table; auto-expand for a single result.'],
        ['Formatting', 'moment-timezone helpers that honour the device time zone; result-label mapper.'],
        ['Service layer', 'REST controllers (search, locale, health), a user-context extractor, request validation, a transaction filter, and a reactive connector to upstream services.']
      ],
      flow: {
        title: 'Searching for a device',
        steps: [
          'User types a serial or event ID and presses Search.',
          'Client sanitises and validates the input; invalid → inline field error.',
          'Valid → classified as serial or event ID → POST to the search API.',
          'Service checks the user context and input, then queries upstream diagnostic services.',
          'Results are mapped to rows with friendly labels and local dates; none → "No Results".',
          'User expands a row to see each test’s name, value and information.'
        ]
      }
    },
    ui: [
      ['Component architecture', 'Small, focused components: header with search, results table, result row, nested test table, empty / error / loading views, signed-out page.'],
      ['Design tokens & theming', 'Built on the internal enterprise design-system components (button, grid, text field, icons) with Emotion for layout styling.'],
      ['State & data fetching', 'Server state in React Query with manual refetch and caching disabled for results; UI state (search term, expanded rows) in context and local state.'],
      ['Routing', 'React Router v5: main search route plus a dedicated signed-out route.'],
      ['Rendering strategy', 'Client-rendered SPA served by the same Spring Boot service; desktop-first fixed-width layout for support workstations.'],
      ['Accessibility & i18n', 'Labelled table and controls, keyboard-operable expand and clear, auto-focus on search; all strings from the server locale map.'],
      ['Performance', 'Route-level code splitting; no requests while typing; lightweight table rendering.'],
      ['Error & loading states', 'Spinner while searching, field-level validation errors, a generic error message, a clear "No Results" state and a signed-out page.']
    ],
    stack: {
      frontend: ['React 17', 'TypeScript 4', 'React Query v3', 'React Router v5', 'Emotion', 'Internal design-system components', 'moment-timezone'],
      backend: ['Spring Boot (reactive WebClient / Reactor)', 'Java 11', 'REST APIs', 'Scheduled locale cache'],
      build: ['Create React App 4', 'Maven (jar with bundled SPA)', 'ESLint (airbnb, jsx-a11y, TypeScript)', 'Prettier'],
      testing: ['Jest', 'React Testing Library', 'Cypress 8 (end-to-end)', '80% coverage threshold'],
      cicd: ['Internal CI/CD pipeline', 'Containerised deploy (Helm / Kubernetes)', 'Health-check endpoints']
    },
    contrib: [
      'Built the search, results and expandable test-detail UI in React and TypeScript.',
      'Implemented input sanitising and serial-vs-event-ID detection, plus the empty, loading, error and signed-out states.',
      'Added accessibility fixes: labelled table, keyboard-operable controls and focus handling.',
      'Wrote unit tests to hold the 80% coverage gate and extended the Cypress end-to-end suite.'
    ]
  },

  /* ---------------------------------------------------------------- 06 */
  {
    id: 'diagflow',
    num: '06',
    title: 'AST2 Diagnostics Flow Automation',
    tagKey: 'p.diagflow.tag',
    confidential: true,
    role: 'Author',
    org: 'Python automation',
    period: '2026',
    tags: ['Python 3.10+', 'stdlib only', 'ThreadPoolExecutor', 'unittest', 'JSON Lines', 'GitHub Actions', 'Playwright'],
    summary:
      'Standard-library Python that drives one complete diagnostics flow end to end — create session, a simulated device connects, start a suite, poll, fetch results, archive — against an <b>offline fake backend</b> that mirrors the team’s internal Python diagnostics client. Devices run in parallel, sessions self-heal once, and the exit code gates CI.',
    impact: [
      { n: 12, suffix: '', label: 'step flow, every step bounded' },
      { n: 0, suffix: '', label: 'third-party runtime deps' },
      { n: 1, prefix: '< ', suffix: ' s', label: 'full unit-test suite' }
    ],
    overview: [
      'Regression-testing the technician flow normally needs a real device, a VPN and a live environment. This project runs the same flow nightly with none of them, and makes every failure easy to tie to a backend version.',
      'It is deliberately small — explainable in a few minutes — and keeps the real client’s method names so the fake stays a drop-in replacement.'
    ],
    goals: [
      'Exercise the full 12-step flow without network, VPN or hardware.',
      'Never hang: every wait has a timeout; cleanup always runs.',
      'Produce machine-readable logs and a human-readable report.',
      'Fail CI when, and only when, a device fails.'
    ],
    fr: [
      ['CLI', '<code>run.py --scenario pass | unreachable | multi | all --env …</code> prints a summary and exits non-zero on any failure.'],
      ['12-step flow', 'Environment → versions → unique serial → session → product → device connects → reachable → start suite → poll → results → check & save → archive.'],
      ['Parallel devices', 'Multi-device scenarios run devices concurrently with a thread pool.'],
      ['Self-healing', 'If a new session is not active, archive it and recreate — exactly once.'],
      ['Statuses', 'PASSED, FAILED (unreachable, timeout or failed test) or ERROR (unexpected exception), with the failing step.'],
      ['Nightly matrix', '<code>nightly.py</code> runs environment × scenario serially and writes <code>summary.json</code> + an HTML report.'],
      ['Artifacts', 'Per-device result JSON, one JSON-lines log per run.'],
      ['Demo', 'A Playwright script records a demo video of a run.']
    ],
    nfr: [
      ['Zero dependencies', 'Standard library only; Playwright is isolated to the demo virtualenv and never imported by the app or tests.'],
      ['Speed & determinism', 'Tests use tiny poll intervals and temp directories — the whole suite runs in under a second.'],
      ['Reliability', 'Every wait is bounded; archive runs in <code>finally</code>; retries are capped at one.'],
      ['Observability', 'Every event carries run ID, scenario, environment and backend versions, plus device serial and session; failures add the step and error type. Ships to log search as-is.'],
      ['Security', 'The HTML report escapes every value and sets a strict CSP — log data is treated as untrusted input.'],
      ['Safety', 'Matrix cells run serially because live runs share sessions; devices inside a scenario stay parallel.'],
      ['CI gating', 'Exit code 0 only if every device passed.'],
      ['Maintainability', 'A new scenario is a data entry; a new device behaviour is a new simulated-device knob.']
    ],
    hld: {
      diagrams: [
        {
          title: 'Flow runner with a drop-in fake',
          tiers: [
            { n: 'Entry points', k: 'client', mine: true, nodes: ['run.py — CLI', 'nightly.py — env × scenario matrix'] },
            'Scenario specs (device settings)',
            { n: 'Flow engine', k: 'core', mine: true, nodes: ['run_diagnostic_flow (steps 4–12)', 'wait_until(timeout)', 'FlowError(step)', 'Thread pool per scenario'] },
            'Same method names as the real client',
            { n: 'Fake backend', k: 'core', mine: true, nodes: ['Config: versions, data hash', 'Operations: session, product, suite, results, archive', 'Simulated device'] },
            'Writes',
            { n: 'Outputs & CI', k: 'ext', nodes: ['logs/*.jsonl', 'results/*.json', 'summary.json + report.html', 'Nightly CI · exit-code gate'] }
          ]
        }
      ],
      decisions: [
        ['Fake, not mock', 'A stateful fake backend with the real method names — swap it for the live client without touching the flow.'],
        ['Failed test ≠ exception', 'A failing step raises; a failing test completes the flow and reports which tests failed.'],
        ['Bound context logging', 'Versions are bound once per run and per device, not passed to every call.'],
        ['Serial matrix, parallel devices', 'Avoids collisions on shared sessions while keeping runs fast.']
      ]
    },
    lld: {
      modules: [
        ['run.py', 'CLI, scenario table, steps 1–3, parallel device execution, summary and exit code.'],
        ['flow.py', 'Steps 4–12 for one device; <code>FlowError</code>; a generic <code>wait_until()</code> with timeout.'],
        ['fake_backend.py', 'Environment config (versions) and operations; unique-serial generator.'],
        ['device.py', 'A simulated phone as a context manager — agent version, reachability, a failing test.'],
        ['logger.py', 'JSON-lines run logger with <code>bind()</code> for context and <code>child()</code> per device; a shared lock for multi-device runs.'],
        ['nightly.py', 'Reuses the scenario runner; builds the matrix, summary JSON and an escaped, CSP-protected HTML report.']
      ],
      flow: {
        title: 'One device, steps 4–12',
        steps: [
          'Create session (self-heal once if not active) → product ID.',
          'Simulated device connects → wait until it sees the session.',
          'Start suite → poll until finished (bounded).',
          'Fetch results → mark failed tests → save JSON.',
          'Archive the session in finally — always.'
        ]
      }
    },
    ui: [
      ['Component architecture (report)', 'A header with run metadata and backend versions, KPI tiles (runs, devices, passed, failed), an environment × scenario matrix linking to per-run cards, and per-device rows with status, failed step and a collapsible console log.'],
      ['Design tokens & theming', 'A self-contained single HTML file with inline CSS; status chips pair colour with the word PASSED / FAILED / ERROR.'],
      ['State & data', '<code>summary.json</code> is the single source; the report is rendered from it at the end of the run.'],
      ['Routing', 'In-page anchors from each matrix cell to its run.'],
      ['Rendering strategy', 'Generated static HTML — opens offline, no network requests, strict CSP.'],
      ['Accessibility & i18n', 'Semantic tables with header cells and native disclosure for console output; English only.'],
      ['Performance', 'One file, no external assets; CLI output streams as the flow runs.'],
      ['Error & CLI UX', 'Clear ERROR vs FAILED distinction with step names; colour-coded log levels; <code>--envs / --scenarios / --out</code> flags; JSON lines for machines, a summary table for humans, and a meaningful exit code.']
    ],
    stack: {
      frontend: ['Generated HTML report (inline CSS, strict CSP)', 'Terminal summary output'],
      backend: ['Python 3.10+ standard library', 'concurrent.futures', 'json · html · threading', 'Offline fake backend'],
      build: ['No build step', 'virtualenv for the demo only'],
      testing: ['unittest (< 1 s)', 'Playwright (demo recording only)'],
      cicd: ['GitHub Actions nightly workflow (sample)', 'Internal CI sample', 'Exit-code gating']
    },
    contrib: [
      'Designed and wrote the flow engine, fake backend, structured logger, nightly matrix and report.',
      'Wrote the unit tests (scenarios, self-healing, matrix, exit status, report escaping).',
      'Wrote the CI samples and recorded the demo with Playwright.'
    ]
  }
];
