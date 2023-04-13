<script setup>
import { storeToRefs } from 'pinia'
import { useBooksStore } from '../stores/book'
import { ref } from 'vue'

const { books,loading,error } = storeToRefs(useBooksStore())

// instantiate the books store
const { fetchBooks } = useBooksStore()

// retrieve books from the store
fetchBooks()

let sortItems = ['title','author']
let sortBy = ref('title')
let searchValue = ref('')
let dialog = ref(false)

function filteredBooks() {
    let tempBooks = this.books
    
    // Process search input
    if (this.searchValue != '' && this.searchValue) {
        tempBooks = tempBooks.filter((item) => {
          return item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }
      
           
    tempBooks = tempBooks.sort((a, b) => { // Sort by title
    if (this.sortBy == 'title') {
      let comp_a = a.title.toLowerCase(), comp_b = b.title.toLowerCase()
          
      if (comp_a < comp_b) {
        return -1
      }
      if (comp_a > comp_b) {
        return 1 
      }
      return 0
    } else if (this.sortBy == 'author'){ // Sort by author
      let comp_a = a.author.toLowerCase(), comp_b = b.author.toLowerCase()
          
      if (comp_a < comp_b) {
        return -1
      }
      if (comp_a > comp_b) {
        return 1 
      }
      return 0

    }
    })
        

    return tempBooks
  }


</script>

<template>
  <main>
    <div >

    <h2>Books:</h2>
    
      <v-select  
        v-model="sortBy"
        :items="sortItems"
        label="SortBy"
        density="compact"
        ></v-select>

      <v-text-field v-model="searchValue" clearable label="search book"></v-text-field>



    <!-- Where the array of books get rendered as cards -->
    <p v-if="loading">Loading books from Store</p>
    <p v-if="error">{{ error.message }}</p>
    <!--<p v-if="books"> {{ books }} </p>-->
    <div id="books-container" v-if="books">
      
    <div class="card" v-for="book in filteredBooks()" :key="book.id">
      <img :src="book.coverImage" class="book-image"/>
      <div class="content">
        <span>
          <h1 class="book-title">
            {{ book.title }}
          </h1>
          <h3 class="author-title">
            Author: {{ book.author }}
          </h3>
        </span>

        <div class="text-center">
   
    <v-btn color="red lighten-2" dark @click="book.dialog = true">
        view more
        </v-btn>
        <v-dialog
          v-model="book.dialog"
          width="500"
        >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Summary
        </v-card-title>

        <v-card-text>
          {{ book.summary }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="book.dialog = false"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

      </div>

    </div>
    </div>
    </div>
  </main>


  
</template>


<style lang="scss">
body {
  background: #20262E;
  padding: 20px;
  font-family: Helvetica;
}
h2 {
  font-weight: bold;
  margin-bottom: 15px;
}

h3 {
  font-weight: 600;
  font-size: 16px;
}

#books-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.card {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 5px 10px;
  margin: 10px;
  width: auto;
}

.content {
  padding: 20px;
}

.book-title {
  font-size: 18px;
  font-weight: 600;
}


.author-title {
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
}

.book-image {
  width: 100%;
  max-height: 200px;
  padding: -10px -10px;;
}


</style>
