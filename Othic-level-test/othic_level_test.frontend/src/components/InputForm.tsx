import { InputText } from 'primereact/inputtext';

type InputFormProps = {
    inputValue: string;
    onInputChange: (value: string) => void;
};

export function InputForm({ inputValue, onInputChange }: InputFormProps) {
    return (
        <div>
            <InputText
                value={inputValue}
                onChange={(e) => onInputChange && onInputChange(e.target.value)}
                className="w-full h-[50px] px-2 border border-slate-300 rounded"
            />        
        </div>
    );
}