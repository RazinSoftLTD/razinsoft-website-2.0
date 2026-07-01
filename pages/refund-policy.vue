<script setup lang="ts">
usePageSeo({
  title: 'Refund Policy — RazinSoft',
  description: 'Our refund policy for RazinSoft digital products — when refunds apply, how to request one, and what to expect.',
})

const sections = [
  {
    heading: 'Digital Products',
    paragraphs: ['Our products are digital and include full source code. Because source code cannot be “returned” once downloaded, all sales are generally considered final. We do, however, review every refund request fairly and on a case-by-case basis.'],
  },
  {
    heading: 'When You May Be Eligible',
    list: [
      'The product is materially different from its description and we are unable to resolve the issue.',
      'A critical, reproducible defect prevents the product from working and our team cannot fix it in a reasonable time.',
      'You were charged more than once for the same order due to a technical error.',
    ],
  },
  {
    heading: 'When Refunds Are Not Provided',
    list: [
      'You changed your mind after downloading the source code.',
      'The issue is caused by your server, third-party plugins or customizations outside our product.',
      'You lack the technical knowledge to install or use the product (we provide documentation and installation support instead).',
      'The request is made more than 7 days after purchase.',
    ],
  },
  {
    heading: 'How to Request a Refund',
    paragraphs: ['Contact us within 7 days of purchase with your order number and a clear description of the problem. Please allow our support team to first attempt a fix — most issues are resolved quickly.'],
  },
  {
    heading: 'Processing Time',
    paragraphs: ['Approved refunds are issued to your original payment method within 5–10 business days. Timing may vary depending on your bank or payment provider.'],
  },
]
</script>

<template>
  <PolicyPage
    title="Refund Policy"
    updated="July 2, 2026"
    intro="We want you to be happy with your purchase. Here’s how refunds work for our digital products."
    :sections="sections"
  />
</template>
