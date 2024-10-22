<template>
    <a-space direction="vertical">
        <a-descriptions :column="1">
            <a-description-item label="标题">
                {{ title }}
            </a-description-item>
            <a-description-item label="内容">
                <pre>
                {{ content }}
            </pre>
            </a-description-item>
            <a-description-item label="原始文件">
                <a-link @click="handleView(file)">查看</a-link>
            </a-description-item>
        </a-descriptions>
    </a-space>
</template>

<script lang="ts" setup>

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    file: {
        type: String,
        default: '',
    },
});
const BASE = `${import.meta.env.VITE_API_BASE_URL}/`;

const handleView = (file: string) => {
    const url = `${BASE}${props.file}`
    window.open(url)
}
</script>