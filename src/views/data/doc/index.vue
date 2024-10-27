<template>
  <a-layout style="padding: 0 18px">
    <Breadcrumb />
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="所有">
        <AllTable />
      </a-tab-pane>
      <a-tab-pane key="2" title="图片">
        <PictureTable />
      </a-tab-pane>
      <a-tab-pane key="3" title="媒体">
        <MediaTable />
      </a-tab-pane>
      <a-tab-pane key="4" title="文本">
        <TextTable />
      </a-tab-pane>
      <a-tab-pane key="5" title="邮件">
        <EmailTable />
      </a-tab-pane>
      <a-tab-pane key="6" title="Excel">
        <ExcelTable />
      </a-tab-pane>
      <a-tab-pane key="7" title="PDF">
        <PDFTable />
      </a-tab-pane>
    </a-tabs>
  </a-layout>
</template>

<script setup lang="ts">
import AllTable from '@/views/data/doc/components/all-table.vue'
import PDFTable from '@/views/data/doc/components/pdf-table.vue'
import PictureTable from '@/views/data/doc/components/picture-table.vue'
import MediaTable from '@/views/data/doc/components/media-table.vue'
import TextTable from '@/views/data/doc/components/text-table.vue'
import EmailTable from '@/views/data/doc/components/email-table.vue'
import ExcelTable from '@/views/data/doc/components/excel-table.vue'
</script>
  