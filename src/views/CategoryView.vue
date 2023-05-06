<template>
    <div class="page">
        <div class="container">
            <category-path-component class="my-2" :categoryId="category?.id"
                @update:modelValue="id => $router.push({ name: 'category', params: { uid: categories.find(cat => cat.id === id)?.uid } })" />
            <br>
            <ul class="row">
                <template v-for="childCategory in childCategories" :key="childCategory.id">
                    <li class="col-xxl-2 col-xl-3 col-md-4 col-sm-6 col-12 d-flex flex-column align-items-center">
                        <img :src="childCategory.image?.path" alt="" width="250">
                        <div>
                            <a href="#"
                                @click.prevent="$router.push({ name: 'category', params: { uid: childCategory.uid } })">{{
                                    childCategory.name }}</a>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CategoryPathComponent from '@/components/products/CategoryPathComponent.vue';

export default {
    components: {
        CategoryPathComponent
    },
    computed: {
        ...mapGetters(['categories']),
        categoryUid() {
            return this.$route.params.uid
        },
        category() {
            return this.categories.find(cat => cat.uid === this.categoryUid)
        },
        childCategories() {
            const id = this.category?.id ?? null
            return this.categories.filter(cat => cat.parentId === id)
        },
        categoriesChain() {
            const chain = []
            let category = this.category
            while (category) {
                chain.push(category)
                category = this.categories.find(cat => cat.id === category.parentId)
            }
            return chain
        }
    },
    watch: {
        category: {
            immediate: true,
            handler(category) {
                if (category == null) return;
                if (!category.folder) {
                    this.$router.replace({ name: 'products', query: { category: category.id } })
                }
            }
        }
    }
}
</script>

<style></style>