class CategoryMapper {
  toDomain(categoryPersistence) {
    return {
      id: categoryPersistence.id,
      name: categoryPersistence.name,
      email: categoryPersistence.email,
    };
  }

  toPersistence(categoryDomain) {
    return {
      name: categoryDomain.name,
      email: categoryDomain.email,
    };
  }
}

export default new CategoryMapper();
