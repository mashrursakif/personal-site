import Image from 'next/image';
import Link from 'next/link';

export default function ProjectList({ projects }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-8 mx-auto max-w-fit'>
      {projects.length === 0 ? (
        <p>Nothing found</p>
      ) : (
        projects.map((project, index) => (
          <Link key={index} href={project.link}>
            <div className='bg-white shadow-md w-full max-w-[360px] h-[400px] rounded-lg overflow-hidden'>
              <div className=''>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={360}
                  height={360}
                  className='w-full h-[200px] object-cover'
                />
              </div>

              <div className='p-4'>
                <h2 className='text-2xl color-secondary mb-4'>
                  {project.title}
                </h2>
                <p className='text-md text-gray-800'>{project.description}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
