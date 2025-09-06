import Image from 'next/image';
import Link from 'next/link';

const links = [
	{
		url: 'https://www.kaggle.com/mashrursakif',
		imagePath: '/images/kaggle_icon.webp',
		name: 'Kaggle',
	},
	{
		url: 'https://zindi.africa/users/MashrurSakif',
		imagePath: '/images/zindi_icon.webp',
		name: 'Zindi',
	},
	{
		url: 'https://github.com/mashrursakif',
		imagePath: '/images/github_icon.webp',
		name: 'GitHub',
	},
];

export default function AboutMe() {
	return (
		<div className='bg-purple-50 w-full min-h-screen'>
			<div className='w-full max-w-[1200px] mx-auto flex flex-col justify-center items-center p-6 bg-transparent min-h-[400px]'>
				<h1 className='text-4xl color-primary font-bold mb-10'>About Me</h1>

				<div className='mb-8'>
					<div className='flex justify-center flex-wrap items-center gap-6'>
						<div>
							<Image
								src='/images/profile.jpg'
								alt='Profile Picture'
								width={200}
								height={200}
								className='w-[200px] h-[200px] object-cover rounded-lg'
							/>
						</div>

						<div className='w-full max-w-[600px] mx-auto px-4 text-gray-800'>
							<h2 className='text-2xl text-white-100 text-start mb-4'>
								Hi, I'm Mashrur Sakif Souherdo
							</h2>
							<p className='text-start text-lg'>
								I'm a student at Paramount School and College in Rajshahi,
								Bangladesh, currently finishing my A levels. I am interested in
								computer science and data science. I work on web development,
								machine learning, and related projects.
							</p>
						</div>
					</div>
				</div>

				<div>
					<h1 className='text-3xl text-center color-primary font-bold mb-10'>
						Connect
					</h1>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
						{links.map((link, idx) => (
							<div key={idx}>
								<Link href={link.url} target='_blank' rel='noopener noreferrer'>
									<div className='bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-md rounded-lg p-4 flex items-center gap-4'>
										<Image
											src={link.imagePath}
											width={50}
											height={50}
											alt={link.name}
										/>
										<p className='text-black text-xl'>{link.name}</p>
									</div>
								</Link>
							</div>
						))}
					</div>

					<p className='text-black text-lg mt-6'>
						<b>Email:</b> mashrursakifsouherdo@gmail.com
					</p>
				</div>
			</div>
		</div>
	);
}
