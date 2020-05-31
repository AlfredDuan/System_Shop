<template>
    <div class='axios_container'>
        {{info}}
    </div>
</template>

<script>
    export default {

        data(){
            return {
                info:null
            }
        },
        mounted(){
            axios.get("https://www.runoob.com/try/ajax/json_demo.json").then(response => (this.info = response)).catch(function(){
                console.log(error);
            })
        }
     
    };
</script>

<style lang='less' scoped> 


</style>
