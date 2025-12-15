import CategoryBlock from "./CategoryBlock";

type Category = {
    id: number;
    name: string;
};
type CategoriesMenuProps = {
  categories: Category[];
  loading?: boolean;
  selectedCategoryIds: number[];
  onChangeSelectedCategories?: (ids: number[]) => void;
};

export default function CategoriesMenu({ categories, loading, selectedCategoryIds, onChangeSelectedCategories }: CategoriesMenuProps) {
  return (
    <section>
        {loading && (
            <p className="text-sm text-slate-500 mb-2">Cargando categorías...</p>
        )}
        <CategoryBlock 
            categories={categories}
            selectedCategoryIds={selectedCategoryIds}
            onChangeSelectedCategories={onChangeSelectedCategories}
        />
    </section>
);
}