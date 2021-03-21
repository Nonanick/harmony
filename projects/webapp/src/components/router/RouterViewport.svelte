<script lang="ts">
  import CurrentRoute from "./CurrentRoute";
</script>

<div class="router-viewport">
  <svelte:component
    this={$CurrentRoute.visibleComponent}
    {...$CurrentRoute?.componentProperties}
  />
</div>
