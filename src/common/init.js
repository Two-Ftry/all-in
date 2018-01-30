/**
 * Created by jfhuang on 18/1/24.
 */

const resized = () => {
    const w = document.documentElement.clientWidth;
    const fontSize = w / 6.4;
    const html = document.getElementsByTagName('html')[0];
    html.style.fontSize = `${fontSize}px`;
}

window.addEventListener('resize', () => {
    resized();
});

resized();