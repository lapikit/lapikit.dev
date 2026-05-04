<script>
	import LapinosaureOnSpace from '$lib/@legacy/lapinosaure-on-space.svelte';
	import BackgroundStar from '$lib/assets/animations/background-star.svelte';
	import LapinosaureExpertLapikit from '$lib/@legacy/images/lapinosaure-expert-lapikit.webp?enhanced';
	import StarMedium from '$lib/@legacy/images/star-medium.webp?enhanced';
	import { Button, Chip } from 'lapikit/components';
	import { ChevronRight, Copy } from 'lucide-svelte';
	import { copyToClipboard } from '$lib/utils';
	import EarthMoonLapikit from '$lib/@legacy/earth-moon-lapikit.svelte';
	import { scrollAnimation } from '$lib/assets/animations/scroll-animation';
</script>

<div class="home">
	<section id="hero" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div class="flex h-[calc(100vh-72px-30px)] flex-col md:h-[calc(100vh-100px-72px)]">
			<BackgroundStar />

			<div
				class="relative z-1 mx-auto my-auto flex w-full max-w-[90rem] flex-col justify-center gap-8 px-4 text-center sm:gap-16 lg:grid lg:px-8"
			>
				<div class="no-select absolute top-0 mx-auto w-full max-w-[85rem] max-lg:hidden">
					<LapinosaureOnSpace />
				</div>

				<div class="no-select absolute right-0 mt-[130px] mr-20 h-fit w-[115px] max-lg:hidden">
					<enhanced:img
						class="no-select absolute -rotate-15"
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
							<Chip background="accent-success" density="compact" color="white"
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
		Integration
	</section>
</div>

<style>
	:global(#install-lapikit-command-line .copy-icon) {
		visibility: hidden;
	}

	:global(#install-lapikit-command-line:hover .copy-icon) {
		visibility: visible;
	}
</style>
