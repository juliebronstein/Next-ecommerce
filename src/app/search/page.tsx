import prisma from "@/lib/db/prisma"
import ProductCard from "../component/ProductCard"
import { Metadata } from "next";

interface SearchPageProps {
    searchParams: { query: string };
  }
  
  export function generateMetadata({
    searchParams: { query },
  }: SearchPageProps): Metadata {
    return {
      title: `Search: ${query} - Flowmazon`,
    };
  }
  
  export default async function SearchPage({
    searchParams: { query },
  }: SearchPageProps) {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { descriptions: { contains: query} },
        ],
      },
      orderBy: { idproduct: "desc" },
    });
  
    if (products.length === 0) {
      return <div className="text-center">No products found</div>;
    }
  
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.idproduct} />
        ))}
      </div>
    );
  }