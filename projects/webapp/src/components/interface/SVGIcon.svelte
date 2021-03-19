<script lang="ts" context="module">

  export interface SVGIconProps {
    src : string;
  }

  export interface SVGIconStyle {
    aspect_ratio : number;
    size: string;
    color : string;
    bg_color: string;
    box_radius : string;
  }

  export let icon: SVGIconProps;

  export let styles : Partial<SVGIconStyle> = {};

  const defaultStyles : SVGIconStyle = {
    aspect_ratio : 1,
    size : '16pt',
    bg_color : 'transparent',
    box_radius : '50%',
    color : '#303030'
  };
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
  --source: url({icon.src}); 
  --size : {styles.size ?? defaultStyles.size}; 
  --icon-color: {styles.color ?? defaultStyles.color}; 
  --radius: {styles.box_radius ?? defaultStyles.box_radius}; 
  --bg-color : {styles.bg_color ?? defaultStyles.bg_color}; 
  --aspect-ratio: {styles.aspect_ratio ?? defaultStyles.aspect_ratio}
  "
>
  <div class="fix-ratio" />
</div>
