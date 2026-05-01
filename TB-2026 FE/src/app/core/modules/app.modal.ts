export interface ColumnsModel {
    isLink: boolean;
    showTooltip: boolean;
    filterDropDownData: FilterDropDownData[];
    columnDef: string;
    header: string;
    placeholder: string;
    isDateColumn?: boolean;
    isStatusColumn?: boolean;
    showInputTextFilter: boolean;
    showDropDownFilter: boolean;
    sortable?: boolean;
    width?: string; // Optional width for the column
    isPdfLink?: boolean;
    isActionColumn?: boolean; // New property to indicate if the column is an action column
}

export interface FilterDropDownData {
    text?: string;
    value?: string;
    isSelected?: boolean;
}
