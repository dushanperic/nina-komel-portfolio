import worksJson from './works.json';

interface WorkInt {
  title: string;
  description: string;
  files: string[];
}

export const localStorageKey = 'nina-komel.last_visit';
const MAX_SESION_TIME = 10;
const { works } = worksJson;

const setStorage = (val: string) => {
  window.localStorage.setItem(localStorageKey, val);
};

const checkIsAuthorized = (date: string | null): { isAuthorized: boolean } => {
  if (!date) {
    return { isAuthorized: false };
  }

  const input: Date = new Date(date);
  const now: Date = new Date();

  const diffTime = Math.abs(now.getTime() - input.getTime());
  // const diffDays = Math.floor(diffTime / (24 * 60 * 60 * 60));

  return { isAuthorized: diffTime / 1000 > MAX_SESION_TIME ? false : true };
};

const renderWorks = (): void => {
  const container = document.querySelector<HTMLDivElement>('#works-container');
  if (!container) return;

  container.innerHTML = '';

  works.forEach((work) => {
    const _work = createWorkElement(work);
    container?.appendChild(_work);
  });
};

const createWorkElement = (work: WorkInt): HTMLDivElement => {
  const container = document.createElement('div') as HTMLDivElement;
  const filesContainer = document.createElement('div') as HTMLDivElement;
  const title = document.createElement('span') as HTMLSpanElement;
  const description = document.createElement('span') as HTMLSpanElement;

  container.classList.add('work');
  title.classList.add('work-title');
  description.classList.add('work-description');
  filesContainer.classList.add('work-files');
  title.innerHTML = work.title;
  description.innerHTML = work.description;
  work.files.map((file: string) => {
    const img = document.createElement('img') as HTMLImageElement;

    img.src = file;
    img.classList.add('work-image');
    filesContainer.appendChild(img);
  });
  container.appendChild(title);
  container.appendChild(filesContainer);
  container.appendChild(description);

  return container;
};

export { setStorage, renderWorks, checkIsAuthorized };
