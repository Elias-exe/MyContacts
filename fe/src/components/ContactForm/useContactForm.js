import {
  useState, useEffect, useImperativeHandle,
} from 'react';

import jwtDecode from 'jwt-decode';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import CategoriesService from '../../services/CategoriesService';

import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValue: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone) ?? '');
      setCategoryId(contact.category_id ?? '');
    },
  }), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const data = {
          created_by_email: userData?.email,
        };

        const categoriesList = await CategoriesService.listCategories({
          signal: controller.signal,
          body: data,
        });
        setCategories(categoriesList);
      } catch (error) {
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setLoadingCategories, userData?.email]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);
    }
  }, []);

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError(
        { field: 'email', message: 'Email inválido.' },
      );
    } else {
      removeError('email');
    }
  }

  function handleChangeName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    onSubmit({
      name,
      email,
      phone,
      categoryId,
      createdByEmail: userData?.email,
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleChangeName,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
