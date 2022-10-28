import { Link } from 'react-router-dom';
import { Container, Header } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button/index';
import useCategories from './useCategories';

export default function Categories() {
  const {
    categoryName,
    handleCategoryName,
    handleSubmit,
  } = useCategories();
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
