<script setup>
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Monolith Studios',
  url: 'https://mlith.co.za',
  email: 'ethan@mlith.co.za',
  telephone: '+27739048474',
  description:
    'Professional web design and development studio based in Durban, South Africa. We build beautiful, fast websites for local businesses, holiday homes, and personal portfolios.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Durban',
    addressRegion: 'KwaZulu-Natal',
    addressCountry: 'ZA',
  },
  areaServed: ['Durban', 'KwaZulu-Natal', 'South Africa'],
  priceRange: 'R2000–',
  currenciesAccepted: 'ZAR',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Design',
          description: 'Custom website design starting from R2,000',
        },
        price: '2000',
        priceCurrency: 'ZAR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Hosting',
          description: 'Managed website hosting',
        },
        price: '150',
        priceCurrency: 'ZAR',
      },
    ],
  },
}

useSeoMeta({
  title: 'Monolith Studios | Web Design & Development — Durban, South Africa',
  description:
    'Monolith Studios builds beautiful, fast websites for local businesses, holiday homes, and portfolios in Durban and across South Africa. Starting from R2,000.',
  ogType: 'website',
  ogUrl: 'https://mlith.co.za/',
  ogSiteName: 'Monolith Studios',
  ogLocale: 'en_ZA',
  ogTitle: 'Monolith Studios | Web Design & Development — Durban, South Africa',
  ogDescription:
    'Beautiful, fast websites for local businesses, holiday homes, and portfolios in Durban and across South Africa. Starting from R2,000.',
  ogImage: 'https://mlith.co.za/og-image.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Monolith Studios | Web Design & Development — Durban, South Africa',
  twitterDescription:
    'Beautiful, fast websites for local businesses, holiday homes, and portfolios in Durban and across South Africa. Starting from R2,000.',
  twitterImage: 'https://mlith.co.za/og-image.png',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://mlith.co.za/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <WhySection />
    <TestimonialsSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
