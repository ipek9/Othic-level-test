import { Slider, type SliderChangeEvent } from 'primereact/slider';

type InputSliderProps = {
  value: number;
  max: number;
  onChange?: (value: number) => void;

};

export default function InputSlider({ value, max, onChange }: InputSliderProps) {
  const handleChange = (e: SliderChangeEvent) => {
    if (typeof e.value === 'number') {
      onChange?.(e.value);
    }
  };

  return (
    <div className='w-[400px]' >
      
      <div className=''>Precio Máximo: {value} €</div>
      <Slider 
        value={value} 
        onChange={handleChange} 
        min={0}
        max={max}
        style={{
            marginBottom: '10px',
        }}
        pt={{
            handle: {
            style: {
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6',
            },
            },
        }}
        />
    </div>
  );
}
