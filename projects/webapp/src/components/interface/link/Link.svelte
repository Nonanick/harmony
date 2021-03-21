<script lang="ts">
  import { AppRouter } from "../../../router/Router";

  export let href: string;
</script>

<style>
  
</style>
<a
  class="ui-link"
  on:click|preventDefault={() => {
    AppRouter.navigateTo(href);
  }}
  {href}
>
  <slot />
</a>
