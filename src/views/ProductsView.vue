<template>
    <div class="page">

        <div class="container">

            <category-path-component class="my-2" :categoryId="selectedCategoryId" v-model="selectedCategoryId" />

            <div class="mb-4">
                <h3>{{ selectedCategory?.name }}</h3>
            </div>

            <div class="d-flex justify-content-between align-items-end mb-2">
                <span>{{ $t('catalog.selectedProductsAmount', [totalElements]) }}</span>
                <div>
                    <select class="select-css" v-model="sort">
                        <option v-for="o in sortOrders" :key="o.id" :value="o.id">{{ $t(o.nameKey) }}</option>
                    </select>
                </div>
            </div>

            <div class="hr row"></div>

            <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-3 vr">
                    <div class="hr" v-if="!selectedCategory || selectedCategory.folder">
                        <div>
                            <span class="link-button" @click.prevent="selectedCategoryId = null">{{ $t('catalog.allResults')
                            }}</span>
                        </div>
                        <div v-for="category in categoriesToShow" :key="category.id"
                            :style="`margin-left: ${(category.space ?? 0) * 10 + 10}px`">
                            <span v-if="getCountInCategory(category) !== 0"
                                class="link-button d-flex justify-content-between"
                                :class="{ active: category.id === selectedCategoryId }"
                                @click.prevent="selectedCategoryId = category.id">
                                {{ category.name }}
                                <span>{{ getCountInCategory(category) }}</span>
                            </span>
                        </div>
                    </div>

                    <filter-checkbox-group v-if="availableBrands.length > 0" class="hr" name="brands" :data="brandsInStock"
                        v-model="selectedBrandsIds">{{ $t('catalog.filters.brand') }}</filter-checkbox-group>

                    <filter-price-bounds class="hr" v-model="price" :min="minProductPrice" :max="maxProductPrice"
                        @submit="priceUpdated">{{ $t('catalog.filters.price') }}</filter-price-bounds>

                    <ul v-if="selectedCategory && !selectedCategory.folder">
                        <template v-for="cp in selectedCategory.classificationParameters" :key="cp.id">
                            <li class="hr"
                                v-if="cp.type === 'INT_RANGE' && rangeLimits[cp.key]?.min !== 0 && rangeLimits[cp.key]?.max !== 0 || cp.type === 'VALUES' && Object.keys(rangeLimits[cp.key] ?? []).length > 0">

                                <div>
                                    <span class="link-button spoiler-button" :id="`${cp.key}AccordionHeader`"
                                        data-bs-toggle="collapse" :data-bs-target="`#${cp.key}AccordionBody`"
                                        aria-expanded="true" :aria-controls="`${cp.key}AccordionBody`">
                                        {{ cp.name }}
                                    </span>
                                </div>

                                <div :id="`${cp.key}AccordionBody`" class="show"
                                    :aria-labelledby="`${cp.key}AccordionHeader`">
                                    <template v-if="cp.type === 'VALUES'">
                                        <ul>
                                            <template v-for="value in Object.keys(rangeLimits[cp.key] ?? [])" :key="value">
                                                <li class="form-check list-item">
                                                    <checkbox :id="cp.key + '_' + value"
                                                        :value="(classification[cp.key] ?? []).includes(value)"
                                                        @changed="v => value !== 'null' ? setClassificationBool(cp.key, value.toString(), v) : {}">
                                                        {{ value }}
                                                    </checkbox>
                                                    <span class="text-secondary pe-2"
                                                        v-if="!classification[cp.key]?.includes(value)">
                                                        <span v-if="classification[cp.key]">+</span>
                                                        <span>{{ rangeLimits ? rangeLimits[cp.key] ?
                                                            rangeLimits[cp.key][value] ?? 0
                                                            : 0 : 0 }}</span>
                                                    </span>
                                                </li>
                                            </template>
                                        </ul>

                                    </template>
                                    <template v-else-if="cp.type === 'INT_RANGE'">
                                        <range-slider class="hr"
                                            :model-value="classification[cp.key] ?? [0, rangeLimits[cp.key]?.max ?? 0]"
                                            :min="rangeLimits[cp.key]?.min ?? 0" :max="rangeLimits[cp.key]?.max ?? 0"
                                            @update:modelValue="v => setClassificationArray(cp.key, v)" />
                                    </template>
                                    <template v-else>
                                        {{ cp.type }}
                                    </template>
                                </div>
                            </li>
                        </template>
                    </ul>

                    <div>
                        <span class="link-button spoiler-button" id="inStockAccordionHeader" data-bs-toggle="collapse"
                            data-bs-target="#inStockAccordionBody" aria-expanded="true"
                            aria-controls="inStockAccordionBody">
                            {{ $t('catalog.availability') }}
                        </span>
                    </div>

                    <div id="inStockAccordionBody" class=" show" aria-labelledby="inStockAccordionHeader">
                        <ul>
                            <li class="form-check list-item" v-if="rangeLimits.available?.true > 0">
                                <Checkbox id="inStockTrue" :value="inStock.includes(true)"
                                    @changed="v => setInStock(true, v)">
                                    {{ $t('catalog.inStock') }}
                                </Checkbox>
                                <span class="text-secondary">
                                    {{ rangeLimits.available?.true ?? 0 }}
                                </span>
                            </li>
                            <li class="form-check list-item" v-if="rangeLimits.available?.false > 0">
                                <Checkbox id="inStockFalse" :value="inStock.includes(false)"
                                    @changed="v => setInStock(false, v)">
                                    {{ $t('catalog.notInStock') }}
                                </Checkbox>
                                <span class="text-secondary">
                                    {{ rangeLimits.available?.false ?? 0 }}
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="col-sm-12 col-md-8 col-lg-9">
                    <ul class="row">
                        <template v-if="products">
                            <template v-for="product in products" :key="product.id">
                                <product-list-item class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2" :product="product" />
                            </template>
                        </template>
                        <template v-else>
                            <div class="full-screen center">
                                <loader />
                            </div>
                        </template>
                    </ul>
                    <pagination v-model="page" :total="totalPages" class="my-4" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Api from '@/api/api';
