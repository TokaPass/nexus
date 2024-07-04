<script setup lang="ts">
definePageMeta({
  layout: "custom"
})
</script>

<template>
  <div class="hidden space-y-6 pl-10 pb-16 md:block">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
      <p class="text-muted-foreground">
        Manage your account settings.
      </p>
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-y-0">
      <aside class="-mx-4 lg:w-1/5">
        <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
          <Button class="justify-start w-72">
            Experimental
          </Button>
        </nav>
      </aside>
      <div class="flex-1 lg:max-w-2xl">
        <p class="font-semibold text-2xl">Experimental settings</p>
        <p class="text-muted-foreground">Enable or disable experimental settings</p>
        <Separator class="mt-4" />

        <div class="mt-4">
          <div class="flex items-center space-x-2">
            <Switch id="bento" />
            <Label htmlFor="bento">Enable Bento grid</Label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>