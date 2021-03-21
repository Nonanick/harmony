<script lang="ts">
  import App from "../../../App.svelte";
  import DefaultStyles from "../../style.defaults";
  import SvgIcon from "../svg_icon/SVGIcon.svelte";
  import Button from "./Button.svelte";
  import type { ButtonStyle } from "./ButtonStyle";

  export let icon_src: string;

  export let text: string;

  export let icon_position: "left" | "right" = "left";

  export let styles: Partial<ButtonStyle> = {};
</script>

<style>
  .ui-button-icon {
    position: absolute;
    display: grid;
    grid-template: 1 / 1;
    align-items: center;
    justify-items: center;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 100%;
    background-color: white;
  }
  .ui-button-icon.right {
    right: 0px;
    left: unset;
  }
</style>

<Button
  styles={{ 
    ...styles, 
    padding: icon_position == 'left' ? "6px 20px 6px 60px" : '6px 60px 6px 20px' 
    }}
  on:click
  on:dblclick
  on:contextmenu
  on:mousedown
  on:mouseup
  on:mouseenter
  on:mouseleave
>
  <div class="ui-button-icon {icon_position}">
    <SvgIcon
      src={icon_src}
      styles={{
        size: "30px",
        color:
          styles.background_color ??
          DefaultStyles.interface.Button.background_color,
      }}
    />
  </div>
  {text}
</Button>
