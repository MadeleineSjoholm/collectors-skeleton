<template>
  <div>

    <div class="infoButtonn" id="infoo">
        <router-link :to="{ name: 'Home', params: {} }"><img src="/images/pil.png" width= "60" ></router-link> Back to homepage




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
    position: absolute;
    margin-top: 15px;
    margin-left: 15px;

  }
  #infoo{
    width: 50px;
  }




  </style>
