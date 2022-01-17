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
        <div class="rooms-area">
            <h1>JetChat</h1>       
            <div class="create-room" @click="handleModal" >
                Criar Sala <i class="fas fa-door-open"></i>
            </div>  
            <h3>Online:</h3>
            <ul class="listOnline">
                <li v-for="(item, index) in users" :key="index">{{item.nome}}</li>
            </ul>     
             
            
        </div>
        <div class="text-area">
            <h1>BATE PAPO UOL</h1>
            <div v-if="main" class="out-room">Sair da sala</div>
                <ul v-if="!main" class="listMessages">
                    <li  class="msg" v-for="(item, index) in listMessages" :key="index" >{{item.author}} :  {{item.text}}  
                        <i class="fas fa-chevron-down" @click="item.msgMenu = !item.msgMenu"></i>
                        <ul v-if="item.msgMenu" class="msg-menu">
                            <li @click="delMsg(item)" class="delMsg">Excluir mensagem</li>
                            <li @click="inviteGroup"></li>
                            <li @click="privateMessage(item.author, index)">Mensagem Privada</li>
                            <li>Responder</li>
                        </ul>
                    </li>
                </ul>
                <ul v-else class="roomListMessages">
                    <li class="msg" v-for="(item, index) in roomListMessages" :key="index">{{item.author}} : {{item.text}}
                        <ul v-if="item.msgMenu" class="msg-menu">
                            <li @click="delMsg(item)" class="delMsg">Excluir mensagem</li>
                            <li @click="privateMessage(item.author, index)">Mensagem Privada</li>
                            <li>Responder</li>
                        </ul>
                    </li>
                </ul>
                
            <div class="message-area">
            <input type="text" name="message" id="message" @keyup.enter="sendMessage" placeholder="Digite uma mensagem" autocomplete="off">
            <audio src="../assets/message.mp3"></audio>
            <div class="emojis">
                <i class="far fa-smile" @click="showEmojiList"></i>
                <div class="emojiList" v-if="showEmoji">
                    <ul class="listEmojis">
                        <li v-for="(item, index) in emojiList" :key="index" @click="emoji(item)"> {{item}} </li>
                        
                    </ul>
                </div>
            </div>
            </div>
        </div>
        
        
    </div>
    <div class="blur" v-if="showModal"></div>
        <div class="modal" v-if="showModal">
            
            <div class="modal-select">
                
                <div class="criar-sala">Criar Sala</div>
                <i class="fas fa-times-circle" @click="handleModal"></i>
            </div>
            <div class="modal-content">
                <div class="criar-content">
                     <input type="text" name="room" id="room" placeholder="Informe o nome da sala">
                    <button @click="createRoom">Criar</button>
                </div>
                
            </div>
           
        </div>
    
   

</template>

<script>
import io from 'socket.io-client';
const socket = io('http://149.28.53.210:3000');
let c = (el)=>document.querySelector(el);
let cs = (el)=>document.querySelectorAll(el);

