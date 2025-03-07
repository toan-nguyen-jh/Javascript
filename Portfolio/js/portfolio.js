// portfolio

const CATEGORIES = [
  {
    id: "",
    name: "All",
  },
  {
    id: "websiteDesign",
    name: "Website design",
  },
  {
    id: "mobileApp",
    name: "Mobile app",
  },
  {
    id: "graphicDesign",
    name: "Graphic design",
  },
  {
    id: "webDevelopment",
    name: "Web development",
  },
];

const PROJECTS_LIST = [
  {
    name: "Project 1",
    categoryId: "websiteDesign",
  },
  {
    name: "Project 2",
    categoryId: "mobileApp",
  },
  {
    name: "Project 3",
    categoryId: "websiteDesign",
  },
  {
    name: "Project 4",
    categoryId: "graphicDesign",
  },
  {
    name: "Project 5",
    categoryId: "webDevelopment",
  },
  {
    name: "Project 6",
    categoryId: "mobileApp",
  },
  {
    name: "Project 7",
    categoryId: "graphicDesign",
  },
  {
    name: "Project 8",
    categoryId: "webDevelopment",
  },
  {
    name: "Project 9",
    categoryId: "websiteDesign",
  },
];

const getProjectsByCategoryId = (categoryId) => {
  const projects = PROJECTS_LIST.map((project) => {
    const categoryName =
      CATEGORIES.find((cat) => cat.id === project.categoryId)?.name || "";
    return {
      name: project.name,
      categoryId: project.categoryId,
      categoryName: categoryName,
    };
  });
  return categoryId
    ? projects.filter((project) => project.categoryId === categoryId)
    : projects;
};

const renderCategories = () => {
  const categoriesListElement = document.querySelector(".categories-list");
  categoriesListElement.innerHTML = "";
  CATEGORIES.forEach((category, index) => {
    const categoryItem = document.createElement("li");
    categoryItem.classList.add("category-item");
    categoryItem.textContent = category.name;
    categoryItem.setAttribute("data-category", category.id);
    if (index === 0) categoryItem.classList.add("active");
    categoriesListElement.appendChild(categoryItem);
  });
};

const renderProjects = (categoryId) => {
  const projectListContainer = document.querySelector(".project-list");
  projectListContainer.innerHTML = "";

  const filteredProjects = getProjectsByCategoryId(categoryId);

  filteredProjects.forEach((project) => {
    const categoryName =
      CATEGORIES.find((cat) => cat.id === project.categoryId)?.name ||
      "Unknown";
    const projectElement = document.createElement("article");
    projectElement.classList.add("project-item");
    projectElement.setAttribute("data-category", project.categoryId);
    projectElement.innerHTML = `
      <img src="./img/project/project-1.png" alt="Project cover" />
      <div class="project-info">
        <div class="project-name">${project.name}</div>
        <div class="project-category">${categoryName}</div>
      </div>
    `;
    projectListContainer.appendChild(projectElement);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProjects("");

  document.querySelectorAll(".category-item").forEach((item) => {
    item.addEventListener("click", function () {
      const selectedCategory = this.getAttribute("data-category");
      document
        .querySelectorAll(".category-item")
        .forEach((el) => el.classList.remove("active"));
      this.classList.add("active");
      renderProjects(selectedCategory);
    });
  });
});
