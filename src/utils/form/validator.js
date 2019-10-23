export const getValidator = validate => {
    let params = validate.split('|');
    let [type, ...option] = params;

    switch (type) {
        case 'Char':
            return getCharValidator(option);
        case 'Numeric':
            return getNumericValidator(option);
        case 'Decimal':
            return getDecimalValidator(option);
    }
};

const getCharValidator = option => {
    let [length] = option;
    return (rule, value, callback) => {
        if (value.length > length) {
            callback(new Error(`字符长度应小于${length}`));
        }
    };
};

const getNumericValidator = option => {
    let [rule, ...params] = option;
    switch (rule) {
        case 'range':
            return getNumericRangeValidator(params);
    }
};

const getNumericRangeValidator = params => {
    let [min, max] = params;
    min = Number(min);
    max = Number(max);
    return (rule, value, callback) => {
        let number = Number(value);
        if (number < min || number > max) {
            callback(new Error(`取值方位应在[${min}, ${max}]`));
        }
    };
};

const getDecimalValidator = option => {};
