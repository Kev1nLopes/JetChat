<template>
  <div class="login-form">
    <form method="POST" action="" >
      <div class="menu">
        <img src="../assets/img/logo1.png" alt="jetimob-logo">
        <h3>JetChat</h3>
      </div>
      <input type="text" name="nome" id="nome" placeholder="Informe seu nome">
      <button @click="$emit('newUser')">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  emits: ['newUser'],
  data(){
    return{
     
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-form{
    height: 100vh;
    width: 100%;
    background: rgb(30,16,255);
    background: linear-gradient(104deg, rgba(30,16,255,1) 0%, rgba(92,47,194,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    
    form{
      max-width: 400px;
      width: 100%;
      height: 200px;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      border-radius: 20px;
      .menu{
        display: flex;
        align-items: center;
        font-size: 32px;
        img{
          width: 50px;
          height: 50px;
        }
      }
      input{
        height: 30px;
        border: none;
        border-bottom: 1px solid #000;
        outline: none;
      }
      input::placeholder{
        padding-left: 5px;
      }
    }

  }
</style>>
  
