<script lang="ts">
  import SvgIcon from "../svg_icon/SVGIcon.svelte";

  export let shape: "circle" | "square" | "rounded-square" | "none" =
    "rounded-square";

  export let src: string;
</script>

<style>
  .ui-icon-button {
    display: inline-block;
    vertical-align: middle;
    padding: 3px;
    box-sizing: border-box;
  }

  .bg-shape {
    background-color: var(--main-color);
    box-shadow: var(--box-shadow-2);
  }

  .bg-shape.circle {
    border-radius: 50%;
  }

  .bg-shape.square {
    border-radius: 3px;
  }

  .bg-shape.rounded-square {
    border-radius: 5% 30% 30% 30%;
  }
</style>

<div
  class="ui-icon-button clickable"
  on:click
  on:contextmenu
  on:mousedown
  on:mouseleave
  on:mouseup
  on:mouseleave
  on:dblclick
>
  <div class="bg-shape {shape}">
    <SvgIcon
      {src}
      styles={{
        color: "var(--text-on-main-color)",
      }}
    />
  </div>
</div>
