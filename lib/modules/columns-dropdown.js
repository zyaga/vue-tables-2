'use strict';

const dropdownWrapper = require('./dropdown-wrapper');
const dropdownItemWrapper = require('./dropdown-item-wrapper');

module.exports = function (h) {
    const _this = this;

    return function (classes) {
        const cols = _this.columns.map(function (column) {
            return dropdownItemWrapper(
                h,
                classes,
                h(
                    'a',
                    {
                        class: classes.dropdown.item,
                        attrs: {
                            href: '#',
                        },
                        on: {
                            click: function click() {
                                return _this.toggleColumn(column);
                            },
                        },
                    },
                    [
                        h('input', {
                            attrs: {
                                type: 'checkbox',
                                value: column,
                                disabled: _this._onlyColumn(column),
                            },
                            domProps: {
                                checked: _this.allColumns.includes(column),
                            },
                        }),
                        _this.getHeading(column),
                    ]
                )
            );
        });

        return h(
            'div',
            {
                ref: 'columnsdropdown',
                class: classes.dropdown.container + ' ' + classes.right + ' VueTables__columns-dropdown',
            },
            [
                h(
                    'button',
                    {
                        attrs: {type: 'button'},
                        class: classes.button + ' ' + classes.dropdown.trigger,
                        on: {
                            click: _this._toggleColumnsDropdown.bind(_this),
                        },
                    },
                    [
                        _this.display('columns'),
                        h('span', {class: classes.icon + ' ' + classes.small}, [
                            h('i', {class: classes.dropdown.caret}),
                        ]),
                    ]
                ),
                dropdownWrapper.call(_this, h, classes, cols),
            ]
        );
    };
};