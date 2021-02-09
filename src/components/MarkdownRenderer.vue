<template>
  <div class="card bg-dark" v-if="markdown !== ''">
    <div class="markdown-renderer" v-html="renderedHtml"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import marked from 'marked'
import DOMPurify from 'dompurify'

@Component({})
export default class MarkdownRenderer extends Vue {
  @Prop({ default: '' })
  markdown!: string;

  renderedHtml = '';

  created () {
    this.renderedHtml = DOMPurify.sanitize(marked(this.markdown, {}))
  }
}
</script>
<style scoped lang="stylus">
</style>
