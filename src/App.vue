<template>
  <Login v-show="login" @submit="novoUsuario"/>
</template>

<script>
import Login from './components/Login.vue';
import { io } from "socket.io-client";
const socket = io('http://localhost:3000');


export default {
  name: 'App',
  components:{
    Login,
  },
  data(){

    return{
      login: true,
      user: ''
    }
  },
  methods:{
    novoUsuario(e){
      e.preventDefault();
      this.login = !this.login;
      let nome = document.querySelector("input#nome");
      if(nome.value != ''){
        let user = {
          nome: nome.value.trim(),
          id: socket.id,
        }
        this.user = user;
        socket.emit('newUser', user);
        
      }
      

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