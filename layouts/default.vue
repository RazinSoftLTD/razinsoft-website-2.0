<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main" class="skip-link">Skip to main content</a>
    <!-- PromoBanner and PromoPopup are agency-era: a countdown sale ribbon over the top of the page
         and a modal over the middle of it. Neither is in the SmartDesk design, and a "MID-YEAR MEGA
         SALE" strip is not what a buyer weighing a licence should meet first. Both components still
         exist — put the tags back to bring them along with them. -->
    <AppHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <BackToTop />
  </div>
</template>
