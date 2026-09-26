const year = String(new Date().getFullYear());
document.querySelectorAll('#year, .current-year').forEach(element => { element.textContent = year; });
