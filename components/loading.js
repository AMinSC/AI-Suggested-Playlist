export function LoadingWithMask(gif) {
    //화면의 높이와 너비를 구합니다.
    let maskHeight = document.body.scrollHeight;
    let maskWidth  = window.innerWidth;

    //화면에 출력할 마스크를 설정해줍니다.
    let mask       = document.createElement("div");
    mask.id = 'mask';
    mask.style.position = 'absolute';
    mask.style.zIndex = '9000';
    mask.style.backgroundColor = '#35363a';
    mask.style.display = 'none';
    mask.style.left = '0';
    mask.style.top = '0';

    let loadingImg = document.createElement("img");
    loadingImg.src = gif;
    loadingImg.style.backgroundColor = '#35363a';
    loadingImg.style.position = 'absolute';
    loadingImg.style.display = 'block';
    loadingImg.style.margin = '0 auto';
    loadingImg.style.left = '50%';
    loadingImg.style.top = '50%';
    loadingImg.style.transform = 'translate(-50%, -50%)';

    //화면에 레이어 추가
    document.body.appendChild(mask);

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
    mask.style.width = maskWidth + 'px';
    mask.style.height = maskHeight + 'px';
    mask.style.opacity = '0.3';

    //마스크 표시
    mask.style.display = 'block';

    //로딩중 이미지 표시
    mask.appendChild(loadingImg);
    loadingImg.style.display = 'block';
}

export function closeLoadingWithMask() {
    let mask = document.getElementById('mask');
    if (mask) {
        mask.style.display = 'none';
        mask.innerHTML = '';  
    }
}
