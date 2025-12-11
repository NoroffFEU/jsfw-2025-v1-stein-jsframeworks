export interface Media {
    url: string;
    alt?: string | null;
}

export interface Review {
    id?: string;
    username: string;
    rating: number;
    description?: string;
}

export interface Product {
    id: string;
    title: string;
    description?: string;
    price: number;
    discountedPrice?: number;
    rating?: number;
    image: Media;
    tags?: string[];
    reviews?: Review[];
}