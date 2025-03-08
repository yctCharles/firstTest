
export const searchStore = defineStore("searchFilter", () => {
    const search = ref({
        Resolution: "1280x720",
        Date: "AllTime",
        SearchWay: "Lastest",
        Color: "All",
        SortWay: 0,
    })

    const tagName = ref("")
    const lastTag = ref("")

    const setSearch = (type: string, value: string | number) => {
        if (type === "Resolution") {
            search.value.Resolution = value as string
        } else if (type === "Date") {
            search.value.Date = value as string
        } else if (type === "SearchWay") {
            search.value.SearchWay = value as string
        } else if (type === "SortWay") {
            search.value.SortWay = value as number
        } else if (type === "Color") {
            search.value.Color = value as string
        }
    }

    const setTagName = (name: string) => {
        tagName.value = name
    }

    const setLastTag = (name: string) => {
        lastTag.value = name
    }
    const resetSearch = () => {
        search.value = {
            Resolution: "All",
            Date: "AllTime",
            SearchWay: "Lastest",
            Color: "All",
            SortWay: 0,
        }
    }

    return {
        search,
        tagName,
        lastTag,
        setSearch,
        resetSearch,
        setTagName,
        setLastTag
    }
}, {
    persist: {
        key: "search-data",
        storage: persistedState.localStorage,
    }
})
