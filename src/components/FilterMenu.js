import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';
import memoize from 'memoize-one';

export default class FilterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
        };
    }

    handleSearchChange = event => {
        this.setState({ filterText: event.target.value });
    };

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

        const projectsFilter = this.props.title === 'Projects Filter';
        const filterCheckboxItems = memoize((checkboxItems, filterText) => {
            if (filterText === '') {
                return checkboxItems;
            }
            return checkboxItems.filter(item => {
                const itemText = item.title || item.name;
                return itemText.toLowerCase().includes(filterText);
            });
        });
        const displayedCheckboxItems = filterCheckboxItems(checkboxItems, this.state.filterText.trim().toLowerCase());
        return (
            <div className="FilterMenu">
                <h6>{title}</h6>
                <hr />
                {(listsFilter || projectsFilter) && (
                    <div className="FilterMenu-text-filter pt-input-group">
                        <span className="pt-icon pt-icon-search" />
                        <input
                            className="pt-input pt-round"
                            onChange={this.handleSearchChange}
                            type="search"
                            placeholder="Filter tasks"
                            dir="auto"
                        />
                    </div>
                )}
                <div className="FilterMenu-checkboxes">
                    <Checkbox
                        style={{ fontWeight: 'bold' }}
                        key="all-checkbox"
                        checked={allSelected}
                        label="All"
                        onChange={this.handleAllCheckbox}
                    />
                    {listsFilter && toggleEmptyCheckbox}
                    {displayedCheckboxItems.map(item => {
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
