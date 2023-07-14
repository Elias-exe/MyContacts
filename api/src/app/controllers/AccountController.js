const AccountRepository = require("../repositories/AccountRepository");
const bcrypt = require ("bcrypt");

class AccountController {
  async index(request,response){
    const accounts = await AccountRepository.listAccounts();
    return response.status(201).json(accounts);
  }

  async store(request, response) {
    const { email, password } = request.body;

    if (!email){
      return response.status(404).json({ error: "E-mail is required!" });
    }

    if (!password){
      return response.status(404).json({ error: "Password is required!" });
    }

    const emailExists = await AccountRepository.findByEmail({ email });

    if (emailExists) {
      return response.status(404).json({error: "E-mail already by taken!"});
    }

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async(err, hash) => {
      if (err) {
          console.error('Erro to generate hash password:', err);
          return;
      }
      await AccountRepository.createAccount({
        email,
        password: hash
      })
  });

    return response.status(201).json("Accont created");
  }
}

module.exports = new AccountController();
