import { useEffect, useState, FormEvent } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import type { Product, Category, ProductUpdateRequest } from '../api';
import { updateProduct } from '../api';
import { InputForm } from './InputForm';


type ModalProductProps = {
    product: Product;
    setModalVisible: (visible: boolean) => void;
    categories: Category[];
    onProductUpdated?: (product: Product) => void;
};

type ProductFormState = {
    name: string;
    description: string;
    categoryId: number | null;
    price: number;
};

export default function ModalProduct({ product, setModalVisible, categories, onProductUpdated }: ModalProductProps) {
    const [formValues, setFormValues] = useState<ProductFormState>({
        name: product.name,
        description: product.description ?? '',
        categoryId: product.categoryId ?? null,
        price: product.price,
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setFormValues({
            name: product.name,
            description: product.description ?? '',
            categoryId: product.categoryId ?? null,
            price: product.price,
        });
    }, [product]);

    const handlePriceChange = (value: number | null) => {
        setFormValues((prev) => ({
            ...prev,
            price: value ?? 0,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (formValues.categoryId == null) {
            alert('Debes seleccionar una categoría');
            return;
        }

        const request: ProductUpdateRequest = {
            name: formValues.name.trim(),
            description: formValues.description.trim(),
            price: formValues.price,
            categoryId: formValues.categoryId,
        };

        try {
            setSaving(true);
            const updated = await updateProduct(product.id, request);

            // Avisamos al padre para que actualice la lista / estado
            if (onProductUpdated) {
                onProductUpdated(updated);
            }

            setModalVisible(false);
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el producto');
        } finally {
            setSaving(false);
        }

    };

    return (
        <div className="card p-4">

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="my-2">
                    <p className='text-xs text-slate-400'>ID interno: {product.id}</p>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Nombre</label>
                    <InputForm
                        inputValue={formValues.name}
                        onInputChange={(value) =>
                            setFormValues((prev) => ({ ...prev, name: value }))
                        }
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Descripción</label>
                    <InputForm
                        inputValue={formValues.description}
                        onInputChange={(value) =>
                            setFormValues((prev) => ({ ...prev, description: value }))
                        }
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Categoría</label>
                    <Dropdown
                        value={formValues.categoryId}
                        onChange={(e) =>
                            setFormValues((prev) => ({
                                ...prev,
                                categoryId: e.value as number,
                            }))
                        }
                        variant='filled'
                        options={categories}
                        optionLabel="name"
                        optionValue="id"
                        placeholder="Selecciona una categoría"
                        className="w-full h-[50px] px-2 py-2 border border-slate-300 rounded"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Precio (€)</label>
                    <InputNumber
                        value={formValues.price}
                        onValueChange={(e) => handlePriceChange(e.value as number | null)}
                        mode="currency"
                        currency="EUR"
                        locale="es-ES"
                        className="w-full h-[50px] px-2 border border-slate-300 rounded"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        label="Cancelar"
                        severity="secondary"
                        onClick={() => setModalVisible(false)}
                        className='py-2 px-4 text-white rounded'
                        style={{ backgroundColor: '#6b7280' }}
                        disabled={saving}
                    />

                    <Button
                        type="submit"
                        label={saving ? 'Guardando...' : 'Guardar cambios'}
                        icon="pi pi-save"
                        className='py-2 px-4 text-white rounded gap-2'
                        style={{ backgroundColor: '#3188f7' }}
                        disabled={saving}
                    />
                </div>
            </form>
        </div>
    );
}
