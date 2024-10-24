<template>
    <a-space direction="vertical">
        <a-descriptions :column="1">
            <a-descriptions-item label="标题">
                {{ title }}
            </a-descriptions-item>
            <a-descriptions-item label="内容">
                <a-table :columns="columns" :data="props.doc_data" />
            </a-descriptions-item>
            <a-descriptions-item label="原始文件">
                <a-link @click="handleView(file)">查看</a-link>
            </a-descriptions-item>
        </a-descriptions>
    </a-space>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';

// 动态生成 columns
const columns = computed(() => {
    if (props.doc_data.length > 0) {
        // 获取第一个对象的键名
        const keys = Object.keys(props.doc_data[0]);
        return keys.map(key => ({
            title: key.charAt(0).toUpperCase() + key.slice(1), // 将键名首字母大写
            dataIndex: key,
        }));
    }
    return []; // 如果 doc_data 为空，返回空数组
});
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    doc_data: {
        type: Array as PropType<Record<string, any>[]>,
        default() {
            return [];
        },
    },
    file: {
        type: String,
        default: '',
    },
});

const handleView = (file: string) => {
    let url;
    if (import.meta.env.VITE_API_BASE_URL) {
        url = `${import.meta.env.VITE_API_BASE_URL}/${file}`;
    } else {
        url = `${window.origin}/${file}`;
    }
    window.open(url)
}
</script>