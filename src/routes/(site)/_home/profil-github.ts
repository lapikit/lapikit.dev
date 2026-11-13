import nycolaideImage from '$lib/assets/images/heros/nycolaide.jpeg?w=196&format=webp';
import fersimoneImage from '$lib/assets/images/heros/fersimone.jpeg?w=196&format=webp';

type ProfilGithub = {
	src: string;
	href: string;
	alt: string;
};

export const profilGithub: ProfilGithub[] = [
	{
		src: nycolaideImage,
		href: 'https://github.com/Nycolaide',
		alt: 'nycolaide github'
	},
	{
		src: fersimoneImage,
		href: 'https://github.com/fersimone',
		alt: 'fersimone github'
	}
];
