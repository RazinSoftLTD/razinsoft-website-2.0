<script setup lang="ts">
usePageSeo({
  title: 'Installation Policy — RazinSoft',
  description: 'What’s included with RazinSoft installation support — free guided setup, scope, requirements and how to request help.',
})

const sections = [
  {
    heading: 'What’s Included',
    paragraphs: ['Every product ships with detailed documentation so you can install it yourself. In addition, we offer guided installation support to help you get up and running smoothly.'],
    list: [
      'Step-by-step installation documentation for every product.',
      'Free installation support on a fresh, supported server environment.',
      'Help configuring core settings after installation.',
    ],
  },
  {
    heading: 'Server Requirements',
    paragraphs: ['To ensure a smooth installation, your hosting environment should meet the product’s minimum requirements (PHP/Node version, database, and required extensions). These are listed in each product’s documentation.'],
    list: [
      'A supported OS with SSH/cPanel access.',
      'A clean database and the required runtime versions.',
      'Valid domain/SSL for production installs.',
    ],
  },
  {
    heading: 'Scope of Free Support',
    paragraphs: ['Free installation support covers installing the product as delivered on a compatible server. It does not include:'],
    list: [
      'Customizations, feature changes or third-party integrations.',
      'Fixing issues caused by unsupported servers or existing site conflicts.',
      'Data migration from other platforms.',
    ],
  },
  {
    heading: 'How to Request Installation',
    paragraphs: ['After purchase, reach out through your dashboard or our support channels with your order number and server access details. Our team will schedule and complete the installation, usually within 1–2 business days.'],
  },
  {
    heading: 'Paid Setup & Customization',
    paragraphs: ['Need custom configuration, migration or new features? We offer paid setup and development services. Contact us for a quick scope and quote.'],
  },
]
</script>

<template>
  <PolicyPage
    title="Installation Policy"
    updated="July 2, 2026"
    intro="We help you go live with confidence. Here’s what our installation support covers and how to request it."
    :sections="sections"
  />
</template>
