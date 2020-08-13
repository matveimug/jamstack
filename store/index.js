export const state = () => ({
  posts: []
})

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  }
}

export const actions = {
  //this will be asynchronous
  async getPosts({
                   state,
                   commit
                 }) {
    //the first thing we’ll do is check if there’s any length to the posts array in state, which means we already called the API, so don’t do it again.
    if (state.posts.length) return
    try {
      let posts = await fetch( `https://workshop.hertta.ee//wp-json/wp/v2/posts`
      ).then(res => res.json())
      posts = posts
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }))
      commit("updatePosts", posts)
    } catch (err) {
      console.log(err)
    }
  }
}
