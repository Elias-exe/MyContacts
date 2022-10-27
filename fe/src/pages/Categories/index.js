import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button/index';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';

export default function Categories() {
  // const [categoryData, setCategoryData] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  async function handleSubmit(category) {
    console.log(category);
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

  return (
    <Container>
      <Header>
        <Link to="/">Voltar</Link>
      </Header>

      <h1>Criar nova categoria</h1>
      <Input
        placeholder="Nome da categoria"
        value={categoryName}
        onChange={handleCategoryName}
      />
      <Button
        type="submit"
        onClick={() => { handleSubmit({ name: categoryName }); }}
      >
        Criar
      </Button>

    </Container>
  );
}
