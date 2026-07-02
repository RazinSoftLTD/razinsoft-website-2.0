<script setup lang="ts">
usePageSeo({
  title: 'Terms & Conditions — RazinSoft',
  description: 'The terms and conditions governing the purchase and use of RazinSoft products, licenses and services.',
})

// Content mirrored from https://razinsoft.com/terms-and-conditions/ (headings are auto-numbered by PolicyPage).
const sections = [
  {
    heading: 'Payments Terms',
    paragraphs: ['All payments for software products, services, and subscriptions provided by RazinSoft must be made through authorised and secure payment gateways. Pricing may differ based on selected features, project scope, level of customisation, and subscription type. For subscription-based services, charges are applied automatically for each billing cycle unless the subscription is cancelled prior to the renewal date.'],
  },
  {
    heading: 'Software License Policy',
    paragraphs: ['A software license purchased from RazinSoft is eligible for a refund only if the license has not been downloaded, activated, or deployed on any server. Once the license file is downloaded or used on a live or production environment, it is considered consumed and becomes strictly non-refundable.'],
  },
  {
    heading: 'Refund Policy',
    paragraphs: [
      'General Conditions: Refunds are evaluated on a case-by-case basis and are applicable only in limited situations, such as unresolved technical issues that prevent the software or service from functioning as intended. RazinSoft reserves the right to investigate and determine refund eligibility.',
      'Installation, Setup, and App Publishing: Installation, setup, and app publishing are professional service offerings. These services are non-refundable once performed. If any issue arises during these services, RazinSoft will take responsibility to resolve and complete the work. However, no monetary refund will be issued for installation, setup, or publishing services under any circumstances.',
      'Custom Development & Customisation: Refunds related to custom development or customisation may be considered only where there is clear evidence of non-performance or contractual failure by RazinSoft. If RazinSoft does not commence the project within 10 working days from the date of receiving the initial payment, the client will be entitled to a full refund of that initial payment. Refunds will not be provided for completed milestones, partially delivered work, or after the final deliverables have been reviewed and accepted by the client.',
    ],
  },
  {
    heading: 'Termination',
    paragraphs: ['This Agreement may be terminated under the following conditions:'],
    list: [
      'The Agreement may be terminated at any time by mutual written agreement between RazinSoft and the Client.',
      'The Client may terminate this Agreement by providing at least 30 days’ written notice. Any completed or ongoing work up to the termination date will remain payable.',
    ],
  },
  {
    heading: 'Final Notes',
    paragraphs: ['All decisions regarding refunds, licensing, and service completion are made in accordance with this policy. By purchasing or using RazinSoft’s products or services, the Client acknowledges and agrees to these terms.'],
  },
]
</script>

<template>
  <PolicyPage
    eyebrow="Legal"
    title="Terms & Conditions"
    intro="Welcome to RazinSoft. By accessing and using our website www.razinsoft.com, you agree to the following terms and conditions. Please read them carefully."
    :sections="sections"
  />
</template>
