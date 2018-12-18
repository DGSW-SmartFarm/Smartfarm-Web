<template>
  <div>
    {{movie}}
  </div>
</template>

<script>
export default {
  created: function () {
    this.$http.get(`http://localhost:3000/api/giveme/3`)
    // 갱신하고나서 불러옴
    this.$http.get(`/api/get`)
    .then((response) => {
      this.movie = response.data
    })
  },
  data: function () {
    return {
      movie: {}
    }
  }
}
</script>

<style lang="css">

</style>
