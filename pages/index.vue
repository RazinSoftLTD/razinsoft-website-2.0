<script setup lang="ts">
// Homepage products (admin-flagged for_home, max 6) + the latest articles teaser both come
// from the API — fetch them IN PARALLEL so SSR waits once (max of the two), not one-after-another.
const { $api } = useNuxtApp()
const [{ data: homeProducts }, { data: articlesRes }] = await Promise.all([
  useHomeProducts(),
  useAsyncData('home-articles', () => $api<any>('/articles')),
])
const products = computed(() => homeProducts.value ?? [])

usePageSeo({
  title: 'RazinSoft | Custom Software Development & Ready-Made Business Solutions',
  description:
    'RazinSoft delivers custom software development, SaaS platforms, and ready-made eCommerce, LMS, POS & ride-sharing scripts — trusted in 25+ countries. Book a free consultation.',
})
useSchemaOrg([defineWebPage({ '@type': 'CollectionPage' })])

const reviews = [
  { brand: 'Google', color: 'text-[#4285F4]', score: '5.0' },
  { brand: 'CodeCanyon', color: 'text-emerald-600', score: '4.9' },
  { brand: 'Clutch', color: 'text-[#FF3D2E]', score: '4.9' },
]

const whyFeatures = [
  { title: 'Rapid Deployment', desc: 'Launch production-ready software quickly with pre-built modules, optimized workflows, and expert implementation support.', paths: ['m13 2-8 12h6l-2 8 8-12h-6l2-8Z'] },
  { title: 'Enterprise Security', desc: 'Protect your business with secure architecture, encrypted data handling, and reliability standards built into every solution.', paths: ['M12 2.5l7.5 3v5.25c0 5.02-3.43 8.06-7.5 9.5-4.07-1.44-7.5-4.48-7.5-9.5V5.5l7.5-3Z', 'm9 12 2 2 4-4'] },
  { title: '24/7 Expert Support', desc: 'Work with experienced engineers who provide fast responses, technical guidance, and long-term support when you need it.', paths: ['M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 13v5a2 2 0 0 0 2 2h1v-6H4'] },
  { title: 'Global Infrastructure', desc: 'Built for growing businesses with high-performance infrastructure that scales smoothly as users, orders, and traffic increase.', paths: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18M3.5 9h17M3.5 15h17'] },
]

const services = [
  { title: 'Custom Software Development', desc: 'Scalable custom software built around your unique business needs - secure, reliable, and ready for growth.', tone: 'bg-blue-50 text-blue-600', paths: ['M9 12h6m-6 4h6M8 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.6a1 1 0 0 1 .7.3l5.4 5.4a1 1 0 0 1 .3.7V19a2 2 0 0 1-2 2h-1'] },
  { title: 'eCommerce Development', desc: 'Conversion-focused eCommerce platforms designed to increase sales and deliver exceptional customer experiences.', tone: 'bg-emerald-50 text-emerald-600', paths: ['M3 6h17l-1.4 12a2 2 0 0 1-2 1.7H6.4a2 2 0 0 1-2-1.7L3 6Z', 'M8 6a4 4 0 1 1 8 0'] },
  { title: 'AI & SaaS Development', desc: 'Smart software powered by AI and automation to improve efficiency, decision-making, and business performance.', tone: 'bg-purple-50 text-purple-600', paths: ['m13 2-8 12h6l-2 8 8-12h-6l2-8Z'] },
  { title: 'Cloud & DevOps Solutions', desc: 'Modern cloud infrastructure and DevOps practices for faster deployments, stronger security, and reliable performance.', tone: 'bg-amber-50 text-amber-600', paths: ['M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7Z'] },
  { title: 'Marketing & Creative Solutions', desc: 'Data-driven marketing and creative strategies that increase visibility, generate leads, and strengthen your brand.', tone: 'bg-rose-50 text-rose-600', paths: ['M3 17l6-6 4 4 7-7', 'M16 8h5v5'] },
  { title: 'Maintenance & Support', desc: 'Reliable monitoring, regular updates, and expert technical support to keep your business running smoothly.', tone: 'bg-teal-50 text-teal-600', paths: ['M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 13v5a2 2 0 0 0 2 2h1v-6H4'] },
]

const testimonials = [
  { quote: "ReadyRide helped us launch much faster than building everything from scratch. The apps run smoothly, and the admin panel is easy to manage.", name: 'Araf khan', role: 'CTO, MetroRide Technologies', initials: 'AK', avatar: 'bg-blue-600' },
  { quote: 'We wanted an eCommerce solution that could be launched quickly. The setup was straightforward, and the platform has been a great fit for our business.', name: 'Pedro van', role: 'HR Manager, NovaCart Commerce', initials: 'PV', avatar: 'bg-emerald-600' },
  { quote: "The software has been reliable, and the support team is responsive whenever we need help. It's a solution we can depend on every day.", name: 'David Müller', role: 'Founder, RetailHub Stores', initials: 'DM', avatar: 'bg-orange-500' },
  { quote: "ReadyLMS gave us most of the features we needed from day one. The platform is easy to use, and both instructors and students adapted quickly.", name: 'Pradip kulkarni', role: 'CEO, SkillBridge Academy', initials: 'PK', avatar: 'bg-violet-600' },
  { quote: "The platform made our laundry operations much easier to manage. Order tracking is smoother, and daily tasks take less time than before.", name: 'Michael Carter', role: 'CEO, FreshFold Laundry Services', initials: 'MC', avatar: 'bg-rose-500' },
  { quote: "We needed a system to manage properties, tenants, and payments in one place. The platform was easy to use, and the support team was always helpful when needed.", name: 'Thomas Becker', role: 'AM, UrbanSpace Management', initials: 'TB', avatar: 'bg-cyan-600' },
]
// Duplicated set for a seamless infinite marquee (loops at -50%).
const reviewsLoop = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

// Latest published articles for the "Insights & updates" teaser (fetched in parallel above).
const tagTones =['bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-purple-100 text-purple-700', 'bg-orange-100 text-orange-700', 'bg-rose-100 text-rose-700']
const posts = computed(() =>
  (articlesRes.value?.data ?? []).slice(0, 3).map((a: any, i: number) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    author: a.author,
    date: a.date,
    read: a.readTime,
    tag: a.category,
    tagTone: tagTones[i % tagTones.length],
    image: a.image,
  })),
)
</script>

