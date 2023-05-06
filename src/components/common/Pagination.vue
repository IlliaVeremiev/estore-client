<template>
    <ul class="d-flex justify-content-center pagination">
        <li class="page-item mx-0 mx-sm-2" :class="{ 'disabled': modelValue <= 1 }">
            <span @click.prevent="setPage(modelValue - 1)" class="page-link"><i class="bi bi-arrow-left-short"></i></span>
        </li>
        <li v-for="page in pages" :key="page" class="page-item mx-0 mx-sm-2" :class="{ 'active': page === modelValue }">
            <button href="#" @click.prevent="setPage(page)" class="page-link">{{ page }}</button>
        </li>
        <li class="page-item mx-0 mx-sm-2" :class="{ 'disabled': modelValue >= total }">
            <span href="#" @click.prevent="setPage(modelValue + 1)" class="page-link"><i
                    class="bi bi-arrow-right-short"></i></span>
        </li>
    </ul>
</template>

<script>
export default {
    emits: ['update:modelValue'],
    props: {
        modelValue: Number,
        total: {
            type: Number,
            default: 0
        }
    },
    methods: {
        setPage(page) {
            this.$emit("update:modelValue", page);
        }
    },
    computed: {
        pages() {
            let start = this.modelValue - 2
            if (start < 1) {
                start = 1
            }
            const response = []
            if (start !== 1) {
                response.push(1)
            }
            for (let page = start; page < start + 5; page++) {
                if (page > this.total) {
                    break
                }
                response.push(page)
            }
            if (response[response.length - 1] < this.total) {
                response.push(this.total);
            }
            return response
        }
    }
};
</script>

<style scoped>
li {
    margin-right: 10px;
}

.pagination .page-item .page-link {
    border-radius: 50rem !important;
    margin-left: 0.25rem;
    line-height: 1;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6;
}

.page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
}

.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
</style>