<template>
  <div class="container">
      <SearchJokes @search-text='searchText'/>
      <Joke v-for="joke in jokes" :key="joke.id" :id="joke.id" :joke="joke.joke" />
  </div>
</template>

<script>
import axios from 'axios';
import Joke from '../../components/Joke';
import SearchJokes from '../../components/SearchJokes.vue';

export default {
    components: {
        Joke,
        SearchJokes,
    },
    data() {
        return {
            jokes: []
        }
    },
    head() {
        return {
            title: 'Dad Jokes',
            meta: [
                {
                  hid: 'description',
                  name: 'description',
                  content: 'Best place for corny dad jokes'
                }
            ]
        }
    },
    methods: {
        async searchText(text) {
            const config = {
                headers: {
                    'Accept': 'application/json'
                }
            }

            try {
                // eslint-disable-next-line no-undef
                const res = await axios.get(`https://icanhazdadjoke.com/search?term=${text}`, config);
                
                this.jokes = res.data.results;
            } catch (err) {
                console.log(err)
            }
        }
    },
    async created() {
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        }

        try {
            // eslint-disable-next-line no-undef
            const res = await axios.get('https://icanhazdadjoke.com/search', config);
            
            this.jokes = res.data.results;
        } catch (err) {
            console.log(err)
        }
    },
}
</script>

<style>

</style>