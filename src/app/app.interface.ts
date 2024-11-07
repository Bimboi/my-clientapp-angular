export interface Employee extends FieldEdit {
    id?: number,
    name?: string,
    company_id?: string,
    age?: number
};

interface FieldEdit {
    isEditable?: boolean
}