<template>

    <form :v-if="join" action="" @submit="handleForm">
        <div class="logo">
            <img src="../assets/logo1.png" alt="" width="512" height="512">
            <h1>JetChat</h1>
        </div>
        
         <input type="text" name="name" id="name" placeholder="informe seu nome:">
         <input type="password" name="password" id="password" placeholder="informe sua senha:">
         <input type="submit" value="Enviar" id="btn-enviar">
         
    </form>
   

</template>

<script>
const io = require('socket.io-client')

export default {
    name: 'formulario',
    data() {
        return {
            image: './src/assets/logo1.png',
            join: false,
        }
    },
    methods:{
       handleForm(e){
           e.preventDefault();
           let name = document.getElementById('name');
           let password = document.getElementById('password'); 
           if(name != '' && password != ''){
               alert("Po faz o bagulho direito ai o paunocu")
           }
           e.preventDefault();
           this.join = true;
       }
    },
    emits: ['handleForm']
}
</script>

<style lang="scss">
form{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40vh;
    justify-content: space-evenly;
    width: 100%;
    background-color: rgb(9, 9, 43);
    border-radius: 30px;
    .logo{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 50%;
        img{
            width: 30px;
            height: 30px;
        }
    }
    input{
        width: 80%;
        height: 30px;
        outline: 0;
        border: 0;
        border-width: 0px;
        background-color: rgb(9, 9, 43);
        color: white;
        border-bottom: 1px solid white;
        position: relative;
        &:hover::placeholder{
            position: absolute;
            text-align: center;
            

        }

    }
    input[type="submit"]{
        border-radius: 3px;
        cursor: pointer;
        
     }
    input[type="submit"]:hover{
       transition: 1s;
       background: linear-gradient(146deg, rgba(4,16,139,1) 18%, rgba(55,63,152,1) 77%, rgba(140,16,193,1) 100%); ;
       
    }
   
   
}
  
   
</style>