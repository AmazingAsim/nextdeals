// lib/fontawesome.js
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Add all icons to the library so you can use them without importing individually
library.add(fas, far, fab)

// Prevent Font Awesome from adding its CSS since we're doing it manually
config.autoAddCss = false