<template>
    <div>
        {{ data.msg }}
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
const About  = defineComponent({
    props: {

    },
    setup() {
        const data = reactive({
            msg: 'about'
        });
        return {
            data
        }
    },
})

export default About;
</script>
<style lang="scss" scoped>

</style>