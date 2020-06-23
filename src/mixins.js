export default {
  methods: {
    showPlaceholder (image, background = true) {
      const noImage = require('./assets/images/no-image.jpg')
      const placeholder = { backgroundImage: `url(${noImage})` }

      switch (background) {
        case true: {
          if (typeof image === 'undefined' || image === '') return placeholder
          return image
        }
        default: {
          if (typeof image === 'undefined' || image === '') return noImage
          return image
        }
      }
    }
  }
}
