<template>
  <Login v-if="login" @submit="novoUsuario" />
  <JetChat v-else />
  
</template>

<script>
import Login from './components/Login.vue';
import JetChat from  './components/JetChat.vue';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default {
  name: 'App',
  components:{
    Login,
    JetChat
  },
  data(){
    return{
      login: true,
      user: '',
      
      
    }
  },
  created(){
    socket.emit("teste", "bom dia");
  },
  methods:{
    novoUsuario(e){
      e.preventDefault();
      let nome = document.querySelector("input#nome");
      if(nome.value != ''){
        let user = {
          nome: nome.value.trim(),
          id: socket.id,
        }
        this.login = !this.login;
        this.user = user;
        socket.emit('newUser', user);
        
      }
      

    }
  }
}
</script>

<style lang="scss">
  body{
    margin:0px;
    padding: 0px;
  }
</style>