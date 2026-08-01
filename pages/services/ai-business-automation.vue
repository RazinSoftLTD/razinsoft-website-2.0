<script setup lang="ts">
// AI Business Automation has its own page rather than an entry in [slug].vue: that template runs a
// hero / three features / three steps shape, and this one needs six capabilities, a five-stage
// process and a results panel. Forcing both through one template would leave the shared page full
// of conditionals for a single caller.

type Capability = { title: string; desc: string; tone: string; accent: string; paths: string[] }

const CAPABILITIES: Capability[] = [
  {
    title: 'Smart Workflow Automation',
    desc: 'Automate complex workflows and business processes across departments.',
    tone: 'bg-blue-50 text-blue-600',
    accent: '#3b82f6',
    paths: ['M9 4H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z', 'M19 15h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z', 'M9 15H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z', 'M10 6.5h4a3 3 0 0 1 3 3V15', 'M7 9.5v5.5'],
  },
  {
    title: 'Data Processing & Analysis',
    desc: 'Extract insights from data faster and make smarter, data-driven decisions.',
    tone: 'bg-emerald-50 text-emerald-600',
    accent: '#10b981',
    paths: ['M12 3a9 9 0 1 0 9 9h-9V3Z', 'M15 3.5A9 9 0 0 1 20.5 9H15V3.5Z'],
  },
  {
    title: 'AI Chatbots & Assistants',
    desc: 'Deploy intelligent chatbots to support your customers 24/7 and boost engagement.',
    tone: 'bg-violet-50 text-violet-600',
    accent: '#8b5cf6',
    paths: ['M20 12a8 8 0 0 1-8 8H4l1.8-3A8 8 0 1 1 20 12Z', 'M8.5 12h.01M12 12h.01M15.5 12h.01'],
  },
  {
    title: 'Document & Image Processing',
    desc: 'Automatically extract, classify, and manage documents and images with AI.',
    tone: 'bg-orange-50 text-orange-600',
    accent: '#f97316',
    paths: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M10 13h6', 'M10 17h4'],
  },
  {
    title: 'Email & Communication Automation',
    desc: 'Automate email responses, follow-ups, and notifications to save valuable time.',
    tone: 'bg-sky-50 text-sky-600',
    accent: '#0ea5e9',
    paths: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'm3.5 6.5 8.5 6 8.5-6'],
  },
  {
    title: 'Predictive Analytics',
    desc: 'Forecast trends and customer behavior to stay ahead of the competition.',
    tone: 'bg-rose-50 text-rose-600',
    accent: '#f43f5e',
    paths: ['M4 20V10M9.5 20V4M15 20v-7M20.5 20V7'],
  },
]

