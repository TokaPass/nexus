export default defineNuxtRouteMiddleware(async (to, from) => {
    const tokenCookie = useCookie('token')
    // if someone has a better implementation please open a pr
    const { data: response } = await useAsyncData<{ data: string }>(
        'authKey',
        () => $fetch('http://localhost:3169/users/me', {
            headers: {
                cookie: `token=${tokenCookie.value}`
            }
        })
      )

    if (response.value?.data == null) {
        return navigateTo("/auth/login")
    }
})
