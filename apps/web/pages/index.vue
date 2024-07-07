<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';

definePageMeta({
  layout: "custom",
  middleware: "auth"
})

let startIndex = ref(0)
let endIndex = ref(10)

const { data: response, error, execute } = await useAsyncData<{ data: { url: string, username: string, password: string }[] }>(
  'logins',
  () => $fetch('http://localhost:3169/logins/all', {
    headers: useRequestHeaders(['cookie']),
    credentials: 'include',
  })
)
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
          <TableRow v-for="data in response?.data.slice(startIndex, endIndex)">
            <TableCell class="font-medium">
              {{ data?.url }}
            </TableCell>
            <TableCell>{{ data.username }}</TableCell>
            <TableCell>**********</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger as-child>
                  <Button variant="outline" class="h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="size-4">
                      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                      <path d="M14 8H8" />
                      <path d="M16 12H8" />
                      <path d="M13 16H8" />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit credentials</DialogTitle>
                    <DialogDescription>
                      Make changes to your credentials here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <p>still wip if you see this why dont you finish it and create a pr</p>
                  <DialogFooter>
                    <Button type="submit">
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="fixed bottom-4 left-0 right-0 flex justify-center items-center">
      <Pagination :total="response?.data.length" :sibling-count="1" show-edges :default-page="1">
        <PaginationList class="flex items-center gap-1">
          <PaginationPrev @click="() => {
            startIndex = startIndex - 10
            endIndex = endIndex - 10
          }" />

          <PaginationNext @click="() => {
            startIndex = startIndex + 10
            endIndex = endIndex + 10
          }" />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
