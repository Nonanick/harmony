<script lang="ts">
import DefaultStyles from "../../style.defaults";

import type { WindowStyle } from "./WindowStyle";


  export let styles : Partial<WindowStyle> ={};
  const defaultStyles = DefaultStyles.modals.Window;
</script>

<style>
  .ui-window {
    position: fixed;
  }
</style>
<div class="ui-window" style="
  --bg-color : {styles.bg_color ?? defaultStyles.bg_color};
">
  <div class="ui-window-title-bar">
    <slot name="window-title"></slot>
  </div>
  <div class="ui-window-controls">
    <slot name="window-control"></slot>
  </div>
  <div class="ui-window-content">
    <slot></slot>
  </div>
</div>