import FilterCheckboxGroup from '@/components/products/FilterCheckboxGroup.vue';
import FilterPriceBounds from '@/components/products/FilterPriceBounds.vue';
import ProductListItem from '@/components/products/ProductListItem.vue';
import CategoryPathComponent from '@/components/products/CategoryPathComponent.vue';
import Loader from '@/components/animations/Loader.vue'
import Pagination from '@/components/common/Pagination.vue'
import Checkbox from '@/components/common/Checkbox.vue'
import RangeSlider from '@/components/common/RangeSlider.vue'

const sortOrders = [
    { id: 'rating', nameKey: 'catalog.sort.rating' },
    { id: 'new', nameKey: 'catalog.sort.new' },
    { id: 'priceAsc', nameKey: 'catalog.sort.priceAsc' },
    { id: 'priceDesc', nameKey: 'catalog.sort.priceDesc' },
];


export default {
    components: {
        Loader,
        FilterCheckboxGroup,
        FilterPriceBounds,
        ProductListItem,
        CategoryPathComponent,
        Pagination,
        Checkbox,
        RangeSlider
    },
    data() {
        return {
            //Filters
            selectedCategoryId: null,
            selectedBrandsIds: [],
            price: [0, 0],
            inStock: [],
            sort: 'rating',

            //Stored data
            products: null,
            categoriesInStockIds: {},
            brandsInStockIds: {},
            minProductPrice: 0,
            maxProductPrice: 0,
            totalPages: 0,
            totalElements: 0, //Number of elements that can be get with this filters (not at page, at all),
            rangeLimits: {},
            availableBrands: [],
            classification: {},
            matchedBrandsIds: [],

            // Pagging //
            numberOfElements: 0,
            pageSize: 60,
            page: 1
        }
    },
    mounted() {
        window.addEventListener('popstate', this.onBackButtonPressed)
    }, beforeUnmount() {
        window.removeEventListener('popstate', this.onBackButtonPressed)
    },
    async created() {
        await this.$router.isReady();
        if (this.$route.query.category) {
            this.selectedCategoryId = Number(this.$route.query.category);
        }
        if (this.$route.query.brands) {
            this.selectedBrandsIds = this.$route.query.brands?.split(',').map(id => Number(id)) ?? [];
        }
        if (this.$route.query.minPrice) {
            this.price[0] = Number(this.$route.query.minPrice);
        }
        if (this.$route.query.maxPrice) {
            this.price[1] = Number(this.$route.query.maxPrice);
        }
        if (this.$route.query.page) {
            this.page = Number(this.$route.query.page);
        }
        this.sort = this.$route.query.sort ?? 'rating';

        this.inStock = this.$route.query.inStock ? JSON.parse('[' + this.$route.query.inStock + ']') : [];

        if (this.$route.query.classification) {
            this.classification = JSON.parse(this.$route.query.classification);
        }

        await this.loadProducts();
    },
    methods: {
        onBackButtonPressed() {
            this.$emit('reload');
        },
        updateRoute() {
            const query = {
                ...(this.selectedCategoryId && { category: this.selectedCategoryId }),
                ...(this.selectedBrandsIds && this.selectedBrandsIds.length > 0 && { brands: this.selectedBrandsIds.reduce((p, c) => p + ',' + c) }),
                ...(this.price[0] !== null && this.price[0] !== 0 && this.price[0] !== this.minProductPrice && { minPrice: this.price[0] }),
                ...(this.price[1] !== null && this.price[1] !== 0 && this.price[1] !== this.maxProductPrice && { maxPrice: this.price[1] }),
                ...(this.inStock.length > 0 && { inStock: this.inStock.reduce((p, c) => p + ',' + c) }),
                ...(this.$route.query.query && { query: this.$route.query.query }),
                ...(this.sort && this.sort !== 'rating' && { sort: this.sort }),
                ...(Object.keys(this.classification).length > 0 && { classification: JSON.stringify(this.classification) }),
                ...(this.page !== null && this.page !== 1 && { page: this.page })
            };
            this.$router.push({ query })
        },
        getCountInCategory(category) {
            if (category.folder) {
                const childs = this.categories.filter(cat => cat.parentId === category.id);
                let count = 0;
                for (const child of childs) {
                    count += this.getCountInCategory(child);
                }
                return count;
            }
            return this.categoriesInStockIds[category.id] ?? 0;
        },
        categorySelected(id) {
            this.selectedCategoryId = id;
        },
        changeOrder(order) {
            this.order = order;
            this.loadProducts();
        },
        async loadProducts() {
            this.products = null;

            const response = await Api.getProducts({
                ...(this.selectedCategoryId && { category: this.selectedCategoryId }),
                ...(this.selectedBrandsIds && this.selectedBrandsIds.length > 0 && { brands: this.selectedBrandsIds.reduce((p, c) => p + ',' + c) }),
                ...(this.price[0] && this.price[0] !== this.minProductPrice && { minPrice: this.price[0] }),
                ...(this.price[1] && this.price[1] !== this.maxProductPrice && { maxPrice: this.price[1] }),
                ...(this.inStock.length > 0 && { inStock: this.inStock.reduce((p, c) => p + ',' + c) }),
                sortOrder: this.sort,
                ...(this.$route.query.query && { query: this.$route.query.query }),
                size: this.pageSize,
                ...(Object.keys(this.classification).length > 0 && { classification: JSON.stringify(this.classification) }),
                ...(this.page !== null && { page: this.page })
            });

            this.products = response.data.content;
            this.categoriesInStockIds = response.data.rangeLimits.categories;
            this.brandsInStockIds = response.data.rangeLimits.brands;

            //should do before range limits set
            if (this.selectedCategory && !this.selectedCategory.folder) {
                for (const ccp of this.selectedCategory.classificationParameters) {
                    if (Object.keys(response.data.rangeLimits).includes(ccp.key)) {
                        if (ccp.type === 'INT_RANGE' && this.rangeLimits[ccp.key] && this.classification[ccp.key]) {
                            if (this.rangeLimits[ccp.key].min === this.classification[ccp.key][0]) {
                                this.classification[ccp.key][0] = response.data.rangeLimits[ccp.key].min;
                            }
                            if (this.rangeLimits[ccp.key].max === this.classification[ccp.key][1]) {
                                this.classification[ccp.key][1] = response.data.rangeLimits[ccp.key].max;
                            }
                        }
                    }
                }
            }

            this.rangeLimits = response.data.rangeLimits;

            //requires range limits already set, do after range limits set
            this.availableBrands = response.data.rangeLimits.availableBrands.map(brandId => ({ ...this.brands.find(b => b.id === brandId), count: this.rangeLimits.brand ? this.rangeLimits.brand[brandId] ?? 0 : 0 }));

            if (this.minProductPrice === this.price[0]) {
                this.price[0] = Number(response.data.rangeLimits.price.min);
            }
            if (this.maxProductPrice === this.price[1]) {
                this.price[1] = Number(response.data.rangeLimits.price.max);
            }

            this.minProductPrice = Number(response.data.rangeLimits.price.min);
            this.maxProductPrice = Number(response.data.rangeLimits.price.max);
            this.totalPages = response.data.totalPages;
            this.totalElements = response.data.totalElements;
        },
        priceUpdated() {
            this.updateRoute();//it used to update when button OK pressed
        },
        setClassificationBool(key, valueName, isEnabled) {
            let cscn = this.classification[key] ?? [];
            if (isEnabled && !cscn.includes(valueName)) {
                cscn.push(valueName)
            }
            else if (!isEnabled && cscn.includes(valueName)) {
                cscn = cscn.filter(e => e !== valueName)
            }
            if (cscn.length > 0) {
                this.classification[key] = cscn;
            } else {
                delete this.classification[key];
            }
        },
        setInStock(value, isEnabled) {
            if (isEnabled && !this.inStock.includes(value)) {
                this.inStock = [...this.inStock, value];
            }
            else if (!isEnabled && this.inStock.includes(value)) {
                this.inStock = this.inStock.filter(e => e !== value)
            }
        },
        setClassificationArray(key, value) {
            if (this.rangeLimits[key].min === value[0] && this.rangeLimits[key].max === value[1]) {
                delete this.classification[key];
            } else {
                this.classification[key] = value;
            }
        }
    },
    computed: {
        ...mapGetters(['categories', 'brands']),
        sortOrders: () => sortOrders,

        selectedCategory() {
            return this.categories.find(cat => cat.id === this.selectedCategoryId);
        },
        categoriesToShow() {
            const selectedCategory = this.selectedCategoryId ? this.categories.find(cat => cat.id === this.selectedCategoryId) : null;
            const rootCategories = this.categories.filter(cat => cat.parentId === null);

            //TODO if category id is unexistant, error occurs. need to remove parameter
            if (selectedCategory === null) {
                return rootCategories;
            }

            const neighbourCategories = this.categories.filter(cat => cat.parentId === selectedCategory.parentId);
            const childCategories = this.categories.filter(cat => cat.parentId === selectedCategory.id);;
            const rootToCategory = [];
            let catInterator = selectedCategory;
            while (catInterator != null) {
                rootToCategory.unshift(catInterator);
                catInterator = this.categories.find(cat => cat.id === catInterator.parentId);
            }

            const result = [];
            let space = 0;
            for (const rootCategory of rootCategories) {
                result.push({ ...rootCategory, space });
                if (rootCategory.id === rootToCategory[0].id) {
                    space++;
                    for (let i = 1; i < rootToCategory.length - 1; i++) {
                        result.push({ ...rootToCategory[i], space });
                        space++;
                    }

                    if (selectedCategory.parentId !== null) {
                        for (const neighbour of neighbourCategories) {
                            result.push({ ...neighbour, space });
                            if (neighbour.id === selectedCategory.id) {
                                space++;
                                for (const childCategory of childCategories) {
                                    result.push({ ...childCategory, space });
                                }
                                space--;
                            }
                        }
                    } else {
                        for (const neighbour of neighbourCategories) {
                            if (neighbour.id === selectedCategory.id) {
                                for (const childCategory of childCategories) {
                                    result.push({ ...childCategory, space });
                                }
                            }
                        }
                    }

                    space--;
                    for (let i = 1; i < rootToCategory.length - 1; i++) {
                        space--;
                    }
                }
            }
            return result;
        },
        brandsInStock() {
            return Object.keys(this.rangeLimits.brands).map(id => ({ ...this.availableBrands.find(b => b.id === Number(id)), count: this.rangeLimits.brands ? this.rangeLimits.brands[id] ?? 0 : 0 }))
        },
        categoriesInStock() {
            return Object.keys(this.categoriesInStockIds).map(id => ({ ...this.categories.find(c => c.id === Number(id)), count: this.rangeLimits.category ? this.rangeLimits.category[id] ?? 0 : 0 }))
        }
    },
    watch: {
        selectedCategoryId(value) {
            console.log(value)
            this.page = 1;
            this.updateRoute();
        },
        selectedBrandsIds(value) {
            this.page = 1;
            this.updateRoute();
        },
        price(value) {
            this.page = 1;
            this.updateRoute();
        },
        inStock(value) {
            this.page = 1;
            this.updateRoute();
        },
        '$route.query.query'(value) {
            this.page = 1;
            this.loadProducts();
        },
        sort(value) {
            this.page = 1;
            this.updateRoute();
        },
        '$route.query'(value) {
            this.loadProducts();
        },
        page(value) {
            this.updateRoute();
        },
        classification: {
            handler(value) {
                this.page = 1;
                this.updateRoute();
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
.title-box {
    font: 14px/1.35 Arial, Helvetica, sans-serif;
}

.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.price-box {
    font-size: 120%;
}

.border {
    border: 1px solid #e9e9e9;
}

.link-button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 16px;
    font: inherit;
    vertical-align: baseline;
    color: #3e77aa;
    cursor: pointer;
    font-family: BlinkMacSystemFont, -apple-system, Arial, "Segoe UI", Roboto, Helvetica, sans-serif;

    &:hover {
        color: #f84147;
        text-decoration: underline;
    }

    &.active {
        color: black;
        cursor: default;
    }
}

a,
span {
    font-family: Arial;
    cursor: default;
}

a {
    color: #3e77aa;
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;

    &:hover {
        color: #f84147;
        text-decoration: underline;
    }
}

.select-css {
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg fill='%233e77aa' viewBox='0 0 13 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.5 7a.956.956 0 0 1-.657-.256l-5.57-5.25a.839.839 0 0 1 0-1.237.968.968 0 0 1 1.312 0L6.5 4.888 11.415.257a.968.968 0 0 1 1.313 0 .839.839 0 0 1 0 1.237l-5.572 5.25A.956.956 0 0 1 6.5 7Z'/%3E%3C/svg%3E");
    background-position: right 12px center;
    background-repeat: no-repeat, repeat;
    background-size: 14px 9px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    box-sizing: border-box;
    color: #221f1f;
    cursor: pointer;
    display: inline-flex;
    font-size: 14px;
    height: 32px;
    margin: 0;
    max-width: 100%;
    overflow: hidden;
    padding-left: 12px;
    padding-right: 40px;
    text-align: left;
    width: 100%;
}

.full-screen {
    width: 100%;
    height: 100%;

    &.center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>