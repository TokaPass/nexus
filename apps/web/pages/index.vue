<script setup lang="ts">
definePageMeta({
  layout: "custom",
  middleware: "auth"
})
</script>

<template>
  <div>
    <div class="relative flex-1 md:grow-0 ml-auto mb-6">
      <h2 class="text-2xl font-bold">Passwords</h2>
      <p class="text-muted-foreground">
        Manage your accounts.
      </p>
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
            <TableHead >Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="font-medium">
              instagram.com
            </TableCell>
            <TableCell>sassan31</TableCell>
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
