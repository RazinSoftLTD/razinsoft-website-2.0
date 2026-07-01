<script setup lang="ts">
usePageSeo({
  title: 'Privacy Policy — RazinSoft',
  description: 'How RazinSoft collects, uses and protects your personal information when you use our website and products.',
})

const sections = [
  {
    heading: 'Information We Collect',
    paragraphs: ['We collect information you provide directly and data generated as you use our services, so we can deliver and improve them.'],
    list: [
      'Account details — name, email, and password when you register.',
      'Billing details — name, address and payment metadata processed securely by our payment gateway (we never store full card numbers).',
      'Order & license data — the products you purchase and the licenses issued to you.',
      'Usage data — pages visited, device and browser information, collected via cookies and analytics.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    list: [
      'To process orders, issue licenses and provide downloads and support.',
      'To send transactional emails such as receipts, license keys and important updates.',
      'To improve our products, website and customer experience.',
      'To comply with legal obligations and prevent fraud or abuse.',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: ['We use essential cookies to keep you signed in and remember your cart, and optional analytics cookies to understand how the site is used. You can control cookies through your browser settings.'],
  },
  {
    heading: 'Data Sharing',
    paragraphs: ['We do not sell your personal data. We share information only with trusted service providers who help us operate — such as payment processors and email/analytics services — and only to the extent needed to provide the service.'],
  },
  {
    heading: 'Data Security',
    paragraphs: ['We use encryption, access controls and secure infrastructure to protect your data. While no method is 100% secure, we work hard to safeguard your information and respond quickly to any incident.'],
  },
  {
    heading: 'Your Rights',
    list: [
      'Access, update or delete your account information at any time.',
      'Request a copy of the data we hold about you.',
      'Opt out of non-essential communications.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    paragraphs: ['We may update this policy from time to time. Material changes will be posted on this page with an updated date. Continued use of our services means you accept the revised policy.'],
  },
]
</script>

<template>
  <PolicyPage
    title="Privacy Policy"
    updated="July 2, 2026"
    intro="Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have."
    :sections="sections"
  />
</template>
