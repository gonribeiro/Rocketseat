import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
            id: image.id,
            // web dev
            // url: `http://localhost:3333/uploads/${image.path}`,
            // mobile dev
            url: `http://192.168.0.12:3333/uploads/${image.path}`,
        };
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
};