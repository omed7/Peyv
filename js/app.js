// Main application logic
document.addEventListener('DOMContentLoaded', () => {
  const navTabs = document.querySelectorAll('.nav-tab');
  const pages = document.querySelectorAll('.page');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;

      // Update active tab
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active page
      pages.forEach(p => p.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
    });
  });
});
