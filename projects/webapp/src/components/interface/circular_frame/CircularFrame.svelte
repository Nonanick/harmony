<script lang="ts">
import DefaultStyles from '../../style.defaults';

  import type { CircularFrameStyle } from "./CircularFrameStyle";

  export let size: string;
  export let style: Partial<CircularFrameStyle> = {};

  let defaultStyles = DefaultStyles.interface.CircularFrame;

</script>

<style>
  .ui-circular-frame {
    position: relative;
    display: inline-block;
    width: var(--size, auto);
    height: var(--size, auto);
  }
  .fix-ratio {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: grid;
    grid-template: 1 / 1;
    align-items: center;
    justify-items: center;
    border-radius: 50%;
    overflow: hidden;
    border: var(--border, 2px solid var(--main-color));
  }
  .frame-status {
    position: absolute;
    width: calc(var(--size) / 3.6);
    height: calc(var(--size) / 3.6);
    bottom: 0px;
    right: 0px;
    background-color: var(--status);
    z-index: 2;
    border-radius: 50%;
    color: var(--status-text);
    font-size: calc(var(--size) / 6);
    line-height: calc(var(--size) / 3.6);
    font-weight: 500;
    text-align: center;
  }
  .fix-ratio > :global(*) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<div class="ui-circular-frame {$$props.class ?? ''}" style="
--size : {size ?? 'auto'};
--border: {style.border ?? defaultStyles.border};
--status : {style.status_color ?? defaultStyles.status_color};
--status-text : {style.status_text_color ?? defaultStyles.status_text_color};
">
  <div class="fix-ratio">
    <slot />
  </div>
  <div class="frame-status">
    <slot name="status" />
  </div>
</div>
