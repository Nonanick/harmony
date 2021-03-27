<script lang="ts">
import { DefaultTheme } from '../../../themes/theme.default';

  import Button from "./Button.svelte";
  import type { ButtonStyle } from "./ButtonStyle";

  export let styles: Partial<ButtonStyle> = {};
</script>

<Button
  styles={{
    background_color: DefaultTheme.variables['main-color-25'],
    text_color: DefaultTheme.variables['main-color'],
    ...styles,
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
