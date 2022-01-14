<template>
  <div class="global-room">
      <div class="side-bar">
          <h3>Users</h3>
          <ul>
              <li v-for="(user, index) in users" :key="index">{{user.nome}}</li>
          </ul>
      </div>
      <div class="chat-area">
          <h1>JetChat</h1>
          <div class="text-area">
              <ul>
                  <li v-for="(msg, index) in listMessage" :key="index">{{msg.author}} : {{msg.text}}</li>
              </ul>
          </div>
          <div class="message-area">
              
              <input type="text" name="message" id="message" autocomplete="off" @keypress.enter="sendMessage">
              <i class="far fa-smile emoji"></i>
              <i class="far fa-paper-plane send" @click="sendMessage"></i>
          </div>
          
      </div>
  </div>
</template>

<script>

export default {
    name: 'GlobalRoom',
    
    data(){
        return{
            users :[],
            listMessage: []
        }
    },
    created(){
       this.$store.state.socket.on('listUsers', users=>{
           this.users = users;
       })
       this.$store.state.socket.on('updateUsers', users=>{
           this.users = users;
       })
       this.$store.state.socket.on('listMessages', messages =>{
           this.listMessage = messages;

       })
    },
    methods:{
        sendMessage(){
            let inputMsg = document.querySelector('#message');
            if(inputMsg.value != ''){
                this.$store.state.socket.emit('newMessage', inputMsg.value);
                inputMsg.value = '';
            }
        }
    }
}
</script>






<style lang="scss" scoped>
.global-room{
        display: flex;
        max-width: 1480px;
        background-color: red;
        height: 100vh;
        .side-bar{
            max-width: 400px;
            width: 100%;
            background-color: blue;
            color:white;
            text-align: center;
            h3{
                font-size: 34px;
                margin: 10px;
                text-transform: uppercase;
            }
        }
        .chat-area{
            flex: 1;
            background-color: white;
            text-transform: uppercase;
            color: blue;
            position:relative;
            text-align: center;

            h3{
                font-size: 34px;
                margin: 10px;
                text-transform: uppercase;
            }
            .text-area{
                height: calc(100% - 150px);
                width: 100%;
                ul{
                    overflow-y:auto;
                }
            }
            .message-area{
                width: 100%;
                position:absolute;
                bottom: 0;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                 #message{
                    width: 80%;
                    height: 30px;
                    border-radius: 10px;
                }
                .emoji, .send{
                    font-size: 30px;
                    cursor: pointer;
                   
                }
            }
           
            
        }
}
</style>
