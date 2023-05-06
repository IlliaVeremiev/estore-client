<template>
    <div class="w-100">
        <input type="checkbox" class="form-check-input" :checked="modelValue || value"
            @change="change($event.target.checked)" :id="id" />
        <label class="form-check-label w-100" :for="id">
            <slot />
        </label>
    </div>
</template>

<script>
export default {
    emits: ['update:modelValue', 'changed'],
    props: {
        modelValue: Boolean,
        id: String,
        value: Boolean
    },
    methods: {
        change(value) {
            this.$emit('update:modelValue', value)
            this.$emit('changed', value)
        }
    }
}
</script>

<style></style>