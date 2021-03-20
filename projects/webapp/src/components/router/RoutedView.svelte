<script lang="ts">
  import * as Routes from "../../routes/routes";
  import type { AppRoute } from "./AppRoute";

  export let routes: AppRoute[] = [];

  for (let routeIdentifier in Routes) {
    let route = Routes[routeIdentifier];
    routes.push(route);
  }

  console.log("Found these routes: ", routes);
</script>

<div class="routed-view">
  {#each routes as route}
    {route.title} - {route.pattern}
  {/each}
</div>
