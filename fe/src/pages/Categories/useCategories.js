import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';

export default function useCategories() {
  const [categoryName, setCategoryName] = useState('');
  const [userData, setUserData] = useState();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);

        if (decodedToken) {
          setUserData(decodedToken);
        }
      }
    } catch (error) {
    }
  }, []);

  async function handleSubmit(category) {
    const data = {
      ...category,
      created_by_email: userData?.email,
    };
    try {
      await CategoriesService.createCategory(data);
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
    userData,
  };
}
