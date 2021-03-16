import { galleryWrapRef } from "./DOMRefs";
import { fetchImages } from './fetchImages';
export { infScrollObserver };

const options = {
    root: galleryWrapRef,
    rootMargin: '50px',
    threshold: 0.2,
}

const infScrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchImages();
        console.log('intersection');
    }
}, options);
