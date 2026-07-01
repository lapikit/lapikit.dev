<script lang="ts">
	import LapinosaureOnSpace from '$lib/@legacy/lapinosaure-on-space.svelte';
	import BackgroundStar from '$lib/@legacy/background-star.svelte';
	import LapinosaureExpertLapikit from '$lib/@legacy/images/lapinosaure-expert-lapikit.webp?enhanced';
	import StarMedium from '$lib/@legacy/images/star-medium.webp?enhanced';

	import {
		ArrowRight,
		Box,
		ChartSpline,
		ChevronRight,
		CircleCheck,
		Copy,
		GraduationCap,
		Images,
		MessageSquareText,
		Package,
		PencilRuler,
		Quote,
		Rocket,
		Sparkles,
		SwatchBook
	} from 'lucide-svelte';
	import { capitalize, copyToClipboard } from '$lib/utils';
	import EarthMoonLapikit from '$lib/@legacy/earth-moon-lapikit.svelte';
	import { scrollAnimation } from '$lib/@legacy/scroll-animation';
	import ColorSchemePreview from '$lib/@legacy/color-scheme-preview.svelte';
	import StepperInstallLapikit from '$lib/@legacy/images/install-lapikit.webp?enhanced';
	import StepperImportsComponents from '$lib/@legacy/images/imports-components.webp?enhanced';
	import StepperCustomizeYourApp from '$lib/@legacy/images/customize-your-app.webp?enhanced';
	import NycolaideAvatar from '$lib/@legacy/images/nycolaide.webp?enhanced';
	import LapikitLikeYou from '$lib/@legacy/images/lapinosaure-like-you.webp?enhanced';
	import LapinosaureFace from '$lib/@legacy/images/lapinosaure-face.webp?enhanced';

	// import '../plugins/lapikit.ts';
	import LazyRepl from '../components/lazy-repl.svelte';
	import TypeScriptIcon from '$lib/assets/icons/typescript.svg?raw';
	import SvelteIcon from '$lib/assets/icons/svelte.svg?raw';
	import githubIcon from '$lib/assets/icons/github.svg?raw';
	import npmIcon from '$lib/assets/icons/npm.svg?raw';
	import instagramIcon from '$lib/assets/icons/instagram.svg?raw';
	import discordIcon from '$lib/assets/icons/discord.svg?raw';
	import buymeacoffeeIcon from '$lib/assets/icons/buymeacoffee.svg?raw';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import LapikitLogo from '$lib/assets/images/lapikit.webp?enhanced';
	import { openConsentPreferences } from '$lib/stores/consent.svelte';
	import { npmState } from '$lib/stores/npm.svelte';
	import { resolve } from '$app/paths';

	// states
	let stepCode: number = $state(0);
	let counter: number = $state(19); // API GITHUB
	let stepTimeline: number = $state(0);
	let scrolled: boolean = $state(false);
	let year: number = new Date().getFullYear();

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}
	});

	// $effect(() => {
	// 	if ($viewport.innerWidth >= $breakpoints.md) {
	// 		if (browser && open) {
	// 			document.body.style.overflow = '';
	// 		}

	// 		open = false;
	// 	}
	// });

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});

	const stepperToUseComponent = [
		{
			title: 'Install Lapikit.',
			description:
				'Add Lapikit to your SvelteKit project in minutes. Read the <a href="/docs/getting-started">Quick Start</a> guide',
			icon: Rocket
		},
		{
			title: 'Add components.',
			description:
				'Choose from around 19 components in an accessible and customizable Svelte library',
			icon: Package
		},
		{
			title: 'Adapt to your design.',
			description:
				'Adjust spacing, colors, variants, or density to match your brand. Lapikit is fully style-aware',
			icon: PencilRuler
		}
	];

	const enableFeatures = [
		{
			icon: Sparkles,
			title: {
				en: 'Lightweight and fast'
			},
			description: {
				en: 'Lapikit is designed to be lightweight and fast, ensuring optimal performance for your applications'
			}
		},
		{
			icon: ChartSpline,
			title: {
				en: 'Transition and animations'
			},
			description: {
				en: 'You can easily add transitions and animations to your components thanks to built-in support for major animation libraries'
			}
		},
		{
			icon: Images,
			title: {
				en: 'Scoped styles'
			},
			description: {
				en: 'All styles are scoped to their specific components, preventing style leakage and maintaining consistent design throughout the application'
			}
		},
		{
			icon: Box,
			title: {
				en: 'Reusable components'
			},
			description: {
				en: 'A comprehensive library of pre-built, accessible, and customisable UI components to accelerate your development process'
			}
		},
		{
			icon: SwatchBook,
			title: {
				en: 'Customizable themes'
			},
			description: {
				en: "Includes light and dark themes that may be easily customized to match your brand's colors"
			}
		},
		{
			icon: TypeScriptIcon,
			title: {
				en: 'Typescript support'
			},
			description: {
				en: 'Lapikit, which is written in TypeScript, comes pre-loaded with type definitions for a better developer experience'
			}
		},
		{
			icon: SvelteIcon,
			title: {
				en: 'SvelteKit friendly'
			},
			description: {
				en: 'Lapikit is built on SvelteKit and fully supports its capabilities such as routing, server-side rendering, and static site generation'
			}
		}
	];

	type FooterLinkItem = {
		key: string;
		title: string;
		slug?: string;
		custom?: string;
		external?: boolean;
	};
	type FooterSection = { title: string; items: FooterLinkItem[] };
	const footer_links: Record<string, FooterSection> = {
		docs: {
			title: 'product',
			items: [
				{
					key: 'documentation',
					title: 'documentation',
					slug: '/docs'
				},
				{
					key: 'changelog',
					title: 'changelog',
					slug: '/docs/changelog'
				}
			]
		},
		policies: {
			title: 'policies',
			items: [
				{
					key: 'terms_and_privacy',
					title: 'terms & privacy',
					slug: '/terms'
				},
				{
					key: 'cookie',
					title: 'cookie consent',
					custom: 'cookie-consent'
				}
			]
		}
	};
