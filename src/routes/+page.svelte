<script lang="ts">
	import LapinosaureOnSpace from '$lib/@legacy/lapinosaure-on-space.svelte';
	import BackgroundStar from '$lib/assets/animations/background-star.svelte';
	import LapinosaureExpertLapikit from '$lib/@legacy/images/lapinosaure-expert-lapikit.webp?enhanced';
	import StarMedium from '$lib/@legacy/images/star-medium.webp?enhanced';
	import { Button, Card, Chip, Toolbar } from 'lapikit/components';
	import { ChevronRight, Copy } from 'lucide-svelte';
	import { capitalize, copyToClipboard } from '$lib/utils';
	import EarthMoonLapikit from '$lib/@legacy/earth-moon-lapikit.svelte';
	import { scrollAnimation } from '$lib/assets/animations/scroll-animation';
	import ColorSchemePreview from '$lib/@legacy/color-scheme-preview.svelte';
	import StepperInstallLapikit from '$lib/@legacy/images/install-lapikit.webp?enhanced';
	import StepperImportsComponents from '$lib/@legacy/images/imports-components.webp?enhanced';
	import StepperCustomizeYourApp from '$lib/@legacy/images/customize-your-app.webp?enhanced';
	import NycolaideAvatar from '$lib/@legacy/images/nycolaide.webp?enhanced';
	import LapikitLikeYou from '$lib/@legacy/images/lapinosaure-like-you.webp?enhanced';

	import '../plugins/lapikit.ts';

	// states
	let stepCode: number = $state(0);
	let displayCode: string = $state('lapikit');
	let counter: number = $state(19); // API GITHUB
	let stepTimeline: number = $state(0);

	const stepperToUseComponent = [
		{
			title: 'Install Lapikit.',
			description:
				'Add Lapikit to your SvelteKit project in minutes. Read the <a href="/docs/getting-started">Getting Started</a> guide',
			icon: 'mgc_rocket_line'
		},
		{
			title: 'Add components.',
			description:
				'Choose from around {{componentCount}} components in an accessible and customizable Svelte library',
			icon: 'mgc_package_line'
		},
		{
			title: 'Adapt to your design.',
			description:
				'Adjust spacing, colors, variants, or density to match your brand. Lapikit is fully style-aware',
			icon: 'mgc_paint_brush_ai_line'
		}
	];

	const enableFeatures = [
		{
			icon: 'mgc_sparkles_line',
			title: {
				en: 'Lightweight and fast'
			},
			description: {
				en: 'Lapikit is designed to be lightweight and fast, ensuring optimal performance for your applications'
			}
		},
		{
			icon: 'mgc_ease_in_out_control_point_line',
			title: {
				en: 'Transition and animations'
			},
			description: {
				en: 'You can easily add transitions and animations to your components thanks to built-in support for major animation libraries'
			}
		},
		{
			icon: 'mgc_pic_ai_line',
			title: {
				en: 'Scoped styles'
			},
			description: {
				en: 'All styles are scoped to their specific components, preventing style leakage and maintaining consistent design throughout the application'
			}
		},
		{
			icon: 'mgc_package_2_line',
			title: {
				en: 'Reusable components'
			},
			description: {
				en: 'A comprehensive library of pre-built, accessible, and customisable UI components to accelerate your development process'
			}
		},
		{
			icon: 'mgc_palette_2_line',
			title: {
				en: 'Customizable themes'
			},
			description: {
				en: "Includes light and dark themes that may be easily customized to match your brand's colors"
			}
		},
		{
			icon: '/icons/typescript-primary.svg',
			altIcon: 'TypeScript Logo',
			title: {
				en: 'Typescript support'
			},
			description: {
				en: 'Lapikit, which is written in TypeScript, comes pre-loaded with type definitions for a better developer experience'
			}
		},
		{
			icon: '/icons/svelte-primary.svg',
			altIcon: 'Svelte Logo',
			title: {
				en: 'SvelteKit friendly'
			},
			description: {
				en: 'Lapikit is built on SvelteKit and fully supports it’s capabilities such as routing, server-side rendering, and static site generation'
			}
		}
	];
</script>

