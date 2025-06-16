
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  store: string;
  discount?: string;
  location: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {product.discount}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isWishlisted
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
          onClick={toggleWishlist}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-emerald-600">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-2">
          <p className="truncate">{product.store}</p>
          <p className="text-xs">{product.location}</p>
        </div>

        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Tambah ke Keranjang
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
