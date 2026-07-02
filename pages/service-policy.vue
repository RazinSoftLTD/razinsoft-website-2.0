<script setup lang="ts">
usePageSeo({
  title: 'Service Policy — RazinSoft',
  description: 'How RazinSoft delivers its professional services — installation, customization, maintenance and app publishing — including scope, timelines and responsibilities.',
})

const sections = [
  {
    heading: 'Services We Provide',
    paragraphs: ['Alongside our ready-made software products, RazinSoft offers professional services to help you launch and grow. This policy explains how those services are delivered and what you can expect from us.'],
    list: [
      'Installation & Setup — deploying your purchased product on your server or hosting.',
      'Customization — tailoring features, design and workflows to your requirements.',
      'Maintenance & Support — updates, monitoring and technical assistance after launch.',
      'App Publishing — preparing and submitting mobile apps to the Google Play Store and Apple App Store.',
    ],
  },
  {
    heading: 'Service Scope',
    paragraphs: ['Every engagement begins with a clear, agreed scope of work. Any task, feature or deliverable not stated in that scope is treated as additional work and may be quoted separately. We recommend confirming the full scope in writing before a project begins to avoid misunderstandings.'],
  },
  {
    heading: 'Timelines & Delivery',
    paragraphs: ['We share an estimated timeline for each service before work starts. Timelines depend on project complexity, the completeness of the information and access you provide, and prompt feedback at each stage. Delays caused by pending client input, third-party approvals (such as app-store reviews) or missing credentials are outside our control and may extend the delivery date.'],
  },
  {
    heading: 'Client Responsibilities',
    list: [
      'Provide accurate requirements, content, credentials and server access needed to complete the work.',
      'Ensure your hosting or server meets the product’s technical requirements.',
      'Review deliverables and share consolidated feedback within the agreed review window.',
      'Hold valid accounts (e.g. Google Play, Apple Developer) where the service requires them.',
    ],
  },
  {
    heading: 'Revisions',
    paragraphs: ['Reasonable revisions within the agreed scope are included with each service. Requests that change or expand the original scope are considered new work and will be estimated and quoted before we proceed.'],
  },
  {
    heading: 'Service Completion',
    paragraphs: ['A service is considered complete once the agreed deliverables have been provided and, where applicable, deployed and verified. Installation, setup and app-publishing services are professional services and are non-refundable once performed — please review our Refund Policy and Terms & Conditions for full details.'],
  },
  {
    heading: 'Contact Us',
    paragraphs: ['For any questions about our services or to discuss a project, contact our team at support@razinsoft.com.'],
  },
]
</script>

<template>
  <PolicyPage
    eyebrow="Services"
    title="Service Policy"
    intro="RazinSoft provides professional services to help you install, customize, maintain and publish your software. This policy explains how we deliver those services."
    :sections="sections"
  />
</template>
