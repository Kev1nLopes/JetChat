<template>
  <Login v-show="login" @newUser="novoUsuario()"/>
</template>

<script>
import Login from './components/Login.vue';
export default {
  name: 'App',
  components:{
    Login,
  },
  data(){

    return{
      login: true,
    }
  },
  methods:{
    novoUsuario(e){
      e.preventDefault();
      console.log("aaaa")
      this.login = !this.login
    }
  }
}
</script>

<style>
  *{
    margin:0;
    padding: 0;
  }
</style>