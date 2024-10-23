<template>
    <a-space direction="vertical">
        <a-descriptions :column="1">
            <a-descriptions-item label="标题">
                标题
            </a-descriptions-item>
            <a-descriptions-item label="内容">
                <pre>
                    内容
                </pre>
            </a-descriptions-item>
            <a-descriptions-item label="原始文件">
                <a-link @click="handleView('file')">查看</a-link>
            </a-descriptions-item>
        </a-descriptions>
    </a-space>
</template>

<script lang="ts" setup>

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