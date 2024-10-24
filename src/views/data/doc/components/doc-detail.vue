<template>
    <div class="container">
        <a-layout style="padding: 0 18px">
            <Breadcrumb />
        </a-layout>
        <a-card v-if="info" :title="info.title" class="general-card">
            <a-space direction="vertical">
                <a-descriptions :column="1">
                    <!-- <a-descriptions-item label="描述">
                        <pre>
                        {{ info.desc }}
                        </pre>
                    </a-descriptions-item> -->
                    <a-descriptions-item label="内容">
                        <pre>{{ info.content }} </pre>
                    </a-descriptions-item>
                    <a-descriptions-item label="预览">
                        <img v-if="info.type==='picture'" :src="info.src" style="width:100%" alt="">
                        <video v-if="info.type==='media'" :src="info.src" controls></video>
                        <iframe v-if="info.type==='pdf'" :src="info.src" style="width:75vw;height:65vh" frameborder="0"></iframe>
                    </a-descriptions-item>
                </a-descriptions>
            </a-space>        
        </a-card>
    </div>
</template>

    <script lang="ts" setup>
    import { querySysDocDetail } from '@/api/doc';
    import useLoading from '@/hooks/loading';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    // import AudioPlayer from '@/components/audioplayer/index.vue';
    // import MediaPlayer from '@/components/mediaplayer/index.vue';

    const route = useRoute();
    const { loading, setLoading } = useLoading(true);

    const info = ref<{
        title?: string,
        content?: string,
        src?: string,
        type: string
    } | undefined>(undefined);

    const id = parseInt(route.params.id[0], 10);

    const buildSrcURL = (file: string) => {
        let url;
        if (import.meta.env.VITE_API_BASE_URL) {
            url = `${import.meta.env.VITE_API_BASE_URL}/${file}`;
        } else {
            url = `${window.origin}/${file}`;
        }
        return url;
    }

    const fetchApiDetail = async (pk: number) => {
        setLoading(true);
        try {
        const res = await querySysDocDetail(pk);
        const data = {
            title: '',
            content: '',
            src: '',
            type: '',
        };
        if(res.title) data.title = res.title;
        if(res.content) data.content = res.content;
        if(res.file) data.src = buildSrcURL(res.file);
        if(res.type) data.type = res.type;
        info.value = data;
        } catch (error) {
        // console.log(error);
        } finally {
        setLoading(false);
        }
    };

    if(id){
        fetchApiDetail(id as number);
    }
</script>
