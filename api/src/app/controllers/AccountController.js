const router = require("../../routes");
const jwt = require("jsonwebtoken");
const AccountRepository = require("../repositories/AccountRepository");
const bcrypt = require ("bcryptjs");

class AccountController {
  async index(request,response){
    const accounts = await AccountRepository.listAccounts();
    return response.status(201).json(accounts);
  }

  async registerUser(request, response) {
    const { email, password } = request.body;

    if (!email){
      return response.status(404).json({ error: "E-mail is required!" });
    }

    if (!password){
      return response.status(404).json({ error: "Password is required!" });
    }

    const emailExists = await AccountRepository.findByEmail({ email });

    if (emailExists) {
      return response.status(409).json({error: "E-mail already by taken!"});
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

  async signUp(request,response){
    const {email,password} = request.body;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    if(!email){
      response.status(404).json({error:"E-mail is required!"})
    }

    if (!password){
      response.status(404).json({error: "Password is required!"})
    }

    const account = await AccountRepository.findByEmail({email});

    if (!account){
      response.status(404).json({error: "Conta não registrada!"})
    }

    bcrypt.compare(password, account.password, (err, result) => {
        if (err) {
          console.error('Erro ao comparar as senhas:', err);
          return;
        }

        if (result) {
          const token = jwt.sign(account, jwtSecretKey, {expiresIn:'15min'})
          return response.status(202).json({account, token});
        } else {
          return response.status(400).send('Dados inválidos!');
        }
      })
  }
}

module.exports = new AccountController();