<div class="home">
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
							href="/docs/getting-started"
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
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
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
							<li>Your code will be cleaner, with simpler and more legible syntax</li>
							<li>Faster, thanks to reuse components and uniform styling</li>
							<li>More consistently, with pre-optimized Svelte + TypeScript integration</li>
							<li>
								Stop copying and duplicating CSS classes and start shipping better user interfaces
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
						<!-- <Sandbox
					name="preview-lapikit"
					code={displayCode === 'lapikit'
						? stepCode === 2
							? HomepageModalLapikit
							: stepCode === 1
								? HomepageCardLapikit
								: HomepageButtonLapikit
						: displayCode === 'tailwindcss'
							? stepCode === 2
								? HomepageModalTailwind
								: stepCode === 1
									? HomepageCardTailwind
									: HomepageButtonTailwind
							: stepCode === 2
								? HomepageModalSvelte
								: stepCode === 1
									? HomepageCardSvelte
									: HomepageButtonSvelte}
					noExpandedButton
					noCopy
				>
					{#snippet actions()}
						<div class="ml-2 flex gap-2">
							<Button onclick={() => (displayCode = 'lapikit')} active={displayCode === 'lapikit'}>
								<enhanced:img
									src={SvelteLapikitIcon}
									alt="Lapikit Logo"
									width="55"
									height="28.51"
									class="no-select"
								/>
							</Button>
							<Button
								onclick={() => (displayCode = 'tailwindcss')}
								active={displayCode === 'tailwindcss'}
							>
								<enhanced:img
									src={SvelteTailwindIcon}
									alt="TailwindCSS Logo"
									width="55"
									height="21.79"
									class="no-select"
								/>
							</Button>
							<Button onclick={() => (displayCode = 'svelte')} active={displayCode === 'svelte'}>
								<enhanced:img
									src={SvelteIcon}
									alt="Svelte Logo"
									width="20"
									height="24"
									class="no-select"
								/>
							</Button>
						</div>
					{/snippet}
				</Sandbox> -->
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
							<Button
								rounded="full"
								active={stepTimeline === index}
								onclick={() => (stepTimeline = index)}
								aria-label={`Display ${step.title}`}
								background={stepTimeline === index ? 'accent-primary' : 'label-secondary'}
								color="white"
								icon
							>
								<!-- <Icon icon={step.icon} /> -->
							</Button>
						{/each}
					</div>
				</div>
				<ul class="align-items-center flex justify-center lg:flex-col lg:gap-14">
					{#each stepperToUseComponent as step, index (step)}
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
								<!-- <Icon icon={step.icon} /> -->
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
						{#each enableFeatures as { title, description, icon, altIcon } (title)}
							<li>
								<div>
									<div>
										<!-- <Icon {icon} size="xl" color="accent-primary" class="no-select" alt={altIcon} /> -->
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
								<!-- <Icon size="xl" icon="mgc_arrow_right_line" /> -->
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
					<!-- <Icon
						icon="mgc_quote_left_fill"
						style="--icon-multiplier-size: 16"
						color="accent-primary"
					/> -->
				</div>
				<p class="max-w-[780px] text-center md:text-lg">
					Lapikit is designed to simplify and streamline the work of front-end developers by
					limiting code redundancy, leaving more time for the development of advanced and complex
					features.
				</p>
				<div>
					<!-- <Icon
						icon="mgc_quote_right_fill"
						style="--icon-multiplier-size: 16"
						color="accent-primary"
					/> -->
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
							<!-- <Icon
								icon="/icons/npm-color.svg"
								size="xl"
								style="--icon-multiplier-size: 16"
								color="red"
								class="no-select"
								alt="NPM Logo"
							/> -->
							<div>
								<span class="text-highlighted text-xl font-semibold">46.4k</span>
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
							<!-- <Icon
								icon="mgc_github_line"
								size="xl"
								style="--icon-multiplier-size: 16"
								color="service-github"
							/> -->
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
									<!-- <Icon icon="mgc_github_line" /> -->
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
									<!-- <Icon
										icon="mgc_instagram_line"
										size="xl"
										style="--icon-multiplier-size: 16"
										color="service-on-instagram"
									/> -->
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
							<!-- <Icon
								icon="mgc_discord_fill"
								size="xl"
								style="--icon-multiplier-size: 16"
								color="service-discord"
							/> -->
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
								<!-- <Icon size="xl" icon="mgc_arrow_right_line" /> -->
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
								<!-- <Icon size="xl" icon="mgc_arrow_right_line" /> -->
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
								<!-- <Icon size="xl" icon="mgc_arrow_right_line" /> -->
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
								<!-- <Icon icon="mgc_github_line" /> -->
							{/snippet}
							Github Sponsors
							{#snippet append()}
								<!-- <Icon color="red" icon="mgc_heart_fill" /> -->

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
								<!-- <Icon icon="/icons/buymeacoffee.svg" class="no-select" alt="Buy me a coffee icon" /> -->
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
						<!-- <Icon size="xl" icon="mgc_arrow_right_fill" /> -->
					{/snippet}
				</Button>
			</div>
		</div>
	</section>
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
</style>
