<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main" class="skip-link">Skip to main content</a>
    <PromoBanner />
    <AppHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <BackToTop />
    <PromoPopup />
  </div>
</template>