const STEPS = [
  { no: '01', title: 'Discover', desc: 'We analyze your business processes and identify automation opportunities.', accent: '#3b82f6', paths: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z', 'm16 16 4 4'] },
  { no: '02', title: 'Plan', desc: 'We design a custom AI automation strategy tailored to your goals.', accent: '#10b981', paths: ['M8 3h8a1 1 0 0 1 1 1v1H7V4a1 1 0 0 1 1-1Z', 'M7 5H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2', 'm9 12 2 2 4-4'] },
  { no: '03', title: 'Build', desc: 'Our experts build and integrate AI solutions into your existing system.', accent: '#8b5cf6', paths: ['M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'M8 21h8', 'm9.5 9-1.5 2 1.5 2', 'm14.5 9 1.5 2-1.5 2'] },
  { no: '04', title: 'Optimize', desc: 'We monitor performance and continuously optimize for better results.', accent: '#f97316', paths: ['M12 20a8 8 0 1 1 8-8', 'm12 12 4-3'] },
  { no: '05', title: 'Scale', desc: 'Scale automation as your business grows and unlocks new opportunities.', accent: '#f43f5e', paths: ['M12 3c2.5 2.5 4 5.5 4 8.5a4 4 0 0 1-8 0C8 8.5 9.5 5.5 12 3Z', 'M12 11.5h.01', 'M8.5 15 6 17.5 7 21l2.5-2', 'M15.5 15l2.5 2.5-1 3.5-2.5-2'] },
]

const BENEFITS = [
  'Reduce manual work and operational costs',
  'Improve accuracy and reduce human errors',
  'Increase productivity and team efficiency',
  'Deliver better customer experiences',
  'Focus on growth while AI handles the rest',
]

const RESULTS = [
  { value: '70%+', label: 'Reduction in manual workload', tone: 'bg-violet-50 text-violet-600', paths: ['M4 20V10M9.5 20V4M15 20v-7M20.5 20V7'] },
  { value: '40%+', label: 'Increase in operational efficiency', tone: 'bg-emerald-50 text-emerald-600', paths: ['m4 16 5-5 3.5 3.5L20 7', 'M15 7h5v5'] },
  { value: '24/7', label: 'Automated support and operations', tone: 'bg-blue-50 text-blue-600', paths: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M20 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z', 'M4 15a2 2 0 0 1 2-2h1v5H6a2 2 0 0 1-2-2Z'] },
  { value: '100+', label: 'Successful automation projects delivered', tone: 'bg-amber-50 text-amber-600', paths: ['M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z', 'm9.5 12 1.8 1.8L15 10'] },
]

// SMIL animations ignore the stylesheet's reduced-motion rule, so the switch has to be in the
// markup: when the visitor has asked for less motion, the animation elements are never rendered and
// the diagram stands as static art. Starts false on both server and client, so hydration matches.
const reduceMotion = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion.value = mq.matches
  mq.addEventListener('change', e => { reduceMotion.value = e.matches })
})

// The four signal paths out of the core. Staggered starts keep them from firing in unison.
const FLOWS = [
  { id: 'ai-flow-1', color: '#3b82f6', dur: '2.6s', begin: '0s' },
  { id: 'ai-flow-2', color: '#10b981', dur: '2.6s', begin: '0.65s' },
  { id: 'ai-flow-3', color: '#f97316', dur: '2.6s', begin: '1.3s' },
  { id: 'ai-flow-4', color: '#f43f5e', dur: '2.6s', begin: '1.95s' },
]

useSeoMeta({
  title: 'AI Business Automation — RazinSoft Services',
  description: 'We help businesses automate repetitive tasks, streamline workflows, and make data-driven decisions using the power of AI.',
})

const CALENDLY = useRuntimeConfig().public.calendlyUrl
</script>

<template>
  <div class="bg-[#f7f9fc]">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-violet-50/70 via-white to-[#f7f9fc]">
      <span class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" aria-hidden="true" />
      <span class="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" aria-hidden="true" />

      <div class="container-page relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-700">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.5 2.1 5.9 5.9 2.1-5.9 2.1L12 18.5l-2.1-5.9L4 10.5l5.9-2.1L12 2.5Z" /></svg>
            AI Powered
          </span>

          <h1 class="mt-5 font-display text-4xl font-extrabold leading-[1.1] text-ink-900 sm:text-5xl">
            AI Business
            <span class="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Automation</span>
          </h1>

          <p class="mt-4 font-display text-lg font-bold text-violet-600 sm:text-xl">Automate tasks. Save time. Grow smarter.</p>

          <p class="mt-4 max-w-lg text-base leading-relaxed text-gray-600">
            We help businesses automate repetitive tasks, streamline workflows, and make data-driven
            decisions using the power of AI.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/contact-us" class="btn bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition hover:from-violet-700 hover:to-indigo-700">
              Book a Free Consultation
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </NuxtLink>
            <a href="#how-it-works" class="btn border border-violet-200 text-violet-700 hover:bg-violet-50">
              See How It Works
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m10 9 5 3-5 3V9Z" /></svg>
            </a>
          </div>
        </div>

        <!-- What the platform touches, drawn rather than photographed so it stays sharp at any size. -->
        <div class="relative">
          <svg class="h-auto w-full" viewBox="0 0 560 440" fill="none" role="img" aria-label="An AI core connected to smart workflows, data analysis, task automation and business growth">
            <defs>
              <linearGradient id="ai-core" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#7c3aed" />
                <stop offset="100%" stop-color="#d946ef" />
              </linearGradient>
              <filter id="ai-shadow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#312e81" flood-opacity="0.10" />
              </filter>
            </defs>

            <!-- Connections. Each path is drawn from the core outwards, which is the direction the
                 signal travels: the dashes march that way and the pulses ride the same path, so
                 the diagram reads as the AI feeding each capability rather than the reverse. -->
            <g stroke-width="2" stroke-linecap="round" stroke-dasharray="1 9" opacity="0.75" fill="none">
              <path id="ai-flow-1" d="M255 170v-40c0-14-11-25-25-25h-55" stroke="#3b82f6">
                <animate v-if="!reduceMotion" attributeName="stroke-dashoffset" from="0" to="-10" dur="1.1s" repeatCount="indefinite" />
              </path>
              <path id="ai-flow-2" d="M305 170v-45c0-14 11-25 25-25h55" stroke="#10b981">
                <animate v-if="!reduceMotion" attributeName="stroke-dashoffset" from="0" to="-10" dur="1.1s" repeatCount="indefinite" />
              </path>
              <path id="ai-flow-3" d="M255 275v40c0 14-11 25-25 25h-55" stroke="#f97316">
                <animate v-if="!reduceMotion" attributeName="stroke-dashoffset" from="0" to="-10" dur="1.1s" repeatCount="indefinite" />
              </path>
              <path id="ai-flow-4" d="M305 275v40c0 14 11 25 25 25h55" stroke="#f43f5e">
                <animate v-if="!reduceMotion" attributeName="stroke-dashoffset" from="0" to="-10" dur="1.1s" repeatCount="indefinite" />
              </path>
            </g>
            <!-- One pulse per branch, staggered so they leave the core in turn rather than as a
                 single flash. Each fades in on departure and out on arrival, so nothing pops. -->
            <g v-if="!reduceMotion">
              <g v-for="f in FLOWS" :key="f.id" opacity="0">
                <circle r="9" :fill="f.color" opacity="0.22" />
                <circle r="4.5" :fill="f.color" />
                <animateMotion :dur="f.dur" :begin="f.begin" repeatCount="indefinite" calcMode="linear">
                  <mpath :href="'#' + f.id" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.78;1" :dur="f.dur" :begin="f.begin" repeatCount="indefinite" />
              </g>

              <!-- The core answers each departure with a ring, so the movement has a source. It
                   grows as a rounded square rather than a circle: a circle cuts across the core's
                   corners and reads as a second, unrelated shape. -->
              <rect x="215" y="160" width="130" height="130" rx="26" fill="none" stroke="#a78bfa" stroke-width="2" stroke-opacity="0">
                <animate attributeName="x" values="215;191" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="y" values="160;136" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="width" values="130;178" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="height" values="130;178" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="rx" values="26;38" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.5;0" dur="2.6s" repeatCount="indefinite" />
              </rect>
            </g>

            <!-- Core -->
            <g filter="url(#ai-shadow)">
              <rect x="215" y="160" width="130" height="130" rx="26" fill="#fff" stroke="#ede9fe" stroke-width="2" />
            </g>
            <rect x="235" y="180" width="90" height="90" rx="18" fill="url(#ai-core)" opacity="0.10">
              <animate v-if="!reduceMotion" attributeName="opacity" values="0.10;0.22;0.10" dur="2.6s" repeatCount="indefinite" />
            </rect>
            <text x="280" y="225" text-anchor="middle" dominant-baseline="central" font-family="system-ui, sans-serif" font-size="46" font-weight="800" fill="url(#ai-core)">AI</text>
            <g stroke="#c4b5fd" stroke-width="3" stroke-linecap="round">
              <path d="M245 152v-14M280 152v-14M315 152v-14M245 298v14M280 298v14M315 298v14" />
              <path d="M207 190h-14M207 225h-14M207 260h-14M353 190h14M353 225h14M353 260h14" />
            </g>

            <!-- Smart Workflows -->
            <g filter="url(#ai-shadow)"><rect x="25" y="45" width="150" height="118" rx="18" fill="#fff" /></g>
            <rect x="47" y="67" width="44" height="44" rx="12" fill="#eff6ff" />
            <g stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="translate(57 77) scale(1.05)">
              <rect x="0" y="0" width="9" height="7" rx="2" /><rect x="14" y="0" width="9" height="7" rx="2" /><rect x="7" y="15" width="9" height="7" rx="2" />
              <path d="M4.5 7v4h14V7M11.5 11v4" />
            </g>
            <text x="47" y="140" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#374151">Smart Workflows</text>

            <!-- Data Analysis -->
            <g filter="url(#ai-shadow)"><rect x="385" y="35" width="150" height="118" rx="18" fill="#fff" /></g>
            <rect x="407" y="57" width="44" height="44" rx="12" fill="#ecfdf5" />
            <g stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="translate(417 67)">
              <path d="M1 23V13M8 23V6M15 23v-7M22 23V3" /><path d="M18 3h5v5" />
            </g>
            <text x="407" y="130" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#374151">Data Analysis</text>

            <!-- Task Automation -->
            <g filter="url(#ai-shadow)"><rect x="25" y="278" width="150" height="118" rx="18" fill="#fff" /></g>
            <rect x="47" y="300" width="44" height="44" rx="12" fill="#fff7ed" />
            <g stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="translate(57 310)">
              <rect x="1" y="5" width="22" height="17" rx="5" /><path d="M12 5V1M7 12h.01M17 12h.01M9 17h6" />
            </g>
            <text x="47" y="373" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#374151">Task Automation</text>

            <!-- Business Growth -->
            <g filter="url(#ai-shadow)"><rect x="385" y="278" width="150" height="118" rx="18" fill="#fff" /></g>
            <rect x="407" y="300" width="44" height="44" rx="12" fill="#fff1f2" />
            <g stroke="#f43f5e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" transform="translate(417 310)">
              <path d="M1 23 9 13l5 5L23 5" /><path d="M17 5h6v6" />
            </g>
            <text x="407" y="373" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#374151">Business Growth</text>
          </svg>
        </div>
      </div>
    </section>

    <div class="container-page pb-20">
      <!-- Trust bar -->
      <div class="grid gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8 lg:p-7">
        <div class="flex items-center gap-4">
          <img src="/images/Razinsoft-logo.webp" alt="RazinSoft" width="1772" height="384" class="h-8 w-auto">
        </div>
        <div class="border-gray-100 lg:border-l lg:pl-8">
          <p class="font-display text-base font-bold text-ink-900">Smart Automation. Real Results.</p>
          <p class="mt-1 text-sm leading-relaxed text-gray-500">RazinSoft empowers businesses with secure, scalable and intelligent automation solutions.</p>
        </div>
        <ul class="flex flex-wrap gap-x-8 gap-y-4 border-gray-100 lg:border-l lg:pl-8">
          <li class="flex items-center gap-2.5">
            <span class="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600" aria-hidden="true">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4.5 6v5c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m9.5 12 1.8 1.8L15 10" /></svg>
            </span>
            <span class="text-sm font-semibold leading-tight text-ink-900">Secure<br>& Reliable</span>
          </li>
          <li class="flex items-center gap-2.5">
            <span class="grid h-9 w-9 place-items-center rounded-lg bg-violet-50 text-violet-600" aria-hidden="true">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m12 3 9 5-9 5-9-5 9-5Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m3 13 9 5 9-5" /></svg>
            </span>
            <span class="text-sm font-semibold leading-tight text-ink-900">Scalable<br>Solutions</span>
          </li>
          <li class="flex items-center gap-2.5">
            <span class="grid h-9 w-9 place-items-center rounded-lg bg-fuchsia-50 text-fuchsia-600" aria-hidden="true">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m18.5 15 .6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z" /></svg>
            </span>
            <span class="text-sm font-semibold leading-tight text-ink-900">AI<br>Powered</span>
          </li>
        </ul>
      </div>

      <!-- What we automate -->
      <section class="mt-16">
        <div class="text-center">
          <h2 class="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">What We Automate</h2>
          <span class="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" aria-hidden="true" />
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="c in CAPABILITIES"
            :key="c.title"
            class="tile group flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
            :style="{ '--accent': c.accent }"
          >
            <span class="tile-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl" :class="c.tone" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in c.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
            </span>
            <div class="min-w-0">
              <h3 class="tile-title font-display text-base font-bold leading-snug text-ink-900">{{ c.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-gray-500">{{ c.desc }}</p>
              <NuxtLink to="/contact-us" class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold" :style="{ color: c.accent }">
                Learn More
                <svg class="tile-arrow h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </NuxtLink>
            </div>
          </article>
        </div>
      </section>

      <!-- How it works -->
      <section id="how-it-works" class="mt-16 scroll-mt-24">
        <div class="text-center">
          <h2 class="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">How It Works</h2>
          <span class="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" aria-hidden="true" />
        </div>

        <!-- The connector is drawn between steps, so it is a gap in the grid rather than an overlay:
             it cannot drift out of place when the columns reflow. -->
        <ol class="mt-12 grid gap-y-10 sm:grid-cols-2 lg:flex lg:items-start lg:gap-y-0">
          <template v-for="(s, i) in STEPS" :key="s.no">
            <li class="relative text-center lg:flex-1">
              <span class="relative mx-auto grid h-24 w-24 place-items-center rounded-full border-2 bg-white" :style="{ borderColor: s.accent + '33' }">
                <svg class="h-10 w-10" fill="none" :stroke="s.accent" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in s.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
                <span class="absolute -top-2.5 grid h-7 w-7 place-items-center rounded-full text-[11px] font-extrabold text-white" :style="{ backgroundColor: s.accent }">{{ s.no }}</span>
              </span>
              <h3 class="mt-4 font-display text-lg font-bold text-ink-900">{{ s.title }}</h3>
              <p class="mx-auto mt-1.5 max-w-[15rem] text-sm leading-relaxed text-gray-500">{{ s.desc }}</p>
            </li>
            <li v-if="i < STEPS.length - 1" class="hidden self-start pt-11 lg:block" aria-hidden="true">
              <svg class="h-3 w-10" viewBox="0 0 40 12" fill="none">
                <path d="M1 6h30" :stroke="STEPS[i + 1]!.accent" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 5" />
                <path d="m31 2 6 4-6 4" :stroke="STEPS[i + 1]!.accent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </li>
          </template>
        </ol>
      </section>

      <!-- Why choose it, and what it returns -->
      <section class="mt-16 grid gap-6 lg:grid-cols-2">
        <div class="relative overflow-hidden rounded-2xl p-8 shadow-sm sm:p-9" style="background-image: linear-gradient(135deg, #6d28d9, #4f46e5);">
          <h2 class="font-display text-2xl font-extrabold text-white sm:text-3xl">Why Choose AI Automation?</h2>
          <ul class="mt-6 space-y-3.5">
            <li v-for="b in BENEFITS" :key="b" class="flex items-start gap-3 text-sm text-white/90 sm:text-[15px]">
              <svg class="mt-0.5 h-5 w-5 shrink-0 text-violet-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m8.5 12 2.5 2.5 4.5-5" /></svg>
              {{ b }}
            </li>
          </ul>

          <!-- Sits behind the list on small screens rather than squashing it, so the copy always wins. -->
          <svg class="pointer-events-none absolute bottom-2 right-2 hidden h-52 w-52 opacity-95 sm:block" viewBox="0 0 200 200" fill="none" aria-hidden="true">
            <!-- One raised hand, so it reads as a greeting rather than a diagram. -->
            <path d="M70 126 48 106" stroke="#fff" stroke-width="10" stroke-linecap="round" />
            <circle cx="44" cy="102" r="9" fill="#fff" />
            <path d="M130 128l18 18" stroke="#fff" stroke-width="10" stroke-linecap="round" />
            <circle cx="152" cy="150" r="9" fill="#fff" />

            <circle cx="100" cy="26" r="6" fill="#c4b5fd" />
            <path d="M100 32v12" stroke="#c4b5fd" stroke-width="4" stroke-linecap="round" />

            <rect x="54" y="64" width="9" height="20" rx="4.5" fill="#ddd6fe" />
            <rect x="137" y="64" width="9" height="20" rx="4.5" fill="#ddd6fe" />
            <rect x="62" y="44" width="76" height="58" rx="20" fill="#fff" />
            <rect x="76" y="60" width="48" height="26" rx="13" fill="#1e1b4b" />
            <circle cx="90" cy="73" r="5" fill="#67e8f9" /><circle cx="110" cy="73" r="5" fill="#67e8f9" />

            <rect x="92" y="100" width="16" height="10" fill="#ede9fe" />
            <rect x="80" y="166" width="15" height="18" rx="7.5" fill="#fff" />
            <rect x="105" y="166" width="15" height="18" rx="7.5" fill="#fff" />
            <rect x="68" y="108" width="64" height="60" rx="18" fill="#fff" />
            <rect x="84" y="124" width="32" height="22" rx="7" fill="#ede9fe" />
            <path d="M92 140v-8M100 140v-12M108 140v-5" stroke="#a78bfa" stroke-width="3" stroke-linecap="round" />
          </svg>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="r in RESULTS" :key="r.value" class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <span class="grid h-11 w-11 place-items-center rounded-xl" :class="r.tone" aria-hidden="true">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path v-for="d in r.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
            </span>
            <p class="mt-4 font-display text-2xl font-extrabold text-ink-900">{{ r.value }}</p>
            <p class="mt-1 text-sm leading-relaxed text-gray-500">{{ r.label }}</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="mt-10 flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex items-start gap-5">
          <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet-600" aria-hidden="true">
            <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M8 3v4M16 3v4M4 10h16" /></svg>
          </span>
          <div>
            <h2 class="font-display text-xl font-extrabold text-ink-900 sm:text-2xl">Ready to Automate Your Business?</h2>
            <p class="mt-1.5 text-sm leading-relaxed text-gray-500 sm:text-base">Let's discuss how AI automation can save you time and grow your business.</p>
          </div>
        </div>
        <a :href="CALENDLY" target="_blank" rel="noopener noreferrer" class="btn shrink-0 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-white transition hover:from-violet-700 hover:to-indigo-700">
          Book a Free Consultation
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </a>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Same reaction as the Services menu cards, so a tile behaves the way the menu taught the visitor
   it would: its own colour, and the arrow leading on. */
.tile {
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), box-shadow .25s ease, border-color .25s ease;
}
.tile:hover,
.tile:focus-within {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
  box-shadow: 0 12px 28px -14px color-mix(in srgb, var(--accent) 60%, transparent);
}

.tile-icon { transition: transform .35s cubic-bezier(.34, 1.56, .64, 1); }
.tile:hover .tile-icon { transform: scale(1.1) rotate(-6deg); }

.tile-title { transition: color .25s ease; }
.tile:hover .tile-title { color: var(--accent); }

.tile-arrow { transition: transform .3s cubic-bezier(.2, .8, .2, 1); }
.tile:hover .tile-arrow { transform: translateX(5px); }

@media (prefers-reduced-motion: reduce) {
  .tile, .tile:hover, .tile-icon, .tile:hover .tile-icon, .tile-arrow, .tile:hover .tile-arrow {
    transform: none;
  }
}
</style>
