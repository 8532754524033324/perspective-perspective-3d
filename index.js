    const sliderCone = document.getElementById('angle-slider-cone');
    const angleDisplayCone = document.getElementById('angle-display-cone');
    const rotateValueCone = document.getElementById('rotate-value-display-cone');
    const wrapperCone = document.getElementById('wrapper-cone');

    const sliderParallel = document.getElementById('angle-slider-parallel');
    const angleDisplayParallel = document.getElementById('angle-display-parallel');
    const rotateValueParallel = document.getElementById('rotate-value-display-parallel');
    const wrapperParallel = document.getElementById('wrapper-parallel');

    const zDisplayCone = document.getElementById('z-value-display-cone');
    const zDisplayParallel = document.getElementById('z-value-display-parallel');

    const sideElCone = document.getElementById('side-el-cone');
    const frontElCone = document.getElementById('front-el-cone');
    const sideElParallel = document.getElementById('side-el-parallel');
    const frontElParallel = document.getElementById('front-el-parallel');

    // スライダー連動イベント処理の共通化
    function handleSliderInput(e, display, codeView, wrapper) {
        const angle = e.target.value;
        display.textContent = angle == 0 ? "0deg (正面)" : `${angle}deg`;
        codeView.textContent = `rotateY(${angle}deg)`;
        wrapper.style.transform = `rotateY(${angle}deg)`;
    }

    sliderCone.addEventListener('input', (e) => handleSliderInput(e, angleDisplayCone, rotateValueCone, wrapperCone));
    sliderParallel.addEventListener('input', (e) => handleSliderInput(e, angleDisplayParallel, rotateValueParallel, wrapperParallel));

    // 往復移動（translateZ）のアニメーションループ
    const minZ = -120;
    const maxZ = 120;
    const duration = 3000;
    let startTime = null;

    function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const progress = (Math.sin((elapsed / duration) * Math.PI - Math.PI / 2) + 1) / 2;
        const currentZ = Math.round(minZ + (maxZ - minZ) * progress);

        const zText = currentZ >= 0 ? `+${currentZ}` : currentZ;
        zDisplayCone.textContent = zText;
        zDisplayParallel.textContent = zText;

        const sideLeftPosition = 240 - currentZ;
        sideElCone.style.left = `${sideLeftPosition}px`;
        sideElParallel.style.left = `${sideLeftPosition}px`;

        frontElCone.style.transform = `translateZ(${currentZ}px)`;
        frontElParallel.style.transform = `translateZ(${currentZ}px)`;

        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
