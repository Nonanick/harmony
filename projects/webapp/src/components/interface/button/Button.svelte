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
    transition: opacity 0.3s, filter 0.3s, background-color 0.3s;
    will-change: opacity, filter, background-color;
    filter: saturate(80%);
    margin-right: 5px;
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
  on:mouseover
  on:mouseleave
  on:focus
  on:blur
  on:mousedown
  on:mouseup
  >

  <slot />
</div>
