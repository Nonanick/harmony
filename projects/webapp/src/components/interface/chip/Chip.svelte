<script lang="ts">
  import DefaultStyles from "../../style.defaults";
  import type { ChipStyle } from "./ChipStyle";

  export let styles: Partial<ChipStyle> = {};

  const defaultStyles = DefaultStyles.interface.Chip;
</script>

<style>
  .ui-chip {
    background-color: transparent;
    display: inline-block;
    color: var(--text-color);
    border: var(--border);
    padding: var(--padding);
    width: var(--width, auto);
    border-radius: 3px;
    transition: opacity 0.3s, filter 0.3s, background-color 0.3s, text-decoration 0.3s;
    will-change: opacity, filter, background-color;
    filter: saturate(80%);
    margin-right: 5px;
    margin-bottom: 8px;
    text-decoration: var(--text-underline, underline transparent 2px);
    overflow: hidden;
    vertical-align: middle;
    font-size: 0.85em;
  }
  .ui-chip:hover {
    background-color: var(--background-color);
  }
  :global(.ui-chip:not(:first-child)) {
    margin-left: 5px;
  }
  .ui-chip:hover {
    filter: saturate(95%);
  }
  .ui-chip:active {
    filter: saturate(100%);
  }
</style>

<div
  class="ui-chip clickable {$$props.class ?? ''}"
  style="
  {styles.text_underline != null ? '--text-underline: ' + styles.text_underline +';': ''}
  --background-color : {styles.background_color ??
    defaultStyles.background_color};
  --text-color : {styles.color ??
    defaultStyles.color};
  --border: 1px solid {styles.color ??
    defaultStyles.color};
  --padding: {styles.padding ??
    defaultStyles.padding};
  --width: {styles.width ??
    defaultStyles.width};
  --font-weight: {styles.text_weight ??
    defaultStyles.text_weight}
"
  on:click
  on:contextmenu
  on:dblclick
  on:mouseenter
  on:mouseleave
  on:focus
  on:blur
  on:mousedown
  on:mouseup
  >

  <slot />
</div>
