'use strict';

module.exports = function (h) {
    const _this = this;

    const perpageValues = [];

    this.opts.perPageValues.every(function (value) {
        const isLastEntry = value >= _this.count;
        const selected = _this.limit == value || (isLastEntry && _this.limit > value);
        perpageValues.push(
            h(
                'option',
                {
                    attrs: {value: value},
                    domProps: {
                        selected: selected,
                    },
                },
                [value]
            )
        );
        return !isLastEntry;
    });

    return perpageValues;
};