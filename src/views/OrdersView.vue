<template>
    <div class="page">
        <div class="container">
            <div class="header">{{ $t('orders.header') }}</div>
            <div>
                <template v-if="orders">
                    <ul>
                        <template v-for="order in orders" :key="order.id">
                            <li class="card my-2 p-1">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div>
                                            № {{ order.uid }} от {{ order.creationDate }}
                                        </div>
                                        <div>
                                            {{ order.status }}
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            {{ $t('orders.order.amount') }}
                                        </div>
                                        <div>
                                            {{ order.totalPrice }} г
                                        </div>
                                    </div>
                                    <div>
                                        <div v-for="item in order.orderItems" :key="item.product.id">
                                            <img :src="item.product.images[0]?.path" alt="" height="75">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>
                </template>
                <template v-else>Loading...</template>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/api/api'

export default {
    data() {
        return {
            orders: null
        }
    },
    async created() {
        const response = await Api.getOrders();
        this.orders = response.data.content;
    }
}
</script>

<style></style>