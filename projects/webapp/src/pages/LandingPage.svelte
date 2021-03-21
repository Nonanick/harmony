<script>
  import IconTextButton from "../components/interface/button/IconTextButton.svelte";
  import Link from "../components/interface/link/Link.svelte";
  import SvgIcon from "../components/interface/svg_icon/SVGIcon.svelte";
  import { CurrentTheme } from "../themes/CurrentTheme";
  import { DarkTheme } from "../themes/dark.theme";
  import { LightInterfaceTheme } from "../themes/light.theme";
  import { fade } from "svelte/transition";
</script>

<style>
  .page {
    padding-top: 20vh;
    text-align: center;
  }
  .message {
    color: var(--secondary-color);
    font-size: 2em;
    margin-bottom: 10px;
  }
</style>

<div class="page" transition:fade>
  <SvgIcon src="/img/harmony.logo.svg" styles={{ size: "30vh" }} />
  <div class="message">Welcome to Harmony App!</div>
  <nav>
    <Link href="about">UI Kit</Link> | <Link href="workspace">Workspace</Link>
  </nav>
  <br />
  <div>
    <Link href="know-more">
      <IconTextButton
        icon_src="/img/harmony.logo.svg"
        text="Know more"
        icon_position="right"
      />
    </Link>
    <IconTextButton
      icon_src="/img/icons/theme.svg"
      text="Change theme"
      icon_position="left"
      on:click={() => {
        if ($CurrentTheme.name === "light") {
          $CurrentTheme = DarkTheme;
        } else {
          $CurrentTheme = LightInterfaceTheme;
        }
      }}
    />
  </div>
</div>
