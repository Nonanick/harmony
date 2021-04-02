<script lang="ts">
  import SvgIcon from "../../svg_icon/SVGIcon.svelte";

  import type { SVGIconStyle } from "../../svg_icon/SVGIconStyle";
  import ContextMenuItem from "../item/ContextMenuItem.svelte";
  import { isContextMenuSubmenu } from "../submenu/ContextMenuSubmenu";
  import ContextMenuSubmenu from "../submenu/ContextMenuSubmenu.svelte";
  import type { IContextMenuGroup } from "./ContextMenuGroup";

  export let title: string;
  export let icon: string | null = null;
  export let icon_style: Partial<SVGIconStyle> = {};
  export let enabled: boolean = true;
  export let items: IContextMenuGroup["items"] = [];
</script>

<style>
  .ui-cm-group-title {
    padding: 2px 7px;
    font-size: 0.7em;
    font-weight: 500;
    background-color: rgba(0,0,0,0.03);
    padding-left: 14px;
  }
</style>
<div
  class="ui-context-menu-group  {enabled ? 'clickable' : 'disabled'}"
  on:click|stopPropagation
>
  <div class="ui-cm-group-title">
    {#if icon != null}
      <div class="ui-cm-item-icon">
        <SvgIcon src={icon} styles={icon_style} />
      </div>
    {/if}
    {title}
  </div>
  {#each items as item}
    {#if isContextMenuSubmenu(item)}
      <ContextMenuSubmenu
        {...{
          ...item,
          enabled: enabled === true ? item.enabled ?? true : false,
        }}
      />
    {:else}
      <ContextMenuItem
        {...{
          ...item,
          enabled: enabled === true ? item.enabled ?? true : false,
        }}
      />
    {/if}
  {/each}
</div>
