<template>

    <form v-if="!join" action="" @submit="handleForm">
        <div class="logo">
            <img src="../assets/logo1.png" alt="" width="512" height="512">
            <h1>JetChat</h1>
        </div>
        
         <input type="text" name="name" id="name" placeholder="informe seu nome:">
         <input type="password" name="password" id="password" placeholder="informe sua senha:">
         <input type="submit" value="Enviar" id="btn-enviar" @click="submit">
         
    </form>
    <div class="chat" v-if="join">
        <ul class="text-area">
            <li v-for="(item, index) in listMessages" :key="index">{{user}} :{{item.text}}</li>
        </ul>
        <input type="text" name="message" id="message" @keypress.enter="sendMessage">
    </div>
   

</template>

<script>
import io from "socket.io-client";

export default {
    name: 'formulario',
    data() {
        return {
            join: false,
            user: "",
            message: "",
            listMessages: []
        }
    },
    methods:{
       submit(e){
           e.preventDefault();
            let name = document.querySelector("#name");
            let password = document.querySelector("#password");
            if(name.value != '' && password.value != ''){
                name = name.value.trim();
                password = password.value.trim();
                this.user = name;
                this.join = true;
                this.socketInstance = io("http://localhost:3000");
                this.socketInstance.on('sendMessage', msg =>{
                this.listMessages.push(msg);
            })
                this.socketInstance.emit('login', (name, password));
           }
           
       },
       sendMessage(){
           let inputMsg = document.querySelector("#message");
           if(inputMsg.value != ''){
               let msg = {
                   id: new Date().getTime(),
                   text: inputMsg.value.trim(),
                   user: this.user,
                   
               }
               this.socketInstance.emit('message', msg)
               inputMsg.value = '';
           }
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
.chat{
    ul,li{
        text-decoration: none;
        list-style-type: none;
        margin: 5px;
        color: white;
    }
}
  
   
</style>