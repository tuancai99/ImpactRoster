export const filterProject = (data, filterList) => {
  if (!filterList || filterList.length === 0) {
    return data;
  }

  return data.filter((user) => {
    return filterList.includes(user.hero_project);
  });
};

export const sortProject = (data) => {
  const sorted = [...data].sort((a, b) => {
    const projectA = a.hero_project.toLowerCase();
    const projectB = b.hero_project.toLowerCase();
    if (projectA < projectB) {
      return -1;
    } else if (projectA > projectB) {
      return 1;
    } else {
      return 0;
    }
  });

  return sorted;
};

export const truncateText = (text, limit) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + " ...";
  }
  return text;
};
