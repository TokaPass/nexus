export default defineNuxtRouteMiddleware(async (to, from) => {
    const { data: response } = await useFetch<{ data: string }>("http://localhost:3169/users/me")

    if (response.value?.data == "asd") {
        return navigateTo("/auth/login")
    }
})
