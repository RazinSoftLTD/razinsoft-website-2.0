<script setup lang="ts">
usePageSeo({
  title: 'Support Policy — RazinSoft',
  description: 'What RazinSoft support covers, our response times, support channels and how to get help with your product.',
})

const sections = [
  {
    heading: 'What Support Covers',
    paragraphs: ['We stand behind every product we ship. Our support helps you get up and running and resolves genuine issues with the software as delivered.'],
    list: [
      'Help with installation and initial setup of your purchased product.',
      'Fixing confirmed bugs and defects in the original product code.',
      'Guidance on using the built-in features and following our documentation.',
      'Assistance with official updates and patches we release.',
    ],
  },
  {
    heading: 'What Support Does Not Cover',
    list: [
      'Custom development, new features or design changes (these are paid services).',
      'Issues caused by third-party plugins, themes or code not supplied by RazinSoft.',
      'Problems arising from server misconfiguration or hosting that does not meet the product’s requirements.',
      'Bugs introduced by modifications made to the source code by you or a third party.',
    ],
  },
  {
    heading: 'Support Channels',
    paragraphs: ['You can reach our team by email at support@razinsoft.com or through the support section of your account dashboard. For quick questions, WhatsApp support is available during business hours.'],
  },
  {
    heading: 'Response Times',
    paragraphs: ['Our support hours are Monday to Saturday, 9 AM – 9 PM (GMT+6). We aim to respond to every request within 24 business hours. Complex issues that require investigation or a code fix may take longer, and we will keep you updated on progress.'],
  },
  {
    heading: 'Support Period',
    paragraphs: ['Each product purchase includes a support period as stated on the product or plan you buy. When the included period ends, you may continue to use the product, and support can be renewed or extended where available.'],
  },
  {
    heading: 'Helping Us Help You',
    list: [
      'Share your order number and the product/version you are using.',
      'Describe the issue clearly, with steps to reproduce it and any error messages.',
      'Include screenshots or screen recordings where possible.',
      'Provide temporary access when a fix requires us to inspect your environment.',
    ],
  },
  {
    heading: 'Contact Us',
    paragraphs: ['Need help? Reach our support team at support@razinsoft.com and we will get back to you as soon as possible.'],
  },
]
</script>

<template>
  <PolicyPage
    eyebrow="Support"
    title="Support Policy"
    intro="We are here to help you succeed with your RazinSoft product. This policy explains what our support covers, how to reach us and what to expect."
    :sections="sections"
  />
</template>
