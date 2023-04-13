import { defineStore } from 'pinia'

import axios  from 'axios'

export const useBooksStore = defineStore({
  id: 'books',
  state: () => ({
    books: [],
    laoding: false,
    error: null
  }),
  getters: {},
  actions: {
    // method to retrieve books from the api
    async fetchBooks() {
        this.books = []
        this.laoding = true

        try{
          
            await axios.get('https://localhost:7045').then((response) => {
            // console.log('from api ', response)
            this.books = response.data
           })
           
          
        } catch (error){
          this.error = error
        } finally {
          this.loading = false
        }
      }
    }
})
