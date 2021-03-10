const smoothScrolling = () => {
    const anchor = document.querySelector('a[href="#service-block"]');
    let menuItems = document.querySelectorAll('menu > ul > li > a');

    const scrolling = (event) => {
        event.preventDefault();
        const V = 1;
        let target = event.target;

        if (target.closest('main')) {
            target = anchor;
        }
        const blockID = target.getAttribute('href');
        let w = window.pageYOffset,
            t = document.querySelector(blockID).getBoundingClientRect().top,
            start = null;
        requestAnimationFrame(step);

        function step(time) {
            if (start === null) {
                start = time;
            }
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
            window.scrollTo(0, r);
            if (r !== w + t) {
                requestAnimationFrame(step);
            } else {
                location.hash = blockID;
            }
        }
    };

    anchor.addEventListener('click', scrolling);
    for (let item of menuItems) {
        item.addEventListener('click', scrolling);
    }

};

export default smoothScrolling;