import { Button } from "primereact/button";
import { InputSearch } from "./InputSearch";
import InputSlider from "./InputSlider";

type FiltersMenuProps = {
  maxPrice: number | null;
  onChangeMaxPrice?: (value: number | null) => void;
  searchTerm: string;
  onChangeSearchTerm?: (value: string) => void;
  onChangeSelectedCategories?: (value: number[]) => void;
  maxAvailablePrice?: number | null;
};

export default function FiltersMenu({ maxPrice, onChangeMaxPrice, searchTerm, onChangeSearchTerm, onChangeSelectedCategories, maxAvailablePrice }: FiltersMenuProps) {
    const sliderMax = maxAvailablePrice ?? 0;
    const sliderValue = maxPrice ?? sliderMax;

    const handleSliderChange = (value: number) => {
        if (onChangeMaxPrice) {
        onChangeMaxPrice(value);
        }
    };
    
    const handleSearchChange = (value: string) => {
        if (onChangeSearchTerm) {
        onChangeSearchTerm(value);
        }
    };

    const handleClearFilters = () => {
        if (onChangeSelectedCategories) {
            onChangeSelectedCategories([]);
        }
        handleSearchChange('');
        handleSliderChange(sliderMax);
    };

    return (
        <section className="mb-6" >
            <div className="flex items-center justify-between py-4 gap-24">
                <InputSearch 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <InputSlider 
                    value={sliderValue}
                    max={sliderMax}
                    onChange={handleSliderChange}
                />
                <Button onClick={() => {
                    handleClearFilters();
                }}
                    style={{
                        backgroundColor: '#3188f7',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontWeight: '500',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    Clear Filters
                </Button>
            </div>
        </section>
    );
}