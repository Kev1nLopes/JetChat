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
        <ul class="rooms-area">
            <h1>JetChat</h1>       
            <div class="create-room" @click="handleModal" >
                Salas <i class="fas fa-door-open"></i>
            </div>  
            <ul class="listOnline">
                <li v-for="(item, index) in users" :key="index">{{item.nome}}</li>
            </ul>     
             
            
        </ul>
        <div class="text-area">
            <h1>BATE PAPO UOL</h1>
                <ul>
                    <li v-for="(item, index) in listMessages" :key="index">{{item.author}} : {{item.text}}  </li>
                </ul>
                
            <div class="message-area">
            <input type="text" name="message" id="message" @keyup.enter="sendMessage" placeholder="Digite uma mensagem">
            </div>
        </div>
        
        
    </div>
    <div class="blur" v-if="showModal"></div>
        <div class="modal" v-if="showModal">
            
            <div class="modal-select">
                
                <div class="criar-sala" @click="option = false">Criar</div>
                <div class="buscar-sala" @click="option = true">Buscar</div>
                <i class="fas fa-times-circle" @click="handleModal"></i>
            </div>
            <div class="modal-content">
                <div class="criar-content" v-if="!option">
                     <input type="text" name="room" id="room" placeholder="Informe o nome da sala">
                    <button @click="createRoom">Criar</button>
                </div>
                <div class="buscar-content" v-if="option">
                     <select name="rooms" id="">
                         <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                     </select>
                    <button @click="createRoom">Criar</button>
                </div>
                
            </div>
           
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
            showModal: false,
            rooms: [],
            option: false,
        }
    },
    created(){
        socket.on('alertMessage', msg =>{
            alert(msg.author + ' Enviou uma mensagem');
            this.listMessages.push(msg);
        })
        socket.on('showMessage', msg =>{
            this.listMessages.push(msg);
        });
        socket.on('messageLogin', n =>{
            let li = document.createElement('li');
            li.textContent = `${n.nome} Entrou`
            c('.text-area ul').appendChild(li);
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
        },
        createRoom(){
            let cRoom = c('#room');

            if(cRoom.value != ''){
                if(cRoom.value.length > 30){
                    alert('O nome da sala possui muitos caracteres')
                }else{
                    let room = {
                        creator: this.user,
                        roomName: cRoom.value,
                        creationDate: new Date().getTime()
                    }
                    socket.emit('create', room);
                    this.rooms.push(room.roomName);
                    this.handleModal();
                }
                 
            }
           

        },
        handleModal(){
            this.showModal = !this.showModal
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
        margin: 0px;
        .create-room{
            font-size: 18px;
            border-radius: 5px;
            border: 1px solid green;
            padding: 5px;
            &:hover{
                cursor: pointer;
                color: green;
            }
        }

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
                color: white;
            
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
.blur { // Make sure this color has an opacity of less than 1
  backdrop-filter: blur(8px); // This be the blur
  height: 100vh;
    width: 100%;
    position: absolute;
}
.modal{
    width: 300px;
    height: 180px;
    background-color: white;
    border-radius: 10px;
    font-size: 24px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .modal-select{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        position: relative;
        i.fas.fa-times-circle{
            position: absolute;
            top: -25px;
            right: 10px;
            cursor: pointer;
            &:hover{
                color: red;
            }
            
        }
        .criar-sala,
        .buscar-sala{
            cursor: pointer;
            width: 100%;
            &:hover{
                background-color: #ccc;
            }
        }
    }
    .criar-content,
    .buscar-content{
        display: flex; 
        max-width: 300px;
        width: 100%;
        flex-direction:column;
        align-items: center;
        input{
            max-width: 200px;
            width: 100%;
        }
        button{
            width: 60px;
            margin-top: 10px;
            background-color: green;
        }
        select{
            width: 100%;
        }
    }
}
  
   
</style>