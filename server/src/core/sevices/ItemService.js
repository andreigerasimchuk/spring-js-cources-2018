
class ItemService {
  create(data) {
    const now = new Date().toLocaleString();
    return {
      comments: [],
      createdDate: now,
      isLiked: false,
      isCompleted: false,
      lastUpdateDate: now,
      ...data,
    };
  }

  update(change, item) {
    return {
      ...item,
      ...change,
      lastUpdateDate: new Date().toLocaleString(),
      createdDate: item.createdDate,
    };
  }

  getCleanItem(item) {
    const { title, discription, isLiked, isCompleted, createdDate, comments } = item;
    return { title, discription, isLiked, isCompleted, createdDate, comments };
  }
}

module.exports = ItemService;