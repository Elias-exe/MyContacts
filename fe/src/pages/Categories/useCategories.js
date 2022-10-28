import { useState } from 'react';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';

export default function useCategories() {
  const [categoryName, setCategoryName] = useState('');

  async function handleSubmit(category) {
    try {
      await CategoriesService.createCategory(category);
      toast({
        type: 'sucess',
        text: 'Sucesso ao cadastrar a categoria',
        duration: 3000,
      });
    } catch {
      toast(
        {
          type: 'danger',
          text: 'Ocorreu um erro ao cadastrar a categoria',
        },
      );
    }
  }
  function handleCategoryName(event) {
    setCategoryName(event.target.value);
  }

  return {
    categoryName,
    handleCategoryName,
    handleSubmit,
  };
}
