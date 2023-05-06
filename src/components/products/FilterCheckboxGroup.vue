<template>
    <div>
        <div>
            <span class="link-button spoiler-button" :id="name + 'AccordionHeader'" data-bs-toggle="collapse"
                :data-bs-target="'#' + name + 'AccordionBody'" aria-expanded="true" :aria-controls="name + 'AccordionBody'">
                <slot />
            </span>
        </div>
        <div :id="name + 'AccordionBody'" class=" show" :aria-labelledby="name + 'AccordionHeader'">
            <ul>
                <template v-for="item in data" :key="item.id">
                    <li>
                        <div class="form-check list-item">
                            <input type="checkbox" class="form-check-input" :checked="modelValue.includes(item.id)"
                                @change="setItem(item.id, $event.target.checked)" aria-label="***"
                                :id="name + '-' + item.id">
                            <label class="form-check-label w-100" :for="name + '-' + item.id">
                                {{ item.name }}
                            </label>
                            <span class="text-secondary pe-2" v-if="!modelValue.includes(item.id)">
                                <span v-if="modelValue.length > 0">+</span>
                                <span>{{ item.count }}</span>
                            </span>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        modelValue: {
            type: Array
        }
    },
    emits: ['update:modelValue'],
    methods: {
        setItem(uid, selected) {
            let items = this.modelValue;
            if (selected) {
                items = [...items, uid];
            } else {
                items = items.filter(i => i !== uid);
            }
            this.$emit('update:modelValue', items);
        }
    }
}
</script>

<style lang="scss">
.spoiler-button {
    display: flex;
    align-items: center;

    &::after {
        width: 1.25rem;
        height: 1.25rem;
        margin-left: auto;
        content: "";
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
        transition: transform .2s ease-in-out;
        margin-right: 8px;
    }

    &:not(.collapsed)::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
        transform: rotate(-180deg);
    }
}

.form-check-input {
    box-shadow: none !important;
    border-color: #00a046 !important;
}

.form-check-input:checked {
    background-color: #00a046;
    border-color: #00a046;
}

.form-check-input:hover {
    border-color: black !important;
}

.list-item {
    border-radius: 4px;
    cursor: pointer;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 32px;
    display: flex;

    &>label {
        padding-left: 8px;
        font-family: BlinkMacSystemFont, -apple-system, Arial, "Segoe UI", Roboto, Helvetica, sans-serif;
    }

    &>* {
        cursor: pointer;
    }
}

.list-item:hover {
    background-color: #f4faf6;
    text-decoration: none;
    color: #333;
}

ul {
    margin: 0;
    padding: 0;
}

li {
    list-style-type: none;
}
</style>