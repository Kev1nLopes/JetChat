<template>
  <div class="main">
      
     <chat/>
  </div>
 
</template>

<script>
import chat from './components/chat.vue'

export default {
  name: 'App',
  components: {
    chat
  },
  data(){
    return {

      }
  },
  methods: {
    enviarDados(e){
        e.preventDefault();
        alert("Oi")
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  body{
      background: rgb(4,16,139);
      background: linear-gradient(146deg, rgba(4,16,139,1) 18%, rgba(55,63,152,1) 77%, rgba(140,16,193,1) 100%); 
       #app {
        width: 100%;
        height: 100vh;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: 0;
        padding: 0;
        .main{
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

   
  }
  }
 
}
}

</style>