<template>
  <!-- ============ HERO ============ -->
  <section class="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
    <div>
      <h1 class="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
        Scalable
        <span class="block w-fit text-brand-600 underline decoration-brand-600/40 decoration-4 underline-offset-4">Software Solutions</span>
      </h1>
      <p class="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
        RazinSoft builds ready and custom software solutions for eCommerce, LMS, POS, transportation, and more  — trusted by 25+ countries. 
      </p>
      <NuxtLink to="/book-a-meeting" class="btn-dark mt-8 uppercase tracking-wide">
        Book a Free Consultation
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
        <NuxtImg src="/images/razinsoft-team-focus-hero-image.webp" alt="The RazinSoft team is dedicated to working" width="520" height="360" sizes="100vw lg:520px" format="webp" loading="eager" fetchpriority="high" preload class="aspect-[13/9] w-full rounded-3xl bg-gray-100 object-cover shadow-xl" />
        <div class="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
          <p class="font-display text-2xl font-extrabold text-ink-900">35+</p>
          <p class="text-xs text-gray-500">Tech Professionals</p>
        </div>
      </div>
      <div class="relative -mt-14 w-[72%]">
        <NuxtImg src="/images/razinsoft-resolving-issue-together.webp" alt="RazinSoft team is resolving their issues together" width="420" height="300" sizes="100vw lg:420px" format="webp" loading="eager" class="aspect-[7/5] w-full rounded-3xl border-4 border-white bg-gray-100 object-cover shadow-xl" />
        <div class="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur">
          <p class="font-display text-2xl font-extrabold text-ink-900">25+</p>
          <p class="text-xs text-gray-500">Countries Served</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ TRUSTED-BY LOGOS ============ -->
  <TrustedLogos />

  <!-- ============ PRODUCTS ============ -->
  <section id="products" class="scroll-mt-20 bg-gray-50 py-20">
    <div class="container-page">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Our Products</p>
          <h2 class="mt-2 font-display text-4xl font-extrabold text-ink-900">Explore Our Products</h2>
          <p class="mt-2 text-gray-600">Ready-to-Deploy Software Solutions for growing businesses.</p>
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
        <NuxtImg src="/images/RazinSoft-production-team.webp" alt="RazinSoft team collaborating in the office" width="600" height="460" sizes="100vw lg:600px" format="webp" loading="lazy" class="aspect-[4/3] w-full rounded-3xl bg-gray-100 object-cover shadow-lg" />
        <div class="absolute -bottom-6 right-4 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-gray-100 sm:right-8">
          <p class="flex items-center gap-2 text-sm font-semibold text-emerald-600"><span class="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />Live Support Active</p>
          <p class="mt-1 text-xs text-gray-500">Average response time</p>
          <p class="font-display text-2xl font-extrabold text-ink-900">&lt;2 min</p>
        </div>
      </div>

      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Why RazinSoft</p>
        <h2 class="mt-2 font-display text-4xl font-extrabold leading-tight text-ink-900">
          Your Trusted Technology Partner for Affordable, High-Quality Software 
        </h2>
        <p class="mt-4 text-gray-600">
          Built from real client feedback. Tested for reliability. Backed by experts. We don't just deliver software; we become your technology partner for long-term growth. 
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
          Innovative Software Services Designed to Power Business Growth 
        </h2>
      </div>
      <NuxtLink to="/#services" class="btn-outline">All Services
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" /></svg>
      </NuxtLink>
    </div>

    <div class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="s in services" :key="s.title" class="group flex gap-4">
        <div class="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110" :class="s.tone" aria-hidden="true">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><path v-for="d in s.paths" :key="d" stroke-linecap="round" stroke-linejoin="round" :d="d" /></svg>
        </div>
        <div>
          <h3 class="font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-brand-600">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ s.desc }}</p>
        </div>
      </article>
    </div>
  </section>

  <!-- ============ TESTIMONIALS ============ -->
  <section class="overflow-hidden bg-gray-50 py-20">
    <div class="container-page">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-600">Customer Stories</p>
        <h2 class="mt-2 font-display text-4xl font-extrabold text-ink-900">Trusted by teams worldwide.</h2>
      </div>
    </div>

    <!-- Infinite left→right marquee -->
    <div class="marquee mt-12">
      <ul class="marquee-track">
        <li v-for="(t, i) in reviewsLoop" :key="i" class="w-[300px] shrink-0 sm:w-[380px]">
          <figure class="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
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
        </li>
      </ul>
    </div>
  </section>

  <!-- ============ BLOG / INSIGHTS ============ -->
  <section id="blog" class="scroll-mt-20 bg-[#f8fafc] py-20">
    <div class="container-page">
      <div class="mb-12 flex items-end justify-between">
        <div>
          <p class="mb-3 text-xs font-bold uppercase tracking-widest text-primary">From the Blog</p>
          <h2 class="text-3xl font-extrabold leading-tight text-foreground lg:text-4xl">Insights &amp; updates.</h2>
        </div>
        <NuxtLink to="/blog" class="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline md:flex">View all posts
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </NuxtLink>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <NuxtLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 bg-white transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
        >
          <div class="relative overflow-hidden bg-muted">
            <NuxtImg :src="post.image" :alt="post.title" width="600" height="400" sizes="100vw sm:50vw lg:384px" format="webp" loading="lazy" class="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute left-3 top-3">
              <span class="rounded-full px-2.5 py-1 text-[10px] font-bold" :class="post.tagTone">{{ post.tag }}</span>
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-3 p-5">
            <h3 class="line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{{ post.title }}</h3>
            <p class="line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between border-t border-border/40 pt-3 text-[11px] text-muted-foreground">
              <span>{{ post.author }}</span>
              <div class="flex items-center gap-2"><span>{{ post.date }}</span><span>·</span><span>{{ post.read }}</span></div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-8 flex justify-center md:hidden">
        <NuxtLink to="/blog" class="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">View all posts
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </NuxtLink>
      </div>
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
        Join 3,000+ businesses already running on RazinSoft. Book a free consultation today.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <NuxtLink to="/book-a-meeting" class="btn bg-brand-600 text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700">Book a Free Consultation
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </NuxtLink>
        <!-- Auth middleware sends logged-out users to /login (with redirect back to the dashboard). -->
        <NuxtLink to="/dashboard" class="btn border border-white/25 bg-white/5 text-white hover:bg-white/10">Sign in to dashboard</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  /* Fade the cards in/out at the edges. */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.marquee-track {
  display: flex;
  width: max-content;
  padding-block: 0.5rem;
  animation: marquee-ltr 45s linear infinite;
}
/* Uniform trailing margin (incl. last card) keeps the -50% loop seamless. */
.marquee-track > li {
  margin-right: 1.5rem;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee-ltr {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
