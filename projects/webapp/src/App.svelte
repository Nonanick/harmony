<script lang="ts">
	import { loop_guard } from "svelte/internal";
	import Breadcrumb from "./components/interface/breadcrumb/Breadcrumb.svelte";
	import BreadcrumbItem from "./components/interface/breadcrumb/BreadcrumbItem.svelte";
	import Button from "./components/interface/button/Button.svelte";
	import DimmedButton from "./components/interface/button/DimmedButton.svelte";
	import OutlineButton from "./components/interface/button/OutlineButton.svelte";
	import TextButton from "./components/interface/button/TextButton.svelte";
	import Card from "./components/interface/card/Card.svelte";
	import LineSeparator from "./components/interface/line_separator/LineSeparator.svelte";
	import SvgIcon from "./components/interface/svg_icon/SVGIcon.svelte";
</script>

<style>
	main {
		position: relative;
		padding: 1em;
		margin: 0;
		box-sizing: border-box;
	}

	h1 {
		color: var(--main-color);
		font-size: 2em;
		font-weight: 300;
		padding: 0;
		margin: 0;
		width: auto;
	}

	h3 {
		color: var(--secondary-color);
		padding: 0;
		margin: 0;
	}

	li {
		margin-bottom: 6px;
	}
	.interface-display {
		display: grid;
		grid-template-columns: 350px 1fr;
		grid-template-rows: 1fr;
		column-gap: 20px;
	}

	.component-display {
		line-height: 1.5em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1><SvgIcon props={{ src: "/img/harmony.logo.svg" }} /> Harmony UI Kit</h1>
	<LineSeparator />

	<sector>
		<h3>Interface Components</h3>
		<div><h4>Alert Box</h4></div>
		<LineSeparator />
		<br />

		<!-- Breadcrumb -->
		<div class="interface-display">
			<div class="component-display">
				<Breadcrumb separator="▶️" styles={{width: '100%'}}>
					<BreadcrumbItem class="clickable">
						<SvgIcon
							props={{ src: "/img/icons/network.svg" }}
							styles={{ margin: "0 7px 0 0" }}
						/> Menu
					</BreadcrumbItem>
					<BreadcrumbItem class="clickable">Submenu</BreadcrumbItem>
					<BreadcrumbItem>Another Submenu</BreadcrumbItem>
				</Breadcrumb>
			</div>
			<div class="component-properties">
				<h3>Breadcrumb</h3>
				<h4>➡️ Properties</h4>
				<ul>
					<li>
						separator: which glyph shall be used to separate items inside the
						Breadcrumb
					</li>
				</ul>
				<h4>➡️ Styling</h4>
				<ul>
					<li>
						<b>background_color:</b> color to be used as the breadcrumb background,
						directly inserted into 'background-color' css property, accepts all the
						values that are valid background colors
					</li>
					<li>
						<b>separator_color:</b> color to be used as the separator color, directly
						inserted into 'color' css property, accepts all the values that are valid
						colors
					</li>
					<li>
						<b>separator_color:</b> font size to be used for the separator, directly
						inserted into 'font-size' css property, accepts all the values that are
						valid font sizes
					</li>
					<li>
						<b>separator_weight:</b> font weight to be used for the separator, directly
						inserted into 'font-weight' css property, accepts all the values that
						are valid font weight (number | 'bold' | 'nomral' | 'thin' | 'lighter'
						| ...)
					</li>
					<li>
						<b>fade_ratio:</b> increasingly decrements opacity when closer to the
						origin, must be a number between 0-1, 0 means 'no fading' 1 means only
						the last element shall be visible
					</li>
				</ul>
			</div>
		</div>

		<br />
		<LineSeparator />
		<br />

		<!-- Button -->

		<div class="interface-display">
			<div class="component-display">
				<Button>Button</Button>
				<DimmedButton>Dimmed Button</DimmedButton>
				<br />
				<OutlineButton>Outline Button</OutlineButton>
				<TextButton>Text Button</TextButton>
			</div>
			<div class="component-properties">
				<h3>Button</h3>
				<h4>➡️ Variations</h4>
				All of the variations are just styling modifications of the Button class,
				they posses the same functionality and expose the same DOM Events
				<ul>
					<li>
						<b>Filled Button:</b> is the default styling tor the 'Button' component,
						filled button using the default box-shadow property
					</li>
					<li>
						<b>Dimmed Button:</b> filled button with less accent, good for secondary
						actions
					</li>
					<li>
						<b>Outline Button:</b> not filled button with a soft border, has no elevation
						attached
					</li>
					<li>
						<b>Text Button:</b> Text based button, has visual cues signaling that
						it is a clickable element
					</li>
				</ul>
				<h4>➡️ Styling</h4>
				<ul>
					<li>
						<b>background_color:</b> color to be used as the button background, directly
						inserted into 'background-color' css property, accepts all the values
						that are valid background colors
					</li>
					<li>
						<b>text_color:</b> color to be used as the button text color, directly
						inserted into 'text-color' css property, accepts all the values that
						are valid colors
					</li>
					<li>
						<b>padding:</b> button padding, use it as the shorthand css property
						for 'padding'
					</li>
					<li>
						<b>border:</b> button border, use it as the shorthand css property for
						'border'
					</li>
					<li>
						<b>box-shadow:</b> button box shadow, use it as the shorthand css property
						for 'box-shadow'
					</li>
					<li>
						<b>width:</b> set a width to be used inside the button, by default it
						assumes an 'auto' width, to wrap its contents
					</li>
				</ul>
			</div>
		</div>

		<br />
		<LineSeparator />
		<br />

		<!-- Card -->
		<div class="interface-display" name="card">
			<div class="component-display">
				<Card styles={{ image_max_height: "100px" }}>
					<img
						src="/img/card_image.jpg"
						class="image"
						slot="image"
						alt="card header"
					/>
					<span slot="title">Title of the card</span>
					<span slot="description">Description of the card</span>
					<div slot="actions">Actions of the card!</div>
				</Card>
			</div>
			<div class="component-properties">
				<h3>Card</h3>
				<h4>➡️ Slots</h4>
				<ul>
					<li>
						<b>image:</b> place an element with 100% width at the top of the card
					</li>
					<li>
						<b>title:</b> place an element as the title of the card, has increased font size and weight
					</li>
					<li>
						<b>description (default slot):</b> place an element without font modifications
					</li>
					<li>
						<b>action:</b> place elements at the bottom of the card, usually interactive elements are placed
						inside this are
					</li>
				</ul>
				<h4>➡️ Styling</h4>
				<ul>
					<li>
						<b>background_color:</b> color to be used as the card background,
						directly inserted into 'background-color' css property, accepts all the
						values that are valid background colors
					</li>
					<li>
						<b>separator_color:</b> color to be used as the separator color, directly
						inserted into 'color' css property, accepts all the values that are valid
						colors
					</li>
					<li>
						<b>separator_color:</b> font size to be used for the separator, directly
						inserted into 'font-size' css property, accepts all the values that are
						valid font sizes
					</li>
					<li>
						<b>separator_weight:</b> font weight to be used for the separator, directly
						inserted into 'font-weight' css property, accepts all the values that
						are valid font weight (number | 'bold' | 'nomral' | 'thin' | 'lighter'
						| ...)
					</li>
					<li>
						<b>fade_ratio:</b> increasingly decrements opacity when closer to the
						origin, must be a number between 0-1, 0 means 'no fading' 1 means only
						the last element shall be visible
					</li>
				</ul>
			</div>
		</div>

		<br />
		<LineSeparator />
		<br />
		
		<div><h4>Chip</h4></div>
		<div><h4>Circular Frame</h4></div>
		<div><h4>Context Menu</h4></div>
		<div><h4>Dropdown</h4></div>
		<div><h4>Expandable Container</h4></div>
		<div><h4>Floating Action Button</h4></div>
		<div><h4>Icon Button</h4></div>
		<div><h4>Line Separator</h4></div>
		<div><h4>Popup</h4></div>
		<div><h4>Progress Bar</h4></div>
		<div><h4>Progress Ring</h4></div>
		<div><h4>Resizable Container</h4></div>
		<div><h4>SVG Icon</h4></div>
		<div><h4>Tab</h4></div>
		<div><h4>Tooltip</h4></div>
	</sector>
</main>
