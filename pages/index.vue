<template>
  <div>
    <h1>Blog posts</h1>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="20" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <p>
        Error while fetching posts: {{ error }}
      </p>
    </template>
    <template v-else>
      <ul>
        <li v-for="post of posts" :key="post.id">
          <n-link :to="`/posts/${post.id}`">
            {{ post.title.rendered }}
          </n-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.posts = await this.$http.$get('https://workshop.hertta.ee//wp-json/wp/v2/posts')
      .then(posts => posts.slice(0, 20))
  },
  data () {
    return {
      posts: null
    }
  }
}
</script>
