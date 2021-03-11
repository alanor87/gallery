import { galleryPageRef } from "./DOMRefs";
import { fetchImages } from './fetchImages';

const options = {
    root: galleryPageRef,
    rootMargin: '50px',
    threshold: 1.0,
}

export const infScrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) fetchImages();
}, options);
