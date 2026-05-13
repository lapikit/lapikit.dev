<script lang="ts">
	import LapinosaureOnSpace from '$lib/@legacy/lapinosaure-on-space.svelte';
	import BackgroundStar from '$lib/assets/animations/background-star.svelte';
	import LapinosaureExpertLapikit from '$lib/@legacy/images/lapinosaure-expert-lapikit.webp?enhanced';
	import StarMedium from '$lib/@legacy/images/star-medium.webp?enhanced';
	import { Appbar, Button, Card, Chip, Icon, Separator, Toolbar } from 'lapikit/components';
	import {
		ArrowRight,
		Box,
		ChartSpline,
		ChevronRight,
		CircleCheck,
		Copy,
		GraduationCap,
		Images,
		Package,
		PencilRuler,
		Quote,
		Rocket,
		Sparkles,
		SwatchBook
	} from 'lucide-svelte';
	import { capitalize, copyToClipboard } from '$lib/utils';
	import EarthMoonLapikit from '$lib/@legacy/earth-moon-lapikit.svelte';
	import { scrollAnimation } from '$lib/assets/animations/scroll-animation';
	import ColorSchemePreview from '$lib/@legacy/color-scheme-preview.svelte';
	import StepperInstallLapikit from '$lib/@legacy/images/install-lapikit.webp?enhanced';
	import StepperImportsComponents from '$lib/@legacy/images/imports-components.webp?enhanced';
	import StepperCustomizeYourApp from '$lib/@legacy/images/customize-your-app.webp?enhanced';
	import NycolaideAvatar from '$lib/@legacy/images/nycolaide.webp?enhanced';
	import LapikitLikeYou from '$lib/@legacy/images/lapinosaure-like-you.webp?enhanced';
	import LapinosaureFace from '$lib/@legacy/images/lapinosaure-face.webp?enhanced';

	import '../plugins/lapikit.ts';
	import LazyRepl from '$lib/components/lazy-repl.svelte';
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
				'Add Lapikit to your SvelteKit project in minutes. Read the <a href="/docs/quick-start">Quick Start</a> guide',
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
	<Appbar
		class="sticky top-0 z-100"
		classContent="mx-auto flex w-full  items-center justify-between grid md:grid-cols-3 max-w-[95%]"
		background={scrolled ? 'background-primary' : 'transparent'}
	>
		<div class="flex items-center justify-start gap-2">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href="/">
				<div class="flex items-center gap-2">
					<enhanced:img
						src={LapikitLogo}
						alt="Lapikit logo"
						class="no-select w-[38px] min-w-[38px]"
					/>
					<p class="text-2xl font-bold">Lapikit</p>
				</div>
			</a>

			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href="/docs/changelog" class="text-xs opacity-70 hover:opacity-100">
				{npmState.version || 'v0.0.0'}
			</a>
		</div>

		<div class="flex items-center justify-end gap-2">
			<Button href="/docs" background="accent-primary">
				<GraduationCap />
				<span class="hidden! md:inline-block!">Documentation</span>
			</Button>

			<Button href="https://github.com/lapikit" target="_blank" aria-label="GitHub Lapikit">
				{#snippet prepend()}
					<Icon>
						{@html githubIcon}
					</Icon>
				{/snippet}

				<span class="hidden! md:inline-block!">GitHub</span>
			</Button>
		</div>
	</Appbar>

	<section id="hero" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div class="flex h-[calc(100vh-72px-30px)] flex-col md:h-[calc(100vh-100px-72px)]">
			<BackgroundStar />

			<div
				class="relative z-1 mx-auto my-auto flex w-full max-w-[90rem] flex-col justify-center gap-8 px-4 text-center sm:gap-16 lg:grid lg:px-8"
			>
				<div class="absolute top-0 mx-auto w-full max-w-[85rem] max-lg:hidden">
					<LapinosaureOnSpace />
				</div>

				<div class="absolute right-0 mt-[130px] mr-20 h-fit w-[115px] max-lg:hidden">
					<enhanced:img
						class="absolute -rotate-15"
						src={LapinosaureExpertLapikit}
						alt="lapinosaure expert lapikit"
					/>
					<enhanced:img
						class="animate-star-yolo no-select absolute top-[80px] -right-[15px] w-[40px] -rotate-30"
						src={StarMedium}
						alt="star medium"
					/>
				</div>

				<div>
					<Chip href="/docs/changelog" variant="outline" density="comfortable" size="lg">
						{#snippet prepend()}
							<Chip
								density="compact"
								color="white"
								style="background-color: var(--kit-accent-success) !important;"
								><span class="px-2">New 🎉</span></Chip
							>
						{/snippet}
						Lapikit v0.5 is up!
						{#snippet append()}
							<ChevronRight />
						{/snippet}
					</Chip>
				</div>

				<div class="grid gap-4">
					<h1 class="text-4xl leading-[102%] font-semibold text-balance lg:max-w-4xl lg:text-7xl">
						Simple, optimized components for <span style="color: var(--kit-service-svelte);">
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
						<Button
							href="/docs/quick-start"
							background="accent-primary"
							color="white"
							size={{ base: 'md', md: 'lg' }}
							rounded="full"
						>
							Get Started
						</Button>
						<Button
							href="/docs/components"
							variant="outline"
							color="accent-primary"
							size={{ base: 'md', md: 'lg' }}
							rounded="full"
						>
							Browse Components
						</Button>
					</div>
					<Button
						id="install-lapikit-command-line"
						class="mt-2 px-2!"
						variant="text"
						density="compact"
						size={{ base: 'sm', md: 'md' }}
						onclick={() => copyToClipboard('npm install -D lapikit')}
					>
						{#snippet prepend()}
							<span>~ </span>
						{/snippet}
						<span> npm install -D lapikit </span>
						{#snippet append()}
							<Copy />
						{/snippet}
					</Button>
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
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-32 md:py-40 lg:grid lg:px-8 lg:py-42"
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
								<CircleCheck color="#30d158" /> Your code will be cleaner, with simpler and more legible
								syntax
							</li>
							<li class="mb-2 flex gap-2">
								<CircleCheck color="#30d158" /> Faster, thanks to reuse components and uniform styling
							</li>
							<li class="mb-2 flex gap-2">
								<CircleCheck color="#30d158" /> More consistently, with pre-optimized Svelte + TypeScript
								integration
							</li>
							<li class="mb-2 flex gap-2">
								<CircleCheck color="#30d158" /> Stop copying and duplicating CSS classes and start shipping
								better user interfaces
							</li>
						</ul>
						<p class="mt-6 italic md:mb-10">
							Instead of struggling with redundancy, you focus on the experience you want to offer
						</p>
						<Toolbar
							class="mt-4"
							classContent="md:justify-start justify-center gap-3"
							background="transparent"
						>
							<Button
								onclick={() => (stepCode = 0)}
								active={stepCode === 0}
								rounded="full"
								background={stepCode === 0 ? 'accent-primary' : 'label-secondary'}
								color="white"
								size={{ base: 'sm', md: 'md' }}
							>
								View Button
							</Button>
							<Button
								onclick={() => (stepCode = 1)}
								active={stepCode === 1}
								rounded="full"
								background={stepCode === 1 ? 'accent-primary' : 'label-secondary'}
								color="white"
								size={{ base: 'sm', md: 'md' }}
							>
								Discover Card
							</Button>
							<Button
								onclick={() => (stepCode = 2)}
								active={stepCode === 2}
								rounded="full"
								background={stepCode === 2 ? 'accent-primary' : 'label-secondary'}
								color="white"
								size={{ base: 'sm', md: 'md' }}
							>
								Explore Modal
							</Button>
						</Toolbar>
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
		class="mb-[48px] h-fit text-center"
	>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
				One library for your entire Svelte project
			</h2>

			<div
				class="mt-8 grid grid-cols-1 grid-rows-[1fr_100px_max-content] gap-4 lg:grid-cols-[55%_100px_1fr] lg:grid-rows-1"
			>
				<div>
					<div class="mx-auto my-0 max-w-[650px] rounded-lg">
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
							<Button
								rounded="full"
								active={stepTimeline === index}
								onclick={() => (stepTimeline = index)}
								aria-label={`Display ${step.title}`}
								background={stepTimeline === index ? 'accent-primary' : 'label-secondary'}
								color="white"
								icon
							>
								<StepIcon />
							</Button>
						{/each}
					</div>
				</div>
				<ul class="align-items-center flex justify-center lg:flex-col lg:gap-14">
					{#each stepperToUseComponent as step, index (step)}
						{@const StepIcon = step.icon}
						<li class="align-center flex justify-center lg:flex-col">
							<Button
								class="absolute! -mt-[85px]! hidden! lg:mt-0! lg:-ml-[85px]! lg:inline-flex!"
								rounded="full"
								aria-label={`Display ${step.title}`}
								active={stepTimeline === index}
								onclick={() => (stepTimeline = index)}
								background={stepTimeline === index ? 'accent-primary' : 'label-secondary'}
								color="white"
								icon
							>
								<StepIcon />
							</Button>
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
					<Button
						density="comfortable"
						size={{ base: 'sm', sm: 'md', md: 'lg' }}
						href="/docs/components"
						rounded="full"
						background="accent-primary"
						color="white"
						class="max-sm:flex-col max-sm:p-[36px_29px]!"
					>
						Start Building with Lapikit

						{#snippet append()}
							<Chip
								class="!px-2 "
								size={{ base: 'xs', md: 'sm' }}
								density="compact"
								background="white"
								color="black"
							>
								{counter || 0} components
							</Chip>
						{/snippet}
					</Button>
				</div>
			</div>
		</div>
	</section>

	<section
		id="discover-features-lapikit"
		use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}
	>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
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
									<div class="icon-md" style="color: var(--kit-accent-primary)">
										{#if typeof icon === 'string'}
											{@html icon}
										{:else}
											{@const FeatureIcon = icon}

											<FeatureIcon />
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
						<Button
							href="/docs"
							size="lg"
							class="px-4!"
							color="white"
							background="accent-primary"
							rounded="full"
						>
							{capitalize(`It's not over yet!`)}

							{#snippet append()}
								<ArrowRight />
							{/snippet}
						</Button>
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
			class="mx-auto grid w-full max-w-[90rem] items-center justify-center gap-8 px-4 py-16 pb-10! sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="flex items-center gap-4">
				<div>
					<Quote style="transform: rotate(180deg);" />
				</div>
				<p class="max-w-[780px] text-center md:text-lg">
					Lapikit is designed to simplify and streamline the work of front-end developers by
					limiting code redundancy, leaving more time for the development of advanced and complex
					features.
				</p>
				<div>
					<Quote />
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
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 pt-8! sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="flex flex-col gap-4 md:flex-row md:items-stretch">
				<div class="flex flex-col gap-4 md:w-1/4">
					<Card
						href="https://www.npmjs.com/package/lapikit"
						target="_blank"
						background="background-tertiary"
						class="flex flex-1 justify-center"
					>
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<div class="icon-size-xl" style="color: var(--kit-service-npm)">
								{@html npmIcon}
							</div>
							<div>
								<span class="text-highlighted text-xl font-semibold">{npmState.downloads || '---'}</span>
								<p class="text-sm">Monthly downloads</p>
							</div>
						</div>
					</Card>

					<Card
						href="https://github.com/lapikit/lapikit"
						target="_blank"
						background="background-tertiary"
						class="flex flex-1 justify-center"
					>
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<div class="icon-size-xl">
								{@html githubIcon}
							</div>

							<div>
								<span class="text-highlighted text-xl font-semibold">2</span>
								<p class="text-sm">GitHub Stars</p>
							</div>
						</div>
					</Card>
				</div>

				<div class="flex md:w-1/2">
					<Card class="flex flex-1 justify-center" background="background-tertiary">
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
							<Button
								href="https://github.com/lapikit/lapikit"
								target="_blank"
								rounded="full"
								class="px-4!"
								color="service-on-github"
								background="service-github"
							>
								Contribute to Lapikit on GitHub
								{#snippet append()}
									{@html githubIcon}
								{/snippet}
							</Button>
						</div>
					</Card>
				</div>

				<div class="flex flex-col gap-4 md:w-1/4">
					<Card
						href="https://www.instagram.com/lapikit"
						target="_blank"
						background="background-tertiary"
						class="flex flex-1 justify-center"
					>
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<div class="flex items-center">
								<div
									class="inline-flex h-fit items-center justify-center"
									style="background: var(--kit-service-instagram); border-radius: 8px;"
								>
									<div class="icon-size-xl" style="color: var(--kit-service-instagram)">
										{@html instagramIcon}
									</div>
								</div>
							</div>

							<div>
								<span class="text-highlighted text-xl font-semibold">4</span>
								<p class="text-sm">Followers</p>
							</div>
						</div>
					</Card>

					<Card
						href="https://discord.gg/gn9ZGtDtK4"
						target="_blank"
						background="background-tertiary"
						class="flex flex-1 justify-center"
					>
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<div class="icon-size-xl" style="color: var(--kit-service-discord)">
								{@html discordIcon}
							</div>
							<div>
								<span class="text-highlighted text-xl font-semibold">2</span>
								<p class="text-sm">Members</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	</section>

	<section id="go-to-use-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="grid justify-center gap-4 text-center">
				<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">Go further with Lapikit</h2>
				<p class="sm:text-lg">
					Explore our documentation and resources to get the most out of Lapikit:
				</p>

				<div class="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
					<Card href="/docs">
						<div class="flex justify-between px-4 py-3">
							<div>
								<span class="font-semibold sm:text-lg">Documentations</span>
								<p>Learn how to install and use Lapikit in your project</p>
							</div>
							<div>
								<ArrowRight />
							</div>
						</div>
					</Card>
					<Card
						href="https://github.com/lapikit/lapikit.dev/blob/main/CONTRIBUTING.md"
						target="_blank"
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
								<ArrowRight />
							</div>
						</div>
					</Card>
					<Card href="https://github.com/lapikit/lapikit" target="_blank">
						<div class="flex justify-between px-4 py-3">
							<div>
								<span class="font-semibold sm:text-lg">Sponsor</span>
								<p>Become a sponsor to help Lapikit create a strong community</p>
							</div>
							<div>
								<ArrowRight />
							</div>
						</div>
					</Card>
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
					<Toolbar
						class="mt-10 max-md:mb-4 md:mt-8"
						classContent="max-sm:flex-col! sm:justify-center md:justify-start gap-6 md:gap-3"
						background="transparent"
					>
						<Button
							background="service-github"
							color="service-on-github"
							rounded="full"
							href="https://github.com/lapikit/lapikit"
							target="_blank"
							class="px-4!"
							aria-label="Open GitHub Sponsors"
							disabled
						>
							{#snippet prepend()}
								{@html githubIcon}
							{/snippet}
							Github Sponsors
							{#snippet append()}
								<Chip
									background="accent-primary"
									color="white"
									class="absolute! right-[10px] bottom-[-16px] px-2!"
									density="compact"
									size="sm"
								>
									Coming soon
								</Chip>
							{/snippet}
						</Button>
						<Button
							background="service-buy-me-a-coffee"
							color="service-on-buy-me-a-coffee"
							rounded="full"
							href="https://www.buymeacoffee.com/nycolaide"
							target="_blank"
							class="px-4!"
						>
							{#snippet prepend()}
								<div class="icon-md">
									{@html buymeacoffeeIcon}
								</div>
							{/snippet}
							Buy me a coffee
						</Button>
					</Toolbar>

					<Button variant="text" href="/docs/roadmap" class="mt-3 underline! opacity-70"
						>Explore Lapikit roadmap 2026</Button
					>
				</div>
				<div class="mx-auto my-auto flex w-full max-w-[200px] justify-center md:max-w-[450px]">
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
				<Button
					class="mt-8"
					href="/docs/components"
					rounded="full"
					density="comfortable"
					background="accent-primary"
					color="white"
				>
					Discover the components
					{#snippet append()}
						<ArrowRight />
					{/snippet}
				</Button>
			</div>
		</div>
	</section>

	<footer>
		<div class="align-center flex h-px w-full flex-row items-center text-center">
			<Separator opacity="0.2" />
			<div class="mx-4 flex items-center gap-2">
				<enhanced:img class="no-select w-[3rem]" src={LapinosaureFace} alt="Lapikit logo icon" />
			</div>
			<Separator opacity="0.2" />
		</div>

		<div class="mx-auto flex w-full max-w-[90rem] flex-col px-4 py-16 sm:px-6 sm:py-10 lg:px-8">
			<div class="mb-6 grid gap-3 sm:grid-cols-2 sm:gap-6">
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href="/" class="order-first">
					<div class="flex items-center gap-4">
						<enhanced:img
							src={LapikitLogo}
							alt="Lapikit logo icon"
							class="no-select w-[40px] md:w-[70px]"
						/>
						<span class="mt-5 text-[2rem] font-semibold">Lapikit</span>
					</div>
				</a>

				<div class="order-last flex items-center gap-4 sm:order-none sm:mt-5 sm:justify-end">
					<a
						href="https://www.npmjs.com/package/lapikit"
						target="_blank"
						class="icon-md"
						style="color: var(--kit-service-npm)"
					>
						{@html npmIcon}
					</a>

					<a
						href="https://github.com/lapikit/lapikit"
						target="_blank"
						class="icon-md"
						style="color: var(--kit-service-github)"
					>
						{@html githubIcon}
					</a>

					<a
						href="https://discord.gg/gn9ZGtDtK4"
						target="_blank"
						class="icon-md"
						style="color: var(--kit-service-discord)"
					>
						{@html discordIcon}
					</a>
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
											<Button
												href={slug}
												target={external ? '_blank' : '_self'}
												rounded="full"
												variant="text"
											>
												{capitalize(`${title}`)}
											</Button>
										</li>
									{:else if custom === 'cookie-consent'}
										<li>
											<Button onclick={openConsentPreferences} rounded="full" variant="text">
												{capitalize(`${title}`)}
											</Button>
										</li>
									{/if}
								{/each}
							{:else}
								{#each Object.entries(sectionValue.items as Record<string, FooterLinkItem>) as [key, { title, slug, external }] (key)}
									<li>
										<Button
											href={slug}
											target={external ? '_blank' : '_self'}
											rounded="full"
											variant="text"
										>
											{capitalize(`${title}`)}
										</Button>
									</li>
								{/each}
							{/if}
						</ul>
					{/each}
				</div>

				<Card
					background="service-discord"
					color="service-on-discord"
					class="mt-6 rounded-lg! p-6! text-center! sm:mx-auto sm:max-w-[350px] md:text-start!"
				>
					<p class="text-xl font-semibold">Join our community on Discord</p>
					<p class="my-2 sm:text-lg">News, updates, and discussions await you!</p>
					<div>
						<Button
							href="https://discord.gg/gn9ZGtDtK4"
							target="_blank"
							size={{ base: 'md', sm: 'lg' }}
							rounded="full"
							class="px-5!"
						>
							Chat with us
							{#snippet append()}
								<Icon size="lg" icon="mgc_chat_1_line" />
							{/snippet}
						</Button>
					</div>
				</Card>
			</div>

			<Toolbar
				class="mt-6"
				classContent="flex-col! md:flex-row! md:justify-between gap-2"
				background="transparent"
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
					<a href="https://nycolaide.dev" target="_blank" style:color="var(--kit-service-svelte)">
						Nycolaide
					</a>
				</div>
			</Toolbar>
		</div>
	</footer>
</div>

<style>
	/* lapikit css legacy */
	:root {
		--kit-label-primary: oklch(0% 0 0);
		--kit-label-secondary: oklch(64.831% 0.0073 286.19);
		--kit-label-tertiary: oklch(75.204% 0.0057 286.26);
		--kit-label-quaternary: oklch(83.116% 0.0069 286.25);
		--kit-accent-primary: oklch(60.276% 0.2177 257.42);
		--kit-accent-success: oklch(73.032% 0.1944 147.44);
		--kit-accent-warning: oklch(76.524% 0.1752 62.57);
		--kit-accent-destructive: oklch(65.421% 0.2321 28.66);
		--kit-accent-info: oklch(70.679% 0.1327 233.88);
		--kit-separator-default: oklch(83.116% 0.0069 286.25);
		--kit-separator-opaque: oklch(86.216% 0.0068 286.26);
		--kit-state-placeholder: oklch(83.116% 0.0069 286.25);
		--kit-state-disabled: oklch(75.204% 0.0057 286.26);
		--kit-state-link: oklch(60.276% 0.2177 257.42);
		--kit-state-highlight: oklch(92.334% 0.0067 286.27);
		--kit-state-shadow: oklch(14.514% 0.1006 264.05);
		--kit-background-primary: oklch(100% 0 89.88);
		--kit-background-secondary: oklch(96.257% 0.0066 286.27);
		--kit-background-tertiary: oklch(92.334% 0.0067 286.27);
		--kit-background-grouped-primary: oklch(96.257% 0.0066 286.27);
		--kit-background-grouped-secondary: oklch(100% 0 89.88);
		--kit-background-grouped-tertiary: oklch(96.257% 0.0066 286.27);
		--kit-service-github: oklch(23.166% 0.0107 242.2);
		--kit-service-on-github: oklch(97.913% 0 89.88);
		--kit-service-svelte: oklch(65.432% 0.2341 34.2);
		--kit-service-buy-me-a-coffee: oklch(89.869% 0.1857 97.86);
		--kit-service-on-buy-me-a-coffee: oklch(0% 0 0);
		--kit-service-discord: oklch(56.453% 0.2066 274.24);
		--kit-service-on-discord: oklch(100% 0 89.88);
		--kit-service-npm: oklch(56.275% 0.1843 25.7);
		--kit-service-on-npm: oklch(100% 0 89.88);
		--kit-service-x: oklch(23.166% 0.0107 242.2);
		--kit-service-instagram: linear-gradient(
			45deg,
			#833ab4 0%,
			#c13584 25%,
			#f56040 50%,
			#fcaf45 100%
		);
		--kit-service-on-instagram: oklch(100% 0 89.88);
		--kit-test-variable: 1rem;
		--system-spacing: 0.125rem;
		--system-shape-sm: 0.125rem;
		--system-shape-md: 0.25rem;
		--system-shape-lg: 0.5rem;
		--system-shape-xl: 0.75rem;
		--system-shape-2xl: 1rem;
		--system-shape-3xl: 1.5rem;
		--system-shape-full: 9999px;
		--system-dialog-xs: 18.75rem;
		--system-dialog-sm: 25rem;
		--system-dialog-md: 37.5rem;
		--system-dialog-lg: 53.125rem;
		--system-dialog-xl: 75rem;
		--system-modal-xs: 18.75rem;
		--system-modal-sm: 25rem;
		--system-modal-md: 37.5rem;
		--system-modal-lg: 53.125rem;
		--system-modal-xl: 75rem;
		--system-animation-ripple-duration: 0.4s;
	}

	.kit-theme--dark {
		color-scheme: dark;
		--kit-pink: oklch(86.774% 0.0735 7.09);
		--kit-label-primary: oklch(100% 0 89.88);
		--kit-label-secondary: oklch(50.07% 0.0047 286.23);
		--kit-label-tertiary: oklch(40.238% 0.0033 286.25);
		--kit-label-quaternary: oklch(34.92% 0.0034 286.22);
		--kit-accent-primary: oklch(62.425% 0.2056 255.49);
		--kit-accent-success: oklch(75.555% 0.2082 146.98);
		--kit-accent-warning: oklch(78.237% 0.1711 67.22);
		--kit-accent-destructive: oklch(66.33% 0.2236 28.29);
		--kit-accent-info: oklch(81.662% 0.1185 227.75);
		--kit-separator-default: oklch(40.238% 0.0033 286.25);
		--kit-separator-opaque: oklch(34.92% 0.0034 286.22);
		--kit-state-placeholder: oklch(40.238% 0.0033 286.25);
		--kit-state-disabled: oklch(34.92% 0.0034 286.22);
		--kit-state-link: oklch(62.425% 0.2056 255.49);
		--kit-state-highlight: oklch(29.39% 0.0036 286.18);
		--kit-state-shadow: oklch(23.065% 0.1598 264.05);
		--kit-background-primary: oklch(0% 0 0);
		--kit-background-secondary: oklch(22.728% 0.0038 286.09);
		--kit-background-tertiary: oklch(29.39% 0.0036 286.18);
		--kit-background-grouped-primary: oklch(22.728% 0.0038 286.09);
		--kit-background-grouped-secondary: oklch(29.39% 0.0036 286.18);
		--kit-background-grouped-tertiary: oklch(34.92% 0.0034 286.22);
		--kit-service-github: oklch(97.913% 0 89.88);
		--kit-service-on-github: oklch(23.166% 0.0107 242.2);
		--kit-service-svelte: oklch(65.432% 0.2341 34.2);
		--kit-service-buy-me-a-coffee: oklch(89.869% 0.1857 97.86);
		--kit-service-on-buy-me-a-coffee: oklch(0% 0 0);
		--kit-service-discord: oklch(56.453% 0.2066 274.24);
		--kit-service-on-discord: oklch(100% 0 89.88);
		--kit-service-npm: oklch(56.275% 0.1843 25.7);
		--kit-service-on-npm: oklch(100% 0 89.88);
		--kit-service-x: oklch(97.913% 0 89.88);
		--kit-service-instagram: linear-gradient(
			45deg,
			#833ab4 0%,
			#c13584 25%,
			#f56040 50%,
			#fcaf45 100%
		);
		--kit-service-on-instagram: oklch(100% 0 89.88);
		--kit-test-variable: 1rem;
	}

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

	/* @layer components { */
	/* @import 'lapikit/styles'; */
	/* } */

	.icon-md :global(svg) {
		width: 24px;
		height: 24px;
	}

	.icon-size-xl {
		align-items: center;
		display: flex;
	}
	.icon-size-xl :global(svg) {
		width: 32px;
		height: 32px;
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
		background-color: var(--kit-background-primary);
		color: var(--kit-label-primary);
		font-family: 'Roboto Variable', sans-serif;
	}
</style>
