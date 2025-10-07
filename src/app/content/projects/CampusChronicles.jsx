import Link from 'next/link';

export default function CampusChronicles() {
	return (
		<div className='max-w-full text-black pb-20'>
			<div className='mb-10'>
				<h1 className='text-4xl font-bold mb-4 color-secondary'>
					Campus Chronicles Newsletter
				</h1>

				<p className='text-lg mb-4'>
					Website link:{' '}
					<Link
						className='text-lg underline text-blue-600 hover:text-blue-800'
						target='_blank'
						rel='noopener noreferrer'
						href='https://campus-chronicles-newsletter.vercel.app'
					>
						https://campus-chronicles-newsletter.vercel.app
					</Link>
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Project Overview
				</h2>

				<p className='text-lg mb-4'>
					Creating a website for Campus Chronicles, the weekly newsletter of
					Paramount School and College. It is a place where editors can publish
					their newsletters and students can easily view the content. It also
					functions as an archive for past posts and notices
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Features</h2>

				<ul className='list-disc list-inside'>
					<li className='text-lg mb-1'>
						Editors can upload and manage newsletters and notices through Google
						Drive
					</li>

					<li className='text-lg mb-1'>
						Automatic live updates to the site when new newsletters are
						published
					</li>

					<li className='text-lg mb-1'>
						Readers can access all new and past content from the webpage
					</li>

					<li className='text-lg mb-1'>
						Readers can search based on edition or date
					</li>

					<li className='text-lg mb-1'>
						Responsive design for mobile devices and small screens
					</li>
				</ul>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>Process</h2>

				<p className='text-lg mb-4'>
					The site is made using Next.js, designed with Tailwind, and it uses
					Google Drive API to fetch and display the newsletters; it is hosted
					through Vercel. The search feature is implemented using Fuse.js. The
					full project code can be found on my{' '}
					<Link
						className='text-lg underline text-blue-600 hover:text-blue-800'
						target='_blank'
						rel='noopener noreferrer'
						href='https://github.com/mashrursakif/campus-chronicles-newsletter'
					>
						GitHub repository
					</Link>
				</p>
			</div>

			<div className='mb-8'>
				<h2 className='text-2xl font-bold mb-4 color-secondary'>
					Closing Notes
				</h2>
				<p className='text-lg mb-4'>
					This project worked out quite well, and I am very proud of it. Working
					on designs, adding responsive layouts, handling API calls, all of it
					was a great way to learn and experiment with new things. I'm very
					happy with the result and the editors were very satisfied as well
				</p>
			</div>
		</div>
	);
}
