<script lang="ts">
  import SvgIcon from "../../svg_icon/SVGIcon.svelte";
  import type { SVGIconStyle } from "../../svg_icon/SVGIconStyle";

  export let title: string;
  export let icon: string = null;
  export let icon_style: Partial<SVGIconStyle> = {};
  export let enabled: boolean = true;
  export let onClick: () => void;
</script>

<style>
  .ui-context-menu-item {
    padding: 0 5px;
    display : grid;
    column-gap: 10px;
    grid-template-columns: auto 1fr;
    grid-template-rows: var(--item-height, 35px);
    border-bottom: 1px solid rgba(0,0,0,0.02);
    background-color: var(--background-color, #f9f9f9);
    filter: brightness(100%);
    transition: filter 0.3s;
  }
  .ui-context-menu-item:hover {
    filter: brightness(96%);
  }
  .ui-cm-item-title {
    padding: 0 10px;
    line-height: var(--item-height, 35px);
  }
  .ui-cm-item-icon {
    justify-self: center;
    align-self: center;
  }
  .ui-context-menu-item.disabled {
    text-decoration: line-through;
    opacity: 0.7;
  }
</style>

<div
  class="ui-context-menu-item  {enabled ? 'clickable' : 'disabled'}"
  on:click={() => {
    if (enabled) onClick();
  }}
>
  {#if icon != null}
    <div class="ui-cm-item-icon">
      <SvgIcon src={icon} styles={icon_style} />
    </div>
  {/if}
  <div class="ui-cm-item-title">
    {title}
  </div>
</div>
