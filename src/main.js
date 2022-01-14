import App from './App';
import { createApp } from 'vue';
import { createStore } from 'vuex';
import io from 'socket.io-client';
const socket = io("http://localhost:3000");


const store = createStore({
  state () {
    return {
      socket
    }
  },
  
})


const app = createApp(App);

app.use(store);
app.mount('#app');