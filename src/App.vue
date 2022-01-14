<template>
  <Login v-if="login" @submit="novoUsuario" />
  <JetChat v-else />
  
  
</template>

<script>
import Login from './components/Login.vue';
import JetChat from  './components/JetChat.vue';


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
    this.$store.state.socket.on('alreadyExist', user=>{
      alert('Este usuario ja existe' + user.nome);
      this.login = true;
    })
  },
  methods:{
       novoUsuario(e){
      e.preventDefault();
      let nome = document.querySelector("input#nome").value.trim();
      if(nome != '' ){
        let user = {
          nome: nome,
          id: this.$store.state.socket.id
        }
        this.login = !this.login;
        this.user = user;
        this.$store.state.socket.emit('newUser', user)
        
        
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