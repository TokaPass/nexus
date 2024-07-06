<script setup lang="ts">
import { generateSillyPassword as gPass } from 'silly-password-generator';
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

// get current route
const route = useRoute()

// fun mode ref's
let funMode = ref(false)
let funCapitalize = ref(false)

// general password ref's
let generatedPassword = ref("")
let length = ref([10])
let uppercase = ref(true)
let lowercase = ref(false)
let numbers = ref(true)
let symbols = ref(false)

let hackyPasswordField = ref("")

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  url: z.string().url()
}))

const form = useForm({
  validationSchema: formSchema,
})

const generatePasswordWithOptions = () => {
  if (funMode.value) {
    generatedPassword.value = gPass({ wordCount: length?.value[0], capitalize: funCapitalize.value })
  } else {
    generatedPassword.value = generatePassword(length?.value[0], uppercase.value, lowercase.value, numbers.value, symbols.value)
  }
}

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text)
}

const onSubmit = form.handleSubmit(async (values) => {
  await $fetch("http://localhost:3169/logins/create", {
    method: "POST",
    body: values,
    headers: useRequestHeaders(['cookie'])
  })
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <title>Toka</title>
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a href="/"
          class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
            <path
              d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>

          <span class="sr-only">Toka</span>
        </a>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="/"
                :class="['flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8', route.path === '/' ? 'bg-accent' : '']">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path
                    d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>

                <span class="sr-only">Dashboard</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="/"
                :class="['flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8', route.path === '/generator' ? 'bg-accent' : '']">

                <svg data-v-56bd7dfc="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="size-5">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>

                <span class="sr-only">Generator</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Generator</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="/settings"
                :class="['flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8', route.path === '/settings' ? 'bg-accent' : '']">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                  <path
                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span class="sr-only">Settings</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header
        class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger as-child>
            <Button size="icon" variant="outline" class="sm:hidden">

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
              </svg>

              <span class="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="sm:max-w-xs">
            <nav class="grid gap-6 text-lg font-medium">
              <a href="/"
                class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="h-5 w-5 transition-all group-hover:scale-110">
                  <path
                    d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
                <span class="sr-only">Toka</span>
              </a>
              <a href="/" class="flex items-center gap-4 px-2.5 text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path
                    d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Home
              </a>
              <a href="/" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
                Generator
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb class="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <BreadcrumbPage>General</BreadcrumbPage>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="relative ml-auto flex-1 md:grow-0">
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline">
                Add Login
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add new Login</DialogTitle>
                <DialogDescription>
                  Fill inputs and Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form @submit="onSubmit">
                <div class="grid gap-4 py-4">
                  <FormField v-slot="{ componentField }" name="username" class="grid grid-cols-4 items-center gap-4">
                    <FormItem>
                      <FormLabel>Username</FormLabel>

                      <FormControl>
                        <Input v-bind="componentField" id="username" class="col-span-3" required />
                      </FormControl>
                    </FormItem>
                  </FormField>
                  <FormField v-slot="{ componentField }" name="password" class="grid grid-cols-4 items-center gap-4">
                    <FormItem>
                      <FormLabel>Password</FormLabel>


                      <FormControl class="flex flex-1">
                        <div>
                          <Input v-bind="componentField" v-model="hackyPasswordField" id="password" class="flex"
                            required />

                          <Sheet>
                            <SheetTrigger>
                              <Button class="flex ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                  stroke-linecap="round" stroke-linejoin="round"
                                  class="size-5">
                                  <rect width="20" height="12" x="2" y="6" rx="2" />
                                  <path d="M12 12h.01" />
                                  <path d="M17 12h.01" />
                                  <path d="M7 12h.01" />
                                </svg>
                              </Button>
                            </SheetTrigger>
                            <SheetContent class="w-[800px] sm:w-[540px]">
                              <SheetHeader>
                                <SheetTitle>Password generator</SheetTitle>
                                <SheetDescription>
                                  Change options to generate different passwords

                                  <Separator class="mt-4 mb-4" />

                                  <div class="grid gap-4">
                                    <div class="flex items-center space-x-2">
                                      <Switch id="funmode" :checked="funMode" @update:checked="funMode = !funMode" />
                                      <Label htmlFor="funmode">Fun mode</Label>
                                    </div>
                                    <Card>
                                      <CardContent class="grid gap-4">
                                        <div class="grid gap-2 mt-4">
                                          <Label htmlFor="length">Length</Label>
                                          <Slider id="length" v-model="length" :default-value="length" :min="8"
                                            :max="32" :step="1" />
                                        </div>
                                        <div class="grid gap-2">
                                          <div v-if="funMode">
                                            <Label class="flex items-center gap-2">
                                              <Checkbox v-show="!funMode" :checked="funCapitalize"
                                                @update:checked="funCapitalize = !funCapitalize"
                                                id="include-uppercase" />
                                              Capitalize
                                            </Label>
                                          </div>
                                          <div v-else class="grid gap-2">
                                            <Label class="flex items-center gap-2">
                                              <Checkbox :checked="uppercase" @update:checked="uppercase = !uppercase"
                                                id="include-uppercase" />
                                              Include Uppercase
                                            </Label>
                                            <Label class="flex items-center gap-2">
                                              <Checkbox :checked="lowercase" @update:checked="lowercase = !lowercase"
                                                id="include-lowercase" />
                                              Include Lowercase
                                            </Label>
                                            <Label class="flex items-center gap-2">
                                              <Checkbox :checked="numbers" @update:checked="numbers = !numbers"
                                                id="include-numbers" />
                                              Include Numbers
                                            </Label>
                                            <Label class="flex items-center gap-2">
                                              <Checkbox :checked="symbols" @update:checked="symbols = !symbols"
                                                id="include-symbols" />
                                              Include Symbols
                                            </Label>
                                          </div>
                                        </div>
                                        <div class="grid gap-2">
                                          <Label htmlFor="password">Generated Password</Label>
                                          <div class="flex items-center gap-2">
                                            <Input v-model="generatedPassword" id="password" disabled />
                                            <Button @click="copyToClipboard(generatedPassword)" variant="ghost"
                                              size="icon" class="rounded-full hover:bg-muted">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" class="size-4">
                                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                                <path
                                                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                              </svg>
                                            </Button>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  <div class="mt-4">
                                    <Button @click="generatePasswordWithOptions">Generate</Button>
                                    <Button @click="hackyPasswordField = generatedPassword" variant="secondary"
                                      class="ml-4">
                                      Use this password
                                    </Button>
                                  </div>
                                </SheetDescription>
                              </SheetHeader>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </FormControl>

                    </FormItem>
                  </FormField>
                  <FormField v-slot="{ componentField }" name="url" class="grid grid-cols-4 items-center gap-4">
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input v-bind="componentField" id="website" class="col-span-3" required />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>
                <DialogClose as-child>
                  <Button class="w-full" type="submit">Save changes</Button>
                </DialogClose>
              </form>

            </DialogContent>
          </Dialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon" class="overflow-hidden rounded-full">
              <img src="https://github.com/emirsassan.png" width={36} height={36} alt="Avatar"
                class="overflow-hidden rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NuxtLink href="/settings">
                Settings
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div class="flex flex-col text-foreground overflow-y-auto">
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
