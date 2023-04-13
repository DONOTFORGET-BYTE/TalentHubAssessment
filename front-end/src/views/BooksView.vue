<script setup>
// //import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBooksStore } from '../stores/book'
import { ref } from 'vue'

const { books,loading,error } = storeToRefs(useBooksStore())

// instantiate the books store
const { fetchBooks } = useBooksStore()

// retrieve books from the store
fetchBooks()

let ascending = ref(true)
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
      // console.log('sortBy',sortBy); //debugging purposes
      
           
    // Sort by title
    tempBooks = tempBooks.sort((a, b) => {
    if (this.sortBy == 'title') {
      let comp_a = a.title.toLowerCase(), comp_b = b.title.toLowerCase()
          
      if (comp_a < comp_b) {
        return -1
      }
      if (comp_a > comp_b) {
        return 1 
      }
      return 0
    } else if (this.sortBy == 'author'){
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
        
    // Show sorted array in descending or ascending order
    // if (!this.ascending) {
    //   tempBooks.reverse()
    // }
        
    
    // console.log('filtered books ',tempBooks); // debugging purposes
    return tempBooks
  }


</script>

<template>
  <main>
    <div >

    <h2>Books:</h2>

    <!-- Bar containing all sort inputs -->
    
    
      <div class="d-flex flex-column">
      <v-select  
        v-model="sortBy"
        :items="sortItems"
        label="SortBy"
        density="compact"
        ></v-select>

      <v-text-field v-model="searchValue" clearable label="search book"></v-text-field>
      </div>



    <!-- Where the array of books get rendered as cards -->
    <p v-if="loading">Loading books from Store</p>
    <p v-if="error">{{ error.message }}</p>
    <!--<p v-if="books"> {{ books }} </p>-->
    <div id="books-container" v-if="books">
      
    <div class="card" v-for="book in filteredBooks()" :key="book.title">
      <img :src="book.img" class="book-image"/>
      <div class="content">
        <span>
          <h1 class="book-title">
            {{ book.title }}
          </h1>

          <h3 class="author-title">
            Author: {{ book.author }}
          </h3>
        </span>

      <v-btn color="red lighten-2" dark @click="dialog = true">
        view more
        </v-btn>
        <v-dialog
          v-model="dialog"
          width="auto"
        >
      <v-card>
        <v-card-text>
          {{ book.summary }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>

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

#app {
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  transition: all 0.2s;
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

.sort-button {
  background-color: rgba(0,0,0,0);
  border: none;
  height: 100%;
  width: 50px;
  &:hover {
    background-color: rgba(0,0,0,0.2);
    cursor: pointer;
  }
}

#ascending-icon {
  // height: 30px;
  height: 100%;
  width: 30px;
}


</style>
