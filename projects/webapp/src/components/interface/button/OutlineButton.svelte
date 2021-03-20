<script lang="ts">
import { DefaultTheme } from '../../../themes/theme.default';
import DefaultStyles from '../../style.defaults';

  import Button from "./Button.svelte";
  import type { ButtonStyle } from "./ButtonStyle";
  
  export let styles: Partial<ButtonStyle> = {};
</script>

<Button
  styles={{
    background_color: "transparent",
    text_color: DefaultTheme.variables['main-color'],
    border: "1px solid " + DefaultTheme.variables['main-color-50'],
    box_shadow: "0",
    ...styles,
  }}
  on:mousedown={() => {
    styles.background_color = DefaultTheme.variables['main-color-25'];
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
