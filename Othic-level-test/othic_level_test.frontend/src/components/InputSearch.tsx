import type { ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

type InputSearchProps = {
  value: string;
  onChange?: (value: string) => void;
};
export function InputSearch({ value, onChange }: InputSearchProps) {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className="p-inputgroup flex h-[40px] w-[400px]">
            <InputText 
                placeholder="Busca tu producto" 
                className="border-1 rounded-s-lg p-2" 
                value={value}
                onChange={handleInputChange}
                />
            <Button 
                icon="pi pi-times" 
                style={{ backgroundColor: '#3188f7', borderColor: '#3188f7', color: 'white', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }} 
                onClick={() => onChange?.('')}
                />
        </div>
    );
}
