import ProjectList from '../components/ProjectList';
import { projects } from '../data/dataLists';

export default function Projects() {
  return (
    <div>
      <div className='w-full max-w-[1200px] mx-auto flex justify-center items-center px-8 py-16 bg-transparent min-h-[360px]'>
        <div className='w-full max-w-[600px] mx-auto px-4'>
          <h1 className='text-4xl text-white-100 text-center mb-4'>
            Personal Projects
          </h1>
          <p className='text-center text-xl'>
            These are projects I've worked on in my free time. It spans variety
            of things such as training deep learning models, or building a
            browser extension, and even this website itself! Making these was a
            great way for me to learn cool new things. And being able to use
            that knowledge in a practical way helped me get a deeper
            understanding of it as well. You can read about some of them below
          </p>
        </div>
      </div>

      <div className='bg-purple-50 min-h-[800px]'>
        <div className='projects-con w-full max-w-[1200px] mx-auto py-16 border-purple-800'>
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
}
