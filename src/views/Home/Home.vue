<template>
    <div class="home text-center">
        <header v-pin:[data.direction]="data.pinPadding" style="width: 100%; text-align: center" class="max640">
        <p>
            Stick me
            <span class="text-color">{{ data.pinPadding }}</span>
            px from the {{ data.direction }} of the page
        </p>
        </header>

        <p class="mg20 text-color">{{ data.time }}</p>

        <img alt="Vue logo" src="@/assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        <p class="mg10 text-color">以下是自定义全局组件</p>
        <div class="mg-b20">
        <YuiButton @click="handleClick()">自定义全局按钮</YuiButton>
        </div>
        <div class="mg-b20">
        <YuiSelect></YuiSelect>
        </div>
        <div class="mg-b20 flex flex-center">
        自定义指令：
        <input type="range" min="0" max="500" v-model="data.pinPadding" style="z-index: 9" />
        </div>
        <Button type="success" @click="showToast">更改字体颜色</Button>
    </div>
</template>
<script lang="ts">
import dayjs from 'dayjs';
import { Button, Dialog, Toast } from 'vant';
import { defineComponent, reactive, onMounted, onBeforeUnmount } from 'vue';
import HelloWorld from "@/components/HelloWorld.vue";
interface Task {
    name: String,
    run(arg: any):void;
}
class MyTask implements Task {
    name: String;
    constructor(name: String) {
        this.name = name;
    }
    run(arg:any):void {
        console.log(`running: ${this.name}, arg: ${arg}`)
        console.log(this)
    }
}

let myTask: Task = new MyTask('someTask');

myTask.run('test');

export default defineComponent({
    props: {

    },
    components: {
        HelloWorld,
        Button,
    },
    setup() {
        const data = reactive({
            direction: "top",
            pinPadding: 0,
            time: "",
            timer: 0,
            color: "red",
            city: ["", "", ""],
        });
        const showToast = () => {
            Toast('字体颜色已改蓝色');
            data.color = "blue";
        };
        const handleClick = () => {
            Dialog({
                title: "标题",
                message: "这是一个全局按钮组件",
            });
        };
        const initTime = () => {
            data.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
            data.timer = setInterval(() => {
                data.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
            }, 1000);
        };

        onMounted(() => {
            initTime();
        });

        onBeforeUnmount(() => {
            clearInterval(data.timer);
        });

        return {
            data,
            showToast,
            initTime,
            handleClick
        }
    },
})
</script>
<style>
.text-color {
    color: v-bind(color);
}
</style>