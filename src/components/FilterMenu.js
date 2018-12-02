import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';

export default class FilterMenu extends React.Component {
    handleCheckbox = (checkboxItem, event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onChange(checkboxItem, value);
    };

    handleAllCheckbox = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onChangeAll(value);
    };

    handleAllEmptyCheckbox = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onChangeAllEmpty(value);
    };

    render() {
        const { checkboxItems, selectedItems, title, labelProperty } = this.props;

        const listsFilter = this.props.title === 'Lists Filter';
        let toggleEmptyCheckbox = null;

        if (listsFilter) {
            const allEmptyChecked = checkboxItems.every(item => {
                return item.items.size !== 0 || selectedItems.contains(item);
            });
            toggleEmptyCheckbox = (
                <Checkbox
                    style={{ fontWeight: 'bold' }}
                    key="empty-checkbox"
                    checked={allEmptyChecked}
                    label={'Empty lists'}
                    onChange={this.handleAllEmptyCheckbox}
                />
            );
        }

        const allSelected = checkboxItems.filter(el => !selectedItems.contains(el)).isEmpty();

        return (
            <div className="FilterMenu">
                <h6>{title}</h6>
                <hr />
                <div className="FilterMenu-checkboxes">
                    <Checkbox
                        style={{ fontWeight: 'bold' }}
                        key="all-checkbox"
                        checked={allSelected}
                        label="All"
                        onChange={this.handleAllCheckbox}
                    />
                    {listsFilter && toggleEmptyCheckbox}
                    {checkboxItems.map(item => {
                        let labelString = item[labelProperty];
                        if (listsFilter) labelString += '\t(' + item['items'].size + ')';
                        return (
                            <Checkbox
                                key={item.id}
                                checked={selectedItems.contains(item)}
                                label={labelString}
                                onChange={event => this.handleCheckbox(item, event)}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

FilterMenu.propTypes = {
    checkboxItems: PropTypes.any.isRequired,
    selectedItems: PropTypes.any.isRequired,
    title: PropTypes.string,
    labelProperty: PropTypes.string,
    onChange: PropTypes.func,
    onChangeAll: PropTypes.func,
};

FilterMenu.defaultProps = {
    title: 'Filter Menu',
    labelProperty: 'title',
    onChange: (item, isChecked) => console.log(`item: ${item}, isChecked: ${isChecked}`),
    onChangeAll: isChecked => console.log(`allItems: ${isChecked}`),
};
