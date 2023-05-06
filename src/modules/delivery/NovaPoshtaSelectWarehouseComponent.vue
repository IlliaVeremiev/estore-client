<template>
    <div>
        <multiselect v-if="cityId" class="form-control" mode="single" :canClear="false" :searchable="true"
            :options="warehousesObject" :value="modelValue?.warehouse" :placeholder="$t('modules.delivery.novaPoshta.warehouseSelect.placeholder')"
            @select="value => $emit('update:modelValue', { warehouse: value })" :limit="100" />
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import axios from 'axios'

const apiLocation = import.meta.env.VITE_API_LOCATION;

export default {
    components: {
        Multiselect
    },
    emits: ['update:modelValue'],
    props: {
        cityId: {
            type: Number,
            required: false
        },
        modelValue: {
            type: Object
        }
    },
    data() {
        return {
            warehouses: []
        }
    },
    created() {
        this.loadWarehouses()
    },
    methods: {
        async loadWarehouses() {
            if (this.cityId == null) return;
            const response = await axios.get(`${apiLocation}/api/v1/cities/${this.cityId}/warehouses`, { withCredentials: true });
            this.warehouses = response.data;
        }
    },
    watch: {
        cityId() {
            this.loadWarehouses()
        }
    },
    computed: {
        warehousesObject() {
            return this.warehouses.reduce((map, wh) => { map[wh.number] = wh.name; return map }, {})
        }
    }
}
</script>

<style></style>