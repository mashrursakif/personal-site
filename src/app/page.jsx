import Link from 'next/link';
import ProjectList from './components/ProjectList';
import CompList from './components/CompList';
import { projects, comps } from './data/dataLists';

export default function Home() {
  return (
    <div>
      <div className='w-full max-w-[1200px] mx-auto flex justify-center items-center px-4 bg-transparent min-h-[400px]'>
        <div className='w-full max-w-[600px] mx-auto px-4'>
          <h1 className='text-4xl text-white-100 text-start mb-4'>
            I'm Mashrur Sakif
          </h1>
          <p className='text-start text-xl'>
            Hi, I'm a data science, machine learning enthusiast. Welcome to my
            site! This is a place where I talk about personal projects that I'm
            working on, ML competitions I'm participating in and other topics
            relating to ML, web development, and more
          </p>
        </div>
      </div>

      <div className='bg-purple-50 min-h-[800px]'>
        <div className='projects-con w-full max-w-[1200px] mx-auto py-16 border-b-1 border-purple-800'>
          <h1 className='text-4xl color-primary mb-12 text-center'>
            Personal Projects
          </h1>
          {/* <p className='text-center text-xl mb-8'></p> */}

          <ProjectList projects={projects.slice(0, 4)} />

          <div className='flex justify-center items-center'>
            <Link href='/projects'>
              <button className='bg-secondary text-white-100 px-4 py-2 rounded-md mt-8 cursor-pointer'>
                View all projects
              </button>
            </Link>
          </div>
        </div>

        <div className='comps-con mb-16 w-full max-w-[1200px] mx-auto py-16 border-b-1 border-purple-800'>
          <h1 className='text-4xl color-primary mb-12 text-center'>
            ML Competitions
          </h1>

          <CompList comps={comps.slice(0, 4)} />

          <div className='flex justify-center items-center'>
            <Link href='/competitions'>
              <button className='bg-secondary text-white-100 px-4 py-2 rounded-md mt-8 cursor-pointer'>
                View all Competitions
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className='bg-purple-50 min-h-[600px]'>
        <div className='comp-con mb-16 w-full max-w-[1200px] mx-auto px-4'>
          <h1 className='font-bold text-3xl text-gray-100 mb-8'>
            Competitions
          </h1>

          <p>Nothing found :P</p>
        </div>
      </div> */}
    </div>
  );
}
