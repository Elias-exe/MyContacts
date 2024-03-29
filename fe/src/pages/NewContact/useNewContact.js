import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);
      toast({
        type: 'sucess',
        text: 'Sucesso ao cadastrar o contato',
        duration: 3000,
      });
    } catch (error) {
      if (error.message === 'This e-mail is already been taken') {
        toast(
          {
            type: 'danger',
            text: 'Contato esse e-mail já cadastrado!',
          },
        );
      } else {
        toast(
          {
            type: 'danger',
            text: 'Ocorreu um erro ao cadastrar o contato',
          },
        );
      }
    }
  }

  return {
    handleSubmit,
  };
}
