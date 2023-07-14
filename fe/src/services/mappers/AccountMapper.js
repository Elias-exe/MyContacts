class AccountMapper {
  toPersistence(domainAccount) {
    return {
      email: domainAccount.email,
      password: domainAccount.password,
    };
  }

  toDomain(persistenceAccount) {
    return {
      id: persistenceAccount.id,
      name: persistenceAccount.name,
      email: persistenceAccount.email,
      phone: persistenceAccount.phone,
    };
  }
}

export default new AccountMapper();
