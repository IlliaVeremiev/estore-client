<template>
    <div>
        <div class="d-flex align-items-baseline my-2">
            <input type="number" class="form-control form-control-sm mx-1" v-model.number="modelValue[0]" :min="min"
                :max="max">
            —
            <input type="number" class="form-control form-control-sm mx-1" v-model.number="modelValue[1]" :min="min"
                :max="max">
            <button class="btn btn-light btn-sm mx-3" @click="$emit('update:modelValue', modelValue)">OK</button>
        </div>
        <div class="px-2 py-3 pe-3">
            <slider :value="modelValue" @change="value => $emit('update:modelValue', value)" :min="min" :max="max"
                showTooltip="drag" />
        </div>
    </div>
</template>

<script>
import Slider from '@vueform/slider'

export default {
    components: {
        Slider
    },
    props: {
        modelValue: {
            type: Array
        },
        min: Number,
        max: Number,
        id: String
    },
    emits: ['update:modelValue'],

}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>