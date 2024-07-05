export default defineNuxtRouteMiddleware(async (to, from) => {
    // if someone has a better implementation please open a pr
    const { data: response } = await useAsyncData<{ data: string }>(
        'authKey',
        () => $fetch('http://localhost:3169/users/me', {
            headers: useRequestHeaders(['cookie'])
        })
      )

    if (response.value?.data == null) {
        return navigateTo("/auth/login")
    }
})