</script>

<div class="home kit-theme--dark">
	<kit:appbar
		class="sticky! top-0 z-100"
		classContent="mx-auto flex w-full  items-center justify-between grid md:grid-cols-3 max-w-[95%]"
		s-style_background={scrolled ? 'var(--bg-primary-legacy)' : 'transparent'}
	>
		<div class="flex items-center justify-start gap-2">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={resolve('/')} style="color: var(--fg-primary-legacy)">
				<div class="flex items-center gap-2">
					<enhanced:img src={LapikitLogo} alt="Lapikit logo" class="no-select w-9.5 min-w-9.5" />
					<p class="text-2xl font-bold">Lapikit</p>
				</div>
			</a>

			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a
				href={resolve('/docs/changelog')}
				class="text-xs opacity-70 hover:opacity-100"
				style="color: var(--fg-primary-legacy)"
			>
				{npmState.version || 'v0.0.0'}
			</a>
		</div>

		<div class="flex items-center justify-end gap-2">
			<kit:btn href="/docs" s-style_background="var(--primary-legacy)">
				{#snippet prepend()}
					<kit:icon>
						<GraduationCap />
					</kit:icon>
				{/snippet}

				<span class="hidden! md:inline-block!">Documentation</span>
			</kit:btn>

			<kit:btn
				href="https://github.com/lapikit"
				target="_blank"
				aria-label="GitHub Lapikit"
				s-style_background="var(--secondary-legacy)"
			>
				{#snippet prepend()}
					<kit:icon>
						{@html githubIcon}
					</kit:icon>
				{/snippet}

				<span class="hidden! md:inline-block!">GitHub</span>
			</kit:btn>
		</div>
	</kit:appbar>

	<section id="hero" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div class="flex h-[calc(100vh-72px-30px)] flex-col md:h-[calc(100vh-100px-72px)]">
			<BackgroundStar />

			<div
				class="relative z-1 mx-auto my-auto flex w-full max-w-360 flex-col justify-center gap-8 px-4 text-center sm:gap-16 lg:grid lg:px-8"
			>
				<div class="absolute top-0 mx-auto w-full max-w-340 max-lg:hidden">
					<LapinosaureOnSpace />
				</div>

				<div class="absolute right-0 mt-32.5 mr-20 h-fit w-28.75 max-lg:hidden">
					<enhanced:img
						class="absolute -rotate-15"
						src={LapinosaureExpertLapikit}
						alt="lapinosaure expert lapikit"
					/>
					<enhanced:img
						class="animate-star-yolo no-select absolute top-20 -right-3.75 w-10 -rotate-30"
						src={StarMedium}
						alt="star medium"
					/>
				</div>

				<div>
					<kit:chip
						href="/docs/changelog"
						variant="outline"
						density="comfortable"
						style="--kit-chip-fg: var(--fg-primary-legacy); --outline-color: var(--fg-primary-legacy);"
						size="lg"
						class="px-1!"
					>
						{#snippet prepend()}
							<kit:chip density="compact" style="--kit-chip-bg: oklch(75.555% 0.2082 146.98);">
								<span>New 🎉</span>
							</kit:chip>
						{/snippet}

						Lapikit v0.6 is up!
						{#snippet append()}
							<kit:icon>
								<ChevronRight />
							</kit:icon>
						{/snippet}
					</kit:chip>
				</div>

				<div class="grid gap-4">
					<h1 class="text-4xl leading-[102%] font-semibold text-balance lg:max-w-4xl lg:text-7xl">
						Simple, optimized components for <span style="color: var(--service-svelte-legacy);">
							Svelte
						</span>
					</h1>
					<p
						class="mx-auto leading-[144%] font-medium sm:max-w-2xl md:w-9/12 md:max-w-2xl md:text-lg"
					>
						A library of accessible, high-performance, versatile components that let you develop
						fast, fully customizable interfaces.
					</p>
				</div>

				<div>
					<div class="flex justify-center gap-3 sm:gap-6">
						<kit:btn
							href="/docs/getting-started"
							background="accent-primary"
							color="white"
							rounded="xl"
							size="lg"
						>
							Get Started
						</kit:btn>
						<kit:btn
							href="/docs/components"
							variant="outline"
							color="accent-primary"
							rounded="xl"
							size="lg"
						>
							Browse Components
						</kit:btn>
					</div>
					<kit:btn
						id="install-lapikit-command-line"
						class="mt-2 px-2!"
						variant="text"
						density="compact"
						onclick={() => copyToClipboard('npm install -D lapikit')}
						s-style_--kit-btn-fg="var(--fg-primary-legacy)"
					>
						{#snippet prepend()}
							<span>~ </span>
						{/snippet}
						<span> npm install -D lapikit </span>
						{#snippet append()}
							<Copy />
						{/snippet}
					</kit:btn>
				</div>
			</div>

			<EarthMoonLapikit />
		</div>
	</section>

	<section
		id="discover-lapikit-integration"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
		class="relative z-1"
	>
		<div
			class="mx-auto flex w-full max-w-360 flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-32 md:py-40 lg:grid lg:px-8 lg:py-42"
		>
			<div>
				<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">Build faster, write cleaner code</h2>
				<p class="mt-6 text-left sm:text-lg">
					With Lapikit, you can easily create and manage your components, making your development
					process more efficient
				</p>
				<div
					class="mt-14 grid grid-cols-1 gap-4 md:grid-cols-[45%_1fr] lg:grid-cols-[45%_1fr] lg:items-stretch"
				>
					<div class="sm:text-lg">
						<p>
							Why waste time developing the same UI components on each project? With raw
							TailwindCSS, every button, card, and modal becomes a collection of repeating class
							blocks that clutter your codebase and complicate maintenance. Lapikit allows you to
							focus on what matters most: developing exceptional user experiences by delivering
							ready-to-use, customisable, and type-safe Svelte components
						</p>
						<p class="mt-6">With Lapikit, you write less but build more:</p>
						<ul class="mt-6!">
							<li class="mb-2 flex gap-2">
								<kit:icon>
									<CircleCheck color="#30d158" />
								</kit:icon>
								Your code will be cleaner, with simpler and more legible syntax
							</li>
							<li class="mb-2 flex gap-2">
								<kit:icon>
									<CircleCheck color="#30d158" />
								</kit:icon> Faster, thanks to reuse components and uniform styling
							</li>
							<li class="mb-2 flex gap-2">
								<kit:icon>
									<CircleCheck color="#30d158" />
								</kit:icon> More consistently, with pre-optimized Svelte + TypeScript integration
							</li>
							<li class="mb-2 flex gap-2">
								<kit:icon>
									<CircleCheck color="#30d158" />
								</kit:icon> Stop copying and duplicating CSS classes and start shipping better user interfaces
							</li>
						</ul>
						<p class="mt-6 italic md:mb-10">
							Instead of struggling with redundancy, you focus on the experience you want to offer
						</p>
						<kit:toolbar
							class="mt-4"
							classContent="md:justify-start justify-center gap-3"
							variant="text"
							density="compact"
						>
							<kit:btn
								onclick={() => (stepCode = 0)}
								active={stepCode === 0}
								rounded="xl"
								size="sm"
							>
								View Button
							</kit:btn>
							<kit:btn
								onclick={() => (stepCode = 1)}
								active={stepCode === 1}
								rounded="xl"
								size="sm"
							>
								Discover Card
							</kit:btn>
							<kit:btn
								onclick={() => (stepCode = 2)}
								active={stepCode === 2}
								rounded="xl"
								size="sm"
							>
								Explore Modal
							</kit:btn>
						</kit:toolbar>
					</div>
					<div>
						{#if stepCode === 0}
							<LazyRepl
								title="Button"
								content={{
									Lapikit: {
										code: () => import('../content/examples/home/btn-lapikit.svelte?raw'),
										lang: 'svelte'
									},
									Tailwind: {
										code: () => import('../content/examples/home/btn-tailwind.svelte?raw'),
										lang: 'svelte'
									},
									Native: {
										code: () => import('../content/examples/home/btn.svelte?raw'),
										lang: 'svelte'
									}
								}}
							/>
						{:else if stepCode === 1}
							<LazyRepl
								title="Card"
								content={{
									Lapikit: {
										code: () => import('../content/examples/home/card-lapikit.svelte?raw'),
										lang: 'svelte'
									},
									Tailwind: {
										code: () => import('../content/examples/home/card-tailwind.svelte?raw'),
										lang: 'svelte'
									},
									Native: {
										code: () => import('../content/examples/home/card.svelte?raw'),
										lang: 'svelte'
									}
								}}
							/>
						{:else if stepCode === 2}
							<LazyRepl
								title="Modal"
								content={{
									Lapikit: {
										code: () => import('../content/examples/home/modal-lapikit.svelte?raw'),
										lang: 'svelte'
									},
									Tailwind: {
										code: () => import('../content/examples/home/modal-tailwind.svelte?raw'),
										lang: 'svelte'
									},
									Native: {
										code: () => import('../content/examples/home/modal.svelte?raw'),
										lang: 'svelte'
									}
								}}
							/>
						{/if}
					</div>
				</div>
			</div>
			<div class="mt-16 text-center">
				<h3 class="text-xl font-semibold lg:text-3xl">
					There are an infinite amount of themes with just one configuration
				</h3>
				<p class="mx-auto mt-6 max-w-4xl text-center sm:text-lg">
					Lapikit supports several themes out of the box, allowing you to quickly swap between
					theming options with minimal setup.Light and dark modes are also supported. Switching
					themes or changing your design system takes seconds rather than hours
				</p>
				<div class="mt-16">
					<ColorSchemePreview />
				</div>
			</div>
		</div>
	</section>

	<section
		id="simply-process-to-use-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
		class="mb-12 h-fit text-center"
	>
		<div
			class="mx-auto flex w-full max-w-360 flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
				One library for your entire Svelte project
			</h2>

			<div
				class="mt-8 grid grid-cols-1 grid-rows-[1fr_100px_max-content] gap-4 lg:grid-cols-[55%_100px_1fr] lg:grid-rows-1"
			>
				<div>
					<div class="mx-auto my-0 max-w-162.5 rounded-lg">
						{#if stepTimeline === 0}
							<enhanced:img
								src={StepperInstallLapikit}
								alt="Install lapikit"
								class="no-select rounded-xl"
							/>
						{/if}
						{#if stepTimeline === 1}
							<enhanced:img
								src={StepperImportsComponents}
								alt="Imports Components"
								class="no-select rounded-xl"
							/>
						{/if}
						{#if stepTimeline === 2}
							<enhanced:img
								src={StepperCustomizeYourApp}
								alt="Customize Your App"
								class="no-select rounded-xl"
							/>
						{/if}
					</div>
				</div>
				<div class="timeline flex items-center justify-center">
					<div class="absolute flex gap-7 lg:hidden">
						{#each stepperToUseComponent as step, index (step)}
							{@const StepIcon = step.icon}
							<kit:btn
								active={stepTimeline === index}
								aria-label={`Display ${step.title}`}
								onclick={() => (stepTimeline = index)}
								rounded="xl"
								icon
								s-style_--kit-btn-bg={stepTimeline === index
									? 'var(--primary-legacy)'
									: 'var(--secondary-legacy)'}
							>
								<kit:icon>
									<StepIcon />
								</kit:icon>
							</kit:btn>
						{/each}
					</div>
				</div>
				<ul class="align-items-center flex justify-center lg:flex-col lg:gap-14">
					{#each stepperToUseComponent as step, index (step)}
						{@const StepIcon = step.icon}
						<li class="align-center flex justify-center lg:flex-col">
							<kit:btn
								class="absolute! -mt-21.25! hidden! lg:mt-0! lg:-ml-21.25! lg:inline-flex!"
								active={stepTimeline === index}
								aria-label={`Display ${step.title}`}
								onclick={() => (stepTimeline = index)}
								rounded="xl"
								icon
								s-style_--kit-btn-bg={stepTimeline === index
									? 'var(--primary-legacy)'
									: 'var(--secondary-legacy)'}
							>
								<kit:icon>
									<StepIcon />
								</kit:icon>
							</kit:btn>

							<p
								class="absolute hidden w-[50vw] sm:text-lg lg:relative lg:block! lg:w-auto lg:text-start"
								class:display-element={stepTimeline === index}
							>
								<strong class="font-semibold" style="color: var(--kit-accent-primary)">
									{step.title}
								</strong>

								{#if index === 0}
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html step.description}
								{:else if index === 1}
									{step.description.replace(
										'{{componentCount}}',
										counter ? counter.toString() : '0'
									)}
								{:else}
									{step.description}
								{/if}
							</p>
						</li>
					{/each}
				</ul>
			</div>
			<div class="mt-23 grid lg:mt-0 lg:grid-cols-[55%_100px_1fr]">
				<div></div>
				<div></div>
				<div>
					<kit:btn
						href="/docs/components"
						density="comfortable"
						class="max-sm:flex-col max-sm:p-[36px_29px]!"
						rounded="xl"
						size="lg"
					>
						Start Building with Lapikit

						{#snippet append()}
							<kit:chip
								size="xs"
								s-style_--kit-chip-bg="var(--fg-primary-legacy)"
								s-style_--kit-chip-fg="var(--bg-primary-legacy)"
							>
								{counter || 0} components
							</kit:chip>
						{/snippet}
					</kit:btn>
				</div>
			</div>
		</div>
	</section>

	<section
		id="discover-features-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
	>
		<div
			class="mx-auto flex w-full max-w-360 flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div>
				<div>
					<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
						Discover what functionalities are available for your application
					</h2>
					<p class="text-muted mt-6 text-left text-base text-balance sm:text-lg">
						Lapikit is a component library with a variety of features to help you create beautiful
						and functional web applications. Here are some of the features you can make use of:
					</p>
				</div>
				<div class="mt-16">
					<ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
						{#each enableFeatures as { title, description, icon } (title)}
							<li>
								<div>
									<div style="color: var(--kit-accent-primary)">
										{#if typeof icon === 'string'}
											<kit:icon size="xl" s-style_color="var(--primary-legacy)">
												{@html icon}
											</kit:icon>
										{:else}
											{@const FeatureIcon = icon}

											<kit:icon size="xl" s-style_color="var(--primary-legacy)">
												<FeatureIcon />
											</kit:icon>
										{/if}
									</div>
									<div>
										<p class="my-1 font-semibold">{title['en']}</p>
										<p>{description['en']}</p>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<div class="mt-16 flex justify-center">
						<kit:btn href="/docs" size="lg" rounded="xl">
							{capitalize(`It's not over yet!`)}

							{#snippet append()}
								<kit:icon>
									<ArrowRight />
								</kit:icon>
							{/snippet}
						</kit:btn>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section
		id="author-and-counter-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
	>
		<div
			class="mx-auto grid w-full max-w-360 items-center justify-center gap-8 px-4 py-16 pb-10! sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="flex items-center gap-4">
				<div>
					<kit:icon>
						<Quote style="transform: rotate(180deg);" />
					</kit:icon>
				</div>
				<p class="max-w-195 text-center md:text-lg">
					Lapikit is designed to simplify and streamline the work of front-end developers by
					limiting code redundancy, leaving more time for the development of advanced and complex
					features.
				</p>
				<div>
					<kit:icon>
						<Quote />
					</kit:icon>
				</div>
			</div>

			<div class="flex items-center justify-center gap-4">
				<enhanced:img
					src={NycolaideAvatar}
					alt="Creator Lapikit"
					width="40"
					height="40"
					class="no-select rounded-full"
				/>
				<div>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href="https://nycolaide.dev" target="_blank"><span>Nycolaide</span></a>
					<p class="text-sm">Creator of Lapikit</p>
				</div>
			</div>
		</div>

		<div
			class="max-w-360] mx-auto flex w-full flex-col gap-8 px-4 py-16 pt-8! sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="flex flex-col gap-4 md:flex-row md:items-stretch">
				<div class="flex flex-col gap-4 md:w-1/4">
					<kit:card
						href="https://www.npmjs.com/package/lapikit"
						target="_blank"
						class="flex flex-1 justify-center"
						s-style_--kit-card-bg="var(--bg-secondary-legacy)"
					>
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<kit:icon size="xl" style="color: var(--service-npm-legacy)">
								{@html npmIcon}
							</kit:icon>
							<div>
								<span class="text-highlighted text-xl font-semibold"
									>{npmState.downloads || '---'}</span
								>
								<p class="text-sm">Monthly downloads</p>
							</div>
						</div>
					</kit:card>

					<kit:card
						href="https://github.com/lapikit/lapikit"
						target="_blank"
						s-style_--kit-card-bg="var(--bg-secondary-legacy)"
						class="flex flex-1 justify-center"
					>
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<kit:icon size="xl">
								{@html githubIcon}
							</kit:icon>

							<div>
								<span class="text-highlighted text-xl font-semibold">2</span>
								<p class="text-sm">GitHub Stars</p>
							</div>
						</div>
					</kit:card>
				</div>

				<div class="flex md:w-1/2">
					<kit:card
						class="flex flex-1 justify-center"
						s-style_--kit-card-bg="var(--bg-secondary-legacy)"
					>
						<div class="flex h-full flex-col items-center justify-around gap-y-4 p-4 sm:p-6">
							<p class="text-center text-xl font-semibold">
								Open Source and built by developers, for developers
							</p>
							<p class="text-center">
								Lapikit is 100% open source, created and maintained by Nycolaide and a growing
								community of frontend developers. You can contribute on GitHub, report issues, or
								suggest new components.
							</p>
							<p class="text-center">
								Every contribution helps improve the developer experience for the entire Svelte
								community.
							</p>
							<kit:btn
								href="https://github.com/lapikit/lapikit"
								target="_blank"
								rounded="xl"
								class="px-4!"
								s-style_--kit-btn-bg="var(--fg-primary-legacy)"
								s-style_--kit-btn-fg="var(--bg-primary-legacy)"
							>
								Contribute to Lapikit on GitHub
								{#snippet append()}
									<kit:icon>
										{@html githubIcon}
									</kit:icon>
								{/snippet}
							</kit:btn>
						</div>
					</kit:card>
				</div>

				<div class="flex flex-col gap-4 md:w-1/4">
					<kit:card
						href="https://www.instagram.com/lapikit"
						target="_blank"
						s-style_--kit-card-bg="var(--bg-secondary-legacy)"
						class="flex flex-1 justify-center"
					>
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<div class="flex items-center">
								<div
									class="inline-flex h-fit items-center justify-center"
									style="background: var(--service-instagram-legacy); border-radius: 8px;"
								>
									<kit:icon size="xl" style="color: var(--service-instagram-legacy)">
										{@html instagramIcon}
									</kit:icon>
								</div>
							</div>

							<div>
								<span class="text-highlighted text-xl font-semibold">4</span>
								<p class="text-sm">Followers</p>
							</div>
						</div>
					</kit:card>

					<kit:card
						href="https://discord.gg/gn9ZGtDtK4"
						target="_blank"
						s-style_--kit-card-bg="var(--bg-secondary-legacy)"
						class="flex flex-1 justify-center"
					>
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<kit:icon style="color: var(--service-discord-legacy)" size="xl">
								{@html discordIcon}
							</kit:icon>

							<div>
								<span class="text-highlighted text-xl font-semibold">2</span>
								<p class="text-sm">Members</p>
							</div>
						</div>
					</kit:card>
				</div>
			</div>
		</div>
	</section>

	<section id="go-to-use-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto flex w-full max-w-360 flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="grid justify-center gap-4 text-center">
				<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">Go further with Lapikit</h2>
				<p class="sm:text-lg">
					Explore our documentation and resources to get the most out of Lapikit:
				</p>

				<div class="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
					<kit:card href="/docs" s-style_--kit-card-bg="var(--bg-secondary-legacy)">
						<div class="flex justify-between px-4 py-3">
							<div>
								<span class="font-semibold sm:text-lg">Documentations</span>
								<p>Learn how to install and use Lapikit in your project</p>
							</div>
							<div>
								<kit:icon size="lg">
									<ArrowRight />
								</kit:icon>
							</div>
						</div>
					</kit:card>
					<kit:card
						href="https://github.com/lapikit/lapikit.dev/blob/main/CONTRIBUTING.md"
						target="_blank"
						s-style_--kit-card-bg="var(--bg-secondary-legacy)"
					>
						<div class="flex justify-between px-4 py-3">
							<div>
								<span class="font-semibold sm:text-lg">Contribute</span>
								<p>
									Do you want to contribute to Lapikit? We provide a Contributor Guide to assist you
									in getting started
								</p>
							</div>
							<div>
								<kit:icon size="lg">
									<ArrowRight />
								</kit:icon>
							</div>
						</div>
					</kit:card>
					<kit:card
						href="https://github.com/lapikit/lapikit"
						target="_blank"
						s-style_--kit-card-bg="var(--bg-secondary-legacy)"
					>
						<div class="flex justify-between px-4 py-3">
							<div>
								<span class="font-semibold sm:text-lg">Sponsor</span>
								<p>Become a sponsor to help Lapikit create a strong community</p>
							</div>
							<div>
								<kit:icon size="lg">
									<ArrowRight />
								</kit:icon>
							</div>
						</div>
					</kit:card>
				</div>
			</div>
		</div>
	</section>

	<section
		id="sponsor-and-support-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
	>
		<div>
			<div
				class="mx-auto grid w-full max-w-(--ui-container) gap-14 px-4 py-16 text-center sm:gap-8 sm:px-6 sm:py-24 md:grid-cols-2 md:text-left lg:px-8 lg:py-32"
			>
				<div>
					<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
						You enjoy Lapikit, and I do, too
					</h2>
					<p class="text-muted mt-6 text-center text-base text-balance sm:text-lg md:text-left">
						Lapikit is free and open source software distributed under the MIT License. You may help
						us grow by contributing to the project and becoming a sponsor. Every gift actually
						counts! As a Lapikit contributor, you will gain visibility into the roadmap, have a say
						in the project's development, be recognized on our website, and receive priority support
					</p>

					<p class="mt-6 italic opacity-50 sm:text-lg">
						All donations and sponsorships will be utilized solely to support the development and
						maintenance of Lapikit
					</p>
					<kit:toolbar
						class="mt-10 max-md:mb-4 md:mt-8"
						classContent="max-sm:flex-col! sm:justify-center md:justify-start gap-6 md:gap-3"
						variant="text"
					>
						<kit:btn
							rounded="xl"
							href="https://github.com/lapikit/lapikit"
							target="_blank"
							aria-label="Open GitHub Sponsors"
							disabled
							s-style_--kit-btn-fg="var(--bg-primary-legacy)"
							s-style_--kit-btn-bg="var(--fg-primary-legacy)"
						>
							{#snippet prepend()}
								{@html githubIcon}
							{/snippet}
							Github Sponsors
							{#snippet append()}
								<kit:chip class="absolute! right-2.5 -bottom-4 px-2!" density="compact" size="sm">
									Coming soon
								</kit:chip>
							{/snippet}
						</kit:btn>

						<kit:btn
							href="https://www.buymeacoffee.com/nycolaide"
							target="_blank"
							rounded="xl"
							s-style_--kit-btn-bg="var(--service-buy-me-a-coffee-legacy)"
							s-style_--kit-btn-fg="var(--service-on-buy-me-a-coffee-legacy)"
						>
							{#snippet prepend()}
								<kit:icon size="lg">
									{@html buymeacoffeeIcon}
								</kit:icon>
							{/snippet}
							Buy me a coffee
						</kit:btn>
					</kit:toolbar>

					<kit:btn
						variant="text"
						href="/docs/roadmap"
						class="mt-3 underline! opacity-70"
						s-style_--kit-btn-fg="var(--secondary-legacy)"
					>
						Explore Lapikit roadmap 2026
					</kit:btn>
				</div>
				<div class="mx-auto my-auto flex w-full max-w-50 justify-center md:max-w-112.5">
					<enhanced:img
						src={LapikitLikeYou}
						alt="lapikit love you"
						class="no-select scale-x-[-1]"
					/>
				</div>
			</div>
		</div>
	</section>

	<section id="lapikit-is-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div>
			<div class="grid gap-4 text-center">
				<p class="text-[1rem] font-bold opacity-15 sm:text-[1.25rem] md:text-[1.75rem]">
					It's not magic, it's Lapikit
				</p>
			</div>
		</div>
	</section>

	<section id="enter-in-lapikit-core" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div>
			<div
				class="mx-auto w-full max-w-(--ui-container) px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-32"
			>
				<p class="text-2xl font-bold sm:text-3xl lg:text-4xl">Start exploring Lapikit</p>
				<p class="mt-6 sm:text-lg">Design system, themes, components, all in one lib</p>
				<kit:btn class="mt-8" href="/docs/components" rounded="xl" density="comfortable">
					Discover the components
					{#snippet append()}
						<kit:icon>
							<ArrowRight />
						</kit:icon>
					{/snippet}
				</kit:btn>
			</div>
		</div>
	</section>

	<footer>
		<div class="align-center flex h-px w-full flex-row items-center text-center">
			<kit:separator opacity="0.2" />
			<div class="mx-4 flex items-center gap-2">
				<enhanced:img class="no-select w-12" src={LapinosaureFace} alt="Lapikit logo icon" />
			</div>
			<kit:separator opacity="0.2" />
		</div>

		<div class="mx-auto flex w-full max-w-360 flex-col px-4 py-16 sm:px-6 sm:py-10 lg:px-8">
			<div class="mb-6 grid gap-3 sm:grid-cols-2 sm:gap-6">
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href="/" class="order-first">
					<div class="flex items-center gap-4">
						<enhanced:img
							src={LapikitLogo}
							alt="Lapikit logo icon"
							class="no-select w-10 md:w-17.5"
						/>
						<span class="mt-5 text-[2rem] font-semibold">Lapikit</span>
					</div>
				</a>

				<div class="order-last flex items-center gap-4 sm:order-0 sm:mt-5 sm:justify-end">
					<kit:btn
						href="https://www.npmjs.com/package/lapikit"
						target="_blank"
						variant="text"
						icon
						s-style_--kit-btn-fg="var(--service-npm-legacy)"
					>
						<kit:icon size="xl">
							{@html npmIcon}
						</kit:icon>
					</kit:btn>

					<kit:btn
						href="https://github.com/lapikit/lapikit"
						target="_blank"
						variant="text"
						icon
						s-style_--kit-btn-fg="var(--fg-primary-legacy)"
					>
						<kit:icon size="xl">
							{@html githubIcon}
						</kit:icon>
					</kit:btn>

					<kit:btn
						href="https://discord.gg/gn9ZGtDtK4"
						target="_blank"
						variant="text"
						icon
						s-style_--kit-btn-fg="var(--service-discord-legacy)"
					>
						<kit:icon size="xl">
							{@html discordIcon}
						</kit:icon>
					</kit:btn>
				</div>
			</div>
			<div class="grid gap-8 md:grid-cols-[1fr_auto]">
				<div class="grid gap-8 text-sm sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-8 lg:gap-16">
					{#each Object.entries(footer_links) as [sectionKey, sectionValue] (sectionKey)}
						<ul>
							<li class="mt-4 text-lg font-semibold">{capitalize(`${sectionValue.title}`)}</li>
							{#if Array.isArray(sectionValue.items)}
								{#each sectionValue.items as { key, title, slug, custom, external } (key)}
									{#if !custom}
										<li>
											<kit:btn
												href={slug}
												target={external ? '_blank' : '_self'}
												rounded="xl"
												variant="text"
												s-style_--kit-btn-fg="var(--fg-primary-legacy)"
											>
												{capitalize(`${title}`)}
											</kit:btn>
										</li>
									{:else if custom === 'cookie-consent'}
										<li>
											<kit:btn
												onclick={openConsentPreferences}
												rounded="xl"
												variant="text"
												s-style_--kit-btn-fg="var(--fg-primary-legacy)"
											>
												{capitalize(`${title}`)}
											</kit:btn>
										</li>
									{/if}
								{/each}
							{:else}
								{#each Object.entries(sectionValue.items as Record<string, FooterLinkItem>) as [key, { title, slug, external }] (key)}
									<li>
										<kit:btn
											href={slug}
											target={external ? '_blank' : '_self'}
											rounded="xl"
											variant="text"
											s-style_--kit-btn-fg="var(--fg-primary-legacy)"
										>
											{capitalize(`${title}`)}
										</kit:btn>
									</li>
								{/each}
							{/if}
						</ul>
					{/each}
				</div>

				<kit:card
					background="service-discord"
					color="service-on-discord"
					class="mt-6 rounded-lg! p-6! text-center! sm:mx-auto sm:max-w-87.5 md:text-start!"
					s-style_--kit-card-fg="var(--service-on-discord-legacy)"
					s-style_--kit-card-bg="var(--service-discord-legacy)"
				>
					<p class="text-xl font-semibold">Join our community on Discord</p>
					<p class="my-2 sm:text-lg">News, updates, and discussions await you!</p>
					<div>
						<kit:btn
							href="https://discord.gg/gn9ZGtDtK4"
							target="_blank"
							rounded="xl"
							s-style_--kit-btn-fg="var(--bg-primary-legacy)"
							s-style_--kit-btn-bg="var(--fg-primary-legacy)"
						>
							Chat with us
							{#snippet append()}
								<kit:icon size="lg">
									<MessageSquareText />
								</kit:icon>
							{/snippet}
						</kit:btn>
					</div>
				</kit:card>
			</div>

			<kit:toolbar
				class="mt-6"
				classContent="flex-col! md:flex-row! md:justify-between gap-2"
				s-style_--kit-toolbar-bg="transparent"
			>
				<p>
					Copyright © {year === 2025 ? year : `2025 - ${year}`} Lapikit -
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a
						href="https://github.com/lapikit/lapikit/blob/main/LICENSE"
						target="_blank"
						class="hover:underline">MIT License</a
					>
				</p>
				<div class="order-first flex gap-2 text-sm md:order-last">
					<span class="mr-1">Developed by</span>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a
						href="https://nycolaide.dev"
						target="_blank"
						style:color="var(--service-svelte-legacy)"
					>
						Nycolaide
					</a>
				</div>
			</kit:toolbar>
		</div>
	</footer>
</div>

<style>
	:global(#install-lapikit-command-line .copy-icon) {
		visibility: hidden;
	}

	:global(#install-lapikit-command-line:hover .copy-icon) {
		visibility: visible;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	@media (min-width: 1407px) {
		.home :global(.kit-repl) {
			width: 100% !important;
			margin-left: 0 !important;
		}
	}

	.home :global(.lazy-repl) {
		color: black;
	}

	:root {
		--ui-container: 90rem;
	}

	.home {
		--bg-primary-legacy: #000000;
		--fg-primary-legacy: #ffffff;
		--fg-secondary-legacy: #ffffff;
		--bg-secondary-legacy: oklch(29.39% 0.0036 286.18);
		--primary-legacy: hsl(220 90% 65%);
		--secondary-legacy: hsl(220deg 17.66% 49.12%);
		--service-buy-me-a-coffee-legacy: oklch(89.869% 0.1857 97.86);
		--service-on-buy-me-a-coffee-legacy: oklch(0% 0 0);
		--service-github-legacy: oklch(23.166% 0.0107 242.2);
		--service-svelte-legacy: oklch(65.432% 0.2341 34.2);
		--service-discord-legacy: oklch(56.453% 0.2066 274.24);
		--service-on-discord-legacy: oklch(100% 0 89.88);
		--service-npm-legacy: oklch(56.275% 0.1843 25.7);
		--service-instagram-legacy: linear-gradient(
			45deg,
			#833ab4 0%,
			#c13584 25%,
			#f56040 50%,
			#fcaf45 100%
		);
		background-color: var(--bg-primary-legacy);
		color: var(--fg-primary-legacy);
		font-family: 'Roboto Variable', sans-serif;
	}
</style>
