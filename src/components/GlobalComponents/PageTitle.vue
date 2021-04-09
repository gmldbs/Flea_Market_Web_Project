<template>
  <div class="section-heading section-gap page-title">
    <div class="bg-after"></div>
    <div class="text-center section-title-content">
      <div class="container">
        <h1 class="mb-3 text-white">{{headerTitle}}</h1>
        <p class="lead text-white">{{headerSubTitle}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["headerTitle", "headerSubTitle"]
};
</script>
<style>
.page-title {
  background: url("/static/img/flea-market.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>