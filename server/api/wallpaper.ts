export default defineEventHandler(async (event) => {
    const repo = await $fetch('localhost:8080/search', {
        query: {
            
        }
    })
  
    return repo
  })