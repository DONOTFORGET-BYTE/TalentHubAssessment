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
          //TODO NQABA PASTE BACKEND API HERE AND CHECK IN CONSOLE LOG THE RESULTS
            await axios.get('https://picsum.photos/500/300?random=1').then((response) => {
            // this.books = response
            console.log('from api ', response)
           })
           
          this.books = [
            {title: 'book a',img: 'https://picsum.photos/500/300?random=1', author:'d',summary:'this is a test summary'},
            {title: 'book b',img: 'https://picsum.photos/500/300?random=1', author:'a',summary:'this is a test summary'},
            {title: 'book c',img: 'https://picsum.photos/500/300?random=1', author:'e',summary:'this is a test summary'},
            {title: 'book d',img: 'https://picsum.photos/500/300?random=1', author:'b',summary:'this is a test summary'},
            {title: 'book e',img: 'https://picsum.photos/500/300?random=1', author:'c',summary:'this is a test summary'},
            {title: 'book f',img: 'https://picsum.photos/500/300?random=1', author:'e',summary:'this is a test summary'},
            {title: 'book g',img: 'https://picsum.photos/500/300?random=1', author:'f',summary:'this is a test summary'},
            {title: 'book h',img: 'https://picsum.photos/500/300?random=1', author:'g',summary:'this is a test summary'},
            {title: 'book i',img: 'https://picsum.photos/500/300?random=1', author:'h',summary:'this is a test summary'},
            {title: 'book j',img: 'https://picsum.photos/500/300?random=1', author:'i',summary:'this is a test summary'},
        ]
        } catch (error){
          this.error = error
        } finally {
          this.loading = false
        }
      }
    }
})
