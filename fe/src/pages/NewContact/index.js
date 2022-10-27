import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);
      toast({
        type: 'sucess',
        text: 'Sucesso ao cadastrar o contato',
        duration: 3000,
      });
    } catch {
      toast(
        {
          type: 'danger',
          text: 'Ocorreu um erro ao cadastrar o contato',
        },
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
