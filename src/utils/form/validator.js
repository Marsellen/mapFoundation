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
        callback();
    };
};

const getNumericValidator = option => {
    let [rule, ...params] = option;
    switch (rule) {
        case 'range':
            return getNumericRangeValidator(params);
        case 'max':
            return getNumericMaxValidator(params);
        case 'maxLength':
            return getNumericMaxLengthValidator(params);
    }
};

const getNumericRangeValidator = params => {
    let [min, max] = params;
    min = Number(min);
    max = Number(max);
    return (rule, value, callback) => {
        let number = Number(value);
        if (number < min || number > max) {
            callback(new Error(`取值范围应在[${min}, ${max}]`));
        }
        callback();
    };
};

const getNumericMaxValidator = params => {
    let [max] = params;
    return (rule, value, callback) => {
        let number = Number(value);
        if (number > max) {
            callback(new Error(`最大值不超过${max}`));
        }
        callback();
    };
};

const getNumericMaxLengthValidator = params => {
    let [maxLength] = params;
    return (rule, value, callback) => {
        if (value.length > maxLength) {
            callback(new Error(`最大长度应为${maxLength}位数字`));
        }
        callback();
    };
};

const getDecimalValidator = option => {
    let [integerLength, floatLength] = option;
    integerLength = Number(integerLength) - 1;
    floatLength = Number(floatLength);
    let reg = new RegExp(
        '^[1-9]\\d{0,' +
            integerLength +
            '}(\\.\\d{1,' +
            floatLength +
            '})?$|^0(\\.\\d{1,' +
            floatLength +
            '})?$'
    );
    return (rule, value, callback) => {
        if (!reg.test(value)) {
            callback(
                new Error(
                    `整数部分不超过${integerLength +
                        1}位数字,小数部分不超过${floatLength}位小数`
                )
            );
        }
        callback();
    };
};
