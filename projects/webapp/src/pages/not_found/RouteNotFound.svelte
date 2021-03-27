<script>
  import DimmedButton from "../../components/interface/button/DimmedButton.svelte";
  import IconTextButton from "../../components/interface/button/IconTextButton.svelte";
  import Link from "../../components/interface/link/Link.svelte";
  import SvgIcon from "../../components/interface/svg_icon/SVGIcon.svelte";
  import CurrentRoute from "../../components/router/CurrentRoute";
  import { fade } from "svelte/transition";
</script>

<style>
  .page {
    padding-top: 10vh;
    text-align: center;
  }
  h1 {
    color: var(--main-color-50);
  }
  h4 {
    font-weight: 300;
  }
</style>

<div class="page" transition:fade>
  <h1>Ermm, where are we?</h1>
  <SvgIcon
    src="/img/icons/not.found.svg"
    styles={{ size: "30vh", color: "var(--secondary-color-50)" }}
  />
  <h2>Could not find the page you're looking for :(</h2>
  <h4>
    The url <i>'{$CurrentRoute.url}'</i> is not defined anywhere, but it's okay,
    we all lose our way sometimes
  </h4>
  <h3>Here, see if these help:</h3>
  <IconTextButton
    icon_src="/img/icons/back.svg"
    text="Go Back"
    on:click={() => {
      window.history.go(-1);
    }}
  />
  or
  <Link href="/">
    <DimmedButton>Go home</DimmedButton>
  </Link>
</div>
