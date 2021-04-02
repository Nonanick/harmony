<script lang="ts">
import DefaultStyles from '../../style.defaults';


import type { SVGIconStyle } from './SVGIconStyle';

  export let src: string;

  export let styles : Partial<SVGIconStyle> = {};

  const defaultStyles : SVGIconStyle = DefaultStyles.interface.SVGIcon;

</script>

<style>
  :global(.ui-icon.clickable > .fix-ratio), :global(.clickable .ui-icon > .fix-ratio) {
    transform: scale(100%);
    will-change: transform;
    transition:  transform 0.1s 0.2s;
    transition-timing-function : linear;
  }
  :global(.ui-icon.clickable:hover > .fix-ratio), :global(.clickable:hover .ui-icon > .fix-ratio) {
    transform: scale(105%);
  }
  :global(.ui-icon) {
    position: relative;
    display: inline-block;
    width: var(--size);
    height: var(--size);

    background-color: var(--bg-color);
    overflow: hidden;
    vertical-align: middle;
    margin: var(--margin);
  }
  :global(.ui-icon > .fix-ratio) {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    padding-top: calc(var(--aspect-ratio) * 100%);
    background-color: var(--icon-color);

    -webkit-mask-image: var(--source);
    mask-image: var(--source);

    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;

    -webkit-mask-position: center;
    mask-position: center;

    -webkit-mask-size: 100%;
    mask-size: 100%;
  }
</style>

<div
  class="ui-icon {$$props.class ?? ''}"
  style="
  --source: url({src}); 
  --size : {styles.size ?? defaultStyles.size}; 
  --icon-color: {styles.color ?? defaultStyles.color}; 
  --radius: {styles.box_radius ?? defaultStyles.box_radius}; 
  --bg-color : {styles.bg_color ?? defaultStyles.bg_color}; 
  --aspect-ratio: {styles.aspect_ratio ?? defaultStyles.aspect_ratio};
  --margin: {styles.margin ?? defaultStyles.margin}
  "
>
  <div class="fix-ratio" />
</div>
