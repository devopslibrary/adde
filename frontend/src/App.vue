<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
* {
  margin: 0;
  box-sizing: border-box;
  padding: 0;
  border: 0;
}
h1,
h2 {
  text-decoration: none;
  font-family: $font-stack;
  font-weight: 100;
}
li,
a,
p,
button {
  /* font-weight: 500; */
  font-size: 16px;
  text-decoration: none;
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
