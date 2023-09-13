class CategoryMapper {
  toDomain(categoryPersistence) {
    return {
      id: categoryPersistence.id,
      name: categoryPersistence.name,
      createdBy: categoryPersistence.created_by_email,
    };
  }

  toPersistence(categoryDomain) {
    console.log(categoryDomain);
    return {
      name: categoryDomain.name,
      created_by_email: categoryDomain.created_by_email,
    };
  }
}

export default new CategoryMapper();
