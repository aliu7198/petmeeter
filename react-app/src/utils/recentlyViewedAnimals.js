export const addRecentlyViewedAnimal = (animal, user) => {
  let recentlyViewedAnimals =
    JSON.parse(localStorage.getItem("recentlyViewedAnimals")) || [];

  const index = recentlyViewedAnimals.findIndex((a) => {
    return a.id === animal.id;
  });

  if (index !== -1) {
    recentlyViewedAnimals.splice(index, 1);
  }

  if (animal.ownerId !== user.id) {
    recentlyViewedAnimals.unshift(animal);
  }

  if (recentlyViewedAnimals.length > 4) {
    recentlyViewedAnimals = recentlyViewedAnimals.slice(0, 4);
  }

  localStorage.setItem(
    "recentlyViewedAnimals",
    JSON.stringify(recentlyViewedAnimals)
  );
};
