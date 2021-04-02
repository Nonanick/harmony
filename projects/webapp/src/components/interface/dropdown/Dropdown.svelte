<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type { IDropdownItem } from "./IDropdownItem";

  export let showItems: boolean = false;
  export let title: string;
  export let items: IDropdownItem[] = [];
  export let value: any | any[] | null = null;
  export let placeholder : string | null = null;

  const endOnScrollListener = () => {
    hideThisCM();
  };

  const closeOnEscPress = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      ev.stopPropagation();
      hideThisCM();
    }
  };

  const dispatcher = createEventDispatcher();

  onMount(() => {
    document.addEventListener("scroll", endOnScrollListener, { passive: true });
    document.addEventListener("keydown", closeOnEscPress);
    return () => {
      document.removeEventListener("scroll", endOnScrollListener);
      document.removeEventListener("keydown", closeOnEscPress);
    };
  });

  function hideThisCM() {
    showItems = false;
    dispatcher("close");
  }
</script>

<div class="ui-dropdown">
  <slot >
    {placeholder ?? 'Click to select!'}
  </slot>
  <div class="ui-dropdown-items">
    {#if showItems === true}
      <div
        class="ui-context-menu-overlay"
        transition:fade={{ duration: 100 }}
        on:contextmenu={hideThisCM}
        on:click={(ev) => {
          hideThisCM();
          ev.stopPropagation();
        }}
      >
        <div
          class="ui-context-menu"
          on:click|stopPropagation
          on:mouseenter
          on:mouseleave
          style=""
        >
          {#if title != null}
            <div class="ui-cm-title">
              {title}
            </div>
          {/if}
          {#each items as item}
            item
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

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
