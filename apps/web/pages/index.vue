<script setup lang="ts">
definePageMeta({
  layout: "custom",
  middleware: "auth"
})


const { data: response, error, execute } = await useAsyncData<{ data: { url: string, username: string, password: string }[] }>(
  'logins',
  () => $fetch('http://localhost:3169/logins/all', {
    headers: useRequestHeaders(['cookie'])
  })
)

const refresh = () => refreshNuxtData("logins")
</script>

<template>
  <div>
    <div class="relative flex-1 md:grow-0 ml-auto mb-6">
      <h2 class="text-2xl font-bold">Passwords</h2>
      <div class="flex items-between justify-between">
        <p class="text-muted-foreground">
          Manage your accounts.
        </p>

        <Button class="self-center" @click="execute">Refresh</Button>
      </div>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Website
            </TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="data in response?.data">
            <TableCell class="font-medium">
              {{ data?.url }}
            </TableCell>
            <TableCell>{{ data.username }}</TableCell>
            <TableCell>**********</TableCell>
            <TableCell>
              placeholder
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
