<script lang="ts">
import DefaultStyles from '../../style.defaults';

import type { SVGIconProps } from './SVGIconProps';

import type { SVGIconStyle } from './SVGIconStyle';

  export let props: SVGIconProps;

  export let styles : Partial<SVGIconStyle> = {};

  const defaultStyles : SVGIconStyle = DefaultStyles.interface.SVGIcon;

</script>

<style>
  .ui-icon {
    position: relative;
    display: inline-block;
    width: var(--size);
    height: var(--size);

    background-color: var(--bg-color);
    overflow: hidden;
    vertical-align: middle;
  }
  .fix-ratio {
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
  class="ui-icon"
  style="
  --source: url({props.src}); 
  --size : {styles.size ?? defaultStyles.size}; 
  --icon-color: {styles.color ?? defaultStyles.color}; 
  --radius: {styles.box_radius ?? defaultStyles.box_radius}; 
  --bg-color : {styles.bg_color ?? defaultStyles.bg_color}; 
  --aspect-ratio: {styles.aspect_ratio ?? defaultStyles.aspect_ratio}
  "
>
  <div class="fix-ratio" />
</div>
