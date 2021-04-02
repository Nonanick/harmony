<script lang="ts">
  import { isContextMenuGroup } from "./group/ContextMenuGroup";
  import type { IContextMenuGroup } from "./group/ContextMenuGroup";
  import ContextMenuGroup from "./group/ContextMenuGroup.svelte";
  import { isContextMenuItem } from "./item/IContextMenuItem";
  import type { IContextMenuItem } from "./item/IContextMenuItem";
  import type { IContextMenuSubmenu } from "./submenu/ContextMenuSubmenu";
  import { isContextMenuSubmenu } from "./submenu/ContextMenuSubmenu";
  import ContextMenuItem from "./item/ContextMenuItem.svelte";
  import ContextMenuSubmenu from "./submenu/ContextMenuSubmenu.svelte";
  import { afterUpdate, createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let visible: boolean = false;
  export let position: {
    x: string;
    y: string;
    realtiveTo?: HTMLElement;
  } = { x: "0", y: "0" };
  export let useContainer = true;
  export let title: string;
  export let items: (
    | IContextMenuGroup
    | IContextMenuItem
    | IContextMenuSubmenu
  )[] = [];

  afterUpdate(() => {});
  const endOnScrollListener = () => {
    hideThisCM();
  };

  const closeOnEscPress = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      ev.stopPropagation();
      hideThisCM();
    }
  };
  const signalClose = createEventDispatcher();

  onMount(() => {
    document.addEventListener("scroll", endOnScrollListener, { passive: true });
    document.addEventListener("keydown", closeOnEscPress);
    return () => {
      document.removeEventListener("scroll", endOnScrollListener);
      document.removeEventListener("keydown", closeOnEscPress);
    };
  });

  function hideThisCM() {
    visible = false;
    signalClose("close");
  }
</script>

{#if visible === true}
  {#if useContainer === true}
    <div
      class="ui-context-menu-overlay"
      transition:fade={{ duration: 100 }}
      on:click={(ev) => {
        hideThisCM();
        ev.stopPropagation();
      }}
    />
  {/if}
  <div
    class="ui-context-menu"
    on:click|stopPropagation
    on:mouseenter
    on:mouseleave
    style="
    --position-x: {position.x};
    --position-y: {position.y}
    "
  >
    {#if title != null}
      <div class="ui-cm-title">
        {title}
      </div>
    {/if}
    {#each items as item}
      {#if isContextMenuGroup(item)}
        <ContextMenuGroup {...item} />
      {:else if isContextMenuItem(item)}
        <ContextMenuItem {...item} />
      {:else if isContextMenuSubmenu(item)}
        <ContextMenuSubmenu
          {...item}
          on:close={() => {
            visible = false;
          }}
        />
      {:else}
        Cant render this item!
      {/if}
    {/each}
  </div>
{/if}

<style>
  .ui-cm-title {
    padding: 2px 7px;
    font-size: 0.75em;
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.03);
  }
  .ui-context-menu-overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.02);
    z-index: 2;
  }
  .ui-context-menu {
    position: fixed;
    top: var(--position-y, 0px);
    left: var(--position-x, 0px);
    border-radius: var(--border-radius, 4px);
    overflow: hidden;
    width: var(--context-menu-width, 200px);
    box-sizing: border-box;
    background-color: var(--background-color, #f9f9f9);
    box-shadow: var(--box-shadow-2);
    z-index: 10;
  }
</style>
