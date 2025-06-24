// import { projects } from '@/app/data/dataLists';
import dynamic from 'next/dynamic';
// import ContentComponent from '@/app/content/projects/catBreedClassifier';
import Link from 'next/link';

const contentMap = {
  'outsmarting-outbreaks': dynamic(() =>
    import('@/app/content/competitions/DiseaseOutbreaks')
  ),
  'spam-emails': dynamic(() => import('@/app/content/competitions/SpamEmails')),
};

export default async function CompPage({ params }) {
  const { name } = await params;

  // const projectData = projects.find(
  //   (project) => project?.link.split('/')[1] == name
  // );

  const ContentComponent = contentMap[name];

  return (
    <>
      <div className='w-full max-w-[1200px] px-6 py-4 mx-auto bg-transparent flex justify-start gap-4'>
        <div>
          <Link href='/competitions'>
            <b>Competitions</b>
          </Link>
        </div>
        <div>
          <p>&gt;</p>
        </div>
        <div>
          <Link href={'/competitions/' + (name || '')}>
            <b>
              {(name || '')
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </b>
          </Link>
        </div>
      </div>

      <div className='bg-purple-50 w-full'>
        <div className='w-full max-w-[1000px] mx-auto flex justify-start px-4 py-8 min-h-screen'>
          <ContentComponent />
        </div>

        {/* <div className='min-h-[1000px]'></div> */}
      </div>
    </>
  );
}
