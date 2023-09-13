class CategoryMapper {
  toDomain(categoryPersistence) {
    return {
      id: categoryPersistence.id,
      name: categoryPersistence.name,
      createdBy: categoryPersistence.CreatedBy,
    };
  }

  toPersistence(categoryDomain) {
    return {
      name: categoryDomain.name,
      createdBy: categoryDomain.CreatedBy,
    };
  }
}

export default new CategoryMapper();
