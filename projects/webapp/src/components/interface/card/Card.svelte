<script lang="ts">
  import DefaultStyles from "../../style.defaults";

  import type { CardStyle } from "./CardStyle";

  export let styles: Partial<CardStyle> = {};

  const defaultStyles: CardStyle = DefaultStyles.interface.Card;
</script>

<style>
  .ui-card {
    position: relative;
    width: var(--width);
    max-width: 100%;
    min-width: 250px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    transition: box-shadow 0.3s;
    box-shadow: var(--box-shadow-1);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .ui-card-image > :global(*) {
    flex-shrink: 0;
    width: 100%;
  }
  .ui-card-image:not(:empty) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    max-height: var(--image-max-height, none);
    overflow: hidden;
    height: auto;
    display: grid;
    justify-content: center;
    align-content: center;
    grid-template: 1fr / 1fr;
  }
  .ui-card:hover {
    box-shadow: var(--box-shadow-2);
  }
  .ui-card-title {
    position: relative;
    z-index: 2;
    padding: 15px 20px;
    font-size: var(--title-font-size);
    font-weight: 500;
    box-shadow: 0px -5px 4px 1px rgba(0, 0, 0, 0.1);
  }
  .ui-card-description {
    padding: 15px 20px;
    font-weight: 300;
  }
  .ui-card-actions {
    background-color: rgba(0, 0, 0, 0.05);
    height: auto;
  }
  .ui-card-actions:not(:empty) {
    padding: 8px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: inset 0px 2px 4px -2px rgba(0, 0, 0, 0.05);
  }
</style>

<div
  class="ui-card"
  style="
--width : {styles.width ??
    defaultStyles.width};
--background-color: {styles.background_color ??
    defaultStyles.background_color};
{styles.image_max_height != null
    ? '--image-max-height: ' + styles.image_max_height + ';'
    : ''}
    --title-font-size: {styles.title_font_size ??
    defaultStyles.title_font_size};
    --title-font-weight: {styles.title_font_weight ??
    defaultStyles.title_font_weight};
    --description-font-size : {styles.description_font_size ??
    defaultStyles.description_font_size};
    --description-font-weight: {styles.description_font_weight ??
    defaultStyles.description_font_weight};
    --actions-background-color: {styles.actions_background_color ??
    defaultStyles.actions_background_color};
"
  on:click
>
  <div class="ui-card-image">
    <slot name="image" />
  </div>
  <div class="ui-card-title">
    <slot name="title" />
  </div>
  <div class="ui-card-description">
    <slot name="description" />
    <slot />
  </div>
  <div class="ui-card-actions">
    <slot name="actions" />
  </div>
</div>
