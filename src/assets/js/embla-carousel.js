import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';


const initEmblaCarousels = () => {
    const nodes = document.querySelectorAll('.embla');

    nodes.forEach((emblaNode) => {
        const viewportNode = emblaNode.querySelector('.embla__viewport');
        const dotNodes = emblaNode.querySelectorAll('.embla__dot');
        const prevBtnNode = emblaNode.querySelector('.embla__button--prev');
        const nextBtnNode = emblaNode.querySelector('.embla__button--next');
        const counterNode = emblaNode.querySelector('.embla__counter');

        if (!viewportNode) return;

        // Load configuration from data attributes
        const draggableValue = emblaNode.dataset.draggable;
        const watchDragValue = draggableValue === 'mobile-only' ? true : draggableValue !== 'false';
        const breakpoints = draggableValue === 'mobile-only'
            ? { '(min-width: 768px)': { watchDrag: false } }
            : {};

        const options = {
            loop: emblaNode.dataset.loop !== 'false',
            align: emblaNode.dataset.align || 'center',
            duration: parseInt(emblaNode.dataset.duration) || 30,
            watchDrag: watchDragValue,
            skipSnaps: false,
            breakpoints,
        };

        const plugins = []
        if (emblaNode.dataset.autoplay !== 'false') {
            plugins.push(
                Autoplay({
                    delay: parseInt(emblaNode.dataset.delay) || 5000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true
                })
            );
        }

        const emblaApi = EmblaCarousel(viewportNode, options, plugins);
        const autoplay = emblaApi.plugins().autoplay;

        // Carousel counter logic
        if (counterNode) {
            const updateCounter = () => {
                const selectedIndex = emblaApi.selectedScrollSnap();
                const totalSlides = emblaApi.scrollSnapList().length;

                // Formát výpisu: "1" 
                // Pokud byste chtěli formát "1 / 5", použijte: `${selectedIndex + 1} / ${totalSlides}`
                counterNode.textContent = selectedIndex + 1;
            };

            emblaApi.on('select', updateCounter);
            emblaApi.on('init', updateCounter);
            emblaApi.on('reInit', updateCounter);
            updateCounter();
        }

        // Carousel buttons logic
        if (prevBtnNode && nextBtnNode) {
            const scrollPrev = () => {
                emblaApi.scrollPrev();
                if (autoplay) autoplay.reset();
            };
            const scrollNext = () => {
                emblaApi.scrollNext();
                if (autoplay) autoplay.reset();
            };

            prevBtnNode.addEventListener('click', scrollPrev, false);
            nextBtnNode.addEventListener('click', scrollNext, false);

            // Funkce pro aktivaci/deaktivaci tlačítek (pokud loop: false)
            const togglePrevNextBtnsState = () => {
                if (options.loop) return; // Pokud je zapnutý loop, tlačítka jsou stále aktivní

                if (emblaApi.canScrollPrev()) prevBtnNode.removeAttribute('disabled');
                else prevBtnNode.setAttribute('disabled', 'disabled');

                if (emblaApi.canScrollNext()) nextBtnNode.removeAttribute('disabled');
                else nextBtnNode.setAttribute('disabled', 'disabled');
            };

            emblaApi.on('select', togglePrevNextBtnsState);
            emblaApi.on('init', togglePrevNextBtnsState);
            emblaApi.on('reInit', togglePrevNextBtnsState);
            togglePrevNextBtnsState();
        }

        // Carousel dots/navigation logic
        if (dotNodes.length > 0) {
            const updateDots = () => {
                const selectedIndex = emblaApi.selectedScrollSnap();
                dotNodes.forEach((dot, index) => {
                    if (index === selectedIndex) {
                        dot.setAttribute('aria-selected', 'true');
                    } else {
                        dot.setAttribute('aria-selected', 'false');
                    }
                });
            }

            dotNodes.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    emblaApi.scrollTo(index);

                    // Reset the autoplay timer
                    if (autoplay) {
                        autoplay.reset();
                    }
                }, false)
            });

            emblaApi.on('select', updateDots);
            emblaApi.on('init', updateDots);
            updateDots();
        }
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmblaCarousels);
} else {
    initEmblaCarousels();
}