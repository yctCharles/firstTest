export const useTestStore = defineStore('test', () => {
    const name = ref("")
    const setName = (n: string) => {
        name.value = n
    }
    const getName = () => {
        return name.value
    }

    return {
        name,
        setName,
        getName
    }
},{
    persist: {
        key:"user-store", //自定义的key
        storage: persistedState.localStorage,
    }
})