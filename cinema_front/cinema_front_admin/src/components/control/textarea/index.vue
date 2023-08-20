<template>
    <div class="relative" :style="[styleWidth]">
        <el-input type="textarea" :rows="rows" :show-word-limit="limit" v-model="val" :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled" @input="inputEnter" />
    </div>
</template>

<script>
import { props, mixin } from "../basis";
export default {
    name: "TextareaComponent",
    props: {
        ...props,
        value: {
            type: [String, Number],
            default: ""
        },
        limit: {
            type: Boolean,
            default: true
        },
        rows: {
            type: Number,
            default: 6
        },
    },
    mixins: [mixin],
    data(){
        return {
            val: "",
        }
    },
    watch: {
        value: {
            handler(newValue) {
                this.val = newValue
            },
            immediate: true
        } ,
        'config.value_type': {
            handler(value) {
                if(['password', 'passwords'].includes(value)) {
                    this.type = 'password'
                }
            },
            immediate: true
        }
    },
    computed: {
        eye(){
            return this.type === 'password' ? 'icon-eye-close' : 'icon-browse'
        },
        
    },
    methods: {
        inputEnter(){
            this.$emit("update:value", this.val)
        },
    }
}
</script>

<style lang="scss" scoped>
</style>