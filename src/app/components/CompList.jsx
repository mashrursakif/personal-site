import Image from 'next/image';
import Link from 'next/link';

export default function CompList({ comps }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-8 mx-auto max-w-fit'>
      {/* <div className='flex items-center flex-wrap gap-8'> */}
      {comps.length === 0 ? (
        <p>Nothing found</p>
      ) : (
        comps.map((comp, index) => (
          <Link key={index} href={comp.link}>
            <div className='bg-white shadow-md w-full max-w-[360px] h-[480px] rounded-lg overflow-hidden flex flex-col'>
              <div>
                <Image
                  src={comp.imageUrl}
                  alt={comp.title}
                  width={360}
                  height={360}
                  className='w-full h-[200px] object-cover'
                />
              </div>

              <div className='p-4 flex flex-1 flex-col justify-between'>
                <div>
                  <h2 className='text-2xl color-secondary mb-4'>
                    {comp.title}
                  </h2>
                  <p className='text-md text-gray-800 mb-4'>
                    {comp.description}
                  </p>
                </div>

                <div>
                  <p className='text-lg text-black'>
                    <b>Placement: </b>
                    {comp.placement}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
