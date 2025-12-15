
import { ListBox, type ListBoxChangeEvent } from 'primereact/listbox';

type Category = {
  id: number;
  name: string;
};

type CategoryBlockProps = {
  categories: Category[];
  selectedCategoryIds: number[];
  onChangeSelectedCategories?: (ids: number[]) => void;
};
    
export default function CategoryBlock({ categories, selectedCategoryIds, onChangeSelectedCategories }: CategoryBlockProps) {
        
    const selectedCategories = categories.filter(c =>
        selectedCategoryIds.includes(c.id)
    );
    
    const CategoryTemplate = (option: Category) => {
        return (
            <div className="flex items-center px-4 py-3 border-3 hover:bg-gray-200 rounded-lg">
                <span className="text-2xl font-semibold">{option.name}</span>
            </div>
        );
    }
    const handleChange = (e: ListBoxChangeEvent) => {
        const value = e.value as Category[]; // en múltiple, e.value es un array

        if (onChangeSelectedCategories) {
            const ids = value.map((c) => c.id);
            onChangeSelectedCategories(ids);
        }
    };

    return (
        <div className="card flex justify-content-center">  
            <ListBox 
                multiple
                value={selectedCategories} 
                onChange={handleChange} 
                options={categories} 
                itemTemplate={CategoryTemplate} 
                optionLabel="name" 
                className="w-full" 
                listStyle={{ paddingTop: '20px', paddingBottom: '20px' }} 
                pt={{
                    list: {
                        style: { 
                            display: 'flex',
                            justifyContent: 'space-between',
                         }
                    }
                }}
                />
        </div>
    )
}
        