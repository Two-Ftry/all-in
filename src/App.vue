<template>
    <div>
        <div>
            <button @click="handleGo('list')">list</button>
            <button @click="handleGo('detail')">detail</button>
            <button @click="handleGo('edit')">edit</button>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {}
        },
        methods: {
            handleGo (pathname) {
                this.$router.push({ path: pathname });
            }
        }
    }
</script>
<style scoped>

</style>
