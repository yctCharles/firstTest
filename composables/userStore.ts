export const userStore = defineStore("userStore",()=>{
    const token = ref<string>("")
    const userId = ref<string>("")

    const setToken = (v:string) => {
        token.value = v
    }
    const setUserId = (id:string) => {
        userId.value = id
    }

    const getToken = () => {
        return token.value
    }
    const getUserId = () => {
        return userId.value
    }

    return {
        setToken,
        getToken,
        setUserId,
        getUserId,
        token,
        userId
    }
},{
    persist: {
        key:"user-data",
        storage: persistedState.localStorage,
    }
})