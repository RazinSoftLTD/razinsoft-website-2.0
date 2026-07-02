<script setup lang="ts">
usePageSeo({
  title: 'Refund Policy — RazinSoft',
  description: 'RazinSoft refund policy — eligibility, non-refundable services, how to request a refund and what to expect.',
})

// Content mirrored from https://razinsoft.com/refund-policy/ (headings are auto-numbered by PolicyPage).
const sections = [
  {
    heading: 'Eligibility for Refund',
    list: [
      'Refunds are only applicable within 15 days of service purchase.',
      'The service must not have been fully completed or delivered. If the service has been rendered in full, a refund will not be issued.',
      'Partial refunds may be considered if only part of the service has been delivered and the remaining service cannot be completed.',
    ],
  },
  {
    heading: 'Non-Refundable Services',
    list: [
      'Custom development work that has already commenced.',
      'Services that have been fully delivered and approved by the client.',
      'Installation or setup fees.',
    ],
  },
  {
    heading: 'How to Request a Refund',
    list: [
      'To request a refund, please contact our support team at support@razinsoft.com with your order details and reason for the refund.',
      'Our team will review your request and respond within 3-5 business days.',
    ],
  },
  {
    heading: 'Refund Process',
    list: [
      'Approved refunds will be processed within 7-10 business days.',
      'Refunds will be issued using the same payment method used for the original purchase.',
    ],
  },
  {
    heading: 'Changes to the Refund Policy',
    paragraphs: [
      'RazinSoft reserves the right to modify this refund policy at any time. Changes will be posted on our website at www.razinsoft.com.',
      'For any further questions or concerns regarding our refund policy, please contact our support team.',
    ],
  },
]
</script>

<template>
  <PolicyPage
    title="Refund Policy for RazinSoft Services"
    intro="At RazinSoft, we aim to make our customers happy by providing top-quality services. If you are not fully satisfied with what we offer, please check our refund policy below."
    :sections="sections"
  />
</template>
