import { register } from 'swiper/element/bundle';

import worksJson from './works.json';
import { GetSwiperSlidesPropsType, WorkInt } from '../types/common';

export const localStorageKey = 'nina-komel.last_visit';
const MAX_SESION_TIME = 100;
const { works } = worksJson;
const { BASE_URL } = import.meta.env;

register(); // register Swiper custom elements

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

const getSwiperSlides = ({ slides, name }: GetSwiperSlidesPropsType) => {
  let result = ``;

  slides.forEach((slide) => {
    result += `<swiper-slide>
                <img 
                  src="${BASE_URL + '/' + slide}"
                  alt="${name} - preview"
                />
              </swiper-slide>`;
  });

  return result;
};

const createWorkElement = (work: WorkInt): HTMLDivElement => {
  const container = document.createElement('div') as HTMLDivElement;
  container.classList.add('work');

  container.innerHTML = `
    <span class="work-title">${work.title}</span>
    <div class="work-files">
      <swiper-container navigation="true" pagination="true">
        ${getSwiperSlides({ slides: work.files, name: work.title })}
      </swiper-container>
    </div>
    <span class="work-description">${work.description}</span>
  `;

  return container;
};

export { setStorage, renderWorks, checkIsAuthorized };
