<template>
    <div v-if="categoryId !== null" class="category-path">
        <span class="d-none flex-wrap d-md-flex">
            <a href="#" @click.prevent="$emit('update:modelValue', null)"><i class="bi bi-house"></i></a>
            <span v-for="cat in categoriesChain" :key="cat.id" class="text-nowrap">
                <i class="bi bi-caret-right mx-md-3 mx-3 text-secondary"></i>
                <span v-if="cat.last && !includeLast">{{ cat.name }}</span>
                <a v-else href="#" @click.prevent="$emit('update:modelValue', cat.id)">{{ cat.name }}</a>
            </span>
        </span>
        <span class="d-md-none flex-wrap d-flex">
            <i class="bi bi-caret-left mx-md-3 me-2 text-secondary"></i>
            <template v-if="includeLast">
                <a href="#" @click.prevent="$emit('update:modelValue', category.id)">{{ category.name }}</a>
            </template>
            <template v-else>
                <a v-if="parent" href="#" @click.prevent="$emit('update:modelValue', parent.id)">{{ parent.name }}</a>
                <a v-else href="#" @click.prevent="$emit('update:modelValue', null)">
                    <i class="bi bi-house"></i>
                </a>
            </template>
        </span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    emits: ['update:modelValue'],
    props: {
        modelValue: Number,
        categoryId: Number,
        includeLast: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters(['categories']),
        categoriesChain() {
            const chain = [];
            let category = this.categories.find(cat => cat.id === this.categoryId);
            while (category) {
                chain.push(category);
                category = this.categories.find(cat => cat.id === category.parentId);
            }
            if (chain.length > 0) {
                chain[chain.length - 1].last = true;
            }
            return chain.reverse();
        },
        category() {
            return this.categories.find(cat => cat.id === this.categoryId);
        },
        parent() {
            const category = this.categories.find(cat => cat.id === this.categoryId);
            if (category && category.parentId) {
                return this.categories.find(cat => cat.id === category.parentId);
            }
            return null;
        }
    }
}
</script>

<style></style>