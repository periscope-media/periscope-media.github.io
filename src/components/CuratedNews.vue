<template><div class="curated-news">

  <div class="card">
    <div class="card-content" v-for="(newsResource, index) in newsResources" :key="index">
      <div class="media">
        <div class="media-left">
          <figure class="image is-200x200">
            <img :src="newsResource.image" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-1">{{ newsResource.title }}</p>
          <p class="subtitle is-2">{{ newsResource.description }}</p>
        </div>
      </div>

      <div class="content">
        <span>by</span> <a>@{{ newsResource.author }}</a>
        <span>via</span> <a :href="newsResource.url">{{ newsResource.url }}</a>
        <br>
        <span>published at</span> <time :datetime="getDate(newsResource.published)">{{ getPrettyDate(newsResource.published) }}</time>
        <span>found at</span> <time :datetime="getDate(newsResource.found)">{{ getPrettyDate(newsResource.found) }}</time>
      </div>
    </div>
  </div>

</div></template>

<script>
  // import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  export default {
    name: 'curated-news',
    props: ['newsResources'],
    // data () {
    //   return {
    //     busy: false
    //   }
    // },
    // computed: {
    //   ...mapGetters([
    //     // some state
    //   ])
    // },
    methods: {
      getDate (date) {
        return moment(date).format('YYYY-MM-DD')
      },
      getPrettyDate (date) {
        return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
      }
      // ...mapActions([
      //   // some action
      // ]),
      // async fetch () {
      //   this.busy = true
      //   await Promise.resolve()
      //   this.busy = false
      // }
    },
    // async created () {
    //   this.fetch()
    // },
    mounted () {
      console.log('* Mounted CuratedNews!')
    }
  }
</script>

<style scoped>
  .curated-news {

  }
</style>
