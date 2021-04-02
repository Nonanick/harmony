<script lang="ts">
  import { onMount } from "svelte";

  import SvgIcon from "../../svg_icon/SVGIcon.svelte";

  import type { SVGIconStyle } from "../../svg_icon/SVGIconStyle";
  import ContextMenu from "../ContextMenu.svelte";
  import { fade } from "svelte/transition";

  import type { IContextMenuSubmenu } from "./ContextMenuSubmenu";

  export const spawn_submenu = true;
  export let enabled: boolean = true;
  export let title: string;
  export let icon: string | null = null;
  export let spacing: number = 2;
  export let placement: "left" | "right" | "comfortable" = "comfortable";
  export let icon_style: Partial<SVGIconStyle> = {};
  export let items: IContextMenuSubmenu["items"] = [];

  let submenuVisibility: boolean = false;

  let rootEl: HTMLDivElement;
  let position = {
    x: "0px",
    y: "0px",
  };

  let delayedDisplayTimeout: any;
  let delayedHideTimeout: any;

  onMount(() => {
    let rightPos = placeToTheRight(rootEl.getBoundingClientRect());
    let leftPos = placeToTheLeft(rootEl.getBoundingClientRect());

    switch (placement) {
      case "right":
        if (rightPos.x - rootEl.getBoundingClientRect().width > 0) {
          position = {
            x: rightPos.x - rootEl.getBoundingClientRect().width + "px",
            y: rightPos.y + "px",
          };
          break;
        }
      case "left":
        if (
          leftPos.x + rootEl.getBoundingClientRect().width <
          window.innerWidth
        ) {
          position = {
            x: leftPos.x + "px",
            y: leftPos.y + "px",
          };
          break;
        }
      case "comfortable":
        let spaceToTheRight =
          window.innerWidth -
          (rootEl.getBoundingClientRect().x +
            rootEl.getBoundingClientRect().width);
        let spaceToTheLeft = rootEl.getBoundingClientRect().x;
        if (spaceToTheLeft > spaceToTheRight) {
          position = {
            x: leftPos.x + "px",
            y: leftPos.y + "px",
          };
        } else {
          position = {
            x: rightPos.x - rootEl.getBoundingClientRect().width + "px",
            y: rightPos.y + "px",
          };
        }
        break;
    }
  });

  function placeToTheLeft(rect: DOMRect) {
    return {
      x: rect.x + rect.width + spacing,
      y: rect.y,
    };
  }

  function placeToTheRight(rect: DOMRect) {
    return {
      x: rect.x - spacing,
      y: rect.y,
    };
  }

  function openSubmenu() {
    submenuVisibility = true;
  }
</script>

<div
  class="ui-context-menu-submenu {enabled ? '' : 'disabled'}"
  style="pointer-events: all;"
  transition:fade={{ duration: 100 }}
  bind:this={rootEl}
  on:mouseleave={() => {
    if (delayedHideTimeout == null) {
      delayedHideTimeout = setTimeout(() => {
        //submenuVisibility = false;
        delayedHideTimeout = null;
      }, 300);
    }
  }}
  on:mouseenter={() => {
    if(delayedHideTimeout != null) {
      clearTimeout(delayedHideTimeout);
      delayedHideTimeout = null;
    }
    if (delayedDisplayTimeout == null) {
      delayedDisplayTimeout = setTimeout(() => {
        openSubmenu();
        delayedDisplayTimeout = null;
      }, 300);
    }
  }}
  on:click|stopPropagation={() => {
    if (enabled) openSubmenu();
  }}
>
  <div class="ui-cm-submenu-icon">
    {#if icon != null}
      <SvgIcon src={icon} styles={icon_style} />
    {/if}
  </div>
  <div class="ui-cm-submenu-title">
    {title}
  </div>
  <div class="ui-cm-submenu-arrow">
    <SvgIcon
      src="/img/icons/arrow.svg"
      styles={{ ...icon_style, size: "10px" }}
    />
  </div>
  <ContextMenu
    {title}
    {items}
    on:mouseenter={() => {
      if (delayedHideTimeout != null) {
        clearTimeout(delayedHideTimeout);
        delayedHideTimeout = null;
      }
    }}
    on:mouseleave={() => {
      delayedHideTimeout = setTimeout(() => {
        //submenuVisibility = false;
      }, 700);
    }}
    useContainer={false}
    bind:visible={submenuVisibility}
    bind:position
    on:close
  />
</div>

<style>
  /* !! CAUTION
   * --------------
   * DO NOT USE CSS PROPERTIES THAT REQUIRE A NEW PAINTING LAYER !!
   * New painting layers create a new context block for fixed elements
   * The viewport is not the reference anymore - this behaviour is quite
   * inconsistency between browsers thats why i wont just make it 'relative'
   */
  .ui-context-menu-submenu {
    display: grid;
    grid-template-columns: auto 1fr 30px;
    grid-template-rows: var(--item-height, 35px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.02);
    background-color: var(--background-color, #f9f9f9);
  }
  .ui-cm-submenu-title {
    padding: 0 10px;
    line-height: var(--item-height, 35px);
  }
  .ui-cm-submenu-arrow {
    transform: rotate(-90deg);
    justify-self: center;
    align-self: center;
  }
</style>
