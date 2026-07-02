<script setup lang="ts">
usePageSeo({
  title: 'Privacy Policy — RazinSoft',
  description: 'How RazinSoft collects, uses and safeguards your personal information when you visit our website and use our services.',
})

// Content mirrored from https://razinsoft.com/privacy-policy/ (headings are auto-numbered by PolicyPage).
const sections = [
  {
    heading: 'Information We Collect',
    list: [
      'Personal Information: We may collect personal information such as your name, email address, phone number, and payment details when you contact us, purchase our services, or sign up for our newsletter.',
      'Usage Data: We collect information about your interaction with our website, including IP address, browser type, and pages visited. This helps us understand how our website is used and improve your experience.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    list: [
      'To Provide and Improve Services: We use your personal information to process orders, provide customer support, and enhance our services.',
      'To Communicate with You: We may use your contact information to send you updates, promotional materials, or other information related to our services. You can opt out of these communications at any time.',
      'To Analyze Website Usage: We use usage data to analyze trends, track user activity, and improve our website’s functionality and user experience.',
    ],
  },
  {
    heading: 'Sharing Your Information',
    list: [
      'Third-Party Service Providers: We may share your information with third-party service providers who assist us in operating our website, processing payments, or delivering services. These providers are obligated to protect your information and use it only for the purposes specified by us.',
      'Legal Requirements: We may disclose your information if required by law or in response to valid requests by public authorities.',
    ],
  },
  {
    heading: 'Data Security',
    paragraphs: ['We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no data transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.'],
  },
  {
    heading: 'Cookies and Tracking Technologies',
    paragraphs: ['Our website may use cookies and similar tracking technologies to enhance user experience and gather information about website usage. You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of our website.'],
  },
  {
    heading: 'Your Rights',
    list: [
      'Access and Correction: You have the right to access and correct your personal information. To do so, please contact us at support@razinsoft.com.',
      'Opt-Out: You may opt out of receiving promotional communications from us by following the unsubscribe instructions in the emails or contacting us directly.',
    ],
  },
  {
    heading: 'Third-Party Links',
    paragraphs: ['Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.'],
  },
  {
    heading: 'Changes to This Privacy Policy',
    paragraphs: ['We may update this Privacy Policy from time to time. Any changes will be posted on our website, and your continued use of our website constitutes acceptance of the revised policy.'],
  },
  {
    heading: 'Contact Us',
    paragraphs: ['If you have any questions or concerns about this Privacy Policy, please contact us at support@razinsoft.com.'],
  },
]
</script>

<template>
  <PolicyPage
    title="Privacy Policy for RazinSoft"
    intro="At RazinSoft, we are committed to protecting your privacy and ensuring a safe online experience. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website www.razinsoft.com."
    :sections="sections"
  />
</template>