export default{
    data(){
        return{
            user: "",
            users: [],
            listMessages: [],
            roomListMessages: [],
            join: false,
            showModal: false,
            rooms: [],
            showEmoji: false,
            emojiList: ['😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😊', '😋', '😌', '😍', '😏', '😒', '😓', '😔', '😖', '😘', '😚', '😜', '😝', '😞', '😠', '😡', '😢', '😣', '😤', '😥', '😨', '😩', '😪',  '😫',  '😭',  '😰',  '😱',  '😲',  '😳',  '😵',  '😷',  '😸',  '😹',  '😺',  '😻',  '🙅',  '🙆',  '🙈',  '🙉',  '🙊',  '🙌',  '🙏',  '✊'  ],
            main: false
        }
    },
    created(){
        
        socket.on('alertMessage', msg =>{
            alert(msg.author + ' Enviou uma mensagem');
            if(msg.text[0] == "*"){
                msg.text = msg.text.slice(1, msg.text.length);
                alert("mensagem importante, n consgui emitir o som");
                this.listMessages.push(msg);
                c("audio").play();
            }else{
                this.listMessages.push(msg);
            }   
            
        })
        socket.on('showMessage', msg =>{
            
                this.listMessages.push(msg);
            
            
        });
        socket.on('messageLogin', n =>{
            let li = document.createElement('li');
            li.textContent = `${n.nome} Entrou`
            c('.listMessages').appendChild(li);
            setTimeout(()=>{
                li.style.display = 'none';
            }, 5000)
        })
        socket.on('messageDisconnect', u =>{
            let li = document.createElement('li');
            li.textContent = `${u.nome} Saiu`;
            c('.text-area ul').appendChild(li);
            setTimeout(()=>{
                li.style.display = 'none';
            }, 5000)
        })
       
    },
    mounted(){
        socket.on('newUser', users =>{
            this.users = users;
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
                msgMenu: false

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
        },
        showMsgMenu(e){
            let ul = document.createElement('ul');
            e.target.appendChild()
            this.msgMenu = !this.msgMenu;
        },
        delMsg(msg){
            this.listMessages = this.listMessages.filter(item => item.text != msg.text);
            console.log(this.listMessages)
        },
        showEmojiList(){
            this.showEmoji = !this.showEmoji;
        },
        emoji(emoji){
            c('#message').value += emoji
        },
        privateMessage(author){
            let a = this.users.filter(item => item.nome == author);
            /*Quando clicar em mensagem privada, abrir um modal com um input
            nome da pessoa que ele deseja enviar a mensagem
            Dar um socket broadcast.to(id).emit(msg);
            e fechou xesquedele*/
            socket.emit('privateMessage', a);
        }
        

    }

}

</script>

<style lang="scss" scoped>
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
    height: calc(100vh) ;
    width: 100%;
    .rooms-area{
        width: 300px;
        background-color: rgb(23, 36, 0);
        margin: 0px;
        color: white;
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
        h3{
            margin: 5px 10px;
            text-align:start;
        }

    }
    .text-area{
        background: rgb(214, 174, 114);
        position: relative;
        margin: 0px;
        min-width: 250px;
        flex: 1;
        ul.listMessages{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            position: absolute;
            width: 100%;
            top: 44px;
            bottom: 50px;
                .msg{
                padding: 5px 30px 5px 10px;
                display: inline-block;
                background-color: rgb(158, 158, 158);
                border: 1px solid rgb(212, 211, 211);
                position: relative;
                i{
                    position:   absolute;
                    right: 0;
                    top: 7px;
                    right: 5px;
                }
                .msg-menu{
                width: 180px;
                position: absolute;
                background-color: rgb(212, 211, 211);
                border-radius: 5px;
                top: -110px;
                right: -150px;
                display: flex;
                flex-direction: column;
                align-items: center;
                li{
                    border-bottom: 1px solid green;
                    bottom: 0;
                    width: 80%;
                }
                .delMsg{
                    cursor: pointer;
                }
            }
            
            }
            
        }
        
        
        .message-area{
            position: absolute;
            bottom: 3px;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
            height: 40px;

            
            input{
                background-color: rgba($color: #0000, $alpha: 1.0);
                height: inherit;
                width: 90%;
                color: white;
                border-radius: 5px;
            } 
            
            .emojis{
                position: relative;
                i.far.fa-smile{
                    font-size: 40px;
                    color: rgba($color: #0000, $alpha: 1.0);
                }
                .emojiList{
                    position: absolute;
                    max-width: 300px;
                    min-width: 250px;
                    width: 100%;
                    height: 200px;
                    border-radius: 10px;
                    left: -200px;
                    bottom: 50px;
                    background-color: white;
                    overflow-y: scroll ;
                    ul.listEmojis{
                        width: inherit;
                        top: 0;
                        
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(30px, 50px));
                        grid-template-rows: 30px;
                        overflow-y: hidden;
                        li{
                            margin: 0px;
                            &:hover{
                                background-color: #ccc;
                                cursor: pointer;
                            }
                        }
                    }
                    
                    
                    
                }
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
.blur {
  backdrop-filter: blur(8px); 
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
    .criar-content{
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
    }
}
  
   
</style>