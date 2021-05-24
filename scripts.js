const divTitle = document.querySelector('#title');
const divSettingContainer = document.querySelector('#settingContainer');
const btnSetting = document.querySelector('#btnSetting');
const btnClear = document.querySelector('#btnClear');
const divEtchASketch = document.querySelector('#etch-a-sketch');
const divScreen = document.querySelector('#screen');
const btnBlack = document.querySelector('#btnBlack');
const btnRainbow = document.querySelector('#btnRainbow');
const btnEraser = document.querySelector('#btnEraser');
const btnPixelBorder = document.querySelector('#btnPixelBorder');
const spanBorderOn = document.querySelector('#borderOn');
const spanBorderOff = document.querySelector('#borderOff');
const btnCustom = document.querySelector('#btnCustom');
const inputCustomColor = document.querySelector('#inputCustomColor');
const spanCustomColor = document.querySelector('#spanCustomColor');

const slider = document.querySelector('#rangeSlider');
const gridInputElement = document.querySelector('#gridInput');
const gridXElement = document.querySelector('#gridX');
gridInputElement.value = slider.value;
gridXElement.innerHTML = gridInputElement.value;

const toggleTitle = function(){
    divTitle.classList.toggle('hidden');
};

let gridTracker = slider.value;

const createDivPixels = function(numGrid){
    let dimension = numGrid;
    let totalDiv = dimension * dimension;
    let pixelTracker = 0;
    divScreen.setAttribute('style',`grid-template-columns: repeat(${dimension}, 1fr);`);
    for(let i = totalDiv; i > 0; i--){
        pixelTracker++;
        const divPixel = document.createElement('div');
        divPixel.classList.add('pixels');
        divPixel.classList.add('withBorder');
        divPixel.setAttribute('id',`pixel${pixelTracker}`);
        divScreen.appendChild(divPixel);
    }
};
createDivPixels(gridTracker);

let divPixels = document.querySelectorAll('.pixels');

const updateDivPixels = function(){
    divPixels = document.querySelectorAll('.pixels');
};

const changeScreenDimension = function(numGrid){
    divScreen.innerHTML = "";
    createDivPixels(numGrid);
    fixPixelBorder();
    updateDivPixels();

    let status = getBorderStatus();
    if(status === 'borderOff'){
        divPixels.forEach(function(div){
            div.classList.remove('withBorder');
        });
    }

    divPixels.forEach(function(div){
        div.addEventListener('mousedown', startDrawing);
        div.addEventListener('mousemove', stillDrawing);
    });
};

let isDrawing = false;
let pixelId;

const itemBlack = function(id){
    divElement = document.querySelector(`#${id}`);
    divElement.setAttribute('style','background-color: black');
};

let raindbowArrayIndex = 0;
const itemRainbow = function(id){
    const rainbowArray = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    if(raindbowArrayIndex === rainbowArray.length){
        raindbowArrayIndex = 0;
    }
    let color = rainbowArray[raindbowArrayIndex];
    divElement = document.querySelector(`#${id}`);
    divElement.setAttribute('style', `background-color: ${color};`);
    raindbowArrayIndex++;
}

let customColor = inputCustomColor.value;
spanCustomColor.setAttribute('style', `color: ${customColor}`);

const setCustomColor = function(){
    customColor = this.value;
    spanCustomColor.setAttribute('style', `color: ${customColor};`);
    selectCustom();
}

const itemCustom = function(id){
    divElement = document.querySelector(`#${id}`);
    divElement.setAttribute('style',`background-color: ${customColor}`);
}

const itemEraser = function(id){
    divElement = document.querySelector(`#${id}`);
    divElement.removeAttribute('style');
};

let usePaletteItem = itemBlack;

const selectBlack = function(){
    usePaletteItem = itemBlack;
    btnBlack.classList.add('active');
    btnBlack.disabled = "true";
    btnEraser.classList.remove('active');
    btnEraser.removeAttribute('disabled');
    btnRainbow.classList.remove('active');
    btnRainbow.removeAttribute('disabled');
    btnCustom.classList.remove('active');
    btnCustom.removeAttribute('disabled');
}

const selectRainbow = function(){
    usePaletteItem = itemRainbow;
    btnRainbow.classList.add('active');
    btnRainbow.disabled = "true";
    btnBlack.classList.remove('active');
    btnBlack.removeAttribute('disabled');
    btnEraser.classList.remove('active');
    btnEraser.removeAttribute('disabled');
    btnCustom.classList.remove('active');
    btnCustom.removeAttribute('disabled');
}

