/* loading.js */
export function LoadingWithMask(gif) {
    let maskHeight = document.body.scrollHeight;
    let maskWidth = window.innerWidth;

    let mask = document.createElement("div");
    mask.id = 'mask';

    let loadingImg = document.createElement("img");
    loadingImg.src = gif;
    loadingImg.className = "loading-img";

    document.body.appendChild(mask);

    mask.style.width = maskWidth + 'px';
    mask.style.height = maskHeight + 'px';

    mask.appendChild(loadingImg);
}

export function closeLoadingWithMask() {
    let mask = document.getElementById('mask');
    if (mask) {
        mask.innerHTML = '';
        mask.style.display = 'none';
    }
}
