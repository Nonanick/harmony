<script lang="ts">
  import { afterUpdate } from "svelte";
  import DefaultStyles from "../../style.defaults";
  import type { BreadcrumbStyle } from "./BreadcrumbStyle";

  export let separator: string;

  export let styles: Partial<BreadcrumbStyle> = {};

  let defaultStyles = DefaultStyles.interface.Breadcrumb;

  let container: HTMLDivElement;

  afterUpdate(() => {
    let items = container.querySelectorAll(
      ":scope>.ui-breadcrumb-item:not(:last-child)"
    );

    items.forEach((item: HTMLDivElement, ind) => {
      let newSeparator = document.createElement("div");
      newSeparator.classList.add("ui-breadcrumb-separator");
      newSeparator.innerText = separator;
      item.after(newSeparator);

      if ((styles.fade_ratio ?? defaultStyles.fade_ratio) > 0) {
        let newOpacity = String(
          1 -
            (items.length - ind) *
              (styles.fade_ratio ?? defaultStyles.fade_ratio)
        );
        item.style.opacity = newOpacity;
        newSeparator.style.opacity = newOpacity;
      }
    });
  });
</script>

<style>
  .ui-breadcrumb {
    display: inline-flex;
    column-gap: 5px;
    background-color: var(--background-color);
    /*border: 1px solid rgba(0, 0, 0, 0.1);*/
    box-shadow: 1px 1px 8px -2px rgba(0, 0, 0, 0.12);
    padding: 8px 20px;
    box-sizing: border-box;
    border-radius: 3px;
    width: var(--width);
  }

  :global(.ui-breadcrumb-separator) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.ui-breadcrumb > .ui-breadcrumb-separator) {
    color: var(--separator-color);
    font-size: var(--separator-size);
    font-weight: var(--separator-weight);
  }
</style>

<div
  class="ui-breadcrumb"
  bind:this={container}
  style="
  --width: {styles.width ?? defaultStyles.width};
  --background-color : {styles?.background_color ??
    defaultStyles.background_color};
  --separator-color : {styles?.separator_color ??
    defaultStyles.separator_color};
  --separator-size : {styles?.separator_size ??
    defaultStyles.separator_size};
  --separator-weight : {styles?.separator_weight ??
    defaultStyles.separator_weight};
"
>
  <slot />
</div>
