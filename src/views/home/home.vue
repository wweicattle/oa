<template>
    <div>
        这是主页你懂的
    <button @click="goout">退出</button>
    </div>
</template>
<script>
export default {
name:'App',
methods:{
    goout(){
        window.localStorage.removeItem("oa_token");
        this.$router.replace("/login");
    }
}
}
</script>
<style  scoped>
</style>