const selectCustom = function(){
    usePaletteItem = itemCustom;
    btnCustom.classList.add('active');
    btnCustom.disabled = "true";
    btnBlack.classList.remove('active');
    btnBlack.removeAttribute('disabled');
    btnRainbow.classList.remove('active');
    btnRainbow.removeAttribute('disabled');
    btnEraser.classList.remove('active');
    btnEraser.removeAttribute('disabled');
}

const selectEraser = function(){
    usePaletteItem = itemEraser;
    btnEraser.classList.add('active');
    btnEraser.disabled = "true";
    btnBlack.classList.remove('active');
    btnBlack.removeAttribute('disabled');
    btnRainbow.classList.remove('active');
    btnRainbow.removeAttribute('disabled');
    btnCustom.classList.remove('active');
    btnCustom.removeAttribute('disabled');
};

const startDrawing = function(div){
    updateDivPixels();
    isDrawing = true;
    pixelId = this.id;
    usePaletteItem(pixelId);
};

const stillDrawing = function(div){
    if(isDrawing === true){
        pixelId = this.id;
        usePaletteItem(pixelId);
    }
};

const stopDrawing = function(){
    isDrawing = false;
};

const togglePixelBorder = function(){
    updateDivPixels();
    spanBorderOn.classList.toggle('hidden');
    spanBorderOff.classList.toggle('hidden');
    divPixels.forEach(function(divPixel){
        divPixel.classList.toggle('withBorder');
    });
};

const getBorderStatus = function(){
    let borderStatus;
    const hidden = document.querySelectorAll('.hidden');
    hidden.forEach(function(element){
        if(element.className == 'material-icons hidden'){
            borderStatus = element.id;
            if(borderStatus == 'borderOn'){
                borderStatus = 'borderOff';
            } else {
                borderStatus = 'borderOn';
            }
        }
    });
    return borderStatus;
}

const fixPixelBorder = function(){
    const topLeftPixel = document.querySelector('#pixel1');
    const topRightPixel = document.querySelector(`#pixel${gridTracker}`);
    const bottomLeftPixel = document.querySelector(`#pixel${gridTracker*gridTracker-gridTracker+1}`);
    const bottomRightPixel = document.querySelector(`#pixel${gridTracker*gridTracker}`);

    topLeftPixel.classList.add('pixelTopLeft');
    topRightPixel.classList.add('pixelTopRight');
    bottomLeftPixel.classList.add('pixelBottomLeft');
    bottomRightPixel.classList.add('pixelBottomRight');
};
fixPixelBorder();

const toggleSetting = function(){
    toggleTitle();
    divSettingContainer.classList.toggle('hidden');
};

slider.oninput = function() {
    gridInputElement.value = this.value;
    gridXElement.innerHTML = this.value;
    gridTracker = this.value;
    changeScreenDimension(gridTracker);
} 

gridInput.onchange = function() {
    if((this.value < 2) || (this.value > 100)){
        alert('Error: Range Invalid! Grids: 2 up to 100');
        this.value = 16;
    }
    slider.value = this.value;
    gridXElement.innerHTML = this.value;
    gridTracker = this.value;
    changeScreenDimension(gridTracker);
}

const shake = function(){
    divEtchASketch.classList.toggle('shaking');
};

const clearScreen = function(){
    const confirmClear = confirm('Clear your sketch? Click "OK" to proceed.');
    if(confirmClear){
        shake();
        setTimeout(() => { changeScreenDimension(gridTracker); }, 900);
        setTimeout(shake, 1000);
    }else{
        return;
    }
};

btnSetting.addEventListener('click', toggleSetting);
btnClear.addEventListener('click', clearScreen);
btnBlack.addEventListener('click', selectBlack);
btnRainbow.addEventListener('click', selectRainbow);
btnCustom.addEventListener('click', selectCustom);
btnEraser.addEventListener('click', selectEraser);
btnPixelBorder.addEventListener('click', togglePixelBorder);
inputCustomColor.addEventListener('change', setCustomColor);
divPixels.forEach(function(div){
    div.addEventListener('mousedown', startDrawing);
    div.addEventListener('mousemove', stillDrawing);
});
window.addEventListener('mouseup', stopDrawing);