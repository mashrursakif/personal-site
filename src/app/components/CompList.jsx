import Image from 'next/image';
import Link from 'next/link';

export default function CompList({ comps }) {
  return (
    <div className='flex justify-center items-center flex-wrap gap-8'>
      {comps.length === 0 ? (
        <p>Nothing found</p>
      ) : (
        comps.map((comp, index) => (
          <Link key={index} href={comp.link}>
            <div className='bg-white shadow-md w-full max-w-[360px] h-[400px] rounded-lg overflow-hidden'>
              <div className=''>
                <Image
                  src={comp.imageUrl}
                  alt={comp.title}
                  width={360}
                  height={360}
                  className='w-full h-[200px] object-cover'
                />
              </div>

              <div className='p-4'>
                <h2 className='text-3xl color-secondary mb-4'>{comp.title}</h2>
                <p className='text-md text-gray-800'>{comp.description}</p>
                <p className='text-lg text-black'>{comp.placement}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
