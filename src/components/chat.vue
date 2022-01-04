<template>

    <form v-if="!join" action="" @submit="handleForm">
        <div class="logo">
            <img src="../assets/logo1.png" alt="" width="512" height="512">
            <h1>JetChat</h1>
        </div>
        
         <input type="text" name="name" id="name" placeholder="informe seu nome:" autocomplete="off">
         <input type="password" name="password" id="password" placeholder="informe sua senha:" autocomplete="off">
         <input type="submit" value="Enviar" id="btn-enviar" @click="submit">
         
    </form>
    <div class="chat" v-if="join">
        <ul class="text-area">
            <h1>BATE PAPO UOL</h1>

                <li v-for="(item, index) in listMessages" :key="index">{{item.author}} : {{item.text}}  </li>
            <div class="message-area">
            <input type="text" name="message" id="message" @keyup.enter="sendMessage" placeholder="Digite uma mensagem">
            </div>
        </ul>
        
        
    </div>
   

</template>

<script>
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
let c = (el)=>document.querySelector(el);
let cs = (el)=>document.querySelectorAll(el);

export default{
    data(){
        return{
            user: "",
            users: [],
            listMessages: [],
            join: false,
            sidebar: false,
        }
    },
    created(){
        socket.on('alertMessage', msg =>{
            alert(msg.author + ' Enviou uma mensagem');
            this.listMessages.push(msg);
        })
        socket.on('showMessage', msg =>{
            this.listMessages.push(msg);
        })
    },
    methods:{
        submit(e){
            e.preventDefault();
            let nome = c('#name');
            let senha = c('#password');
            if(nome.value != '' && senha.value !=''){
                let user = {
                    nome: nome.value.trim(),
                    senha: senha.value.trim(),
                    id: socket.id
                }
            this.user = user.nome;
            this.users.push(user);
            socket.emit('userLogin', user);
            this.join = true;
         }
        },
        sendMessage(){
           let inputMsg = c('#message');
           
           if(inputMsg.value){
            let msg = {
                author: this.user,
                text: inputMsg.value,
            }
            socket.emit('newMessage', msg);
            inputMsg.value = '';
            //Broadcast emit, para emitir uma notificacao de nova mensagem para outros usuarios e n para mim
            
        }



        }

    }

}

</script>

<style lang="scss">
form{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40vh;
    justify-content: space-evenly;
    max-width: 500px;
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
       background: linear-gradient(146deg, rgba(4,16,139,1) 18%, rgba(55,63,152,1) 77%, rgba(140,16,193,1) 100%);
       
    } 
}
.chat{
    display: flex;
    height: 100vh;
    width: 100%;
    .rooms-area{
        width: 300px;
        background-color: red;
        margin: 0px

    }
    .text-area{
        background-color: blue;
        position: relative;
        margin: 0px;
        flex: 1;
        
        .message-area{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 30px;
            input{
                background-color: rgba($color: #0000, $alpha: 1.0);
                height: inherit;
                width: 90%;
            
            } 
            
        }
    }
    ul,li{
        text-decoration: none;
        list-style-type: none;
        margin: 5px;
        color: white;
    }
}
  
   
</style>