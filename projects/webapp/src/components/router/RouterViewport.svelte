<script lang="ts">
  import CurrentRoute from "./CurrentRoute";

</script>
<style>
  .router-viewport {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
  }
</style>
<div class="router-viewport">
  <svelte:component
    this={$CurrentRoute.visibleComponent}
    {...$CurrentRoute?.componentProperties}
  />
</div>
