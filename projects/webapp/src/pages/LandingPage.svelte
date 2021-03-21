<script>
  import IconTextButton from "../components/interface/button/IconTextButton.svelte";
  import Link from "../components/interface/link/Link.svelte";
  import SvgIcon from "../components/interface/svg_icon/SVGIcon.svelte";
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

<div class="page">
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
  </div>
</div>
