<template>
    <div class="rooms">
            <GlobalRoom v-if="room" />
            <UserRoom v-else />
    </div>

</template>

<script>

import GlobalRoom from './chat/GlobalRoom.vue';
export default {
    name: 'JetChat',
   
    components:{
        GlobalRoom
    },
    data(){
        return{
            room:true,
        }
    },

}
</script>

<style lang="scss">
</style>