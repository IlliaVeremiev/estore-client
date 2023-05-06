<template>
    <label :for="id" class="form-label">{{ title }}</label>
    <input class="form-control" :list="id + 'Options'" :id="id" :placeholder="placeholder"
        @keyup="$emit('changed', $event.target.value)">
    {{ options }}
    <datalist :id="id + 'Options'">
        <template v-for="option in options" :key="option.id">
            <option :value="option.name"></option>
        </template>
    </datalist>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        placeholder: String,
        options: Array,
        title: String
    }
}
</script>

<style></style>