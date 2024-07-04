import { navigateTo } from "nuxt/app"

export default defineEventHandler(async event => {
  let counter = getCookie(event, 'token') || null
  const body = await readBody(event)

  if (counter == null) {
    return navigateTo('/auth/login')
  }

  return { body }
})
