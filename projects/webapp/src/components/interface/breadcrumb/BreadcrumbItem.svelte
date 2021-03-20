<style>
  .ui-breadcrumb-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<div
  class="ui-breadcrumb-item {$$props.class ?? ""}"
  on:click
  on:contextmenu
  on:dblclick
  on:mouseover
  on:mouseleave
>
  <slot />
</div>
