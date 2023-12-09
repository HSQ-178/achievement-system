<template>
    <div class="bg-white">
        <div class="p-4 text-gray-5 text-center">
            <tr class="grid grid-cols-8 justify-items-center border-b">
                <th v-for="(item, index) in props.tableList" :key="index">
                    {{ item.title }}
                </th>
            </tr>
            <tr>
                <th>上午</th>
                
            </tr>
            <tr>
                <th>下午</th>
            </tr>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    tableList: Array
})

</script>