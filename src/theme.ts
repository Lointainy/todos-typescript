let theme = localStorage.getItem('user-theme') === null ? 'light-theme' : getTheme()

function getTheme() {
	return JSON.parse(localStorage.getItem('user-theme') || '')
}

export const setTheme = async () => {
	localStorage.getItem('user-theme') === null ? theme == 'light-theme' : theme == localStorage.getItem('user-theme')
	localStorage.setItem('user-theme', JSON.stringify(theme))
	document.documentElement.className = theme
}

export const toggleTheme = () => {
	theme === 'dark-theme' ? (theme = 'light-theme') : (theme = 'dark-theme')
	setTheme()
}

