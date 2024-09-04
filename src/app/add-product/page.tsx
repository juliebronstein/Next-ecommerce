
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButtont from "../component/FormSubmitButtont";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "OnlineShop - Add Product",
  description: "We make your wallet cry",
};

const addProduct = async (formData: FormData) => {
  "use server";
  const session=await getServerSession(authOptions)
  if(!session)
    redirect("api/auth/signin?callbackurl=/add-product")
  const name = formData.get("name")?.toString();
  const descriptions = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price")?.toString() || 0);
  if (!name || !price || !imageUrl || !descriptions)
    throw Error("Missing required field");
  const data = {
    name,
    descriptions,
    imageUrl,
    price,
   };
  const res = await prisma.product.create({
    data:data,
  });

  Object.keys(data).forEach((key) => {
    formData.set(key, "");
  });
  redirect("/");
};

export default async function AddProductPage() {
  const session=await getServerSession(authOptions)
  if(!session)
    redirect("api/auth/signin?callbackurl=/add-product")
  return (
    <div>
      <h1 className="text-lg font-bold mb-3">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          type="text"
          placeholder="Product Name"
          className="input input-bordered w-full mb-3"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full mb-3 "
        />
        <input
          required
          name="imageUrl"
          type="url"
          placeholder="Image Url"
          className="input input-bordered w-full  mb-3"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="price"
          className="input input-bordered w-full mb-3 "
        />
        <FormSubmitButtont className="btn-block" type="submit">
          Add Product
        </FormSubmitButtont>
        {/* <button className="btn btn-primary btn-block" type="submit">Add Product</button> */}
      </form>
    </div>
  );
}
