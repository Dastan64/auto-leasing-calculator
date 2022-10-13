export const changeRangeTrail = (range, value) => {
    const min = range.min;
    const max = range.max;
    range.style.backgroundSize = ((value - min) * 100) / (max - min) + '%' + '100%';
}
