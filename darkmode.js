const darkModeSwitch = document.getElementById('dark-mode-switch');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  darkModeSwitch.checked = true;
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  darkModeSwitch.checked = false;
  document.documentElement.setAttribute('data-theme', 'light');
}

darkModeSwitch.addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark'); 
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});
