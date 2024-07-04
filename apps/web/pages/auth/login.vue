<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const tokenCookie = useCookie('token')

const onSubmit = form.handleSubmit(async (values) => {
  const response = await $fetch("http://localhost:3169/auth/login", {
    method: "POST",
    body: values
  }).then(x => x as { data: { token: string } })

  tokenCookie.value = response.data.token
  await navigateTo("/")
})
</script>

<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <title>Toka login</title>
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">
            Login
          </h1>
          <p class="text-balance text-muted-foreground">
            Enter your username below to login to your account
          </p>
        </div>
        <form @submit="onSubmit">
          <div class="grid gap-4">
            <FormField v-slot="{ componentField }" name="username" class="grid gap-2">
              <FormItem>
                <FormLabel>Username</FormLabel>

                <FormControl>
                  <Input
                      id="username"
                      type="text"
                      placeholder="awesome_guy"
                      required
                      v-bind="componentField"
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password" class="grid gap-2">
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input
                      id="password"
                      type="password"
                      required
                      v-bind="componentField"
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <Button type="submit" class="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
          src="https://github.com/emirsassan.png"
          alt="Image"
          width="1920"
          height="1080"
          class="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
      >
    </div>
  </div>
</template>
