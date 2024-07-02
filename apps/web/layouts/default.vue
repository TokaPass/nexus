<script setup lang="ts">
import { generateSillyPassword as gPass } from 'silly-password-generator';

// get current route
const route = useRoute()

// fun mode ref's
let funMode = ref(false)
let funCapitalize = ref(false)

// general password ref's
let generatedPassword = ref("")
let length = ref(10)
let uppercase = ref(true)
let lowercase = ref(false)
let numbers = ref(true)
let symbols = ref(false)

const generatePasswordWithOptions = () => {
  if (funMode) {
    generatedPassword.value = gPass({ wordCount: length.value, capitalize: funCapitalize.value })
  } else {
    generatedPassword.value = generatePassword(length.value, uppercase.value, lowercase.value, numbers.value, symbols.value)
  }
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a href="/"
          class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <LucideCuboid class="h-4 w-4 transition-all group-hover:scale-110" />
          <span class="sr-only">Toka</span>
        </a>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href="/"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <LucideHome class="h-5 w-5" />
                <span class="sr-only">Dashboard</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href="/generator"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <LucideBook class="h-5 w-5" />
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
            <TooltipTrigger asChild>
              <a href="/settings"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <LucideSettings class="h-5 w-5" />
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
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" class="sm:hidden">
              <LucidePanelLeft class="h-5 w-5" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="sm:max-w-xs">
            <nav class="grid gap-6 text-lg font-medium">
              <a href="/"
                class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
              <LucidePackage2 class="h-5 w-5 transition-all group-hover:scale-110" />
              <span class="sr-only">Toka</span>
            </a>
              <a href="/" class="flex items-center gap-4 px-2.5 text-foreground">
              <LucideHome class="h-5 w-5" />
              Dashboard
              </a>
              <a href="/" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <LucideBook class="h-5 w-5" />
              Passwords
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
              <BreadcrumbLink asChild>
                <BreadcrumbPage>General</BreadcrumbPage>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="relative ml-auto flex-1 md:grow-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
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
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" class="text-right">
                    Username
                  </Label>
                  <Input id="username" class="col-span-3" required />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" class="text-right">
                    Password
                  </Label>
                  <Input id="password" class="col-span-3" required />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="website" class="text-right">
                    Website
                  </Label>
                  <Input id="website" class="col-span-3" required />
                </div>

                <div v-show="generatedPassword" class="grid grid-cols-4 items-center gap-4">
                  <Sheet>
                    <SheetTrigger class="w-full col-span-4">
                      <Button>Password Generator</Button>
                    </SheetTrigger>
                    <SheetContent class="w-[800px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle>Password generator</SheetTitle>
                        <SheetDescription>
                          Change options to generate different passwords

                          <Separator class="mt-4 mb-4" />

                          <div class="grid gap-4">
                            <div class="flex items-center space-x-2">
                              <Switch id="funmode" />
                              <Label htmlFor="funmode">Fun mode</Label>
                            </div>
                            <Card>
                              <CardContent class="grid gap-4">
                                <div class="grid gap-2 mt-4">
                                  <Label htmlFor="length">Length</Label>
                                  <Slider id="length" min={8} max={32} defaultValue={[16]} step={1} />
                                </div>
                                <div class="grid gap-2">
                                  <div v-if="funMode">
                                    <Label class="flex items-center gap-2">
                                      <Checkbox id="include-uppercase" />
                                      Capitalize
                                    </Label>
                                  </div>
                                  <div v-else class="grid gap-2">
                                    <Label class="flex items-center gap-2">
                                      <Checkbox id="include-uppercase" />
                                      Include Uppercase
                                    </Label>
                                    <Label class="flex items-center gap-2">
                                      <Checkbox id="include-lowercase" />
                                      Include Lowercase
                                    </Label>
                                    <Label class="flex items-center gap-2">
                                      <Checkbox id="include-numbers" />
                                      Include Numbers
                                    </Label>
                                    <Label class="flex items-center gap-2">
                                      <Checkbox id="include-symbols" />
                                      Include Symbols
                                    </Label>
                                  </div>
                                </div>
                                <div class="grid gap-2">
                                  <Label htmlFor="password">Generated Password</Label>
                                  <div class="flex items-center gap-2">
                                    <Input id="password" readOnly />
                                    <Button variant="ghost" size="icon" class="rounded-full hover:bg-muted">
                                      <LucideCopy class="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <div class="mt-4">
                            <Button>Generate</Button>
                            <Button variant="secondary" class="ml-4">
                              Use this password
                            </Button>
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" class="overflow-hidden rounded-full">
              <img src="https://github.com/emirsassan.png" width={36} height={36} alt="Avatar"
                class="overflow-hidden rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
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
