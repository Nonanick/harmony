<script lang="ts">
  import DefaultStyles from "../../style.defaults";
  import type { ButtonStyle } from "./ButtonStyle";

  export let styles: Partial<ButtonStyle> = {};

  const defaultStyles = DefaultStyles.interface.Button;
</script>

<style>
  .ui-button {
    display: inline-block;
    background-color: var(--background-color);
    color: var(--text-color);
    border: var(--border);
    padding: var(--padding);
    width: var(--width, auto);
    box-shadow: var(--box-shadow);
    border-radius: 3px;
    transition: opacity 0.3s, filter 0.3s, background-color 0.3s, text-decoration 0.3s, box-shadow 0.3s;
    will-change: opacity, filter, background-color, text-decoration, box-shadow;
    filter: saturate(80%);
    margin-right: 5px;
    margin-bottom: 8px;
    text-decoration: var(--text-underline, underline transparent 2px);
    overflow: hidden;
    vertical-align: middle;
  }
  :global(.ui-button:not(:first-child)) {
    margin-left: 5px;
  }
  .ui-button:hover {
    filter: saturate(95%);
  }
  .ui-button:active {
    filter: saturate(100%);
  }
</style>

<div
  class="ui-button clickable {$$props.class ?? ''}"
  style="
  {styles.box_shadow != null ? '--box-shadow: ' + styles.box_shadow +';': ''}
  {styles.text_underline != null ? '--text-underline: ' + styles.text_underline +';': ''}
  --background-color : {styles.background_color ??
    defaultStyles.background_color};
  --text-color : {styles.text_color ??
    defaultStyles.text_color};
  --border: {styles.border ??
    defaultStyles.border};
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
