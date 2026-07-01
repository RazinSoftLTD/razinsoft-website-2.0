<script setup lang="ts">
// Live catalogue from the API (falls back to an empty list if unreachable at build).
const { data: allProducts } = await useProducts()
const products = computed(() => (allProducts.value ?? []).slice(0, 8))

usePageSeo({
  title: 'Scalable Software Solutions for Growing Businesses',
  description:
    'RazinSoft builds enterprise-ready eCommerce, LMS, POS and SaaS products for startups and growing businesses — with rapid deployment, enterprise security and 24/7 support.',
})
useSchemaOrg([defineWebPage({ '@type': 'CollectionPage' })])

const reviews = [
  { brand: 'Google', color: 'text-[#4285F4]', score: '5.0' },
  { brand: 'CodeCanyon', color: 'text-emerald-600', score: '4.9' },
  { brand: 'Clutch', color: 'text-[#FF3D2E]', score: '4.9' },
]

const whyFeatures = [
  { title: 'Rapid Deployment', desc: 'Get your platform live in days, not months. Our pre-built modules and guided setup cut time-to-market dramatically.', paths: ['m13 2-8 12h6l-2 8 8-12h-6l2-8Z'] },
  { title: 'Enterprise Security', desc: 'Bank-grade encryption, SOC 2-ready infrastructure, and automated security patches on every plan.', paths: ['M12 2.5l7.5 3v5.25c0 5.02-3.43 8.06-7.5 9.5-4.07-1.44-7.5-4.48-7.5-9.5V5.5l7.5-3Z', 'm9 12 2 2 4-4'] },
  { title: '24/7 Expert Support', desc: 'Dedicated engineers available around the clock via live chat, phone, and a priority ticket system.', paths: ['M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 13v5a2 2 0 0 0 2 2h1v-6H4'] },
  { title: 'Global Infrastructure', desc: 'Distributed across 12 data centres worldwide. Sub-50ms latency for users in any region.', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18M3.5 9h17M3.5 15h17'] },
]

const services = [
  { title: 'Custom Software Development', desc: 'Build modern web applications, mobile apps, and enterprise designs that perform at scale, look stunning, and give users a better experience.', tone: 'bg-blue-50 text-blue-600', paths: ['M9 12h6m-6 4h6M8 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.6a1 1 0 0 1 .7.3l5.4 5.4a1 1 0 0 1 .3.7V19a2 2 0 0 1-2 2h-1'] },
  { title: 'eCommerce Development', desc: 'Create fast, secure, and conversion-focused eCommerce platforms designed to deliver a smooth shopping experience for your customers.', tone: 'bg-emerald-50 text-emerald-600', paths: ['M3 6h17l-1.4 12a2 2 0 0 1-2 1.7H6.4a2 2 0 0 1-2-1.7L3 6Z', 'M8 6a4 4 0 1 1 8 0'] },
  { title: 'AI & SaaS Development', desc: 'Build smart SaaS platforms, AI features, and automation systems that help businesses work faster, serve customers better, and grow.', tone: 'bg-purple-50 text-purple-600', paths: ['m13 2-8 12h6l-2 8 8-12h-6l2-8Z'] },
  { title: 'Cloud & DevOps Solutions', desc: 'Improve speed, security, and scalability with reliable cloud infrastructure and efficient DevOps management solutions.', tone: 'bg-amber-50 text-amber-600', paths: ['M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7Z'] },
  { title: 'Marketing & Creative Solutions', desc: 'Grow your brand with complete digital marketing solutions, including SEO, media marketing, paid ads, and creative graphic design.', tone: 'bg-rose-50 text-rose-600', paths: ['M3 17l6-6 4 4 7-7', 'M16 8h5v5'] },
  { title: 'Maintenance & Support', desc: 'Keep your platform secure and user-friendly with simple clean design through regular fixes, updates, and reliable technical support.', tone: 'bg-teal-50 text-teal-600', paths: ['M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 13v5a2 2 0 0 0 2 2h1v-6H4'] },
]

const testimonials = [
  { quote: "RazinSoft's ecommerce suite cut our development time by 70%. The multi-vendor setup was live in three days and the analytics dashboard is genuinely excellent.", name: 'Aisha Rahman', role: 'CTO, NovaTrade Ltd', initials: 'AR', avatar: 'bg-blue-600' },
  { quote: 'The LMS is remarkably feature-complete. SCORM compliance out of the box, live classrooms that actually work, and support tickets answered within the hour.', name: 'Carlos Mendez', role: 'Head of Digital, EduFocus', initials: 'CM', avatar: 'bg-emerald-600' },
  { quote: 'We migrated our news portal to RazinSoft CMS and page load times dropped by 40%. The editorial workflow alone saves our team two hours every publish cycle.', name: 'Sarah Okonkwo', role: 'Founder, PressMatrix', initials: 'SO', avatar: 'bg-orange-500' },
]

const posts = [
  { title: 'Ecommerce Suite 3.0: Introducing AI-Powered Inventory Forecasting', excerpt: 'The latest major release brings machine-learning demand predictions, automated reorder triggers, and a redesigned supplier portal.', author: 'Mehedi Hassan', date: 'June 18, 2025', read: '5 min read', tag: 'Product Update', tagTone: 'bg-blue-100 text-blue-700', image: '/images/blog/blog-1.jpg' },
  { title: 'Setting Up a Multi-Tenant LMS in Under 30 Minutes', excerpt: "A step-by-step walkthrough from account creation to publishing your first course using RazinSoft's LMS starter template.", author: 'Fatima Al-Zahra', date: 'June 10, 2025', read: '8 min read', tag: 'Tutorial', tagTone: 'bg-emerald-100 text-emerald-700', image: '/images/blog/blog-2.jpg' },
  { title: 'RazinSoft Crosses 50,000 Active Users Across 40 Countries', excerpt: "We reflect on the growth milestones, the product decisions that drove them, and what's coming next for our global customer base.", author: 'RazinSoft Team', date: 'May 28, 2025', read: '4 min read', tag: 'Company', tagTone: 'bg-purple-100 text-purple-700', image: '/images/blog/blog-3.jpg' },
]
</script>

<template>
  <!-- ============ HERO ============ -->
  <section class="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
    <div>
      <h1 class="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
        Scalable
        <span class="block w-fit text-brand-600 underline decoration-brand-600/40 decoration-4 underline-offset-4">Software Solutions</span>
        for Growing Businesses
      </h1>
      <p class="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
        RazinSoft empowers startups and businesses with scalable digital solutions, combining modern
        development technologies, strategic thinking, and industry-focused expertise to drive long-term
        business growth.
      </p>
      <NuxtLink to="/#products" class="btn-dark mt-8 uppercase tracking-wide">
        Book a free call
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
      </NuxtLink>

      <dl class="mt-10 flex flex-wrap items-start gap-x-6 gap-y-4 divide-gray-200 sm:divide-x">
        <div v-for="(r, i) in reviews" :key="r.brand" :class="i > 0 ? 'sm:pl-6' : ''">
          <dt class="text-sm font-bold" :class="r.color">{{ r.brand }}</dt>
          <div class="mt-1 flex items-center gap-0.5 text-amber-400" aria-hidden="true">
            <svg v-for="n in 5" :key="n" class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15l-5.3 2.6 1-5.8L1.5 7.7l5.9-.9z" /></svg>
          </div>
          <dd class="mt-1 text-xs text-gray-500">Reviews <span class="font-semibold text-ink-800">{{ r.score }}</span></dd>
        </div>
      </dl>
    </div>

    <!-- Two overlapping image cards with floating stat badges -->
    <div class="relative mx-auto w-full max-w-md lg:max-w-none">
      <div class="relative ml-auto w-[82%]">
        <NuxtImg src="/images/hero-1.jpg" alt="RazinSoft engineers working together" width="520" height="360" sizes="100vw lg:520px" format="webp" loading="eager" fetchpriority="high" preload class="aspect-[13/9] w-full rounded-3xl bg-gray-100 object-cover shadow-xl" />
        <div class="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
          <p class="font-display text-2xl font-extrabold text-ink-900">35+</p>
          <p class="text-xs text-gray-500">Tech Professionals</p>
        </div>
      </div>
      <div class="relative -mt-14 w-[72%]">
        <NuxtImg src="/images/hero-2.jpg" alt="RazinSoft team in a planning meeting" width="420" height="300" sizes="100vw lg:420px" format="webp" loading="eager" class="aspect-[7/5] w-full rounded-3xl border-4 border-white bg-gray-100 object-cover shadow-xl" />
        <div class="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
          <p class="font-display text-2xl font-extrabold text-ink-900">25+</p>
          <p class="text-xs text-gray-500">Countries Served</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ PRODUCTS ============ -->
  <section id="products" class="scroll-mt-20 bg-gray-50 py-20">
    <div class="container-page">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Our Products</p>
          <h2 class="mt-2 font-display text-4xl font-extrabold text-ink-900">Explore Our Products</h2>
          <p class="mt-2 text-gray-600">Enterprise-ready software built for startups and growing businesses.</p>
        </div>
        <NuxtLink to="/products" class="btn-outline">View All
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
        </NuxtLink>
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard v-for="p in products" :key="p.slug" :product="p" />
      </div>

      <div class="mt-12 text-center">
        <NuxtLink to="/products" class="btn-dark uppercase tracking-wide">View all products
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- ============ WHY RAZINSOFT ============ -->
  <section id="why" class="container-page scroll-mt-20 py-20">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <div class="relative">
        <NuxtImg src="/images/why-office.jpg" alt="RazinSoft team collaborating in the office" width="600" height="460" sizes="100vw lg:600px" format="webp" loading="lazy" class="aspect-[4/3] w-full rounded-3xl bg-gray-100 object-cover shadow-lg" />
        <div class="absolute -bottom-6 right-4 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-gray-100 sm:right-8">
          <p class="flex items-center gap-2 text-sm font-semibold text-emerald-600"><span class="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />Live Support Active</p>
          <p class="mt-1 text-xs text-gray-500">Average response time</p>
          <p class="font-display text-2xl font-extrabold text-ink-900">&lt;2 min</p>
        </div>
      </div>

      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Why RazinSoft</p>
        <h2 class="mt-2 font-display text-4xl font-extrabold leading-tight text-ink-900">
          Built for businesses that can't afford to slow down.
        </h2>
        <p class="mt-4 text-gray-600">
          Every product we ship is the result of real client feedback, rigorous testing, and a team
          obsessed with reliability. We don't just sell software — we partner in your success.
        </p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <article v-for="f in whyFeatures" :key="f.title" class="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div class="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600" aria-hidden="true">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in f.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
            </div>
            <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ f.title }}</h3>
            <p class="mt-1.5 text-sm text-gray-600">{{ f.desc }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SERVICES ============ -->
  <section id="services" class="container-page scroll-mt-20 py-20">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Our Service</p>
        <h2 class="mt-2 max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink-900">
          Innovative Software Services Designed to Simplify Operations
        </h2>
      </div>
      <NuxtLink to="/#services" class="btn-outline">All Services
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
      </NuxtLink>
    </div>

    <div class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="s in services" :key="s.title">
        <div class="grid h-12 w-12 place-items-center rounded-xl" :class="s.tone" aria-hidden="true">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in s.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
        </div>
        <h3 class="mt-4 font-display text-lg font-bold text-ink-900">{{ s.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ s.desc }}</p>
      </article>
    </div>
  </section>

  <!-- ============ TESTIMONIALS ============ -->
  <section class="bg-gray-50 py-20">
    <div class="container-page">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Customer Stories</p>
        <h2 class="mt-2 font-display text-4xl font-extrabold text-ink-900">Trusted by teams worldwide.</h2>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <figure v-for="(t, i) in testimonials" :key="t.name" class="flex flex-col rounded-2xl border p-7 shadow-sm" :class="i === 1 ? 'border-brand-200 bg-brand-50/60' : 'border-gray-100 bg-white'">
          <div class="flex gap-1 text-amber-400" aria-hidden="true">
            <svg v-for="n in 5" :key="n" class="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15l-5.3 2.6 1-5.8L1.5 7.7l5.9-.9z" /></svg>
          </div>
          <blockquote class="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">"{{ t.quote }}"</blockquote>
          <figcaption class="mt-6 flex items-center gap-3 border-t border-gray-200/70 pt-5">
            <span class="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white" :class="t.avatar" aria-hidden="true">{{ t.initials }}</span>
            <span>
              <span class="block font-semibold text-ink-900">{{ t.name }}</span>
              <span class="block text-sm text-gray-500">{{ t.role }}</span>
            </span>
          </figcaption>
        </figure>
      </div>
      <div class="mt-8 flex justify-center gap-2" aria-hidden="true">
        <span class="h-2 w-2 rounded-full bg-gray-300" /><span class="h-2 w-6 rounded-full bg-brand-600" /><span class="h-2 w-2 rounded-full bg-gray-300" />
      </div>
    </div>
  </section>

  <!-- ============ BLOG ============ -->
  <section id="blog" class="container-page scroll-mt-20 py-20">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">From the Blog</p>
        <h2 class="mt-2 font-display text-4xl font-extrabold text-ink-900">Insights &amp; updates.</h2>
      </div>
      <NuxtLink to="/#blog" class="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">View all posts
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
      </NuxtLink>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <article v-for="post in posts" :key="post.title" class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
        <div class="relative">
          <NuxtImg :src="post.image" :alt="post.title" width="600" height="340" sizes="100vw md:400px" format="webp" loading="lazy" class="aspect-[16/9] w-full bg-gray-100 object-cover" />
          <span class="absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-bold" :class="post.tagTone">{{ post.tag }}</span>
        </div>
        <div class="flex flex-1 flex-col p-5">
          <h3 class="font-display text-lg font-bold leading-snug text-ink-900 group-hover:text-brand-700">{{ post.title }}</h3>
          <p class="mt-2 flex-1 text-sm text-gray-600">{{ post.excerpt }}</p>
          <div class="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
            <span class="font-medium text-ink-700">{{ post.author }}</span>
            <span>{{ post.date }} · {{ post.read }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- ============ CTA ============ -->
  <section class="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] py-24 text-white">
    <!-- Full-bleed grid-line overlay -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 60px 60px;" />
    <div class="container-page relative text-center">
      <h2 class="font-display text-4xl font-extrabold sm:text-5xl">
        Ready to build something <span class="text-brand-400">great?</span>
      </h2>
      <p class="mx-auto mt-5 max-w-xl text-gray-300">
        Join 50,000+ businesses already running on RazinSoft. Free 14-day trial. No credit card needed.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <NuxtLink to="/#products" class="btn bg-brand-600 text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700">Get started free
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </NuxtLink>
        <NuxtLink to="/#company" class="btn border border-white/25 bg-white/5 text-white hover:bg-white/10">Sign in to dashboard</NuxtLink>
      </div>
    </div>
  </section>
</template>
