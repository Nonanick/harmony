<script lang="ts">

  import Button from "./Button.svelte";
  import type { ButtonStyle } from "./ButtonStyle";
  
  export let styles: Partial<ButtonStyle> = {};
</script>

<Button
  styles={{
    background_color: "transparent",
    text_color: "var(--main-color)",
    border: "1px solid var(--main-color-50)",
    box_shadow: "0",
    ...styles,
  }}
  on:mousedown={() => {
    styles.background_color = "var(--main-color-25)";
  }}
  on:mouseup={() => {
    styles.background_color = "transparent";
  }}
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
</Button>
