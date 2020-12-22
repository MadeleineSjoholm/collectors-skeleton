<template>
  <div>

    <div class="infoButtonn" id="infoo">
        <router-link :to="{ name: 'Home', params: {} }"><img src="/images/pil.png" width= "60" ></router-link>
        Back to homepage
    </div>

  </div>

  </template>

  <script>
  // @ is an alias to /src


  export default {
    name: 'Rules',

  }
  </script>
  <style>

  .infoButtonn{
    margin-top: 15px;
    margin-left: 15px;


  }
  #infoo{

  }




  </style>
